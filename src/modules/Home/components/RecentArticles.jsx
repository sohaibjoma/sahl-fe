import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Collapse,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ArticlesSection = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(Array(6).fill(false));
  const isRTL = localStorage.getItem('language') === 'ar';

  const handleExpandClick = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const articles = [
    {
      image: '/assets/images/image-article1.png',
      title_ar: 'مين هم سهل؟',
      title_en: 'Who Are Sahl?',
      description_ar:
        'إحنا "سهل للأثاث"، متخصصين في تقديم كل اللي بيتعلق بالأثاث العصري، سواء مودرن، كلاسيك، أو نيو كلاسيك، عشان يناسب كل الأذواق. هدفنا إننا نسهل عليك اختيار الأثاث اللي يليق بيك، بجودة عالية وبأسعار تناسبك، عشان تختار بسهولة وراحة.',
      description_en:
        'We are Sahl Furniture, specialized in providing everything related to modern furniture, whether modern, classic, or neo-classic, to suit all tastes. Our goal is to make it easy for you to choose the furniture that suits you, with high quality and affordable prices, so that you can choose easily and comfortably.',
    },
    {
      image: '/assets/images/image-article2.png',
      title_ar: 'رؤيتنا:',
      title_en: 'Our Vision',
      description_ar:
        'إننا نكون دايما أول اختيار ليك لما تفكر في أثاث عصري يناسب طموحاتك واحتياجاتك النهاردة وبكرة',
      description_en:
        'To always be your first choice when you think of modern furniture that suits your ambitions and needs today and tomorrow.',
    },
    {
      image: '/assets/images/image-article3.png',
      title_ar: 'رسالتنا:',
      title_en: 'Our Mission',
      description_ar:
        'بنقدم أثاث مميز بجودة عالية وتصاميم مبتكرة، وبأسعار على قد الايد، علشان تلاقي تجربة شراء سهلة ومرضية تعبر عن ذوقك الخاص.',
      description_en:
        'We offer high-quality furniture, innovative designs, and affordable prices, so you can have an easy and satisfying buying experience that reflects your own taste.',
    },
    {
      image: '/assets/images/image-article1.png',
      title_ar: 'قصتنا:',
      title_en: 'Our Story',
      description_ar:
        'إحنا بدأنا "سهل للأثاث" علشان مؤمنين إن كل بيت يستاهل يكون فيه أثاث مميز يعكس شخصية أصحابه. شغالين دايما على تقديم تصاميم فريدة تناسب كل الأذواق والمساحات. من يوم ما بدأنا، وحلمنا إننا نقدم أفضل أثاث عصري بجودة مضمونة وسعر يناسب الكل',
      description_en:
        'We started Sahl Furniture because we believe that every home deserves to have distinctive furniture that reflects the personality of its owners. We always strive to offer unique designs that suit all tastes and spaces. Since the day we started, our dream has been to provide the best modern furniture with guaranteed quality and affordable prices.',
    },
    {
      image: '/assets/images/image-article2.png',
      title_ar: 'بنقدّم إيه؟',
      title_en: 'What Do We Offer?',
      description_ar:
        'غرف نوم مريحة ومتنوعة, ركنات شيك تناسب أي مساحة, انتريهات بتصاميم راقية, ترابيزات سفرة عملية وأنيقة, أثاث يحقق احتياجات بيتك ويدي لمسة جمال, إمكانية اختيار وشراء الأثاث أونلاين, سهولة في التوصيل والتركيب.',
      description_en:
        "Comfortable and diverse bedrooms, Chic corners to fit any space, Sophisticated designs, Practical and elegant dining tables, Furniture that fulfills your home's needs and adds a touch of beauty, Ability to choose and buy furniture online, Easy delivery and installation.",
    },
    {
      image: '/assets/images/image-article3.png',
      title_ar: 'إنجازاتنا:',
      title_en: 'Our Achievements',
      description_ar:
        'قدرنا نبني ثقة كبيرة مع عملائنا، بفضل جودة منتجاتنا والتصاميم اللي بتعجب الكل، ده غير اهتمامنا بخدمة ما بعد البيع. "سهل للأثاث" بقى الاختيار الأول لكتير من الناس، ومستمرين في التطوير علشان نوصل لكل بيت بأفضل شكل.',
      description_en:
        'We were able to build great trust with our customers, thanks to the quality of our products and the designs that everyone likes, not to mention our attention to after-sales service. “Sahl Furniture has become the first choice for many people, and we continue to develop in order to reach every home in the best way.',
    },
  ];

  return (
    <Box sx={{ padding: { xs: '20px', md: '40px' } }}>
      <Typography
        variant='h3'
        sx={{
          fontWeight: 'bold',
          color: '#2F2019',
          mb: 2,
          textAlign: 'center',
        }}
      >
        {t('recentArticles')}
      </Typography>
      <Typography
        variant='h6'
        sx={{ color: '#2F2019', mb: 6, textAlign: 'center' }}
      >
        {t('stayTuned')}
        <br />
        {t('weProvide')}
      </Typography>

      <Grid container spacing={4}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '200px',
                  backgroundImage: `url(${article.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 'bold',
                    color: '#2F2019',
                    mb: 2,
                    textAlign: 'center',
                  }}
                >
                  {isRTL ? article.title_ar : article.title_en}
                </Typography>

                <Collapse in={expanded[index]} collapsedSize={60}>
                  <Typography variant='body2' sx={{ color: '#6C757D' }}>
                    {isRTL ? article.description_ar : article.description_en}
                  </Typography>
                </Collapse>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <IconButton
                    onClick={() => handleExpandClick(index)}
                    sx={{ color: '#2F2019' }}
                  >
                    {expanded[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#2F2019',
            color: '#FFF',
            borderRadius: '100px',
            padding: '12px 32px',
            fontSize: '1rem',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#7B5E3A',
            },
          }}
        >
          {t('viewMore')}
        </Button>
      </Box>
    </Box>
  );
};

export default ArticlesSection;
