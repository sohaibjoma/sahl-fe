import { Container, Grid } from '@mui/material';
import { useFetchProductsQuery } from '@/redux/apis/product';

import Carousel from '../components/Carousel';
import CategoriesCards from '../components/CategoriesCards';
import ProductCarousel from '../components/ProductCarousel';
import Loader from '@/shared/components/loader/Loader';
import { useSelector } from 'react-redux';
import { homeSelector } from '../state';

export default function Home() {
  const { categories } = useSelector(homeSelector);
  const { data: products, isFetching: fetchingProducts } =
    useFetchProductsQuery({});

  const isLoading = fetchingProducts;
  const images = [
    { url: '/assets/images/img1.webp', title: 'img1' },
    { url: '/assets/images/img2.webp', title: 'img2' },
    { url: '/assets/images/img3.webp', title: 'img3' },
  ];

  return isLoading ? (
    <Loader />
  ) : (
    <Container maxWidth='lg'>
      <Grid container gap={3}>
        <Grid item xs={12} md={12} lg={12} sx={{ height: '406px' }}>
          <Carousel images={images} />
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <CategoriesCards />
        </Grid>

        <Grid item xs={12} md={12} lg={12} sx={{ height: '406px' }}>
          <Carousel images={images} isAuto={true} />
        </Grid>

        {categories.map((category) => {
          const categoryProducts = products?.data.filter((product) =>
            product.categories.find((c) => c.id === category.id)
          );
          if (categoryProducts?.length > 0) {
            return (
              <Grid item xs={12} md={12} lg={12} key={category.id}>
                <ProductCarousel category={category} items={categoryProducts} />
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </Container>
  );
}
