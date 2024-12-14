import { Autocomplete as MuiAutocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

const Autocomplete = ({ data, id, label, onChange, options, sx }) => {
  const { t } = useTranslation();

  return (
    <MuiAutocomplete
      id={id}
      options={options}
      sx={sx}
      dir='ltr'
      getOptionLabel={(option) => option.name}
      renderInput={(params, index) =>
        data ? (
          <TextField {...params} label={label} />
        ) : (
          <TextField {...params} label={t('loading')} />
        )
      }
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={onChange}
    />
  );
};

export default Autocomplete;
