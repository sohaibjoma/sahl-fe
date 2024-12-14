import { toggleSnackbar } from '../../modules/App/state';

export const successHandler = (dispatch, message) => {
  dispatch(
    toggleSnackbar({
      open: true,
      message: message,
      severity: 'success',
    })
  );
};
