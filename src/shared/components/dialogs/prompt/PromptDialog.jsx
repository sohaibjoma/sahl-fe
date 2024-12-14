import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function PromptDialog({
  sx = {},
  children,
  dialogData,
  isLoading,
  onSave,
  onCancel = () => {},
  setDialogData,
  confirmBtnText,
}) {
  const { t } = useTranslation();

  return (
    <Dialog open={dialogData.isOpen} sx={sx}>
      <DialogTitle>{dialogData.title}</DialogTitle>
      <DialogContent>{children}</DialogContent>

      <Divider sx={{ marginLeft: 'auto', marginRight: 'auto', width: '92%' }} />

      <DialogActions>
        <Button
          variant='text'
          color='error'
          onClick={() => {
            onCancel();
            setDialogData({
              ...dialogData,
              isOpen: false,
            });
          }}
          sx={{ mx: 1 }}
        >
          {t('cancel')}
        </Button>
        <LoadingButton
          variant='contained'
          color='primary'
          onClick={onSave}
          loading={isLoading}
        >
          {confirmBtnText ? t(confirmBtnText) : t('save')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
