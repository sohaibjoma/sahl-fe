import { Box, Grid, Stack, Typography } from '@mui/material';
import Colors from '../../../theme/colors';
import { useTranslation } from 'react-i18next';
import { homeSelector } from '../state';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { API_URL } from '@/redux/helpers/baseQuery';

export default function CategoriesCards() {
  const { t } = useTranslation();
  const { categories } = useSelector(homeSelector);
  const isRTL = localStorage.getItem('language') === 'ar';

  return (
    <Grid container gap={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Typography
          variant='h4'
          component='h4'
          gutterBottom
          color={Colors.brown}
          sx={{
            mt: 2,
          }}
        >
          {t('shopByCategory')}
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        <Stack
          gap={1}
          direction={'row'}
          sx={{
            justifyContent: 'space-around',
          }}
        >
          {categories.slice(0, 9).map((category) => (
            <NavLink
              key={category.id}
              to={`/product/c/${category.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <Stack
                sx={{
                  minHeight: 200,
                  display: 'flex',
                  cursor: 'pointer',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 113,
                    height: 136,
                    marginBottom: 1,
                    backgroundSize: 'cover',
                    backgroundImage: `url('/assets/illustrations/categoryCardBG.svg')`,
                  }}
                >
                  <img
                    loading='lazy'
                    src={'/assets/images/home.webp'}
                    // src={API_URL + '/images' + category.image.image_path}
                    alt={category.alt}
                    style={{
                      height: '100%',
                      objectFit: 'contain',
                      width: '100%',
                      mixBlendMode: 'darken',
                    }}
                  />
                </Box>
                <Typography sx={{ color: Colors.brown }}>
                  {isRTL ? category.name_ar : category.name_en}
                </Typography>
              </Stack>
            </NavLink>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
