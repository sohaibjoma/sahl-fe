import {
  Container,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  styled,
  IconButton,
  Button,
} from '@mui/material';
import Colors from '../../../theme/colors';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useSelector } from 'react-redux';
import { homeSelector } from '../../../modules/Home/state';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// Custom TikTok Icon Component
const TikTokIcon = ({ color = '#000000' }) => {
  return (
    <svg
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 50 50'
      width='25px'
      height='25px'
    >
      <path d='M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z' />
    </svg>
  );
};

const StyledFooter = styled('div')(({ theme }) => ({
  minHeight: '400px',
  padding: theme.spacing(4),
  backgroundColor: '#2F2019',
  color: '#F7F5EF',
  textAlign: 'center',
  marginTop: 'auto',
  backgroundImage: 'url(/assets/patterns/footer-pattern.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
  fontSize: '1.2rem',
  color: '#8C6D42',
  backgroundColor: 'transparent',
  fontWeight: 'bold',
  paddingLeft: 0,
  marginBottom: theme.spacing(1),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: '#F7F5EF',
  margin: '0rem 1rem',
  paddingLeft: 0,
  paddingRight: 0,
  '&:hover': {
    color: Colors.primary,
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: '#F7F5EF',
  '&:hover': {
    color: Colors.primary,
  },
}));

const BackToTopButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: Colors.primary,
  color: '#F7F5EF',
  borderRadius: '50%',
  minWidth: '50px',
  height: '50px',
  '&:hover': {
    backgroundColor: Colors.secondary,
  },
}));

