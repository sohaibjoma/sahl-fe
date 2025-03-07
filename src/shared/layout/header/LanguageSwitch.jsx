import { Button } from '@mui/material';
import { Language } from '@mui/icons-material';
import Colors from '../../../theme/colors';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../../../modules/App/state';

export default function LanguageSwitch({
  color = Colors.black,
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
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
      onClick={() => dispatch(setLanguage(language === 'ar' ? 'en' : 'ar'))}
    >
      <Language fontSize='small' />
      {language === 'ar' ? 'English' : 'العربية'}
    </Button>
  );
}
