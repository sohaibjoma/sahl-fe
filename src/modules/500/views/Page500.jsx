import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, Typography, Box } from '@mui/material';

const StyledContent = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
  backgroundColor: theme.palette.background.default,
}));

export default function Page500() {
  return (
    <>
      <Helmet>
        <title>500 :(</title>
      </Helmet>

      <StyledContent>
        <Typography variant='h3' paragraph>
          Oops!
        </Typography>

        <Typography variant='h6' sx={{ color: 'text.secondary' }}>
          We have some issues, I mean.. who doesn’t?
        </Typography>

        <Typography variant='h6' sx={{ color: 'text.secondary' }}>
          Please contact us, and we will fix it ASAP...
        </Typography>

        <Box
          component='img'
          src='/assets/illustrations/500.svg'
          sx={{ height: 300, mx: 'auto', my: { xs: 5, sm: 10 } }}
        />

        <Button to='/' size='large' variant='contained' component={RouterLink}>
          Go to Home
        </Button>
      </StyledContent>
    </>
  );
}
