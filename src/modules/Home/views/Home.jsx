import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Divider,
} from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useFetchProductsQuery } from '@/redux/apis/product';
import Carousel from '../components/Carousel';
import CategoriesCards from '../components/CategoriesCards';
import ProductCarousel from '../components/ProductCarousel';
import PopularProductCarousel from '../components/PopularProductCarousel';
import OfferProductCarousel from '../components/OfferProductCarousel';
import BookBanner from '../components/BookBanner';
import ProductCarouselCol from '../components/ProductCarouselCol';
import FeaturesSahl from '../components/FeaturesSahl';
import ShoppingServices from '../components/ShoppingServices';
import RecentArticles from '../components/RecentArticles';
import Loader from '@/shared/components/loader/Loader';
import PromoBanner from '../components/PromoBanner';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { isFetching: fetchingProducts } = useFetchProductsQuery({});
  const isLoading = fetchingProducts;
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';
  const navigate = useNavigate();

  const images = [
    { url: '/assets/images/img1.webp', title: 'img1' },
    { url: '/assets/images/img2.webp', title: 'img2' },
    { url: '/assets/images/img3.webp', title: 'img3' },
    { url: '/assets/images/Hero-pic.webp', title: 'img4' },
  ];

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Container maxWidth='xl'>
        <Grid container>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              height: '560px',
              mt: '27px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                borderRadius: '24px',
              }}
            >
              <Carousel isAuto={true} images={images} />
            </Box>

            <Box
              sx={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                textAlign: 'center',
                color: '#fff',
              }}
            >
              <Typography
                variant='h2'
                sx={{
                  color: '#2F2019',
                  fontWeight: '700',
                  marginBottom: '16px',
                  lineHeight: '50px',
                }}
              >
                {t('bestDiscounts')}
              </Typography>
              <Typography
                variant='h4'
                sx={{
                  color: '#2F2019',
                  fontWeight: '400',
                  marginBottom: '24px',
                }}
              >
                {t('uptoDiscounts')}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    padding: '14px 24px',
                    borderRadius: '32px',
                    fontSize: '16px',
                    fontWeight: '400',
                    border: '1px solid #2F2019',
                    backgroundColor: '#2F2019',
                    color: '#F7F5EF',
                    '&:hover': { backgroundColor: '#6B4F32' },
                  }}
                  onClick={() => navigate('/allproducts')}
                >
                  <ArrowBackOutlinedIcon
                    sx={{
                      border: '1px solid #fff',
                      borderRadius: '50%',
                      width: '21px',
                      height: '21px',
                    }}
                  />
                  {t('startShopping')}
                </Button>
                <Button
                  variant='outlined'
                  sx={{
                    border: '1px solid #2F2019',
                    color: '#2F2019',
                    borderRadius: '32px',
                    fontSize: '16px',
                    fontWeight: '400',
                    padding: '14px 24px',
                    backgroundColor: 'transparent',
                    '&:hover': { borderColor: '#6B4F32' },
                  }}
                  onClick={() => navigate('/allproducts')}
                >
                  {t('discover')}
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <CategoriesCards />
            <Divider sx={{ borderBottomWidth: 2, bgcolor: '#ccc' }} />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <PopularProductCarousel isRTL={isRTL} />
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 9 }}>
            <OfferProductCarousel isRTL={isRTL} />
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 9 }}>
            <ProductCarousel
              isSameCategory={false}
              category={{
                slug: 'gmbaa-almntgat',
                name_ar: 'التوصيات والإقتراحات',
                name_en: 'Suggestions and Recommendations',
                subtitle_ar:
                  'منتجات مقترحة بناءً على الفئات التي زارها المستخدمين، قد تعجبك أنت أيضًا',
                subtitle_en:
                  'Suggested products based on categories visited by users, you may also like',
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 5 }}>
            <BookBanner />
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 9 }}>
            <ProductCarouselCol
              isSameCategory={false}
              textColor='#2F2019'
              category={{
                slug: 'athath-ghrf-nom',
                name_ar: 'جديد من سهل',
                name_en: 'New From Sahl',
                subtitle_ar: 'عروض لمدة 72 ساعة على المنتجات الجديدة من سهل',
                subtitle_en: '72-hour offers on new products from Sahl',
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <FeaturesSahl />
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 12 }}>
            <PromoBanner />
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 9 }}>
            <ProductCarousel
              isSameCategory={false}
              category={{
                slug: 'gmbaa-almntgat',
                name_ar: 'منتجات مختارة من غرف السفرة',
                name_en: 'Selected products from Dining Rooms',
                subtitle_ar:
                  'منتجات مقترحة بناءً على الفئات التي زارها المستخدمين، قد تعجبك أنت أيضًا',
                subtitle_en:
                  'Suggested products based on categories visited by users, you may also like',
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              mt: 12,
              backgroundColor: '#2F2019',
              borderRadius: '16px',
              padding: '40px 20px',
            }}
          >
            <ProductCarouselCol
              isSameCategory={false}
              textColor='#F7F5EF'
              category={{
                slug: 'gmbaa-almntgat',
                name_ar: 'الأفضل مبيعًا',
                name_en: 'Best Sellers',
                subtitle_ar:
                  'منتجات مقترحة بناءً على معدلات الطلب المرتفعة من المستخدمين ',
                subtitle_en:
                  'Suggested products based on high demand from users',
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 12 }}>
            <ShoppingServices />
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 9 }}>
            <ProductCarousel
              isSameCategory={false}
              category={{
                slug: 'athath-ghrf-maaysh',
                name_ar: 'منتجات مختارة من الأثاث المكتبي',
                name_en: 'Selected Products for Office Furniture',
                subtitle_ar:
                  'منتجات مقترحة بناءً على الفئات التي زارها المستخدمين، قد تعجبك أنت أيضًا',
                subtitle_en:
                  'Suggested products based on categories visited by users, you may also like',
              }}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{ mt: 9 }}>
            <RecentArticles />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
