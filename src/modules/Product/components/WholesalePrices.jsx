import { Card, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function WholesalePrices({ prices, setCount }) {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant='h6' gutterBottom>
        {t('wholesalePrices')}
      </Typography>

      <Stack
        gap={1}
        direction={'row'}
        sx={{ flexWrap: 'wrap', margin: '0.5rem 0rem' }}
      >
        {prices.map((price) => (
          <Card
            key={price.id}
            sx={{
              p: 1.2,
              width: '142px',
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.15)',
              cursor: 'pointer',
            }}
            onClick={() => setCount(price.min_quantity)}
          >
            <Stack spacing={1}>
              <Typography variant='subtitle2'>
                <span style={{ textDecoration: 'underline' }}>
                  {t('minQuantity') + ':'}
                </span>{' '}
                {price.min_quantity}
              </Typography>

              <Typography variant='subtitle2'>
                <span style={{ textDecoration: 'underline' }}>
                  {t('price') + ':'}
                </span>{' '}
                {price.money.amount / 100} {price.money.currency}
              </Typography>
            </Stack>
          </Card>
        ))}
      </Stack>
    </>
  );
}
