import { alpha } from '@mui/material/styles';
import Colors from '../colors';

export default function Button(theme) {
  const isRtl = theme.dir === 'rtl';

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'rgb(146 89 70 / 85%)',
            borderColor: Colors.offWhite,
          },
          backgroundColor: Colors.mediumBrown,
          borderColor: Colors.offWhite,
          color: Colors.white,
          flexDirection: isRtl ? 'row-reverse' : 'row',
          gap: '8px',
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        },
        outlinedInherit: {
          border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
