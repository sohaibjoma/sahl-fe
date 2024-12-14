import { CardMedia } from '@mui/material';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { API_URL } from '@/redux/helpers/baseQuery';
import useResponsive from '../../../hooks/useResponsive';

export default function MediaCard({ withZoom = false, alt, src, sx = {} }) {
  const defaultSx = {
    objectFit: 'unset',
    mixBlendMode: 'multiply',
    aspectRatio: '1/1',
  };

  const dimentions = {
    isMobile: useResponsive('down', 'md'),
    isTablet: useResponsive('between', 'sm', 'md'),
    isDesktop: useResponsive('between', 'md', 'lg'),
  };

  const width = dimentions.isMobile
    ? '100%'
    : dimentions.isTablet
    ? '50%'
    : dimentions.isDesktop
    ? '40%'
    : '35%';

  const cardMedia = (
    <>
      <CardMedia
        loading='lazy'
        component='img'
        alt={alt}
        width={width}
        height={width}
        src={API_URL + '/images' + src}
        sx={{
          ...sx,
          ...defaultSx,
        }}
      />
    </>
  );

  return withZoom ? <Zoom>{cardMedia}</Zoom> : cardMedia;
}
