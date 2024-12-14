import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Divider,
  CardContent,
  CardHeader,
  Card,
  CardActions,
} from '@mui/material';
import LoginForm from '../components/LoginForm';
import { useTranslation } from 'react-i18next';
import Colors from '../../../theme/colors';
import Logo from '@/shared/components/logo/Logo';

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: Colors.backgroundColor,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(14, 0),
  },
}));

export default function Login() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <StyledRoot>
        <StyledHeader>
          <Logo />
        </StyledHeader>

        <Container maxWidth='sm'>
          <StyledContent>
            <Card sx={{ backgroundColor: Colors.offWhite }}>
              <CardHeader
                title={
                  <Typography align='center' variant='h4' gutterBottom>
                    {t('thefurnhub')}
                  </Typography>
                }
                subheader={
                  <Typography align='center' variant='h5' gutterBottom>
                    {t('welcomBack')}
                  </Typography>
                }
              />

              <Divider
                sx={{
                  my: 2,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '90%',
                }}
              />

              <CardContent sx={{ pt: 2 }}>
                <LoginForm />
              </CardContent>

              <Divider
                sx={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '90%',
                }}
              />

              <CardActions
                sx={{
                  my: 2,
                  flexDirection: (theme) =>
                    theme.direction === 'rtl' ? 'row' : 'row-reverse',
                  justifyContent: 'center',
                }}
              >
                <Typography variant='body1' color='primary'>
                  <Link
                    to='/auth/register'
                    style={{
                      marginLeft: '0.2rem',
                      marginRight: '0.2rem',
                      color: Colors.teal,
                      textDecoration: 'none',
                    }}
                  >
                    {t('registerNow')}
                  </Link>
                </Typography>
                <Typography variant='body1' color='black'>
                  {t('dontHaveAccount')}
                </Typography>
              </CardActions>
            </Card>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
