import {
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Iconify from '../iconify';
import Colors from '../../../theme/colors';

const Item = styled(Paper)(({ theme }) => {
  const isRTL = theme.dir === 'rtl';

  return {
    ':last-child': {
      marginLeft: isRTL ? 'unset' : 'auto',
      marginRight: isRTL ? 'auto' : 'unset',
    },
    textAlign: 'center',
    padding: theme.spacing(0.5),
    color: theme.palette.text.secondary,
  };
});

export default function Header({
  children,
  divider,
  header,
  gutterBottom = false,
  refetch,
  sx,
}) {
  const { t } = useTranslation();

  return (
    <Stack
      direction='row'
      alignItems='center'
      divider={
        divider && (
          <Divider orientation='vertical' flexItem sx={{ mx: '0.5rem' }} />
        )
      }
      sx={sx}
    >
      {header && (
        <Item>
          <Typography
            variant='h4'
            gutterBottom={gutterBottom}
            sx={{ textAlign: 'start' }}
          >
            {t(header)}
          </Typography>
        </Item>
      )}
      <Item>{children}</Item>
      {refetch && (
        <Item>
          <IconButton
            title='Refresh'
            onClick={() => refetch()}
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
        </Item>
      )}
    </Stack>
  );
}
