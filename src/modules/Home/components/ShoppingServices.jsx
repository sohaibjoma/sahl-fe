import { Box, Typography, Grid } from '@mui/material';
import { ChairOutlined, MapOutlined, AccessTime } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export default function PromoBanner() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '16px',
        background: 'linear-gradient(102deg, #A3874F 15.54%, #2F2019 100%)',
      }}
    >
      <Grid container>
        <Grid item xs={12} md={3} lg={4} sx={{ padding: '50px 20px' }}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
              <ChairOutlined
                sx={{ color: '#C4B380', width: '40px', height: '40px' }}
              />
              <Typography
                variant='h4'
                sx={{ color: '#C4B380', fontWeight: 'bold' }}
              >
                {t('chooseProducts')}
              </Typography>
            </Box>
            <Typography variant='body' sx={{ color: '#F7F5EF' }}>
              {t('checkWebsite')}
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
              <MapOutlined
                sx={{ color: '#C4B380', width: '40px', height: '40px' }}
              />
              <Typography
                variant='h4'
                sx={{ color: '#C4B380', fontWeight: 'bold' }}
              >
                {t('selectStore')}
              </Typography>
            </Box>
            <Typography variant='body' sx={{ color: '#F7F5EF' }}>
              {t('enterAddress')}
            </Typography>
          </Box>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
              <AccessTime
                sx={{ color: '#C4B380', width: '40px', height: '40px' }}
              />
              <Typography
                variant='h4'
                sx={{ color: '#C4B380', fontWeight: 'bold' }}
              >
                {t('recieveOrder')}
              </Typography>
            </Box>
            <Typography variant='body' sx={{ color: '#F7F5EF' }}>
              {t('goStore')}
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          lg={8}
          sx={{ display: 'flex', justifyContent: 'left' }}
        >
          <img
            loading='lazy'
            src='assets/images/img-shopping.png'
            alt='Shopping'
            style={{
              maxWidth: '1000px',
              width: '100%',
              height: '100%',
              borderRadius: '16px',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
