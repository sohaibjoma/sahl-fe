import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import { Email, Phone, Favorite, Policy, Contacts } from '@mui/icons-material';
import { t } from 'i18next';
import LanguageSwitch from './LanguageSwitch';
import { useNavigate } from 'react-router-dom';

function HeaderTop() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isRTL = localStorage.getItem('language') === 'ar';
  const navigate = useNavigate();

  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: '#ECE8D5',
        color: '#666',
        fontSize: '13px',
        boxShadow: 'none',
        direction: isRTL ? 'rtl' : 'ltr',
        height: 40,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          minHeight: '40px !important',
        }}
      >
        {/* Left Section - Scrollable on Mobile */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexShrink: 0,
          }}
        >
          <IconButton color='inherit' href=''>
            <Contacts fontSize='small' />
            <Typography variant='body2' sx={{ m: 1 }}>
              {t('contactUs')}
            </Typography>
          </IconButton>

          <Typography variant='body2'>|</Typography>

          <IconButton color='inherit' href=''>
            <Policy fontSize='small' />
            <Typography variant='body2' sx={{ m: 1 }}>
              {t('returnPolicy')}
            </Typography>
          </IconButton>

          <Typography variant='body2'>|</Typography>

          <IconButton
            color='inherit'
            onClick={() => navigate('/account/favorites')}
          >
            <Favorite fontSize='small' />
            <Typography variant='body2' sx={{ m: 1 }}>
              {t('myFavorites')}
            </Typography>
          </IconButton>

          <Typography variant='body2'>|</Typography>

          {/* Language Switch */}
          <LanguageSwitch color='#666' />
        </Box>

        {/* Right Section - Hidden on Mobile */}
        {!isMobile && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexShrink: 0,
            }}
          >
            <IconButton color='inherit' href='mailto:info@sahlfurniture.com'>
              <Email fontSize='small' />
              <Typography variant='body2' sx={{ m: 1 }}>
                info@sahlfurniture.com
              </Typography>
            </IconButton>

            <Typography variant='body2'>|</Typography>

            <IconButton color='inherit' href='tel:+201019443462'>
              <Phone fontSize='small' />
              <Typography variant='body2' sx={{ m: 1 }}>
                {t('phone')}
              </Typography>
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default HeaderTop;
