import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  MenuItem,
  IconButton,
  Popover,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/modules/Auth/state';
import { appSelector } from '@/modules/App/state';
import Iconify from '@/shared/components/iconify';
import Colors from '@/theme/colors';

export default function AccountPopover() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const { currentUser } = useSelector(appSelector);
  const isRTL = localStorage.getItem('language') === 'ar';

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        aria-label='account menu'
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Iconify
          width={32}
          icon='solar:user-circle-outline'
          sx={{ color: Colors.white }}
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant='subtitle2' noWrap>
            {currentUser && currentUser.name}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {currentUser && currentUser.phone_number}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => navigate('/account/addresses')} sx={{ my: 1 }}>
          <Iconify
            width={20}
            height={20}
            icon='entypo:address'
            sx={isRTL ? { ml: 1 } : { mr: 1 }}
          />
          {t('myAddresses')}
        </MenuItem>
        <MenuItem onClick={() => navigate('/account/orders')} sx={{ my: 1 }}>
          <Iconify
            width={20}
            height={20}
            icon='lets-icons:order'
            sx={isRTL ? { ml: 1 } : { mr: 1 }}
          />
          {t('myOrders')}
        </MenuItem>
        <MenuItem onClick={() => navigate('/account/favorites')} sx={{ my: 1 }}>
          <Iconify
            width={20}
            height={20}
            icon='material-symbols:favorite'
            sx={isRTL ? { ml: 1 } : { mr: 1 }}
          />
          {t('myFavorites')}
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ my: 1 }}>
          <Iconify
            width={20}
            height={20}
            icon='material-symbols:logout'
            sx={isRTL ? { ml: 1 } : { mr: 1 }}
          />
          {t('logout')}
        </MenuItem>
      </Popover>
    </>
  );
}
