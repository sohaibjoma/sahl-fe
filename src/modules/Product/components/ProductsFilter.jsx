import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { homeSelector } from '../../../modules/Home/state';
import {
  Radio,
  FormControlLabel,
  Typography,
  Box,
  Divider,
  IconButton,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import { t } from 'i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const isRTL = localStorage.getItem('language') === 'ar';

const ProductsFilter = ({
  onFilterChange,
  minPrice,
  maxPrice,
  selectedCategory: propSelectedCategory,
  selectedSubcategory: propSelectedSubcategory,
}) => {
  const { categories } = useSelector(homeSelector);
  const [selectedCategory, setSelectedCategory] = useState(
    propSelectedCategory || ''
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    propSelectedSubcategory || null
  );
  const [fromPrice, setFromPrice] = useState(minPrice || '');
  const [toPrice, setToPrice] = useState(maxPrice || '');
  const [expandedCategories, setExpandedCategories] = useState(false);
  const [expandedSubcategories, setExpandedSubcategories] = useState(false);

  useEffect(() => {
    setSelectedCategory(propSelectedCategory || '');
  }, [propSelectedCategory]);

  useEffect(() => {
    setSelectedSubcategory(propSelectedSubcategory || null);
  }, [propSelectedSubcategory]);

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug);
    setSelectedSubcategory(null);
    setFromPrice('');
    setToPrice('');
    onFilterChange(categorySlug, null, ['', '']);
  };

  const handleSubcategoryChange = (subcategorySlug) => {
    setSelectedSubcategory(subcategorySlug);
    setFromPrice('');
    setToPrice('');
    onFilterChange(selectedCategory, subcategorySlug, ['', '']);
  };

  const handleFromPriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setFromPrice(value);
    }
  };

  const handleToPriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setToPrice(value);
    }
  };

  const applyPriceFilter = () => {
    onFilterChange(selectedCategory, selectedSubcategory, [fromPrice, toPrice]);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '282px',
        backgroundColor: '#ffffff',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Categories Section */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}
          >
            {t('category')}
          </Typography>
          <IconButton
            onClick={() => setExpandedCategories(!expandedCategories)}
            size='small'
          >
            {expandedCategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        {/* Regular categories */}
        {categories
          .slice(0, expandedCategories ? undefined : 5)
          .map((category) => (
            <FormControlLabel
              key={category.slug}
              control={
                <Radio
                  style={{ color: '#2F2019' }}
                  checked={selectedCategory === category.slug}
                  onChange={() => handleCategoryChange(category.slug)}
                />
              }
              label={isRTL ? category.name_ar : category.name_en}
            />
          ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Subcategories Section */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant='subtitle1'
            sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}
          >
            {t('categories')}
          </Typography>
          <IconButton
            onClick={() => setExpandedSubcategories(!expandedSubcategories)}
            size='small'
          >
            {expandedSubcategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        {categories
          .flatMap((category) => category.children || [])
          .slice(0, expandedSubcategories ? undefined : 5)
          .map((subcategory) => (
            <FormControlLabel
              sx={{ color: '#333', display: 'flex' }}
              key={subcategory.slug}
              control={
                <Radio
                  style={{ color: '#2F2019' }}
                  checked={selectedSubcategory === subcategory.slug}
                  onChange={() => handleSubcategoryChange(subcategory.slug)}
                />
              }
              label={isRTL ? subcategory.name_ar : subcategory.name_en}
            />
          ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Price Section */}
      <Box>
        <Typography
          variant='subtitle1'
          sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}
        >
          {t('price')}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={t('from')}
              value={fromPrice}
              onChange={handleFromPriceChange}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  borderColor: '#2F2019',
                },
                '& .MuiInputLabel-root': {
                  color: '#2F2019',
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={t('to')}
              value={toPrice}
              onChange={handleToPriceChange}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  borderColor: '#2F2019',
                },
                '& .MuiInputLabel-root': {
                  color: '#2F2019',
                },
              }}
            />
          </Grid>
        </Grid>
        <Button
          variant='contained'
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: '#2F2019',
            '&:hover': { backgroundColor: '#6B4F32' },
          }}
          onClick={applyPriceFilter}
        >
          {t('applyPriceFilter')}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductsFilter;
