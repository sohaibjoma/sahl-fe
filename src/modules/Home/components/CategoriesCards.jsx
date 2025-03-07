import { Box, Grid, Stack, Typography } from '@mui/material';
import { homeSelector } from '../state';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { API_URL } from '@/redux/helpers/baseQuery';

export default function CategoriesCards() {
  const { categories } = useSelector(homeSelector);
  const isRTL = localStorage.getItem('language') === 'ar';

  return (
    <Grid container gap={1}>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Stack
          gap={1}
          direction='row'
          sx={{
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          {categories.slice(0, 5).map((category) => (
            <NavLink
              key={category.id}
              to={`/product/c/${category.slug}`}
              style={{
                textDecoration: 'none',
              }}
            >
              <Stack
                direction='row'
                alignItems='center'
                gap={2}
                sx={{
                  cursor: 'pointer',
                  padding: '1rem',
                }}
              >
                <Box
                  sx={{
                    width: '75px',
                    height: '75px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    loading='lazy'
                    src={API_URL + '/images' + category.image.image_path}
                    alt={category.alt}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <Typography
                  variant='h6'
                  sx={{
                    color: '#2F2019',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                  }}
                >
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
