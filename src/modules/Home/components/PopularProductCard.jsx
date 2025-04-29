import { Box, Card, CardMedia, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PopularProductCard({ isRTL, product, t }) {
  return (
    <Box sx={{ textAlign: isRTL ? 'right' : 'left' }}>
      <Link style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            width: '90%',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F7F4EE',
            cursor: 'pointer',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '20px',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '16px',
              [isRTL ? 'left' : 'right']: '16px',
              borderRadius: '100px',
              fontWeight: '500',
              color: '#2F2019',
              backgroundColor: '#F7F4EE',
              border: '1px solid #2F2019',
              padding: '4px 8px',
              textAlign: isRTL ? 'right' : 'left',
            }}
          >
            <Typography
              variant='body1'
              sx={{
                color: '#2F2019',
                borderRadius: '100px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                top: '24px',
              }}
            >
              <span style={{ fontWeight: '500', fontSize: '32px' }}>
                {'ج.م ' + product.price}
              </span>
              {t('startsFrom')}
            </Typography>
          </Box>

          <CardMedia
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
              padding: '30px',
              borderRadius: '25px',
              maxWidth: '100%',
              maxHeight: '300px',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          >
            <img
              loading='lazy'
              src={product?.images[0]?.image_path}
              alt={isRTL ? product.name_ar : product.name_en}
              style={{
                width: '130%',
                height: '130%',
                objectFit: 'contain',
                borderRadius: '20px',
              }}
            />
          </CardMedia>
        </Card>

        <Tooltip title={t('offerDetails')} arrow>
          <Box>
            <Typography
              variant='h5'
              sx={{
                fontWeight: '500',
                marginTop: '1rem',
                color: '#2F2019',
                maxWidth: '90%',
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {isRTL ? product.name_ar : product.name_en}
            </Typography>
          </Box>
        </Tooltip>

        <Typography
          variant='body2'
          sx={{
            color: '#6B6B6B',
            marginTop: '8px',
            maxWidth: '90%',
            textAlign: isRTL ? 'right' : 'left',
          }}
        >
          {t('offerDetails')}
        </Typography>
      </Link>
    </Box>
  );
}
