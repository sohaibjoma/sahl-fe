import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Description({ description }) {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} sx={{ p: 1 }}>
      <Grid item xs={12} md={12} lg={12}>
        <Typography variant='h4'>{t('description')}</Typography>
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          style={{
            padding: 2,
          }}
        />
      </Grid>
    </Grid>
  );
}
