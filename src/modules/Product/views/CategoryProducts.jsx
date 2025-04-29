import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchProductsQuery } from '@/redux/apis/product';
import { useFetchCategoriesQuery } from '@/redux/apis/category';
import ProductsFilter from '../components/ProductsFilter';
import ProductCard from '../../Home/components/ProductCard';
import Loader from '@/shared/components/loader/Loader';
import {
  Typography,
  Grid,
  Box,
  useMediaQuery,
  useTheme,
  Pagination,
  IconButton,
  Drawer,
  Container,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { t } from 'i18next';

const pageSize = 4;

export default function CategoryProducts() {
  const { slug } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isRTL = localStorage.getItem('language') === 'ar';

  const [filtersList, setFiltersList] = useState({
    page: 1,
    per_page: pageSize,
    slug: slug || '',
    subcategory: '',
    min_price: '',
    max_price: '',
  });
  const [selectedCategories, setSelectedCategories] = useState([slug || '']);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    data: categories,
    isFetching: fetchingCategories,
    error: categoriesError,
  } = useFetchCategoriesQuery();
  const {
    data: products,
    isFetching: fetchingProducts,
    error: productsError,
  } = useFetchProductsQuery(filtersList);

  useEffect(() => {
    const newSlug = slug || '';
    setFiltersList((prev) => ({ ...prev, slug: newSlug }));
    setSelectedCategories([newSlug]);
  }, [slug]);

  const handleFilterChange = (category, subcategory, priceRange) => {
    setSelectedCategories([category]);
    setSelectedSubcategories(subcategory ? [subcategory] : []);
    setFiltersList((prevFilters) => ({
      ...prevFilters,
      slug: category,
      subcategory: subcategory || '',
      min_price: priceRange[0],
      max_price: priceRange[1],
    }));
  };

  const handleChangePage = (event, newPage) => {
    setFiltersList((prevFilters) => ({ ...prevFilters, page: newPage }));
  };

  if (fetchingCategories || fetchingProducts) {
    return <Loader />;
  }

  if (categoriesError) {
    return (
      <Typography color='error'>
        {t('errorLoadingCategories')}: {categoriesError.message}
      </Typography>
    );
  }

  const category = Array.isArray(categories)
    ? categories.find((cat) => cat.slug === slug)
    : null;

  const categoryTitle = category
    ? isRTL
      ? category.name_ar || 'غير متوفر'
      : category.name_en || 'Not Available'
    : t('products');

  return (
    <Container maxWidth='lg' dir={isRTL ? 'rtl' : 'ltr'}>
      <Box sx={{ mt: 8, mb: 5 }}>
        <Typography variant='h5' gutterBottom sx={{ mb: 6, color: '#2F2019' }}>
          {categoryTitle}
        </Typography>

        {isMobile && (
          <IconButton onClick={() => setIsFilterOpen(true)} sx={{ mb: 2 }}>
            <FilterListIcon />
            <Typography variant='body1' sx={{ m: 1 }}>
              {t('filter')}
            </Typography>
          </IconButton>
        )}

        <Grid container spacing={3}>
          {isMobile ? (
            <Drawer
              anchor={isRTL ? 'right' : 'left'}
              open={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            >
              <ProductsFilter
                onFilterChange={handleFilterChange}
                minPrice={filtersList.min_price}
                maxPrice={filtersList.max_price}
                selectedCategory={selectedCategories[0]}
                selectedSubcategory={selectedSubcategories[0]}
              />
            </Drawer>
          ) : (
            <Grid key='filter' item xs={12} md={3} lg={3}>
              <ProductsFilter
                onFilterChange={handleFilterChange}
                minPrice={filtersList.min_price}
                maxPrice={filtersList.max_price}
                selectedCategory={selectedCategories[0]}
                selectedSubcategory={selectedSubcategories[0]}
              />
            </Grid>
          )}

          <Grid item xs={12} md={9} lg={9}>
            <Grid
              container
              spacing={2}
              sx={{ justifyContent: 'flex-start' }} // Align items to start
            >
              {productsError ? (
                <Typography color='error'>
                  {t('errorLoadingProducts')}: {productsError.message}
                </Typography>
              ) : products?.data?.length > 0 ? (
                products.data.map((product, index) => (
                  <Grid item key={product.id} xs={12} sm={6} md={6} lg={4}>
                    <ProductCard
                      product={product}
                      isRTL={isRTL}
                      key={`product-card-${index}`}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} sx={{ mt: 5 }}>
                  <Typography
                    variant='body1'
                    sx={{ color: '#555', textAlign: 'center' }}
                  >
                    {t('noProductsFound')}
                  </Typography>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
                  >
                    <img
                      loading='lazy'
                      src='/assets/illustrations/notFound.webp'
                      alt='not-found'
                      width={'550'}
                      height={'550'}
                      style={{ margin: 'auto' }}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>

            {products?.meta?.total > pageSize && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={Math.ceil(products.meta.total / pageSize)}
                  page={filtersList.page}
                  onChange={handleChangePage}
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
