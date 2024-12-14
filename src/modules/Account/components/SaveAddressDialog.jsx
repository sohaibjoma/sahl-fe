import { useEffect, useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Autocomplete,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import SavingDialog from '@/shared/components/dialogs/prompt/PromptDialog';
import { useTranslation } from 'react-i18next';
import {
  useAddAddressMutation,
  useFetchProvincesQuery,
  useLazyFetchCitiesQuery,
  useUpdateAddressMutation,
} from '@/redux/apis/account';
import { useDispatch } from 'react-redux';
import { errorHandler } from '@/redux/helpers/errorHandler';

export default function SaveAddressDialog({
  isEdit,
  address,
  setAddressToEdit,
  savingDialogData,
  setSavingDialogData,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isRTL = localStorage.getItem('language') === 'ar';

  const [cities, setCities] = useState([]);
  const [loadCities, setLoadCities] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [getCities] = useLazyFetchCitiesQuery();
  const { data: provinces } = useFetchProvincesQuery();
  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();

  const provinceOptions =
    provinces?.map((province) => ({
      id: province.id,
      name: isRTL ? province.name_ar : province.name_en,
    })) || [];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('nameRequired')),
    address1: Yup.string().required(t('addressRequired')),
    postalCode: Yup.number().required(t('postalCodeRequired')),
    province: Yup.object().nullable().required(t('provinceRequired')),
    city: Yup.object().nullable().required(t('cityRequired')),
    isDefult: Yup.boolean(),
  });

  const handleAddingAddress = useCallback(
    async (values) => {
      setIsLoading(true);
      try {
        await addAddress({
          name: values.name,
          address_1: values.address1,
          postal_code: values.postalCode,
          city_id: values.city.id,
          default: values.isDefault,
        });
        setSavingDialogData({ isOpen: false });
      } catch (error) {
        setSavingDialogData({
          isOpen: true,
          title: t('error'),
          content: error.message,
        });
      } finally {
        setIsLoading(false);
        resetFormAndClearEdit();
      }
    },
    [addAddress, setSavingDialogData, t]
  );

  const handleEditAddress = useCallback(
    async (values) => {
      setIsLoading(true);
      try {
        await updateAddress({
          id: address.id,
          name: values.name,
          address_1: values.address1,
          postal_code: values.postalCode,
          city_id: values.city.id,
          default: values.isDefault,
        });
        setSavingDialogData({ isOpen: false });
      } catch (error) {
        setSavingDialogData({
          isOpen: true,
          title: t('error'),
          content: error.message,
        });
      } finally {
        setIsLoading(false);
        resetFormAndClearEdit();
      }
    },
    [address, updateAddress, setSavingDialogData, t]
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      address1: '',
      postalCode: '',
      province: null,
      city: null,
      isDefault: false,
    },
    validationSchema,
    onSubmit: isEdit ? handleEditAddress : handleAddingAddress,
  });

  useEffect(() => {
    if (isEdit && address) {
      formik.setValues({
        name: address.name,
        address1: address.address_1,
        postalCode: address.postal_code,
        province: {
          id: address.province.id,
          name: isRTL ? address.province.name_ar : address.province.name_en,
        },
        city: {
          id: address.city.id,
          name: isRTL ? address.city.name_ar : address.city.name_en,
        },
        isDefault: address.default,
      });
    } else {
      formik.resetForm();
    }
  }, [isEdit, address]);

  useEffect(() => {
    if (formik.values.province) {
      setLoadCities(true);
      fetchCities(formik.values.province.id);
    }
  }, [formik.values.province]);

  const fetchCities = async (provinceId) => {
    try {
      const result = await getCities({ provinceId });
      setCities(result?.data || []);
    } catch (error) {
      dispatch(errorHandler(error));
    } finally {
      setLoadCities(false);
    }
  };

  const handlePostalCodeChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    formik.setFieldValue('postalCode', value);
  };

  const resetFormAndClearEdit = () => {
    formik.resetForm();
    setAddressToEdit(null);
  };

  return (
    <SavingDialog
      confirmBtnText={isEdit ? 'update' : 'save'}
      dialogData={savingDialogData}
      isLoading={isLoading}
      onSave={formik.handleSubmit}
      onCancel={resetFormAndClearEdit}
      setDialogData={setSavingDialogData}
      sx={{
        '& .css-oxbn1n-MuiPaper-root-MuiDialog-paper': {
          maxWidth: '420px',
          borderRadius: '12px',
        },
        '& .MuiDialog-paper': {
          width: '100%',
        },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 0.1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t('name')}
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t('address1')}
              name='address1'
              value={formik.values.address1}
              onChange={formik.handleChange}
              error={formik.touched.address1 && Boolean(formik.errors.address1)}
              helperText={formik.touched.address1 && formik.errors.address1}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              id='provinces'
              options={provinceOptions}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={provinces ? t('province') : t('loading')}
                  error={
                    formik.touched.province && Boolean(formik.errors.province)
                  }
                  helperText={formik.touched.province && formik.errors.province}
                />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, value) => formik.setFieldValue('province', value)}
              value={formik.values.province}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              id='cities'
              options={cities.map((city) => ({
                id: city.id,
                name: isRTL ? city.name_ar : city.name_en,
              }))}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={loadCities ? t('loading') : t('city')}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, value) => formik.setFieldValue('city', value)}
              value={formik.values.city}
              disabled={!formik.values.province}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={t('postalCode')}
              name='postalCode'
              type='text'
              maxLength={5}
              inputMode='numeric'
              value={formik.values.postalCode}
              onChange={handlePostalCodeChange}
              inputProps={{
                maxLength: 5,
              }}
              error={
                formik.touched.postalCode && Boolean(formik.errors.postalCode)
              }
              helperText={formik.touched.postalCode && formik.errors.postalCode}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormGroup
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <FormControlLabel
                dir='ltr'
                label={t('isDefault')}
                labelPlacement='start'
                control={
                  <Switch
                    checked={formik.values.isDefault}
                    onChange={(e) =>
                      formik.setFieldValue('isDefault', e.target.checked)
                    }
                  />
                }
              />
            </FormGroup>
          </Grid>
        </Grid>
      </form>
    </SavingDialog>
  );
}
