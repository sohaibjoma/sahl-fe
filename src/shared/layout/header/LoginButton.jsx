import { Box, Button, IconButton } from '@mui/material';
import Colors from '../../../theme/colors';
import { Link } from 'react-router-dom';
import Iconify from '../../components/iconify';

export default function LoginButton({ t, isMobile, HEADER_DESKTOP }) {
  return isMobile ? (
    <Link
      aria-label='login-link'
      style={{ textDecoration: 'none' }}
      to='/auth/login'
    >
      <IconButton aria-label='login-btn' sx={{ padding: 0 }}>
        <Iconify
          width={28}
          height={28}
          icon='material-symbols:login'
          sx={{
            color: Colors.offWhite,
          }}
        />
      </IconButton>
    </Link>
  ) : (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Link to='/auth/login' style={{ textDecoration: 'none' }}>
        <Button
          variant='contained'
          aria-label='login-btn'
          sx={{
            boxShadow: 'none',
            borderColor: Colors.offWhite,
            color: Colors.offWhite,
            textTransform: 'none',
            height: HEADER_DESKTOP,
          }}
        >
          {t('signIn')}
          <Iconify width={26} height={26} icon='material-symbols:login' />
        </Button>
      </Link>
    </Box>
  );
}
