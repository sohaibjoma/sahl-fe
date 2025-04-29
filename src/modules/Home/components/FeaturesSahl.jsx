import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Container,
} from '@mui/material';
import {
  LocalShipping,
  AttachMoney,
  Payment,
  Discount,
  Weekend,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const WhyChooseUs = () => {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const features = [
    {
      icon: <Weekend fontSize='large' />,
      title_ar: 'تنوع لا مثيل له',
      title_en: 'Unrivaled Versatility',
      description_ar:
        'اكتشف مجموعة واسعة من تصاميم الأثاث التي تناسب كل غرفة في منزلك.',
      description_en:
        'Discover a wide range of furniture designs that complement every room in your home.',
    },
    {
      icon: <Discount fontSize='large' />,
      title_ar: 'عروض وخصومات حصرية',
      title_en: 'Exclusive Offers and Discounts',
      description_ar: 'وفر أكثر مع خصومات حصرية وعروض مميزة كل أسبوع.',
      description_en:
        'Explore more with exclusive offers and unique discounts every week.',
    },
    {
      icon: <Payment fontSize='large' />,
      title_ar: 'مدفوعات آمنة',
      title_en: 'Secure Payments',
      description_ar:
        'استمتع بتجربة تسوق آمنة عبر الإنترنت مع خيارات دفع متعددة ومعتمدة.',
      description_en:
        'Enjoy a safe online shopping experience with multiple approved payment options.',
    },
    {
      icon: <AttachMoney fontSize='large' />,
      title_ar: 'أسعار تناسب الجميع',
      title_en: 'Affordable prices for everyone',
      description_ar:
        'أثاث عالي الجودة بأسعار مناسبة. جدّد منزلك دون إنفاق مبالغ طائلة.',
      description_en:
        'High-quality furniture at affordable prices. Build your home without spending long-term expenses.',
    },
    {
      icon: <LocalShipping fontSize='large' />,
      title_ar: 'الشحن المجاني على منتجات مختارة',
      title_en: 'Free shipping on selected products',
      description_ar:
        'استمتع بالشحن المجاني على آلاف المنتجات. راحتك تبدأ من هنا!',
      description_en:
        'Enjoy free shipping on a wide range of products. Your convenience starts here!',
    },
  ];

  return (
    <Container sx={{ mt: 10 }}>
      <Typography
        variant='h4'
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#2F2019' }}
      >
        {t('whyShopeWithSahl')}
      </Typography>
      <Typography
        variant='h6'
        color='#2F2019'
        sx={{ mb: 6, fontWeight: '500' }}
      >
        {t('sahlFeatures')}
      </Typography>

      <Grid container spacing={1}>
        {features.map((feature, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md
            key={index}
            sx={{
              flex: '1 1 auto',
              minWidth: '200px',
            }}
          >
            <Card
              sx={{
                height: '100%',
                width: '100%',
                backgroundColor: '#2F2019',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: 3,
                borderRadius: '20px',
              }}
            >
              <CardContent>
                <Box sx={{ mb: 3, color: '#ECE8D5' }}>{feature.icon}</Box>

                <Typography
                  variant='h6'
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: '#ECE8D5' }}
                >
                  {isRTL ? feature.title_ar : feature.title_en}
                </Typography>

                <Typography
                  variant='body2'
                  sx={{ lineHeight: '25px' }}
                  color='#ECE8D5'
                >
                  {isRTL ? feature.description_ar : feature.description_en}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WhyChooseUs;
