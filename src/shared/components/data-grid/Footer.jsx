import { TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';

const ResponsiveTablePagination = styled(TablePagination)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    '& .MuiTablePagination-toolbar': {
      padding: 0,
      flexFlow: 'wrap',
      justifyContent: 'center',
    },
  },
}));

export default function Footer({
  t,
  page,
  pagination,
  rowsPerPage,
  processedData,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  return (
    <ResponsiveTablePagination
      component='div'
      count={pagination.total ?? (processedData || [])?.length}
      dir={'ltr'}
      labelRowsPerPage={t('rowsPerPage')}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={pagination.current_page ? pagination.current_page - 1 : page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 25, 50]}
      showFirstButton
      showLastButton
      sx={{
        mx: 2,
      }}
    />
  );
}
