import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { appSelector, toggleSnackbar } from './state';
import { useTranslation } from 'react-i18next';
import { authSelector } from '../Auth/state';
import { useLazyGetUserQuery } from '@/redux/apis/app';
import Router from '../../routes';
import i18n from '../../i18n';
import Loader from '@/shared/components/loader/Loader';
import { useFetchCategoriesQuery } from '@/redux/apis/category';
import { useLazyFetchCartItemsQuery } from '@/redux/apis/apiHub';
import ScrollToTop from './components/ScrollToTop';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const StyledSnackbarWrapper = styled('div')(({ theme }) => ({
  '& .css-1ytlwq5-MuiAlert-icon': {
    marginLeft: theme.dir === 'rtl' ? '12px' : '0px',
    marginRight: theme.dir === 'rtl' ? '0px' : '12px',
  },
}));

export default function AppRoot() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { token } = useSelector(authSelector);
  const { snackbar } = useSelector(appSelector);
  const isRTL = localStorage.getItem('language') === 'ar';
  const snackbarAnchor = isRTL
    ? { vertical: 'bottom', horizontal: 'left' }
    : { vertical: 'bottom', horizontal: 'right' };

  const [getUser, { isFetching: fetchingUser }] = useLazyGetUserQuery();
  const [fetchCartItems] = useLazyFetchCartItemsQuery();
  useFetchCategoriesQuery();

  useEffect(() => {
    const dir = i18n.dir(i18n.language);
    document.documentElement.dir = dir;

    const lang = localStorage.getItem('language');
    if (!lang) {
      localStorage.setItem('language', i18n.language);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUser();
      fetchCartItems();
    }
  }, [token]);

  useEffect(() => {
    if (snackbar.open) {
      setTimeout(
        () =>
          dispatch(
            toggleSnackbar({
              open: !snackbar.open,
              message: snackbar.message,
              severity: snackbar.severity,
            })
          ),
        3500
      );
    }
  }, [snackbar.open, snackbar.message, snackbar.severity, dispatch]);

  return (
    <>
      <StyledSnackbarWrapper>
        <Snackbar open={snackbar.open} anchorOrigin={snackbarAnchor}>
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {t(snackbar.message)}
          </Alert>
        </Snackbar>
      </StyledSnackbarWrapper>
      <ScrollToTop />
      {fetchingUser ? <Loader /> : <Router />}
    </>
  );
}
