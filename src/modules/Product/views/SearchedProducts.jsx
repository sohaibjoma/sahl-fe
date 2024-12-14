import { Container, Grid, Pagination, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useFetchProductsQuery } from '@/redux/apis/product';
import Loader from '@/shared/components/loader/Loader';
import ProductCard from '../../Home/components/ProductCard';
import { t } from 'i18next';
import { useState } from 'react';
import CategoryTree from '../components/CategoryTree';
import { useFetchCategoriesQuery } from '@/redux/apis/category';
import useResponsive from '../../../hooks/useResponsive';

const pageSize = 4;

export default function SearchedProducts() {
  const { search } = useParams();
  const isRTL = localStorage.getItem('language') === 'ar';
  const [filtersList, setFiltersList] = useState([
    { id: 'page', value: 1 },
    { id: 'per_page', value: pageSize },
    { id: 'search', value: search },
  ]);
  const dimentions = {
    isMobile: useResponsive('down', 'md'),
    isTablet: useResponsive('between', 'sm', 'md'),
    isDesktop: useResponsive('between', 'md', 'lg'),
    isLargeDesktop: useResponsive('up', 'lg'),
  };

  const { data: categories } = useFetchCategoriesQuery();
  const { data: products, isFetching } = useFetchProductsQuery({
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
    <Container maxWidth='xl'>
      <Grid container spacing={2}>
        {/* {dimentions.isMobile ? (
          <></>
        ) : (
          <Grid item sm={3} md={2} lg={2}>
            <CategoryTree slug={search} data={categories} />
          </Grid>
        )} */}

        {products?.meta.total >= 1 ? (
          <>
            <Grid item sm={9} md={10}>
              <Grid container spacing={1}>
                {products?.data.map((product, index) => (
                  <Grid item key={index} xs={6} sm={4} md={3}>
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
                dir='ltr'
                count={Math.ceil(products?.meta.total / pageSize)}
                page={products?.meta.current_page}
                onChange={handleChangePage}
                showFirstButton
                showLastButton
              />
            </Grid>
          </>
        ) : (
          <Grid item xs={8} sm={9} md={10} lg={10}>
            <Typography variant='h4' align='center' gutterBottom>
              {t('noProductsFoundInSearch')}
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
