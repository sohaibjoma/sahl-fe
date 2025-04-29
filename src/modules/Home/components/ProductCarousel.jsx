import { Grid, Stack, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Colors from '../../../theme/colors';
import { useTranslation } from 'react-i18next';
import '../styles/carousel.css';
import ProductCard from './ProductCard';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useFetchProductsQuery } from '@/redux/apis/product';
import Loader from '@/shared/components/loader';

export default function ProductCarousel({ isSameCategory, category }) {
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
        items: 4,
        slidesToSlide: 1,
      },
      desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 3,
        slidesToSlide: 1,
      },
      tablet: {
        breakpoint: { max: 800, min: 500 },
        items: 2,
        slidesToSlide: 1,
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
        <Stack direction='row' justifyContent='space-between'>
          <Stack>
            {isSameCategory ? (
              <Typography variant='h4'>{t('fromSameCategory')}</Typography>
            ) : (
              <Typography variant='h4' color='#2F2019'>
                {isRTL ? category?.name_ar : category?.name_en}
              </Typography>
            )}
            <Typography variant='body2' color='#2F2019'>
              {isRTL ? category?.subtitle_ar : category?.subtitle_en}
            </Typography>
          </Stack>
          <NavLink
            to={`/product/c/${category?.slug}`}
            style={{
              textDecoration: 'none',
              color: Colors.lightBrown,
            }}
          >
            {t('viewMore')}
          </NavLink>
        </Stack>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Carousel
          className='m-auto'
          rtl={isRTL}
          responsive={responsive}
          // removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {items?.data.map((product, index) => (
            <ProductCard
              key={`product-card-${index}`}
              isRTL={isRTL}
              product={product}
            />
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
}
