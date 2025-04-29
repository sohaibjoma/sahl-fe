import { Box, Typography, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const styles = {
  banner: {
    padding: { xs: '10px 20px', md: '10px 30px' },
    width: '100%',
    borderRadius: '16px',
    background: 'linear-gradient(90deg, #8C6D42 0%, #6A3019 100%)',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  },
  title: {
    color: '#F7F5EF',
    fontWeight: '700',
    marginBottom: '16px',
    fontSize: { xs: '2rem', md: '3rem' },
  },
  subtitle: {
    color: '#F7F5EF',
    fontWeight: '400',
    marginBottom: '24px',
    fontSize: { xs: '1.25rem', md: '1.5rem' },
  },
  button: {
    backgroundColor: '#2F2019',
    color: '#FFFFFF',
    borderRadius: '100px',
    padding: '16px',
    width: { xs: '100%', md: '300px' },
    fontSize: { xs: '1.5rem', md: '2rem' },
    fontWeight: '500',
    '&:hover': {
      backgroundColor: '#7B5E3A',
    },
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
};

export default function BookBanner() {
  const { t } = useTranslation();

  return (
    <Box sx={styles.banner}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} md={6}>
          <Typography variant='h1' sx={styles.title}>
            {t('getBook')}
          </Typography>
          <Typography variant='h4' sx={styles.subtitle}>
            {t('followTheLatestInteriorDesigns')}
          </Typography>
          <Button variant='contained' sx={styles.button}>
            {t('downloadNow')}
          </Button>
        </Grid>

        <Grid item xs={12} md={6} sx={styles.imageContainer}>
          <Box
            component='img'
            src='assets/images/Open-Book.png'
            alt='Book Cover'
            sx={styles.image}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
