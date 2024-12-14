import { Container, Grid } from '@mui/material';
import secureLocalStorage from 'react-secure-storage';
import Header from '@/shared/components/header/Header';
import ProductCard from '../../Home/components/ProductCard';

export default function MyFavorites() {
  const lovedProducts = JSON.parse(secureLocalStorage.getItem('lovedProducts'));

  return (
    <Container maxWidth='lg'>
      <Header header={'myFavorites'} sx={{ mb: 2 }} />

      {lovedProducts?.length > 0 ? (
        <Grid container spacing={2}>
          {lovedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      ) : (
        <>No favorites yet</>
      )}
    </Container>
  );
}
