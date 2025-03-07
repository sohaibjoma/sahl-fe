import { Grid, Stack, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useTranslation } from 'react-i18next';
import '../styles/carousel.css';
import ProductCardCol from './ProductCardCol';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useFetchProductsQuery } from '@/redux/apis/product';
import Loader from '@/shared/components/loader';
import { Container } from 'react-bootstrap';

export default function ProductCarouselCol({
  isSameCategory,
  category,
  textColor,
}) {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const { data: items, isFetching: fetchingProducts } = useFetchProductsQuery({
    slug: category.slug,
  });
  const isLoading = fetchingProducts;

  const responsive = useMemo(
    () => ({
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 2,
        slidesToSlide: 2,
      },
      desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 2,
        slidesToSlide: 2,
      },
      tablet: {
        breakpoint: { max: 800, min: 500 },
        items: 2,
        slidesToSlide: 2,
      },
      mobile: {
        breakpoint: { max: 500, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    }),
    []
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Grid container gap={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Stack>
            {isSameCategory ? (
              <Typography variant='h4' sx={{ color: textColor }}>
                {t('fromSameCategory')}
              </Typography>
            ) : (
              <Typography variant='h4' sx={{ color: textColor }}>
                {isRTL ? category?.name_ar : category?.name_en}
              </Typography>
            )}
            <Typography variant='body2' sx={{ color: textColor }}>
              {isRTL ? category?.subtitle_ar : category?.subtitle_en}
            </Typography>
          </Stack>
          <NavLink
            to={`/product/c/${category?.slug}`}
            style={{
              textDecoration: 'none',
              color: textColor,
            }}
          >
            {t('viewMore')}
          </NavLink>
        </Stack>
      </Grid>

      <Container sx={{ mt: 2 }}>
        <Grid item xs={12} md={12} lg={12} sx={{ mt: 3 }}>
          <Carousel
            className='gd-carousel'
            rtl={isRTL}
            responsive={responsive}
            // removeArrowOnDeviceType={['tablet', 'mobile']}
          >
            {items?.data.map((product, index) => (
              <ProductCardCol
                key={`product-card-${index}`}
                isRTL={isRTL}
                product={product}
              />
            ))}
          </Carousel>
        </Grid>
      </Container>
    </Grid>
  );
}
