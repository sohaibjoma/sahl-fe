import { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Iconify from '@/shared/components/iconify';
import SavingDialog from '@/shared/components/dialogs/prompt/PromptDialog';
import { useLazyFetchAddressesQuery } from '@/redux/apis/account';
import secureLocalStorage from 'react-secure-storage';
import { useCheckoutMutation } from '@/redux/apis/apiHub';

export default function Summary({ cartItems, address }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const isRTL = localStorage.getItem('language') === 'ar';
  const isDefaultAddressFound = Object.keys(address).length > 0;

  const [promoCode, setPromoCode] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [savingDialogData, setSavingDialogData] = useState({
    isOpen: false,
  });

  const [checkout, { isLoading: isPayLoading }] = useCheckoutMutation();

  const handleCheckout = () => {
    checkout({
      address_id: address.id
    });
  };

  const [fetchAddresses, { data: addresses }] = useLazyFetchAddressesQuery();
  const addressesOptions =
    addresses?.map((province) => ({
      id: province.id,
      name: province.name,
    })) || [];

  useEffect(() => {
    if (token) {
      fetchAddresses();
    }
    secureLocalStorage.setItem('ukmhkhgapk', JSON.stringify(address.id));
  }, [token, isDefaultAddressFound]);

  return (
    <Card>
      <CardContent>
        <Grid container gap={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Box
              style={{
                display: 'flex',
              }}
            >
              <TextField
                label={t('promoCode')}
                size='small'
                fullWidth
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '44px',
                    borderRadius: '0',
                    ...(isRTL
                      ? {
                          borderTopRightRadius: '8px',
                          borderBottomRightRadius: '8px',
                        }
                      : {
                          borderTopLeftRadius: '8px',
                          borderBottomLeftRadius: '8px',
                        }),
                  },
                  ...(isRTL && {
                    '& label': {
                      left: 'unset',
                      right: '1.75rem',
                      transformOrigin: 'right',
                    },
                    '& legend': {
                      textAlign: 'right',
                      fontSize: '0.6rem',
                    },
                  }),
                }}
              />
              <Button
                variant='contained'
                onClick={() => {}}
                sx={{
                  boxShadow: 'none',
                  borderRadius: '0px',
                  height: '44px',
                  ...(isRTL
                    ? {
                        borderTopLeftRadius: '8px',
                        borderBottomLeftRadius: '8px',
                      }
                    : {
                        borderTopRightRadius: '8px',
                        borderBottomRightRadius: '8px',
                      }),
                }}
              >
                {t('activate')}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant='h5' gutterBottom>
              {t('orderSummary')}
            </Typography>
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='subtitle1'>{t('subTotal')}</Typography>
              <Typography variant='subtitle1'>
                {cartItems?.meta?.subtotal}
              </Typography>
            </Stack>
          </Grid>

          <Divider
            variant='middle'
            sx={{
              borderStyle: 'dashed',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%',
            }}
          />

          <Grid item xs={12} md={12} lg={12}>
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='subtitle1'>{t('total')}</Typography>
              <Typography variant='subtitle1'>
                {cartItems?.meta?.total}
              </Typography>
            </Stack>
          </Grid>

          <Divider
            sx={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%',
            }}
          />

          <Grid item xs={12} md={12} lg={12}>
            {isDefaultAddressFound ? (
              <>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography
                    variant='h5'
                    gutterBottom
                    sx={{ textDecoration: 'underline' }}
                  >
                    {t('shippingAddress')}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    gutterBottom
                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => {
                      setSavingDialogData({ isOpen: true });
                    }}
                  >
                    {t('change')}
                  </Typography>
                </Stack>

                <Stack direction='column'>
                  <Typography variant='subtitle1' gutterBottom>
                    {address.name}
                  </Typography>
                  <Typography variant='subtitle1' gutterBottom>
                    {address.address_1}
                  </Typography>
                  <Typography variant='subtitle1' gutterBottom>
                    {address.city?.name}
                  </Typography>
                  <Typography variant='subtitle1' gutterBottom>
                    {address.postal_code}
                  </Typography>
                </Stack>
              </>
            ) : (
              <Button
                variant='contained'
                fullWidth
                sx={{
                  mt: 1,
                  height: '40px',
                }}
                onClick={() => {
                  if (addresses.length === 0) {
                    //show popup with button to redirect to addresses
                    navigate('/account/addresses');
                  } else {
                    setSavingDialogData({ isOpen: true });
                  }
                }}
              >
                <Iconify icon='gg:add' />
                {t('addAddress')}
              </Button>
            )}
          </Grid>

          {isDefaultAddressFound && (
            <>
              <Divider
                sx={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '100%',
                }}
              />

              <Grid item xs={12} md={12} lg={12}>
                <Button
                  variant='contained'
                  fullWidth
                  sx={{
                    mt: 1,
                    height: '40px',
                  }}
                  onClick={handleCheckout}
                >
                  {t('checkout')}
                  <Iconify icon='material-symbols:shopping-cart-checkout' />
                </Button>
              </Grid>
            </>
          )}

          <SavingDialog
            confirmBtnText={'save'}
            dialogData={savingDialogData}
            onSave={() => setSavingDialogData({ isOpen: false })}
            setDialogData={setSavingDialogData}
            sx={{
              '& .css-oxbn1n-MuiPaper-root-MuiDialog-paper': {
                maxWidth: '420px',
                borderRadius: '12px',
              },
              '& .MuiDialog-paper': {
                width: '100%',
              },
            }}
          >
            <Autocomplete
              id='addresses'
              options={addressesOptions}
              getOptionLabel={(option) => option.name}
              sx={{ width: '100%' }}
              renderInput={(params) =>
                addresses ? (
                  <TextField {...params} label={t('address')} />
                ) : (
                  <TextField {...params} label={t('loading')} />
                )
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, val) => {
                secureLocalStorage.setItem(
                  'ukmhkhgapk',
                  JSON.stringify(val.id)
                );
                setSelectedAddress(val);
              }}
              value={selectedAddress}
            />
          </SavingDialog>
        </Grid>
      </CardContent>
    </Card>
  );
}
