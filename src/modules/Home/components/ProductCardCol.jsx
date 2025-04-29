import {
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
  Button,
  IconButton,
  Grid,
  Box,
} from '@mui/material';
import { MediaCard } from '@/shared/components/media-card';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
// import RatingStars from './RatingStars';
import { Icon } from '@iconify/react';
import secureLocalStorage from 'react-secure-storage';
import { useAddItemToCartMutation } from '@/redux/apis/apiHub';
import { useState } from 'react';
import Colors from '../../../theme/colors';
import Loader from '@/shared/components/loader/Loader';
// import CountdownTimer from './CountDownTimer';

export default function ProductCardCol({ isRTL, product }) {
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

  const handleLoveClick = () => {
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

  const handleAddToCart = () => {
    if (token) {
      addToCart({ products: [{ id: product.id, quantity: 1 }] });
    } else {
      navigate('/auth/login');
    }
  };

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  return isLoading ? (
    <Loader />
  ) : (
    <Link to={`/product/${product?.slug}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: '97%',
          maxWidth: '100%',
          height: '100%',
          margin: '0 auto',
          cursor: 'pointer',
          borderRadius: '28px',
          border: '2px solid #ECE8D5',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -3,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '55px',
                  height: '30px',
                  backgroundColor: Colors.themeColor,
                  color: '#FFFFFF',
                  borderRadius: '0px 20px',
                  padding: '5px 10px 10px 10px',
                  fontSize: '14px',
                  fontWeight: '400',
                  zIndex: 1,
                }}
              >
                جديد
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  // height: '30px',
                  bottom: -3,
                  right: 0,
                  backgroundColor: '#F55157',
                  color: '#FFFFFF',
                  borderRadius: '20px 0px',
                  padding: '5px 10px',
                  fontSize: '14px',
                  fontWeight: '400',
                  textAlign: 'right',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                خصم 20%
              </Box>

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
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <CardContent
              sx={{
                padding: '1rem !important',
                flexDirection: 'column',
              }}
            >
              <Tooltip
                placement='top'
                title={isRTL ? product.name_ar : product.name_en}
              >
                <Typography
                  sx={{
                    color: '#333333',
                    fontSize: '16px',
                    fontWeight: '700',
                    textAlign: 'start',
                  }}
                >
                  {nameDisplay}
                </Typography>
              </Tooltip>

              {/* <RatingStars /> */}

              <Typography variant='subtitle1' align={!isRTL ? 'left' : 'right'}>
                {product.price}
              </Typography>

              {/* <CountdownTimer targetDate={targetDate} /> */}

              <Grid
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart();
                    }}
                  >
                    {t('addToCart')}
                  </Button>
                </Grid>

                <Grid item xs={3} sm={3} md={3} lg={3}>
                  <IconButton
                    sx={{
                      backgroundColor: '#ffff',
                      color: '#EEE',
                      border: '1px solid #EEE',
                      borderRadius: '400px',
                      width: '100%',
                      height: '100%',
                      '&:hover': {
                        backgroundColor: '#7B5E3A',
                        color: '#ffff',
                      },
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLoveClick();
                    }}
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
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
}
