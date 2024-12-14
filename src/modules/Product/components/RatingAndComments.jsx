import { Grid, Paper, Stack, Typography } from '@mui/material';
import { reviews } from '../../../assets/products';
import Iconify from '@/shared/components/iconify';
import { useTranslation } from 'react-i18next';

export default function RatingAndComments() {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant='h4' gutterBottom>
        {t('reviews')}
      </Typography>
      <Grid container direction={'row'} spacing={2}>
        <Grid item xs={12} md={5} lg={5}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 2,
              backgroundColor: '#f9f9f9',
            }}
          >
            <Stack
              direction='row'
              gap={1}
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography
                variant='h2'
                sx={{
                  textAlign: 'right',
                }}
              >
                3.4
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  color: '#64748b',
                  alignSelf: 'flex-end',
                }}
              >
                بناءً علي (3) تقييم
              </Typography>
            </Stack>

            <Stack
              direction='column'
              gap={1}
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
                width: '100%',
              }}
            >
              <Stack
                direction='row'
                gap={2}
                sx={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <label htmlFor='file'>1</label>
                <progress
                  id='file'
                  value='26'
                  max='100'
                  style={{ minWidth: 300 }}
                />
                <label htmlFor='file'>5</label>
              </Stack>
              <Stack
                direction='row'
                gap={2}
                sx={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <label htmlFor='file'>9</label>
                <progress
                  id='file'
                  value='87'
                  max='100'
                  style={{ minWidth: 300 }}
                />
                <label htmlFor='file'>4</label>
              </Stack>
              <Stack
                direction='row'
                gap={2}
                sx={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <label htmlFor='file'>4</label>
                <progress
                  id='file'
                  value='56'
                  max='100'
                  style={{ minWidth: 300 }}
                />
                <label htmlFor='file'>3</label>
              </Stack>
              <Stack
                direction='row'
                gap={2}
                sx={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <label htmlFor='file'>4</label>
                <progress
                  id='file'
                  value='33'
                  max='100'
                  style={{ minWidth: 300 }}
                />
                <label htmlFor='file'>2</label>
              </Stack>
              <Stack
                direction='row'
                gap={2}
                sx={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <label htmlFor='file'>3</label>
                <progress
                  id='file'
                  value='32'
                  max='100'
                  style={{ minWidth: 300 }}
                />
                <label htmlFor='file'>1</label>
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7} lg={7}>
          <Stack direction='column' gap={1}>
            {reviews.map((review) => (
              <Paper
                key={review.key}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 2,
                  height: 96,
                  backgroundColor: '#f9f9f9',
                }}
              >
                <Iconify
                  icon='mdi:account-circle'
                  color={'#233a7d'}
                  width={24}
                  height={24}
                />
                <Typography variant='subtitle1'>
                  {review.name} - {review.rating}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
