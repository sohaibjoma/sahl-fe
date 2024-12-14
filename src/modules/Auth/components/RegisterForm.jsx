import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import Iconify from '@/shared/components/iconify';
import { useRegisterMutation } from '@/redux/apis/auth';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '../../App/state';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);

  const isRTL = localStorage.getItem('language') === 'ar';

  const handleRegister = async (values) => {
    const data = {
      name: `${values.firstname} ${values.surname}`,
      phone_number: values.phoneNumber,
      email: values.email,
      password: values.password,
    };

    try {
      await register(data).unwrap();
      navigate('/');
    } catch (error) {
      dispatch(
        toggleSnackbar({
          open: true,
          message: error?.data?.message || t('registerError'),
          severity: 'error',
        })
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      surname: '',
      phoneNumber: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required(t('required')),
      surname: Yup.string().required(t('required')),
      phoneNumber: Yup.string().required(t('required')),
      email: Yup.string().email(t('invalidEmail')).required(t('required')),
      password: Yup.string()
        .min(6, t('passwordMinLength'))
        .required(t('required')),
      rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], t('passwordsNotMatch'))
        .required(t('required')),
    }),
    onSubmit: handleRegister,
  });

  const getTextFieldProps = (name) => ({
    fullWidth: true,
    name,
    required: true,
    label: t(name),
    value: formik.values[name],
    onChange: formik.handleChange,
    error: formik.touched[name] && Boolean(formik.errors[name]),
    helperText: formik.touched[name] && formik.errors[name],
    sx: {
      ...(isRTL && {
        '& label': {
          left: 'unset',
          right: '1.75rem',
          transformOrigin: 'right',
        },
        '& legend': { textAlign: 'right', fontSize: '0.6rem' },
      }),
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField {...getTextFieldProps('firstname')} />
        <TextField {...getTextFieldProps('surname')} />
        <TextField
          {...getTextFieldProps('phoneNumber')}
          inputMode='numeric'
          type='tel'
        />
        <TextField {...getTextFieldProps('email')} />
        <TextField
          {...getTextFieldProps('password')}
          type={showPassword ? 'text' : 'password'}
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
        />
        <TextField
          {...getTextFieldProps('rePassword')}
          type={showPassword ? 'text' : 'password'}
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
        />
      </Stack>

      <LoadingButton
        loading={isLoading}
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        sx={{ my: 4, color: 'white' }}
        onClick={formik.handleSubmit}
      >
        {t('register')}
      </LoadingButton>
    </form>
  );
}
