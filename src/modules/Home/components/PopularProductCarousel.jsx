import { Grid, Stack, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Colors from '../../../theme/colors';
import '../styles/carousel.css';
import PopularProductCard from './PopularProductCard';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 800, min: 550 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 550, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const products = [
  {
    id: 1,
    name_en: 'Sofa with two hospitality chairs',
    name_ar: 'ترابيزة مع كرسيين للضيافة',
    slug: 'Sofa-with-two-hospitality-chairs',
    price: 2500,
    images: [{ image_path: 'assets/images/image33.png' }],
  },
  {
    id: 2,
    name_en: 'Sofa (living room section)',
    name_ar: 'الكنب (قسم غرف المعيشة)',
    slug: 'sofa',
    price: 4000,
    images: [{ image_path: 'assets/images/image11.png' }],
  },
  {
    id: 3,
    name_en: 'Foté (living room section)',
    name_ar: 'فوتيه (قسم غرف المعيشة)',
    slug: 'fote',
    price: 1400,
    images: [{ image_path: 'assets/images/image22.png' }],
  },
];

export default function PopularProductCarousel({ isRTL }) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} sx={{ p: 1, mt: 2, mb: 2 }}>
      <Grid item xs={12} md={12} lg={12}>
        <Stack direction='row' justifyContent='space-between'>
          <Stack>
            <Typography variant='h4' color='#2F2019'>
              {t('mostPopular')}
            </Typography>
            <Typography variant='body2' color='#2F2019'>
              {t('likedProducts')}
            </Typography>
          </Stack>
          <NavLink
            to='/category/most-popular'
            style={{
              textDecoration: 'none',
              color: Colors.lightBrown,
            }}
          >
            {t('viewMore')}
          </NavLink>
        </Stack>
      </Grid>

      <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
        <Carousel className='gd-carousel' responsive={responsive}>
          {products.map((product, index) => (
            <PopularProductCard
              key={`product-card-${index}`}
              isRTL={isRTL}
              product={product}
              t={t}
            />
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
}
