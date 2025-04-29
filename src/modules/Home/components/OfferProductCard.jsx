import { Box, Card, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function OfferProductCard({ product, t }) {
  const isRTL = localStorage.getItem('language') === 'ar';
  const { name_en, name_ar, discount, images } = product;

  return (
    <Box>
      <Link style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            width: '80%',
            height: '340px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F7F4EE',
            cursor: 'pointer',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              padding: '16px',
              textAlign: isRTL ? 'right' : 'left',
              zIndex: 1,
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontWeight: '700',
                color: '#2F2019',
              }}
            >
              {isRTL ? name_ar : name_en}
            </Typography>
            <Typography
              variant='h6'
              sx={{
                fontWeight: '700',
                color: '#2F2019',
              }}
            >
              {t('offers')}
            </Typography>
            <Typography
              variant='body2'
              sx={{
                fontWeight: '700',
                color: '#2F2019',
              }}
            >
              {t('upTo')}{' '}
              <span style={{ fontSize: '32px', fontWeight: '700' }}>
                {discount + '%'}
              </span>
            </Typography>
          </Box>

          <CardMedia
            sx={{
              position: 'absolute',
              bottom: '-5rem',
              left: '-6rem',
              maxWidth: '120%',
              maxHeight: '120%',
              width: '350px',
              height: '350px',
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
            }}
          >
            <img
              loading='lazy'
              src={images[0]?.image_path}
              alt={name_ar}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </CardMedia>
        </Card>
      </Link>
    </Box>
  );
}
