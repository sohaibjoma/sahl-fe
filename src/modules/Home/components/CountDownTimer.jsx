import { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <Grid container spacing={2} justifyContent='center'>
      <Grid item>
        <Box
          sx={{
            backgroundColor: '#ECE8D5',
            borderRadius: '8px',
            padding: '4px',
            textAlign: 'center',
            minWidth: '50px',
          }}
        >
          <Typography variant='h6' fontWeight='bold'>
            {timeLeft.days || 0}
          </Typography>
          <Typography variant='caption'>Days</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box
          sx={{
            backgroundColor: '#ECE8D5',
            borderRadius: '8px',
            padding: '4px',
            textAlign: 'center',
            minWidth: '50px',
          }}
        >
          <Typography variant='h6' fontWeight='bold'>
            {timeLeft.hours || 0}
          </Typography>
          <Typography variant='caption'>Hours</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box
          sx={{
            backgroundColor: '#ECE8D5',
            borderRadius: '8px',
            padding: '4px',
            textAlign: 'center',
            minWidth: '50px',
          }}
        >
          <Typography variant='h6' fontWeight='bold'>
            {timeLeft.minutes || 0}
          </Typography>
          <Typography variant='caption'>Minutes</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box
          sx={{
            backgroundColor: '#ECE8D5',
            borderRadius: '8px',
            padding: '4px',
            textAlign: 'center',
            minWidth: '50px',
          }}
        >
          <Typography variant='h6' fontWeight='bold'>
            {timeLeft.seconds || 0}
          </Typography>
          <Typography variant='caption'>Seconds</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CountdownTimer;
