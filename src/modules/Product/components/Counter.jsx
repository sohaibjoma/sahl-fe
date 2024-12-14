import { Button, ButtonGroup } from '@mui/material';
import Iconify from '@/shared/components/iconify/Iconify';
import Colors from '../../../theme/colors';

export default function Counter({ count, setCount }) {
  const isRTL = localStorage.getItem('language') === 'ar';

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
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
        '& .MuiButtonGroup-grouped': {
          minWidth: 28,
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
          height: 44,
          padding: '5px 8px',
          ':hover': {
            backgroundColor: Colors.themeColor,
            color: `${Colors.offWhite} !important`,
          },
          ...(count === 1 && { pointerEvents: 'none', opacity: 0.5 }),
        }}
      >
        <Iconify height={16} icon={'gravity-ui:minus'} width={16} />
      </Button>
      <Button
        style={{ pointerEvents: 'none' }}
        sx={{
          backgroundColor: Colors.transparent,
          borderColor: `${Colors.themeColor} !important`,
          color: `${Colors.themeColor} !important`,
          fontSize: '1rem',
          height: 44,
        }}
      >
        {count}
      </Button>
      <Button
        onClick={handleIncrement}
        sx={{
          backgroundColor: Colors.transparent,
          borderColor: `${Colors.themeColor} !important`,
          color: `${Colors.themeColor} !important`,
          fontSize: '1.2rem',
          height: 44,
          padding: '5px 8px',
          '&:hover': {
            backgroundColor: Colors.themeColor,
            color: `${Colors.offWhite} !important`,
          },
        }}
      >
        <Iconify height={16} icon={'gravity-ui:plus'} width={16} />
      </Button>
    </ButtonGroup>
  );
}
