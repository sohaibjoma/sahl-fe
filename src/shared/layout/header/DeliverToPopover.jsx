import { useState } from 'react';
import { Box, MenuItem, Stack, Popover, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../../../modules/App/state';
import Colors from '../../../theme/colors';
import Iconify from '../../components/iconify';

const Countries = [
  {
    value: 'egy',
    label: 'EGYPT',
    icon: '/assets/icons/ic_flag_eg.svg',
  },
  {
    value: 'ksa',
    label: 'K.S.A.',
    icon: '/assets/icons/ic_flag_ksa.svg',
  },
];

export default function DeliverToPopover({ isDesktop }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  const isRTL = localStorage.getItem('language') === 'ar';

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLanguageChange = (val) => {
    dispatch(setLanguage({ language: val }));
    setOpen(null);
  };

  return (
    <>
      <div
        onClick={handleOpen}
        style={{
          padding: 0,
          cursor: 'pointer',
        }}
      >
        <Stack
          direction='row'
          gap={1.5}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            width={24}
            height={24}
            loading='lazy'
            src={Countries[0]?.icon}
            alt={Countries[0]?.label}
          />
          <div>
            <Typography
              variant='body2'
              sx={{
                color: isDesktop ? Colors.white : Colors.grey[700],
                letterSpacing: 0.5,
              }}
            >
              {t('deliverTo')}
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: isDesktop ? Colors.white : Colors.grey[700],
                letterSpacing: 1,
                fontWeight: 600,
              }}
            >
              {t(Countries[0]?.value)}
            </Typography>
          </div>
          <Iconify
            icon='gridicons:dropdown'
            color={isDesktop ? Colors.white : Colors.grey[700]}
            sx={{
              transform: !isDesktop ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </Stack>
      </div>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {Countries.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === 'egy'}
              onClick={() => handleLanguageChange(option.value)}
            >
              <Box
                component='img'
                alt={option.label}
                src={option.icon}
                sx={{
                  width: 28,
                  ml: isRTL ? 2 : 0,
                  mr: isRTL ? 0 : 2,
                }}
              />
              {t(option.label)}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
