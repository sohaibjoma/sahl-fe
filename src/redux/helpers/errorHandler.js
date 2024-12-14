import { Navigate, Route, Routes } from 'react-router-dom';
import { toggleSnackbar } from '../../modules/App/state';

export const errorHandler = (dispatch, error) => {
  let message = 'An error has occurred!';
  if (error?.status === 404) {
    <Routes>
      <Route path='*' element={<Navigate to='/404' />} />
    </Routes>;
  }

  if (error?.status === 401) {
    localStorage.removeItem('token');
  }

  if (error?.data?.message) {
    message = error.data.message;
  } else if (error?.message) {
    message = error.message;
  } else if (error?.error) {
    message = error.error;
  } else {
    message = error;
  }

  return dispatch(
    toggleSnackbar({
      open: true,
      message: message,
      severity: 'error',
    })
  );
};
