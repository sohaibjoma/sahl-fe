import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, IconButton, Link } from '@mui/material';
import Colors from '../../../theme/colors';

const Logo = forwardRef(({ sx, ...other }, ref) => {
  return (
    <Link to='/' component={RouterLink} sx={{ display: 'contents' }}>
      <Box
        ref={ref}
        component='div'
        sx={{
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <IconButton
          aria-label='logo'
          sx={{
            m: 1,
            color: Colors.primary,
          }}
        >
          <img
            loading='lazy'
            src='/assets/logo/logo.svg'
            alt='empty-cart'
            width={80}
            height={80}
            style={{
              margin: 'auto',
            }}
          />
        </IconButton>
      </Box>
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

Logo.displayName = 'Logo';
export default Logo;
