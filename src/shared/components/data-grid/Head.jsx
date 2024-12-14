import { useState } from 'react';
import {
  Box,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
  Popover,
  Stack,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import Iconify from '../iconify';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useTranslation } from 'react-i18next';

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export default function Head({
  filtersList,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  order,
  orderBy,
  rowCount,
  setFiltersList,
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const iconName =
    theme.mode === 'dark' ? 'tabler:filter' : 'tabler:filter-filled';
  const isRTL = localStorage.getItem('language') === 'ar';
  const [open, setOpen] = useState(null);
  const [cellId, setCellId] = useState(null);
  const [cellLabel, setCellLabel] = useState(null);
  const [cellType, setCellType] = useState(null);

  const arrowIcon = (id, direction, isActive) => {
    return (
      <div
        style={{ display: 'flex' }}
        onMouseEnter={() => {
          let div = document.getElementById(`${id}_arrowup`);
          if (!div) {
            div = document.getElementById(`${id}_arrowdown`);
          }
          if (div) {
            div.style.visibility = 'visible';
          }
        }}
        onMouseLeave={() => {
          let div = document.getElementById(`${id}_arrowup`);
          if (!div) {
            div = document.getElementById(`${id}_arrowdown`);
          }
          if (div) {
            div.style.visibility = isActive ? 'visible' : 'hidden';
          }
        }}
      >
        {direction === 'asc' ? (
          <Iconify
            id={`${id}_arrowup`}
            icon={'formkit:arrowup'}
            onClick={() => onRequestSort(id)}
            sx={{
              cursor: 'pointer',
              visibility: isActive ? 'visible' : 'hidden',
            }}
          />
        ) : (
          <Iconify
            id={`${id}_arrowdown`}
            icon={'formkit:arrowdown'}
            onClick={() => onRequestSort(id)}
            sx={{
              cursor: 'pointer',
              visibility: isActive ? 'visible' : 'hidden',
            }}
          />
        )}
      </div>
    );
  };

  const handleOpenMenu = (event, headCell) => {
    setOpen(event.currentTarget);
    setCellId(headCell.id);
    setCellLabel(headCell.label);
    setCellType(headCell.searchType);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setCellId(null);
    setCellLabel(null);
    setCellType(null);
  };

  const handleFilterChange = (e) => {
    const { name, value, valueLabel } = e.target;
    const newFilters = [...filtersList];
    const index = newFilters.findIndex((item) => item.id === name);

    if (index > -1) {
      newFilters.splice(index, 1);
    }

    newFilters.push({ id: name, value, label: cellLabel, valueLabel });
    setFiltersList(newFilters);
    setOpen(null);
  };

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell
            padding='checkbox'
            sx={{
              bgcolor: (theme) => theme.palette.datagridHeaderColor,
            }}
          >
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {headLabel.map((headCell) => (
            <TableCell
              key={headCell.id}
              sx={{
                bgcolor: (theme) => theme.palette.datagridHeaderColor,
              }}
              align={isRTL ? 'right' : 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                dir={'ltr'}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                IconComponent={() =>
                  arrowIcon(headCell.id, order, orderBy === headCell.id)
                }
              >
                {headCell.label}
                {headCell.isSearchable && (
                  <Iconify
                    width={16}
                    height={16}
                    icon={iconName}
                    sx={{ mx: '0.3rem' }}
                    onClick={(event) => handleOpenMenu(event, headCell)}
                  />
                )}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            m: 2.25,
          },
        }}
      >
        <Stack direction={'row'} spacing={2}>
          {cellType === 'boolean' ? (
            <RadioGroup
              name={cellId}
              dir={isRTL ? 'rtl' : 'ltr'}
              onChange={(e) => handleFilterChange(e)}
              sx={isRTL ? { pl: 1 } : { px: 1 }}
            >
              <FormControlLabel
                value='true'
                control={<Radio />}
                label={t('true')}
                sx={isRTL ? { mx: 0 } : { mr: 0 }}
              />
              <FormControlLabel
                value='false'
                control={<Radio />}
                label={t('false')}
                sx={isRTL ? { mx: 0 } : { mr: 0 }}
              />
            </RadioGroup>
          ) : cellType === 'date' ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={t('pickDate')}
                format='DD/MM/YYYY'
                onChange={(date) =>
                  handleFilterChange({
                    target: {
                      name: cellId,
                      value: date.format('YYYY-MM-DD'),
                    },
                  })
                }
                sx={{
                  direction: 'ltr',
                  textAlign: 'left',
                  '.MuiInput-root': {
                    paddingRight: '0',
                  },
                  '.MuiInputAdornment-root': {
                    marginLeft: '0',
                  },
                }}
              />
            </LocalizationProvider>
          ) : cellType === 'custom' ? (
            headLabel
              .filter((headCell) => headCell.id === cellId)
              .map((headCell) => headCell.searchComponent)
          ) : (
            <TextField
              name={cellId}
              label={t('search')}
              onChange={(e) => handleFilterChange(e)}
            />
          )}
        </Stack>
      </Popover>
    </>
  );
}
