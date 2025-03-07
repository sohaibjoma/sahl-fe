import {
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
  Button,
  IconButton,
  Grid,
} from '@mui/material';
import { MediaCard } from '@/shared/components/media-card';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import secureLocalStorage from 'react-secure-storage';
import { useAddItemToCartMutation } from '@/redux/apis/apiHub';
import { useState, useEffect } from 'react';
import Colors from '../../../theme/colors';
import Loader from '@/shared/components/loader/Loader';

export default function ProductCard({ isRTL, product }) {
  const nameMaxLength = 50;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoved, setIsLoved] = useState(false);
  const [addToCart, { isLoading }] = useAddItemToCartMutation();

  const token = localStorage.getItem('token');

  const truncatedName = isRTL
    ? product.name_ar.slice(0, nameMaxLength)
    : product.name_en.slice(0, nameMaxLength);

  const nameDisplay =
    product.name_ar.length > nameMaxLength ||
    product.name_en.length > nameMaxLength
      ? truncatedName + '...'
      : truncatedName;

  useEffect(() => {
    const lovedProducts = JSON.parse(
      secureLocalStorage.getItem('lovedProducts')
    );
    if (lovedProducts) {
      setIsLoved(lovedProducts.some((p) => p.id === product.id));
    }
  }, [product.id]);

  const handleLoveClick = (e) => {
    e.preventDefault();
    if (!token) {
      navigate('/auth/login');
      return;
    }
    setIsLoved(!isLoved);
    const lovedProducts = JSON.parse(
      secureLocalStorage.getItem('lovedProducts')
    );

    if (lovedProducts) {
      if (isLoved) {
        const updatedLovedProducts = lovedProducts.filter(
          (p) => p.id !== product.id
        );
        secureLocalStorage.setItem(
          'lovedProducts',
          JSON.stringify(updatedLovedProducts)
        );
      } else {
        secureLocalStorage.setItem(
          'lovedProducts',
          JSON.stringify([...lovedProducts, product])
        );
      }
    } else {
      secureLocalStorage.setItem('lovedProducts', JSON.stringify([product]));
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (token) {
      addToCart({ products: [{ id: product.id, quantity: 1 }] });
    } else {
      navigate('/auth/login');
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Link to={`/product/${product?.slug}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          maxWidth: '100%',
          margin: '1rem 1rem',
          cursor: 'pointer',
          borderRadius: '25px',
        }}
      >
        <CardMedia
          sx={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MediaCard
            alt={product.name_en}
            src={product?.images[0].image_path}
          />
        </CardMedia>

        <CardContent
          sx={{
            display: 'flex',
            padding: '1rem !important',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Tooltip
            placement='top'
            title={isRTL ? product.name_ar : product.name_en}
          >
            <Typography
              variant='h6'
              sx={{
                color: '#333333',
                textAlign: 'start',
              }}
            >
              {nameDisplay}
            </Typography>
          </Tooltip>

          <Typography variant='subtitle1' align={!isRTL ? 'left' : 'right'}>
            {product.price}
          </Typography>

          <Grid
            direction='row'
            container
            spacing={1}
            sx={{
              marginTop: '8px',
              alignItems: 'center',
            }}
          >
            <Grid item xs={9} sm={9} md={9} lg={9}>
              <Button
                fullWidth
                startIcon={
                  <Icon icon='mdi:cart-outline' width={20} height={20} />
                }
                sx={{
                  backgroundColor: '#2F2019',
                  color: '#FFFFFF',
                  borderRadius: '100px',
                  padding: '16px 16px',
                  '&:hover': {
                    backgroundColor: '#7B5E3A',
                  },
                }}
                onClick={handleAddToCart}
              >
                {t('addToCart')}
              </Button>
            </Grid>

            <Grid item xs={3} sm={3} md={3} lg={3} container>
              <IconButton
                sx={{
                  backgroundColor: '#ffff',
                  color: '#EEE',
                  border: `1px solid ${
                    isLoved ? Colors.error.dark : Colors.themeColor
                  }`,
                  borderRadius: '400px',
                  width: '100%',
                  height: '100%',
                }}
                onClick={handleLoveClick}
              >
                <Icon
                  icon={isLoved ? 'solar:heart-bold' : 'solar:heart-linear'}
                  color={isLoved ? Colors.error.dark : Colors.themeColor}
                  width={30}
                  height={30}
                />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}
