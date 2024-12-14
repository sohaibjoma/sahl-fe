import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import Iconify from '@/shared/components/iconify';
import { useLoginMutation } from '@/redux/apis/auth';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '../../App/state';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';

export default function LoginForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isRTL = localStorage.getItem('language') === 'ar';

  const hendleLogin = async () => {
    if (!email || !password) {
      dispatch(
        toggleSnackbar({
          open: true,
          message: t('missingCredentials'),
          severity: 'error',
        })
      );
      return;
    }

    const data = { email, password };

    try {
      await login(data).unwrap();
      navigate('/');
    } catch (err) {
      dispatch(
        toggleSnackbar({
          open: true,
          message: err?.data?.message,
          severity: 'error',
        })
      );
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          required
          name='email'
          label={t('email')}
          value={email}
          onChange={({ target }) => setPhoneNumber(target.value)}
          sx={{
            ...(isRTL && {
              '& label': {
                left: 'unset',
                right: '1.75rem',
                transformOrigin: 'right',
              },
              '& legend': {
                textAlign: 'right',
                fontSize: '0.6rem',
              },
            }),
          }}
        />

        <TextField
          required
          name='password'
          label={t('password')}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  <Iconify
                    width={24}
                    height={24}
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            ...(isRTL && {
              '& label': {
                left: 'unset',
                right: '1.75rem',
                transformOrigin: 'right',
              },
              '& legend': {
                textAlign: 'right',
                fontSize: '0.6rem',
              },
            }),
          }}
        />

        <Stack direction='row' alignItems='center'>
          <Link
            component='button'
            variant='caption'
            sx={{
              color: 'text.secondary',
              textDecoration: 'none',
            }}
            onClick={() => {
              // Add your forget password logic here
            }}
          >
            {t('forgotPassword')}
          </Link>
        </Stack>
      </Stack>

      <LoadingButton
        loading={isLoading}
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        onClick={hendleLogin}
        sx={{
          my: 4,
          color: 'white',
        }}
      >
        {t('login')}
      </LoadingButton>
    </>
  );
}
