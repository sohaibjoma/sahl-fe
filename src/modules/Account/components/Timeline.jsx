import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import {
  Timeline as MuiTimeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from '@mui/lab';
import { fDateTime } from '../../../utils/formatTime';
import { useTranslation } from 'react-i18next';

export default function Timeline({
  title,
  subheader,
  list,
  currentStatus,
  ...other
}) {
  const { t } = useTranslation();

  return (
    <Card {...other}>
      <CardHeader title={t(title)} subheader={subheader} />

      <CardContent
        sx={{
          height: '360px',
          padding: '0.5rem 2rem',
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <MuiTimeline dir='ltr'>
          {list.map((item, index) => (
            <OrderItem
              t={t}
              key={item.id}
              item={item}
              isLast={index === list.length - 1}
              currentStatus={currentStatus}
            />
          ))}
        </MuiTimeline>
      </CardContent>
    </Card>
  );
}

function OrderItem({ t, item, isLast, currentStatus }) {
  const { title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color={currentStatus === title ? 'primary' : 'grey'} />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant='subtitle2'>{t(title)}</Typography>

        {time && (
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            {fDateTime(time)}
          </Typography>
        )}
      </TimelineContent>
    </TimelineItem>
  );
}
