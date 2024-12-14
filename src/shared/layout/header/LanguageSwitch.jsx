import { Button } from '@mui/material';
import Colors from '../../../theme/colors';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../../../modules/App/state';

export default function LanguageSwitch({
  color = Colors.white,
  HEADER_DESKTOP,
}) {
  const dispatch = useDispatch();
  const language = localStorage.getItem('language');

  return (
    <Button
      variant='contained'
      sx={{
        color: color,
        boxShadow: 'none',
        backgroundColor: Colors.transparent,
        ':hover': {
          backgroundColor: Colors.transparent,
        },
        height: HEADER_DESKTOP,
      }}
      onClick={() => dispatch(setLanguage(language === 'ar' ? 'en' : 'ar'))}
    >
      {language === 'ar' ? 'English' : 'العربية'}
    </Button>
  );
}
