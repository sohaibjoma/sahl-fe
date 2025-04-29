import { useTranslation } from 'react-i18next';
import { useFetchOrdersQuery } from '@/redux/apis/apiHub';
import {
  Button,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import Loader from '@/shared/components/loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { MediaCard } from '@/shared/components/media-card';
import Header from '@/shared/components/header/Header';
import { useState } from 'react';

const pageSize = 6;

export default function MyOrders() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [filtersList, setFiltersList] = useState([
    { id: 'page', value: 1 },
    { id: 'per_page', value: pageSize },
  ]);
  const page = filtersList.find((item) => item.id === 'page')?.value;

  const {
    data: orders,
    isFetching,
    refetch,
  } = useFetchOrdersQuery({
    filters: filtersList,
  });

  const handleChangePage = (event, newPage) => {
    const newFilters = [...filtersList];
    const index = newFilters.findIndex((item) => item.id === 'page');

    if (index > -1) {
      newFilters.splice(index, 1);
    }

    newFilters.push({
      id: 'page',
      value: newPage,
    });
    setFiltersList(newFilters);
  };

  return isFetching ? (
    <Loader />
  ) : (
    <Container maxWidth={'xl'} sx={{ mt: 5 }}>
      {orders?.data.length > 0 ? (
        <>
          <Header
            header={'myOrders'}
            refetch={refetch}
            sx={{ marginBottom: '1rem' }}
          />

          {(orders?.data || []).map((order, index) => (
            <div
              key={order.id}
              style={{
                marginBottom: '1rem',
                borderRadius: '8px',
                border: 'solid 1px #e2e2e2',
              }}
            >
              <div
                style={{
                  borderBottom: 'solid 1px #e2e2e2',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa',
                  padding: '15px 20px',
                }}
              >
                <Stack
                  direction='row'
                  gap={1}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                    padding: '0 10px',
                  }}
                >
                  <Typography variant='h5'>{`#${
                    (page - 1) * pageSize + index + 1
                  }`}</Typography>
                  <Typography variant='subtitle2'>
                    {t('paymentStatus')}
                    <br />
                    {t(`${order.status}`)}
                  </Typography>
                  <Typography variant='subtitle2'>
                    {t('address')}
                    <br />
                    {order.address?.name}
                  </Typography>
                  <Typography variant='subtitle2'>
                    {t('productsNum')}
                    <br />
                    {order.products?.length || 0}
                  </Typography>
                  <Typography variant='subtitle2'>
                    {t('orderDate')}
                    <br />
                    {order.created_at}
                  </Typography>
                  <Typography variant='subtitle2'>
                    {t('total')}
                    <br />
                    {order.total}
                  </Typography>
                  <Stack direction='row' gap={1}>
                    <MediaCard
                      withZoom
                      key={order.products[0]?.images[0].id}
                      src={order.products[0]?.images[0].image_path}
                      alt={order.id}
                      sx={{
                        width: '50px',
                        height: '50px',
                        border: 'solid 1px #e2e2e2',
                        borderRadius: '8px',
                      }}
                    />
                  </Stack>
                  <Button
                    variant='contained'
                    sx={{ height: '40px' }}
                    onClick={() => {
                      navigate(`/account/orders/${order.id}`);
                    }}
                  >
                    {t('orderDetails')}
                  </Button>
                </Stack>
              </div>
            </div>
          ))}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '2rem',
            }}
          >
            <Pagination
              dir='ltr'
              count={Math.ceil(orders?.meta.total / pageSize)}
              page={orders?.meta.current_page}
              onChange={handleChangePage}
              showFirstButton
              showLastButton
            />
          </div>
        </>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <img
              loading='lazy'
              src='/assets/images/empty.svg'
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
              {t('noOrdersYet')}
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
            <Link to='/' sx={{ display: 'contents' }}>
              <Button variant='outlined' color='warning' size='medium'>
                {t('startShopping')}
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
