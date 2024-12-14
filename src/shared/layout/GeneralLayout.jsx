import { styled } from '@mui/material/styles';
import Header from './header/Header';
import Colors from '../../theme/colors';
import { useState } from 'react';
import Nav from './nav/Nav';
import Footer from './footer/Footer';
import useResponsive from '@/hooks/useResponsive';
import EmailVerificationAlert from '@/shared/components/email-verification-alert';
import { appSelector } from '@/modules/App/state';
import { useSelector } from 'react-redux';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 110;

const StyledRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  paddingTop: APP_BAR_DESKTOP + 24,
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    paddingTop: APP_BAR_MOBILE + 24,
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: '95vh',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  backgroundColor: Colors.backgroundColor,
}));

export default function GeneralLayout({ children }) {
  const { currentUser } = useSelector(appSelector);
  const [open, setOpen] = useState(false);
  const isMobile = useResponsive('down', 'md');
  const isEmailVerified =
    Object.keys(currentUser).length > 0 ? currentUser.email_verified : true;

  return (
    <StyledRoot>
      <EmailVerificationAlert isEmailVerified={isEmailVerified} />

      <Header
        onOpenNav={() => setOpen(true)}
        isEmailVerified={isEmailVerified}
      />

      {isMobile && <Nav openNav={open} onCloseNav={() => setOpen(false)} />}

      <Main
        sx={{
          paddingTop: isEmailVerified ? 18 : 28,
        }}
      >
        {children}
      </Main>

      <Footer />
    </StyledRoot>
  );
}
