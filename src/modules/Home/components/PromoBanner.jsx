import { Box, Typography, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function PromoBanner() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '16px',
        backgroundColor: '#2F2019',
      }}
    >
      <Grid container>
        <Grid item xs={12} md={3} lg={3} sx={{ padding: '20px 30px' }}>
          <Typography
            variant='h2'
            sx={{
              color: '#F7F5EF',
              fontWeight: '700',
              marginBottom: '16px',
            }}
          >
            {t('livingRoomDiscount')}
          </Typography>
          <Typography
            variant='h2'
            sx={{
              color: '#F7F5EF',
              fontweight: '400',
              marginBottom: '24px',
            }}
          >
            {t('onLivingRoom')}
          </Typography>
          <Button
            sx={{
              backgroundColor: '#FFF',
              color: '#2F2019',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '200px',
              fontSize: '32px',
              fontWeight: '500',
              '&:hover': {
                backgroundColor: '#7B5E3A',
              },
            }}
          >
            {t('startShopping')}
          </Button>
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          lg={9}
          sx={{ display: 'flex', justifyContent: 'left' }}
        >
          <img
            loading='lazy'
            src='assets/images/Img-promo.png'
            alt='Book Cover'
            style={{ maxWidth: '100%', height: '100%' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
