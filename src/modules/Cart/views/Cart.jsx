import { Button, Container, Grid, Link, Typography } from '@mui/material';
import Colors from '../../../theme/colors';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { cartSelector } from '../state';
import Summary from '../components/Summary';
import CartItem from '../components/CartItem';
import { Link as RouterLink } from 'react-router-dom';
import { authSelector } from '../../Auth/state';
import { useEffect } from 'react';
import { useLazyFetchCartItemsQuery } from '@/redux/apis/apiHub';
import { useLazyFetchAddressesQuery } from '@/redux/apis/account';
import { accountSelector } from '../../Account/state';
import Header from '@/shared/components/header/Header';

export default function Cart() {
  const { t } = useTranslation();
  const { token } = useSelector(authSelector);
  const { cartItems } = useSelector(cartSelector);
  const { defaultAddress } = useSelector(accountSelector);

  const [fetchAddresses] = useLazyFetchAddressesQuery();
  const [fetchCartItems] = useLazyFetchCartItemsQuery();

  useEffect(() => {
    if (token) {
      fetchCartItems();
      fetchAddresses();
    }
  }, [token]);

  return (
    <Container maxWidth='lg'>
      {cartItems?.items?.length > 0 && (
        <Header refetch={fetchCartItems} divider={false} sx={{ mb: 2 }}>
          <Typography variant='h4'>{t('myCart')}</Typography>
          <Typography
            variant='subtitle1'
            color={Colors.grey[600]}
            sx={{
              mx: 1,
            }}
          >
            {t('myCartItems').replace('{0}', cartItems.items.length)}
          </Typography>
        </Header>
      )}

      {cartItems?.items?.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={8}>
            {cartItems?.items?.length > 0 &&
              cartItems.items.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Summary cartItems={cartItems} address={defaultAddress} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <img
              loading='lazy'
              src='/assets/images/emptyCart.webp'
              alt='empty-cart'
              width={'350'}
              height={'350'}
              style={{
                margin: 'auto',
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} sx={{ mt: 5 }}>
            <Typography variant='h6' gutterBottom sx={{ textAlign: 'center' }}>
              {t('cartEmpty')}
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
            <Link to='/' component={RouterLink} sx={{ display: 'contents' }}>
              <Button variant='outlined' color='warning' size='medium'>
                {t('continueShopping')}
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
