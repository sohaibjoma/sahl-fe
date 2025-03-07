import { Container, Grid, Pagination, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useFetchProductsQuery } from '@/redux/apis/product';
import Loader from '@/shared/components/loader/Loader';
import ProductCard from '../../Home/components/ProductCard';
import { useFetchCategoriesQuery } from '@/redux/apis/category';
import { useState } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import { t } from 'i18next';

const pageSize = 4;

export default function CategoryProducts() {
  const { slug } = useParams();
  const isRTL = localStorage.getItem('language') === 'ar';
  const [filtersList, setFiltersList] = useState([
    { id: 'page', value: 1 },
    { id: 'per_page', value: pageSize },
    { id: 'category', value: slug },
  ]);

  const { data: categories, isFetching } = useFetchCategoriesQuery();
  const { data: products, isFetching: fetchingProducts } =
    useFetchProductsQuery({
      slug: slug,
      page: filtersList.find((filter) => filter.id === 'page')?.value || 1,
      per_page:
        filtersList.find((filter) => filter.id === 'per_page')?.value || 4,
    });

  const handleChangePage = (event, newPage) => {
    setFiltersList((prevFiltersList) =>
      prevFiltersList.map((filter) =>
        filter.id === 'page' ? { ...filter, value: newPage } : filter
      )
    );
  };

  if (isFetching || fetchingProducts) {
    return <Loader />;
  }

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        {products?.meta.total >= 1 ? (
          <>
            <Grid item sm={9} md={10} className='mt-4 center m-auto'>
              <Grid container spacing={1}>
                {products?.data.map((product, index) => (
                  <Grid item key={index} xs={12} sm={6} md={6} lg={4}>
                    <ProductCard
                      key={`product-card-${index}`}
                      isRTL={isRTL}
                      product={product}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <br />
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Pagination
                dir={isRTL ? 'rtl' : 'ltr'}
                count={products?.meta.last_page}
                page={products?.meta.current_page}
                onChange={handleChangePage}
                showFirstButton
                showLastButton
              />
            </Grid>
          </>
        ) : (
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 5 }}>
            <Typography variant='h4' align='center' gutterBottom>
              {t('noProductsFound')}
            </Typography>
            <img
              loading='lazy'
              src='/assets/illustrations/notFound.webp'
              alt='not-found'
              width={'550'}
              height={'550'}
              style={{
                margin: 'auto',
              }}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
