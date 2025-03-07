import { Grid, Stack, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Colors from '../../../theme/colors';
import { useTranslation } from 'react-i18next';
import '../styles/carousel.css';
import OfferProductCard from './OfferProductCard';

const products = [
  {
    id: 1,
    name_en: 'Bedroom Furniture Section',
    name_ar: 'قسم أثاث غرف النوم',
    discount: 65,
    images: [{ image_path: 'assets/images/image44.png' }],
  },
  {
    id: 2,
    name_en: 'Children Room Furniture',
    name_ar: 'قسم أثاث غرف الأطفال',
    discount: 55,
    images: [{ image_path: 'assets/images/image55.png' }],
  },
  {
    id: 3,
    name_en: 'Dining Room Furniture',
    name_ar: 'قسم أثاث غرف السفرة',
    discount: 35,
    images: [{ image_path: 'assets/images/image66.png' }],
  },
  {
    id: 4,
    name_en: 'Dressing Room Furniture',
    name_ar: 'أثاث غرف الملابس',
    discount: 45,
    images: [{ image_path: 'assets/images/image77.png' }],
  },
];

export default function CarouselTry() {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const responsive = {
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

  return (
    <Grid container gap={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Stack direction='row' justifyContent='space-between'>
          <Stack>
            <Typography variant='h4' color='#2F2019'>
              {t('specialOffers')}
            </Typography>
            <Typography variant='body2' color='#2F2019'>
              {t('ourSpecial')}
            </Typography>
          </Stack>
          <Typography
            sx={{
              textDecoration: 'none',
              color: Colors.lightBrown,
              cursor: 'pointer',
            }}
          >
            {t('viewMore')}
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={12} md={12} lg={12} sx={{ m: 'auto' }}>
        <Carousel
          rtl={isRTL}
          responsive={responsive}
          // removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {products.map((product, index) => (
            <OfferProductCard
              isRTL={isRTL}
              key={`product-card-${index}`}
              product={product}
              t={t}
            />
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
}
