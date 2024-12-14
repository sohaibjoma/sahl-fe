import Iconify from '@/shared/components/iconify/Iconify';
import Colors from '../../../theme/colors';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import Counter from './Counter';
import { useTranslation } from 'react-i18next';
import { useDeleteItemFromCartMutation } from '@/redux/apis/apiHub';
import ConfirmationDialog from '@/shared/components/dialogs/confirmation/ConfirmationDialog';
import { useState } from 'react';
import { MediaCard } from '@/shared/components/media-card';
import { Link } from 'react-router-dom';

export default function CartItem({ item }) {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const [confirmationDialogData, setConfirmationDialogData] = useState({
    isOpen: false,
  });

  const [deleteCartItem] = useDeleteItemFromCartMutation();

  const removeItem = (id) => {
    setConfirmationDialogData({
      isOpen: true,
      title: t('cartItemRemove'),
      subTitle: '',
      onConfirm: () => {
        setConfirmationDialogData({ isOpen: false });
        deleteCartItem(id);
      },
      onClose: () => {},
    });
  };

  return (
    <>
      <Card
        key={item.product.id}
        sx={{
          mb: 2,
          '& .MuiCardContent-root:last-child': {
            paddingBottom: 1.5,
          },
        }}
      >
        <CardContent sx={{ p: 1.5 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={2}
              lg={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MediaCard
                withZoom
                alt='cart-item'
                src={item.variant.images[0].image_path}
                sx={{
                  height: '100px',
                  borderRadius: '10px',
                  border: '0.5px solid #e0e0e0',
                  boxShadow: (theme) => theme.customShadows.z12,
                }}
              />
            </Grid>
            <Grid item xs={12} md={10} lg={10}>
              <Link
                to={`/product/${item.product.slug}`}
                style={{
                  textDecoration: 'none',
                  color: Colors.grey[700],
                }}
              >
                <Typography variant='h6' gutterBottom>
                  {isRTL ? item.product.name_ar : item.product.name_en}
                </Typography>
              </Link>
              <Box
                sx={{
                  alignItems: 'center',
                  backgroundColor: item.product.on_order
                    ? '#f0fbf3'
                    : 'transparent',
                  borderRadius: '22px',
                  color: '#21a144',
                  display: 'flex',
                  justifyContent: 'center',
                  maxWidth: '140px',
                  maxHeight: '35px',
                  p: 1,
                }}
              >
                {item.product.on_order && (
                  <Typography variant='subtitle1'>{t('uponDemand')}</Typography>
                )}
              </Box>
              <Stack
                direction='row'
                sx={{
                  mt: 2,
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='h5' color={Colors.grey[700]}>
                  {item.product.price}
                </Typography>

                <Stack direction='row' gap={1}>
                  <Counter id={item.variant.id} quantity={item.quantity} />

                  <Iconify
                    title='delete-item'
                    onClick={() => removeItem(item.variant.id)}
                    width={32}
                    icon='solar:trash-bin-trash-linear'
                    sx={{
                      cursor: 'pointer',
                      border: '1px solid #B72136',
                      borderRadius: '8px',
                      color: Colors.error.dark,
                      padding: 0.5,
                      '&:hover': {
                        color: '#fff',
                        backgroundColor: '#B72136',
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {confirmationDialogData.isOpen && (
        <ConfirmationDialog
          dialogData={confirmationDialogData}
          setDialogData={setConfirmationDialogData}
        />
      )}
    </>
  );
}
