import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
  alpha,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Iconify from '@/shared/components/iconify/Iconify';
import Counter from '../components/Counter';
import { useTranslation } from 'react-i18next';
import useResponsive from '../../../hooks/useResponsive';
import 'react-medium-image-zoom/dist/styles.css';
import Colors from '../../../theme/colors';
import { useDispatch } from 'react-redux';
import Description from '../components/Description';
import {
  useFetchProductQuery,
  useLazyFetchProductsQuery,
} from '@/redux/apis/product';
import Loader from '@/shared/components/loader/Loader';
import { useAddItemToCartMutation } from '@/redux/apis/apiHub';
import WholesalePrices from '../components/WholesalePrices';
import '../styles/image-gallery.css';
import { API_URL } from '@/redux/helpers/baseQuery';
import ProductCarousel from '../../Home/components/ProductCarousel';
import secureLocalStorage from 'react-secure-storage';
import ImageMagnifier from '@/shared/components/image-magnifier';
import { ImageSlider } from '@/shared/components/image-slider';

export default function Product() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isRTL = localStorage.getItem('language') === 'ar';

  const [count, setCount] = useState(1);
  const [product, setProduct] = useState();
  const [category, setCategory] = useState();
  const [isLoved, setIsLoved] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const { data: mainProduct, isFetching } = useFetchProductQuery(slug);
  const [fetchProductsWithCategory, { data: productsWithSameCategory }] =
    useLazyFetchProductsQuery();
  const [addToCart, { isLoading }] = useAddItemToCartMutation();

  const token = localStorage.getItem('token');
  const user = JSON.parse(secureLocalStorage.getItem('user'));
  const variations = mainProduct?.variations;
  const isMobile = useResponsive('down', 'md');
  const filteredProductsWithSameCategory =
    productsWithSameCategory?.data.filter(
      (product) => product.id !== mainProduct.id
    );

  useEffect(() => {
    const lovedProducts = JSON.parse(
      secureLocalStorage.getItem('lovedProducts')
    );
    if (lovedProducts) {
      setIsLoved(
        lovedProducts.some((product) => product.id === mainProduct?.id)
      );
    }

    let product = {};
    let category;
    if (mainProduct) {
      product = variations?.color[0];
      category = mainProduct?.categories[0]; //TODO: handle multiple categories
      setProduct(product);

      if (category) {
        setCategory(category);
        fetchProductsWithCategory({
          filters: [{ id: 'category', value: category.slug }],
        });
      }
    }
  }, [dispatch, mainProduct]);

  const handleLoveClick = () => {
    if (!token) {
      navigate('/auth/login');
      return;
    }
    setIsLoved(!isLoved);
    const lovedProducts = JSON.parse(
      secureLocalStorage.getItem('lovedProducts')
    );

    if (lovedProducts) {
      if (isLoved) {
        const updatedLovedProducts = lovedProducts.filter(
          (product) => product.id !== mainProduct.id
        );
        secureLocalStorage.setItem(
          'lovedProducts',
          JSON.stringify(updatedLovedProducts)
        );
      } else {
        secureLocalStorage.setItem(
          'lovedProducts',
          JSON.stringify([...lovedProducts, mainProduct])
        );
      }
    } else {
      secureLocalStorage.setItem(
        'lovedProducts',
        JSON.stringify([mainProduct])
      );
    }
  };

  const handleAddToCart = () => {
    if (token) {
      addToCart({ products: [{ id: product.id, quantity: count }] });
    } else {
      navigate('/auth/login');
    }
  };

  const switchVariant = (id) => {
    setProduct(variations.color.find((variant) => variant.id === id));
  };

  return isFetching ? (
    <Loader />
  ) : (
    <Container maxWidth='xl' sx={{ mt: 4 }}>
      <Grid container sx={{ mb: 4, px: 2 }}>
        <Grid item xs={12} sm={6} md={4} sx={{ mt: 2, p: 2 }}>
          <ImageMagnifier
            alt={mainProduct?.name_en}
            imgUrl={`${API_URL}/images/${product?.images[currentImage]?.image_path}`}
          />
          <br />
          <ImageSlider
            imgs={product?.images || []}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={8} sx={{ p: 2 }}>
          <Grid container direction={'column'} spacing={2}>
            <Grid item>
              <Typography variant='h3'>
                {isRTL ? mainProduct?.name_ar : mainProduct?.name_en}
              </Typography>
            </Grid>

            {mainProduct?.on_order && (
              <Grid item>
                <Box
                  sx={{
                    alignItems: 'center',
                    backgroundColor: '#f0fbf3',
                    borderRadius: '22px',
                    color: '#21a144',
                    display: 'flex',
                    justifyContent: 'center',
                    maxWidth: '140px',
                    maxHeight: '35px',
                    p: 1.2,
                  }}
                >
                  <Typography variant='subtitle1'>{t('uponDemand')}</Typography>
                </Box>
              </Grid>
            )}

            {variations?.color.length > 1 && (
              <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
                {variations?.color.map((variant) => (
                  <Box
                    key={variant?.id}
                    sx={{
                      backgroundColor:
                        variant?.id === product?.id
                          ? alpha(Colors.themeColor, 0.8)
                          : alpha(Colors.themeColor, 0.4),
                      borderRadius: '6px',
                      color: Colors.offWhite,
                      display: 'inline-block',
                      textAlign: 'center',
                      width: '50px',
                      height: '25px',
                      cursor: 'pointer',
                      ...(isRTL ? { ml: 0.5 } : { mr: 0.5 }),
                    }}
                    onClick={() => switchVariant(variant?.id)}
                  >
                    {variant?.id === product?.id && (
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        X
                      </Typography>
                    )}
                  </Box>
                ))}
              </Grid>
            )}

            <Grid item>
              <Stack direction='column' sx={{ p: 0, m: 0 }}>
                <Typography variant='h5'>{product?.price}</Typography>
                <Typography variant='subtitle2' color={'#64748b'}>
                  *السعر يشمل ضريبة القيمة المضافة
                </Typography>
              </Stack>
            </Grid>

            <Grid item>
              <Stack
                direction='row'
                gap={1}
                sx={{ p: 0, m: 0, alignItems: 'center' }}
              >
                <Iconify height={24} icon='lucide:package-check' width={24} />
                <Typography variant='subtitle2'>
                  يتم التوصيل في خلال الفترة من 9 يناير الي 14 يناير
                  <br />
                  التوصيل غير شاملة الأجازات والعطلات الرسمية.
                </Typography>
              </Stack>
            </Grid>

            <Grid item>
              <Grid container direction={'row'} spacing={2}>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  md={2}
                  lg={2}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Counter count={count} setCount={setCount} />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <LoadingButton
                    fullWidth
                    loading={isLoading}
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      backgroundColor: Colors.themeColor,
                      height: 44,
                      '&:hover': {
                        backgroundColor: Colors.themeColor,
                        boxShadow: 'none',
                      },
                    }}
                    variant='contained'
                  >
                    {isMobile ? (
                      <Iconify icon='mdi:cart-plus' />
                    ) : (
                      t('addToCart')
                    )}
                  </LoadingButton>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2}>
                  <IconButton
                    onClick={handleLoveClick}
                    sx={{
                      alignItems: 'center',
                      background: '#fff',
                      border: `1px solid ${
                        isLoved ? Colors.error.dark : Colors.themeColor
                      }`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      transition: 'all .5s ease',
                      zIndex: 2,
                      height: 44,
                      width: 44,
                    }}
                  >
                    <Iconify
                      icon={isLoved ? 'solar:heart-bold' : 'solar:heart-linear'}
                      color={isLoved ? Colors.error.dark : Colors.themeColor}
                      width={28}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>

            {user?.is_business && product?.wholesale_prices?.length > 0 && (
              <Grid item sx={{ margin: '1rem 0' }}>
                <WholesalePrices
                  prices={product?.wholesale_prices}
                  setCount={setCount}
                />
              </Grid>
            )}

            <Grid item>
              <Description description={mainProduct?.description} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {filteredProductsWithSameCategory?.length > 0 && (
        <ProductCarousel
          isSameCategory
          category={category}
          items={filteredProductsWithSameCategory}
        />
      )}
    </Container>
  );
}
