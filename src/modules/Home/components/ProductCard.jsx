import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from '@mui/material';
import { MediaCard } from '@/shared/components/media-card';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ProductCard({ isRTL, product }) {
  const nameMaxLength = 50;
  const { t } = useTranslation();

  const truncatedName = isRTL
    ? product.name_ar.slice(0, nameMaxLength)
    : product.name_en.slice(0, nameMaxLength);

  const nameDisplay =
    product.name_ar.length > nameMaxLength ||
    product.name_en.length > nameMaxLength
      ? truncatedName + '...'
      : truncatedName;

  return (
    <Link to={`/product/${product?.slug}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          maxWidth: '320px',
          margin: '1rem 0.5rem',
          textAlign: 'center',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <CardMedia
          sx={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <MediaCard
            alt={product.name_en}
            src={product?.images[0].image_path}
          />
        </CardMedia>
        <CardContent
          sx={{
            height: '140px',
            display: 'flex',
            padding: '1rem !important',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Tooltip
            placement='top'
            title={isRTL ? product.name_ar : product.name_en}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '700',
                textAlign: 'start',
              }}
            >
              {nameDisplay}
            </Typography>
          </Tooltip>

          {product?.on_order && (
            <Box
              sx={{
                alignSelf: 'flex-end',
                borderRadius: '22px',
                color: '#21a144',
              }}
            >
              <Typography variant='subtitle1'>{t('uponDemand')}</Typography>
            </Box>
          )}

          <Typography variant='subtitle1' align={!isRTL ? 'right' : 'left'}>
            {product.price}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
