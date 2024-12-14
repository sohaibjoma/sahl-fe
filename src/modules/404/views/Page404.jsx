import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';
import Colors from '../../../theme/colors';

const StyledContent = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
  backgroundColor: Colors.backgroundColor,
}));

export default function Page404() {
  return (
    <>
      <Helmet>
        <title>404 :(</title>
      </Helmet>

      <StyledContent>
        <Typography variant='h3' paragraph>
          {/* TODO translate */}
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we couldn’t find the page you’re looking for.
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Perhaps you’ve mistyped the URL?
          <br />
          Be sure to check your spelling.
        </Typography>

        <Button
          to='/'
          size='large'
          variant='contained'
          component={RouterLink}
          sx={{
            my: 4,
            color: 'white',
          }}
        >
          Go to Home
        </Button>
      </StyledContent>
    </>
  );
}
