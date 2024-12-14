import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  styled,
} from '@mui/material';
import Colors from '../../../theme/colors';
import { useTranslation } from 'react-i18next';
import { companyList, linksList } from './data';
import { Link } from 'react-router-dom';

const StyledFooter = styled('div')(({ theme }) => ({
  minHeight: '400px',
  padding: theme.spacing(2),
  backgroundColor: Colors.themeColor,
  color: Colors.offWhite,
  textAlign: 'center',
  marginTop: 'auto',
}));

export default function Footer() {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  return (
    <StyledFooter>
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <List>
              <ListSubheader
                sx={{
                  fontSize: '1.2rem',
                  color: Colors.offWhite,
                  textAlign: isRTL ? 'right' : 'left',
                  backgroundColor: Colors.transparent,
                  fontWeight: 'bold',
                }}
              >
                {t('company')}
              </ListSubheader>
              {companyList.map((item) => (
                <ListItem
                  key={item.key}
                  disableGutters
                  sx={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  <Link
                    to={item.link}
                    style={{
                      textDecoration: 'none',
                      color: Colors.offWhite,
                    }}
                  >
                    <ListItemText primary={t(item.title)} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4}>
            <List>
              <ListSubheader
                sx={{
                  fontSize: '1.2rem',
                  color: Colors.offWhite,
                  textAlign: isRTL ? 'right' : 'left',
                  backgroundColor: Colors.transparent,
                  fontWeight: 'bold',
                }}
              >
                {t('links')}
              </ListSubheader>
              {linksList.map((item) => (
                <ListItem
                  key={item.key}
                  disableGutters
                  sx={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  <Link
                    to={item.link}
                    style={{
                      textDecoration: 'none',
                      color: Colors.offWhite,
                    }}
                  >
                    <ListItemText primary={t(item.title)} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Typography
          variant='body2'
          sx={{
            marginTop: 2,
            marginBottom: 2,
            textAlign: 'center',
            color: Colors.offWhite,
          }}
        >
          {t('copyRight')}
        </Typography>
      </Container>
    </StyledFooter>
  );
}
