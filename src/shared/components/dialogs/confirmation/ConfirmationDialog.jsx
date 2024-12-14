import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import Iconify from '../../iconify/Iconify';

export default function ConfirmationDialog({ dialogData, setDialogData }) {
  const isRTL = localStorage.getItem('language') === 'ar';

  return (
    <Dialog open={dialogData.isOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Typography
          variant='h6'
          component='div'
          sx={{
            display: 'flex',
            alignItems: 'center',
            pb: 1,
          }}
        >
          <Iconify
            icon={'octicon:info-24'}
            sx={{
              mr: isRTL ? 0 : 1,
              ml: isRTL ? 1 : 0,
            }}
          />
          {dialogData.title}
        </Typography>
        <Typography variant='subtitle2'>{dialogData.subTitle}</Typography>
      </DialogContent>

      <Divider sx={{ marginLeft: 'auto', marginRight: 'auto', width: '92%' }} />

      <DialogActions>
        <Button
          variant='text'
          color='error'
          onClick={() => {
            dialogData.onClose();
            setDialogData({
              ...dialogData,
              isOpen: false,
            });
          }}
          sx={{ mx: 1 }}
        >
          {isRTL ? 'لا' : 'No'}
        </Button>
        <Button variant='text' color='primary' onClick={dialogData.onConfirm}>
          {isRTL ? 'نعم' : 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
