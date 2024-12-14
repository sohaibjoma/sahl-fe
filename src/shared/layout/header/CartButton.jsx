import { Link } from 'react-router-dom';
import Colors from '../../../theme/colors';
import Iconify from '../../components/iconify';
import { Badge, IconButton } from '@mui/material';
import { cartSelector } from '../../../modules/Cart/state';
import { useSelector } from 'react-redux';

export default function CartButton() {
  const { cartItems } = useSelector(cartSelector);

  return (
    <Link to='/cart' style={{ textDecoration: 'none' }}>
      <IconButton aria-label={`cart-${cartItems.length}`} sx={{ padding: 0 }}>
        <Badge badgeContent={cartItems?.items?.length} color='error'>
          <Iconify
            width={32}
            icon='solar:cart-large-minimalistic-linear'
            sx={{ color: Colors.white }}
          />
        </Badge>
      </IconButton>
    </Link>
  );
}
