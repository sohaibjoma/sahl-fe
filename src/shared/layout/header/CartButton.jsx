import { Link } from 'react-router-dom';
import Colors from '../../../theme/colors';
import Iconify from '../../components/iconify';
import { Badge, IconButton, Box, Typography } from '@mui/material';
import { cartSelector } from '../../../modules/Cart/state';
import { useSelector } from 'react-redux';
import { useFetchOrdersQuery } from '@/redux/apis/apiHub';
import { useTranslation } from 'react-i18next';
import useResponsive from '@/hooks/useResponsive';

export default function CartButton() {
  const { cartItems } = useSelector(cartSelector);
  const { data: orders } = useFetchOrdersQuery();
  const { t } = useTranslation();
  const isDesktop = useResponsive('up', 'md');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Link to='/cart' style={{ textDecoration: 'none' }}>
        <IconButton aria-label={`cart-${cartItems.length}`} sx={{ padding: 0 }}>
          <Badge badgeContent={cartItems?.items?.length} color='error'>
            <Iconify
              width={32}
              icon='solar:cart-large-minimalistic-linear'
              sx={{ color: Colors.black }}
            />
          </Badge>
        </IconButton>
      </Link>
      <Box sx={{ mx: 1 }}>
        {isDesktop && (
          <Typography variant='h9' sx={{ color: '#A5A5A5' }}>
            {t('myCart')}
          </Typography>
        )}
        <Typography variant='h6' color={Colors.grey[600]} sx={{ mt: 0.5 }}>
          {orders?.total}
        </Typography>
      </Box>
    </Box>
  );
}
