import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider, // Import Divider from Material-UI
  Stack,
  Typography,
} from '@mui/material';
import Iconify from '../../iconify/Iconify';

export default function WarningDialog({ dialogData, setDialogData }) {
  return (
    <Dialog open={dialogData.isOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Typography
            variant='h6'
            component='div'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Iconify icon={'ri:alert-fill'} sx={{ mr: 1 }} />
            {dialogData.title}
          </Typography>
          <Typography variant='subtitle2'>{dialogData.subTitle}</Typography>
        </Stack>
      </DialogContent>

      <Divider sx={{ marginLeft: 'auto', marginRight: 'auto', width: '92%' }} />

      <DialogActions>
        <Button
          color='error'
          variant='contained'
          sx={{
            mr: '0.5rem',
          }}
          onClick={() =>
            setDialogData({
              ...dialogData,
              isOpen: false,
            })
          }
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
