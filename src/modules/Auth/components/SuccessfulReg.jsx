import { Button, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

export default function SuccessfulReg() {
  const { t } = useTranslation();

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <img
            loading='lazy'
            src='/assets/illustrations/successfulRegistiration.svg'
            alt='successful registiration'
            width={'500'}
            height={'500'}
            style={{
              margin: 'auto',
            }}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12} sx={{ mt: 5 }}>
          <Typography variant='h6' gutterBottom sx={{ textAlign: 'center' }}>
            {t('successfulRegistiration')}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link
            to='/auth/login'
            component={RouterLink}
            sx={{ display: 'contents' }}
          >
            <Button variant='outlined' color='success' size='medium'>
              {t('login')}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
