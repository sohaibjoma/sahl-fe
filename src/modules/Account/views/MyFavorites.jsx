import { Container, Grid } from '@mui/material';
import secureLocalStorage from 'react-secure-storage';
import Header from '@/shared/components/header/Header';
import ProductCard from '../../Home/components/ProductCard';

export default function MyFavorites() {
  const lovedProducts = JSON.parse(secureLocalStorage.getItem('lovedProducts'));

  return (
    <Container maxWidth='lg' sx={{ mt: 5 }}>
      <Header header={'myFavorites'} sx={{ mb: 2, mt: 5 }} />
      <Grid item sm={9} md={10} className='mt-4 center m-auto'>
        {lovedProducts?.length > 0 ? (
          <Grid container spacing={2}>
            {lovedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={6} lg={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <>No favorites yet</>
        )}
      </Grid>
    </Container>
  );
}
