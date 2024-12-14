export default function Tab(theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: theme.mode === 'dark' ? '0.5' : '1',
          },
        },
      },
    },
  };
}
