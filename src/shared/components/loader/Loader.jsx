import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import Colors from '../../../theme/colors';

const StyledHeader = styled(({ as: Component, ...props }) => (
  <Component {...props} />
))(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  padding: theme.spacing(12, 3),
}));

export default function Loader({ as: Component = 'header' }) {
  return (
    <StyledHeader as={Component}>
      <CircularProgress size={40} sx={{ color: Colors.lightBrown }} />
    </StyledHeader>
  );
}
