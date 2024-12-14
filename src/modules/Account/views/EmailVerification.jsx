import { Container, Typography, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Iconify from '@/shared/components/iconify';

const EmailVerification = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailIsVerified = queryParams.get('email_is_verified');
  const isEmailVerified = emailIsVerified === '1';

  if (emailIsVerified !== '0' && emailIsVerified !== '1') {
    navigate('/');
  }

  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          py: 5,
        }}
      >
        <Iconify
          icon={isEmailVerified ? 'mdi:email-check' : 'mdi:email-alert'}
          sx={{
            width: 100,
            height: 100,
            color: isEmailVerified ? 'success.main' : 'error.main',
            mb: 4,
          }}
        />
        <Typography variant='h4' gutterBottom>
          {isEmailVerified
            ? t('emailVerificationSuccess')
            : t('emailVerificationFailed')}
        </Typography>
        <Typography variant='body1' sx={{ mb: 4 }}>
          {isEmailVerified
            ? t('emailVerificationSuccessDescription')
            : t('emailVerificationFailedDescription')}
        </Typography>
        <Button
          component={RouterLink}
          to='/'
          variant='contained'
          startIcon={<Iconify icon='mdi:home' />}
        >
          {t('backToHome')}
        </Button>
      </Box>
    </Container>
  );
};

export default EmailVerification;