export default function Footer() {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const { categories } = useSelector(homeSelector);

  const contactInfo = {
    phone: '+20 1019 4434 62',
    email: 'info@sahlfurniture.com',
    address: 'طريق بوسعيد - بعد الدفاع المدني',
  };

  const services = [
    'من نحن',
    'سياسة الخصوصية',
    'الشروط والأحكام',
    'الدعم الفني',
  ];

  const paymentIcons = [
    '/assets/images/pay-visa.png',
    '/assets/images/pay-mastercard.png',
    '/assets/images/pay-paypal.png',
    '/assets/images/pay-vissa.png',
    '/assets/images/pay-googlepay.png',
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StyledFooter>
      <Container maxWidth='xl'>
        <Grid container spacing={4}>
          {/* Logo and About Section */}
          <Grid item xs={12} sm={6} md={3} lg={3.5}>
            <Link
              to='/'
              aria-label='home link'
              style={{ textDecoration: 'none' }}
            >
              <IconButton
                aria-label='home btn'
                className='d-flex'
                align={isRTL ? 'right' : 'left'}
              >
                <img
                  loading='lazy'
                  src='/assets/logo/SahlLogo.png'
                  alt='logo'
                  width={'150'}
                  height={'80'}
                  style={{
                    margin: 'auto',
                    display: 'block',
                    marginBottom: 10,
                  }}
                />
              </IconButton>
            </Link>
            <Typography
              sx={{
                padding: '0 1.5rem',
                textAlign: isRTL ? 'right' : 'left',
                fontSize: '16px',
                lineHeight: '25px',
              }}
              align={isRTL ? 'right' : 'left'}
            >
              {t('aboutFooter')}
            </Typography>
          </Grid>

          {/* Categories Section */}
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <List>
              <StyledListSubheader sx={{ textAlign: isRTL ? 'right' : 'left' }}>
                {t('categories')}
              </StyledListSubheader>
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/product/c/${category.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <StyledListItem
                    disableGutters
                    sx={{ textAlign: isRTL ? 'right' : 'left' }}
                  >
                    &gt;&gt;
                    <ListItemText
                      primary={isRTL ? category.name_ar : category.name_en}
                    />
                  </StyledListItem>
                </Link>
              ))}
            </List>
          </Grid>

          {/* Important Links Section */}
          <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <List>
              <StyledListSubheader sx={{ textAlign: isRTL ? 'right' : 'left' }}>
                {t('importantLinks')}
              </StyledListSubheader>
              {services.map((service, index) => (
                <StyledListItem
                  key={index}
                  disableGutters
                  sx={{ textAlign: isRTL ? 'right' : 'left' }}
                >
                  &gt;&gt;
                  <ListItemText primary={service} />
                </StyledListItem>
              ))}
            </List>
          </Grid>

          {/* Contact Us Section */}
          <Grid item xs={12} sm={6} md={3} lg={2.5}>
            <List>
              <StyledListSubheader sx={{ textAlign: isRTL ? 'right' : 'left' }}>
                {t('contactUs')}
              </StyledListSubheader>
              <StyledListItem
                disableGutters
                sx={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                <PhoneIcon sx={{ marginRight: 1 }} />
                <ListItemText primary={contactInfo.phone} />
              </StyledListItem>
              <StyledListItem
                disableGutters
                sx={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                <EmailIcon sx={{ marginRight: 1 }} />
                <ListItemText
                  primary={
                    <Link
                      href={`mailto:${contactInfo.email}`}
                      style={{ color: '#F7F5EF', textDecoration: 'underline' }}
                    >
                      {contactInfo.email}
                    </Link>
                  }
                />
              </StyledListItem>
              <StyledListItem
                disableGutters
                sx={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                <LocationOnIcon sx={{ marginRight: 1 }} />
                <ListItemText primary={contactInfo.address} />
              </StyledListItem>
            </List>
          </Grid>
        </Grid>

        {/* Social Media Section */}
        <Typography
          variant='body2'
          sx={{
            marginTop: '1rem',
            marginBottom: '3rem',
            textAlign: isRTL ? 'right' : 'left',
            color: Colors.offWhite,
          }}
          component='div'
        >
          {t('followUs')}
          <Box sx={{ display: 'flex', gap: 2, marginTop: 1 }}>
            <SocialIconButton
              aria-label='facebook'
              href='https://www.facebook.com/sahl.furniture/'
              target='_blank'
            >
              <FacebookIcon />
            </SocialIconButton>
            <SocialIconButton
              aria-label='instagram'
              href='https://www.instagram.com/sahl.furniture'
              target='_blank'
            >
              <InstagramIcon />
            </SocialIconButton>
            <SocialIconButton
              aria-label='tiktok'
              href='https://www.tiktok.com/@sahl.furniture'
              target='_blank'
            >
              <TikTokIcon color='#F7F5EF' />
            </SocialIconButton>
            <SocialIconButton
              aria-label='youtube'
              href='https://www.youtube.com/@sahl.furniture'
              target='_blank'
            >
              <YouTubeIcon />
            </SocialIconButton>
            <SocialIconButton
              aria-label='whatsapp'
              href='https://wa.me/201500087700'
              target='_blank'
            >
              <WhatsAppIcon />
            </SocialIconButton>
          </Box>
        </Typography>

        {/* Divider */}
        <hr />

        {/* Copyright and Payment Icons */}
        <Box
          className='d-flex justify-content-between'
          maxWidth='lg'
          padding={2}
        >
          <Typography
            variant='body2'
            sx={{
              marginBottom: 2,
              textAlign: isRTL ? 'right' : 'left',
              color: Colors.offWhite,
            }}
          >
            {t('thefurnhub')}
            <br />
            {t('copyRight')}
          </Typography>
          <Box>
            <Typography
              variant='body2'
              sx={{
                marginBottom: 4,
                textAlign: isRTL ? 'right' : 'left',
                color: Colors.offWhite,
              }}
            >
              {t('safePayment')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {paymentIcons.map((icon, index) => (
                <img
                  loading='lazy'
                  key={index}
                  src={icon}
                  alt={`payment-icon-${index}`}
                  width={40}
                  height={25}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Back-to-Top Button */}
      <BackToTopButton onClick={scrollToTop}>
        <ArrowUpwardIcon />
      </BackToTopButton>
    </StyledFooter>
  );
}
