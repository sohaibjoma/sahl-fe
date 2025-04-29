import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useFetchAddressesQuery } from '@/redux/apis/account';
import Loader from '@/shared/components/loader/Loader';
import Iconify from '@/shared/components/iconify';
import Header from '@/shared/components/header/Header';
import SaveAddressDialog from '../components/SaveAddressDialog';

export default function MyAddresses() {
  const { t } = useTranslation();
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [savingDialogData, setSavingDialogData] = useState({
    isOpen: false,
  });
  const { data: addresses, isFetching, refetch } = useFetchAddressesQuery();

  return isFetching ? (
    <Loader />
  ) : (
    <Container maxWidth='lg' sx={{ mt: 5 }}>
      <Header divider header={'myAddresses'} refetch={refetch}>
        <Button
          variant='contained'
          aria-label='add-category-btn'
          onClick={() => {
            setSavingDialogData({ isOpen: true, title: t('addAddress') });
          }}
          sx={{
            height: 36,
          }}
        >
          {t('addAddress')}
        </Button>
      </Header>

      {addresses?.length > 0 && (
        <Grid container sx={{ pt: 1 }}>
          {addresses.map((address) => (
            <Grid item xs={12} md={3} lg={3} key={address.id}>
              <Card
                key={address.id}
                onClick={() => {
                  setAddressToEdit(address);
                  setSavingDialogData({
                    isOpen: true,
                    title: t('editAddress'),
                  });
                }}
                sx={{
                  cursor: 'pointer',
                  maxWidth: '320px',
                  height: '8rem',
                  margin: '1rem 0.5rem',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {address.default && (
                  <Iconify
                    icon='lets-icons:check-fill'
                    width={24}
                    height={24}
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      backgroundColor: '#21a144',
                      color: '#f7f8fa',
                      padding: '4px',
                      borderRadius: '50%',
                    }}
                  />
                )}
                <CardContent sx={{ p: 1.5 }}>
                  <Typography variant='h6' gutterBottom>
                    {address.name}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    {address.address_1}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    {address.city?.name}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    {address.postal_code}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {savingDialogData.isOpen && (
        <SaveAddressDialog
          refetch={refetch}
          isEdit={!!addressToEdit}
          address={addressToEdit}
          setAddressToEdit={setAddressToEdit}
          savingDialogData={savingDialogData}
          setSavingDialogData={setSavingDialogData}
        />
      )}
    </Container>
  );
}
