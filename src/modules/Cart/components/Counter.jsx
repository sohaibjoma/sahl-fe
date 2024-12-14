import { Button, ButtonGroup } from '@mui/material';
import Iconify from '@/shared/components/iconify/Iconify';
import Colors from '../../../theme/colors';
import { useUpdateItemInCartMutation } from '@/redux/apis/apiHub';

export default function Counter({ id, quantity }) {
  const isRTL = localStorage.getItem('language') === 'ar';
  const [updateQuantity] = useUpdateItemInCartMutation();

  const handleIncrement = () => {
    updateQuantity({ id, quantity: quantity + 1 });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity({ id, quantity: quantity - 1 });
    }
  };

  return (
    <ButtonGroup
      variant='outlined'
      aria-label='outlined button group'
      sx={{
        display: 'flex',
        flexDirection: isRTL ? 'row-reverse' : 'row',
        justifyContent: 'start',
        alignItems: 'center',
        width: '100px',
        '& .MuiButtonGroup-grouped': {
          minWidth: 0,
        },
      }}
    >
      <Button
        onClick={handleDecrement}
        sx={{
          backgroundColor: Colors.transparent,
          borderColor: `${Colors.themeColor} !important`,
          color: `${Colors.themeColor} !important`,
          fontSize: '1.2rem',
          height: 32,
          padding: '5px 8px',
          ':hover': {
            backgroundColor: Colors.themeColor,
            color: `${Colors.offWhite} !important`,
          },
          ...(quantity === 1 && { pointerEvents: 'none', opacity: 0.5 }),
        }}
      >
        <Iconify icon={'gravity-ui:minus'} width={16} />
      </Button>
      <Button
        style={{ pointerEvents: 'none' }}
        sx={{
          backgroundColor: Colors.transparent,
          borderColor: `${Colors.themeColor} !important`,
          color: `${Colors.themeColor} !important`,
          fontSize: '1rem',
          height: 32,
        }}
      >
        {quantity}
      </Button>
      <Button
        onClick={handleIncrement}
        sx={{
          backgroundColor: Colors.transparent,
          borderColor: `${Colors.themeColor} !important`,
          color: `${Colors.themeColor} !important`,
          fontSize: '1.2rem',
          height: 32,
          padding: '5px 8px',
          '&:hover': {
            backgroundColor: Colors.themeColor,
            color: `${Colors.offWhite} !important`,
          },
        }}
      >
        <Iconify icon={'gravity-ui:plus'} width={16} />
      </Button>
    </ButtonGroup>
  );
}
