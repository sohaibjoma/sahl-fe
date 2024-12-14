import { Stack, Typography } from '@mui/material';
import ReactStars from 'react-rating-stars-component';
import Colors from '../../../theme/colors';
import Iconify from '@/shared/components/iconify/Iconify';

export default function RatingStars() {
  return (
    <Stack
      direction='row'
      gap={1}
      sx={{
        alignItems: 'center',
        m: 0,
        p: 0,
      }}
    >
      <ReactStars
        count={5}
        value={3}
        size={24}
        edit={false}
        emptyIcon={<Iconify icon='ph:star' />}
        halfIcon={<Iconify icon='ph:star-half-fill' />}
        fullIcon={<Iconify icon='ph:star-fill' />}
        activeColor='#ffd700'
      />
      <Typography variant='subtitle1' color={Colors.grey[700]}>
        3.4 (3 تقييمات)
      </Typography>
    </Stack>
  );
}
