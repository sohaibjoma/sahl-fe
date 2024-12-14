export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z20,
        },
        root: {
          '.Mui-disabled': {
            opacity: theme.mode === 'dark' ? '0.5' : '1',
          },
        },
      },
    },
  };
}
