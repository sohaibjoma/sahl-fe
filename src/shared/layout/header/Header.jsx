import { styled } from '@mui/material/styles';
import { Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { bgBlur } from '@/utils/cssStyles';
import Colors from '@/theme/colors';
import Iconify from '@/shared/components/iconify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchBar from './search-bar/SearchBar';
import LanguageSwitch from './LanguageSwitch';
import LoginButton from './LoginButton';
import CartButton from './CartButton';
import useResponsive from '@/hooks/useResponsive';
import { authSelector } from '@/modules/Auth/state';
import { useSelector } from 'react-redux';
import AccountPopover from './AccountPopover';
import CategoriesBar from './categories-bar/CategoriesBar';

const HEADER_DESKTOP = 64;

const StyledRoot = styled(AppBar)(({ theme }) => {
  return {
    ...bgBlur({ color: Colors.backgroundColor }),
    boxShadow: 'none',
    backgroundColor: Colors.themeColor,
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  };
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  justifyContent: 'space-between',
  minHeight: HEADER_DESKTOP,
  [theme.breakpoints.up('lg')]: {
    margin: 'auto',
    maxWidth: 1288,
    minHeight: HEADER_DESKTOP,
  },
}));

export default function Header({ onOpenNav, isEmailVerified }) {
  const { t } = useTranslation();
  const isMobile = useResponsive('down', 'md');
  const isDesktop = useResponsive('up', 'md');
  const { token } = useSelector(authSelector);

  return (
    <StyledRoot>
      <StyledToolbar sx={{ paddingTop: isEmailVerified ? 0 : 10 }}>
        <Stack
          direction='row'
          gap={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isMobile && (
            <IconButton
              aria-label='open drawer'
              onClick={onOpenNav}
              sx={{
                mr: 1,
                color: Colors.white,
                display: { lg: 'none' },
              }}
            >
              <Iconify icon='eva:menu-2-fill' width={24} height={24} />
            </IconButton>
          )}
          {!isMobile && (
            <Link
              to='/'
              aria-label='home link'
              style={{ textDecoration: 'none' }}
            >
              <IconButton aria-label='home btn'>
                <img
                  loading='lazy'
                  src='/assets/logo/whiteLogoOnly.svg'
                  alt='empty-cart'
                  width={'34'}
                  height={'34'}
                  style={{
                    margin: 'auto',
                  }}
                />
              </IconButton>
            </Link>
          )}

          {isDesktop && (
            <SearchBar
              t={t}
              isMobile={isMobile}
              HEADER_DESKTOP={HEADER_DESKTOP}
            />
          )}
        </Stack>

        <Stack
          direction='row'
          gap={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isMobile && (
            <SearchBar
              t={t}
              isMobile={isMobile}
              HEADER_DESKTOP={HEADER_DESKTOP}
            />
          )}
          {isDesktop && <LanguageSwitch HEADER_DESKTOP={HEADER_DESKTOP} />}
          <CartButton />
          {token ? (
            <AccountPopover />
          ) : (
            <LoginButton
              t={t}
              isMobile={isMobile}
              HEADER_DESKTOP={HEADER_DESKTOP}
            />
          )}
        </Stack>
      </StyledToolbar>

      {!isMobile && <CategoriesBar />}
    </StyledRoot>
  );
}
