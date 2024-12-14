import { alpha } from '@mui/material/styles';
import Colors from './colors';

const paletteOptions = {
  common: { black: '#000', white: '#fff' },
  primary: Colors.primary,
  secondary: Colors.secondary,
  info: Colors.info,
  success: Colors.success,
  warning: Colors.warning,
  error: Colors.error,
  grey: Colors.grey,
  divider: alpha(Colors.grey[500], 0.24),
  typography: Colors.grey[900],
  text: {
    primary: Colors.grey[800],
    secondary: Colors.grey[600],
    disabled: Colors.grey[500],
  },
  background: {
    paper: Colors.backgroundColor,
    default: Colors.grey[100],
    neutral: Colors.grey[200],
  },
  action: {
    active: Colors.grey[600],
    hover: alpha(Colors.grey[500], 0.08),
    selected: alpha(Colors.grey[500], 0.16),
    disabled: alpha(Colors.grey[500], 0.8),
    disabledBackground: alpha(Colors.grey[500], 0.24),
    focus: alpha(Colors.grey[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default function palette() {
  return paletteOptions;
}
