import { useEffect } from 'react';
import { Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import {
  useLazyCheckOrderStatusQuery,
  useFetchOrderQuery,
} from '@/redux/apis/apiHub';
import Loader from '@/shared/components/loader/Loader';
import { Header } from '@/shared/components/header';
import MediaCard from '@/shared/components/media-card/MediaCard';
import { useTranslation } from 'react-i18next';
import Timeline from '../components/Timeline';
import '../styles/styles.css';
import Label from '@/shared/components/label';

export default function OrderDetails() {
  const { id } = useParams();
  const { search } = useLocation();
  const {
    id: paymentId,
    status,
    amount,
    message,
  } = new URLSearchParams(search);

  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';
  const { data: order, isFetching, refetch } = useFetchOrderQuery(id);
  const [checkOrderStatus] = useLazyCheckOrderStatusQuery();

  const paperStyle = {
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '20px',
  };

  useEffect(() => {
    window.history.replaceState({}, '');
    if (paymentId) {
      checkOrderStatus(id);
    }
  }, [paymentId, status, amount, message, checkOrderStatus]);

  return isFetching ? (
    <Loader />
  ) : (
    <Container maxWidth='xl' sx={{ mt: 5 }}>
      <Header
        gutterBottom
        refetch={refetch}
        header={'Order Details'}
        sx={{ marginBottom: '1rem' }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} style={paperStyle}>
            <Typography variant='h4' gutterBottom>
              {t('products')}
            </Typography>

            {order.products.map((product, index) => (
              <div key={product.id}>
                <div
                  style={{
                    borderBottom: 'solid 1px #e2e2e2',
                    borderRadius: '8px',
                    backgroundColor: '#fafafa',
                    padding: '15px 20px',
                  }}
                >
                  <div>
                    <Grid
                      container
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'space-evenly',
                      }}
                    >
                      <Grid
                        item
                        xs={1}
                        sx={{ display: 'flex', justifyContent: 'start' }}
                      >
                        <Typography variant='h6'>
                          {/* TODO: fix numbers when in second page */}
                          {isRTL ? `${index + 1}#` : `#${index + 1}`}
                        </Typography>
                      </Grid>

                      <Grid item xs={11}>
                        <Grid container spacing={2}>
                          <Grid item xs={6} sm={3} md={2}>
                            <Typography variant='h6'>
                              {t('product')}
                              <br />
                              <span>
                                <Typography variant='subtitle1'>
                                  {isRTL ? product.name_ar : product.name_en}
                                </Typography>
                              </span>
                            </Typography>
                          </Grid>

                          <Grid item xs={6} sm={3} md={2}>
                            <Typography variant='h6'>
                              {t('price')}
                              <br />
                              <span>
                                <Typography variant='subtitle1'>
                                  {product.price}
                                </Typography>
                              </span>
                            </Typography>
                          </Grid>

                          <Grid item xs={6} sm={3} md={2}>
                            <Typography variant='h6'>
                              {t('stockCount')}
                              <br />
                              <span>
                                <Typography variant='subtitle1'>
                                  {product.stock_count}
                                </Typography>
                              </span>
                            </Typography>
                          </Grid>

                          <Grid item xs={6} sm={3} md={2}>
                            <Typography variant='h6'>
                              {t('inStock')}
                              <br />
                              <span>
                                <Typography variant='subtitle1'>
                                  <Label
                                    color={
                                      (order.user.is_business === false &&
                                        'error') ||
                                      'success'
                                    }
                                  >
                                    {order.user.is_business ? (
                                      <span className='tick-icon'>
                                        &#x2714;
                                      </span>
                                    ) : (
                                      <span className='cross-icon'>
                                        &#x2718;
                                      </span>
                                    )}
                                  </Label>
                                </Typography>
                              </span>
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={12} md={4}>
                            <Stack
                              gap={2}
                              direction={'row'}
                              sx={{ justifyContent: 'center' }}
                            >
                              {product.images.map((image) => (
                                <MediaCard
                                  withZoom
                                  key={image.id}
                                  alt={image.id}
                                  src={image.image_path}
                                  sx={{
                                    width: '50px',
                                    height: '50px',
                                  }}
                                />
                              ))}
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Grid container spacing={3} direction={'column'}>
            <Grid item xs={12} sm={4}>
              <Timeline
                title={t('orderStatus')}
                list={[...Array(5)].map((_, index) => ({
                  id: index + 1,
                  title: [
                    'pending',
                    'processing',
                    'on_delivery',
                    'completed',
                    'payment_failed',
                  ][index],
                }))}
                currentStatus={order.status}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Paper elevation={3} style={{ ...paperStyle, flexGrow: 1 }}>
                  <table className='invisible-table'>
                    <tbody>
                      <tr>
                        <th colSpan='2'>
                          <Typography variant='h4' gutterBottom>
                            {t('address')}: <span>{order.address.name}</span>
                          </Typography>
                        </th>
                      </tr>
                      <tr>
                        <td>{t('address1')}</td>
                        <td>{order.address.address_1}</td>
                      </tr>
                      <tr>
                        <td>{t('postalCode')}</td>
                        <td>{order.address.postal_code}</td>
                      </tr>
                      <tr>
                        <td>{t('city')}</td>
                        <td>
                          {isRTL
                            ? order.address.city.name_ar
                            : order.address.city.name_en}
                        </td>
                      </tr>
                      <tr>
                        <td>{t('province')}:</td>
                        <td>
                          {isRTL
                            ? order.address.province.name_ar
                            : order.address.province.name_en}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Paper>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
