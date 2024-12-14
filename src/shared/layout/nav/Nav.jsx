import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItemText } from '@mui/material';
import Scrollbar from '../../components/scrollbar';
import Logo from '../../components/logo/Logo';
import LanguageSwitch from '../header/LanguageSwitch';
import Colors from '../../../theme/colors';
import { homeSelector } from '../../../modules/Home/state';
import { useSelector } from 'react-redux';
import {
  StyledNavItem,
  StyledNavItemIcon,
} from '../../components/nav-section/styles';

const NAV_WIDTH = 280;

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const { categories } = useSelector(homeSelector);
  const isRTL = localStorage.getItem('language') === 'ar';

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Logo sx={{ p: 1 }} />

      <List
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          maxHeight: '150vh',
        }}
      >
        {categories.map((category, index) => {
          return (
            <StyledNavItem
              key={index}
              component={RouterLink}
              to={`/product/c/${category.slug}`}
              sx={{
                '&.active': {
                  color: 'text.primary',
                  bgcolor: 'action.selected',
                  fontWeight: 'fontWeightBold',
                  my: 0.4,
                },
                ...(isRTL && { textAlign: 'right' }),
                ...(isRTL && { pl: 1 }),
                ...(isRTL && { pr: 1 }),
              }}
            >
              <StyledNavItemIcon>
                <span className='material-symbols-rounded'>category</span>
              </StyledNavItemIcon>
              <ListItemText
                primary={isRTL ? category.name_ar : category.name_en}
              />
            </StyledNavItem>
          );
        })}
      </List>

      <div
        style={{
          display: 'flex',
          padding: '8px 16px',
          flexDirection: 'row-reverse',
          borderTop: '.5px solid #e0e0e0',
        }}
      >
        <LanguageSwitch color={Colors.grey[700]} />
      </div>
    </Scrollbar>
  );

  return (
    <Box
      component='nav'
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      <Drawer
        open={openNav}
        anchor={isRTL ? 'right' : 'left'}
        onClose={onCloseNav}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: { width: NAV_WIDTH },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}
