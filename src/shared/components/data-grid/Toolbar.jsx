import { styled, alpha } from '@mui/material/styles';
import {
  Toolbar as MuiToolbar,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  ButtonGroup,
} from '@mui/material';
import Iconify from '../iconify';
import * as XLSX from 'xlsx';
import { useTranslation } from 'react-i18next';
import { fDateTime } from '../../../utils/formatTime';
import Colors from '../../../theme/colors';

const StyledRoot = styled(MuiToolbar)(({ theme }) => ({
  height: 110,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

const StyledOptions = styled(ButtonGroup)(({ theme }) => ({
  justifyContent: 'end',
  padding: theme.spacing(0, 1, 0, 1),
}));

export default function Toolbar({
  data,
  filterName,
  module,
  numSelected,
  onFilterName,
  refresh,
  tableHeads,
}) {
  const { t } = useTranslation();

  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new();

    const columns = tableHeads.map((headCell) => headCell.id);
    const rows = data.map((row) => columns.map((column) => row[column]?.value));

    const headers = tableHeads.map((headCell) => headCell.label);
    const body = rows.map((row) =>
      row.map((cell) => (cell === true ? 'Yes' : cell === false ? 'No' : cell))
    );

    const ws = XLSX.utils.aoa_to_sheet([headers, ...body]);
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, `${module}-${fDateTime(new Date())}.xlsx`);
  };

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: (theme) =>
            theme.mode === 'dark' ? 'primary.light' : 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component='div' variant='subtitle1'>
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <StyledSearch
            value={filterName}
            onChange={onFilterName}
            placeholder={t('search')}
            startAdornment={
              <InputAdornment position='start'>
                <Iconify
                  icon='eva:search-fill'
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
          <StyledOptions>
            <IconButton onClick={handleExportExcel}>
              <Iconify
                icon={'ant-design:file-excel-filled'}
                width={32}
                height={32}
              />
            </IconButton>
            <IconButton
              title='Refresh'
              onClick={() => refresh()}
              sx={{
                color: Colors.themeColor,
                border: `1px solid ${Colors.themeColor}`,
                borderRadius: '8px',
                '&:hover': {
                  color: '#f7f8fa',
                  backgroundColor: Colors.themeColor,
                },
              }}
            >
              <Iconify width={24} icon={'material-symbols:refresh'} />
            </IconButton>
          </StyledOptions>
        </>
      )}
    </StyledRoot>
  );
}
