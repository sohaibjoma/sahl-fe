import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { appSelector } from '../../../modules/App/state';

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const { userPermissions } = useSelector(appSelector);

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data
          .filter(
            (item) =>
              item.isActive &&
              (item.permission === '' ||
                userPermissions?.includes(item.permission))
          )
          .map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { t } = useTranslation();
  const { title, path, icon } = item;
  const isRTL = localStorage.getItem('language') === 'ar';

  return (
    <>
      <StyledNavItem
        component={RouterLink}
        to={path}
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
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
        <ListItemText disableTypography primary={t(title)} />
      </StyledNavItem>
    </>
  );
}
