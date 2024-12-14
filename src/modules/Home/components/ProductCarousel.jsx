import { Grid, Stack, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Colors from '../../../theme/colors';
import { useTranslation } from 'react-i18next';
import '../styles/carousel.css';
import ProductCard from './ProductCard';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

export default function ProductCarousel({ isSameCategory, category, items }) {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const responsive = useMemo(
    () => ({
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 5,
        slidesToSlide: 1,
      },
      desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 4,
        slidesToSlide: 1,
      },
      tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2,
        slidesToSlide: 1,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        slidesToSlide: 1,
      },
    }),
    []
  );

  return (
    <Grid container gap={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Stack direction='row' justifyContent='space-between'>
          {isSameCategory ? (
            <Typography variant='h4'>{t('fromSameCategory')}</Typography>
          ) : (
            <Typography variant='h4' color={Colors.brown}>
              {isRTL ? category?.name_ar : category?.name_en}
            </Typography>
          )}
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
          className='gd-carousel'
          rtl={isRTL}
          responsive={responsive}
          removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {items.map((product, index) => (
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
