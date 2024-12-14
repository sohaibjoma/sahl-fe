import useResponsive from '@/hooks/useResponsive';
import { useSendEmailVerificationMutation } from '@/redux/apis/app';
import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Grid, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Iconify from '../iconify';
import { successHandler } from '@/redux/helpers/successHandler';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const EmailVerificationAlert = ({ isEmailVerified }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isRTL = localStorage.getItem('language') === 'ar';
  const isMobile = useResponsive('down', 'sm');
  const [sendEmailVerification, { isLoading, isSuccess }] =
    useSendEmailVerificationMutation();

  useEffect(() => {
    if (isSuccess) {
      successHandler(dispatch, t('verificationEmailSent'));
    }
  }, [isSuccess, t]);

  if (isEmailVerified) return null;

  return (
    <Alert
      dir={isRTL ? 'rtl' : 'ltr'}
      severity='warning'
      sx={{
        top: 0,
        position: 'fixed',
        padding: 0,
        zIndex: theme.zIndex.tooltip,
        boxShadow: theme.shadows[4],
        width: isMobile ? '100vw' : '100%',
        borderRadius: 0,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        '& .MuiAlert-message': {
          width: '100%',
          margin: !isMobile && `${theme.spacing(0.5)} 0`,
          padding: isMobile ? '.5rem 1rem' : '.5rem 2rem',
        },
      }}
      icon={<></>}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <AlertTitle
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Iconify
              width={24}
              height={24}
              icon='solar:shield-warning-bold-duotone'
            />
            {t('verifyYourEmail')}
          </AlertTitle>
          {t('verifyYourEmailDescription')}
        </Grid>

        <Grid item xs={12} sm={6} display='flex' justifyContent='flex-end'>
          <LoadingButton
            size='small'
            loading={isLoading}
            onClick={sendEmailVerification}
            sx={{
              minHeight: '2.5rem',
              minWidth: '10rem',
              '& .MuiLoadingButton-loadingIndicator': {
                color: 'white',
              },
            }}
          >
            {t('resendVerificationEmail')}
          </LoadingButton>
        </Grid>
      </Grid>
    </Alert>
  );
};

export default EmailVerificationAlert;
