export const requestInterceptor =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.payload?.status === 500) {
      // window.location.href = '/500';
    } else if (
      action.payload?.status === 401 &&
      localStorage.getItem('token')
    ) {
      localStorage.removeItem('token');

      setTimeout(() => {
        if (typeof window !== 'undefined') window.location.reload();
      }, 1000);
    } else {
      next(action);
    }
  };
