import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import {
  useCheckoutMutation,
  useCheckoutWithCashMutation,
} from '@/redux/apis/apiHub';
import CreditCard from '../components/CreditCard';
import secureLocalStorage from 'react-secure-storage';
import { useLocation, useNavigate } from 'react-router-dom';
import { cartSelector } from '../state';
import { useSelector } from 'react-redux';

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cartItems } = useSelector(cartSelector);

  const [checkoutData, setCheckoutData] = useState({
    credit_card_name: '',
    credit_card_number: '**** **** **** ****',
    cvc: '',
    month: '',
    year: '',
    address_id: state?.addressId ?? secureLocalStorage.getItem('ukmhkhgapk'),
  });

  const [checkout, { isLoading: isPayLoading }] = useCheckoutMutation();
  const [checkoutWithCash, { isLoading: isPayWithCashLoading }] =
    useCheckoutWithCashMutation();

  useEffect(() => {
    if (cartItems?.items?.length === 0 && !state) {
      navigate('/cart');
    }
  }, [cartItems, state]);

  const handleCheckout = () => {
    checkout(checkoutData);
  };

  const handleCheckoutWithCash = async () => {
    await checkoutWithCash({
      address_id: secureLocalStorage.getItem('ukmhkhgapk'),
    });
    const message = `.مرحبًا، لقد قمت بتأكيد طلب رقم # وأريد تحديد طريقة دفع مناسبة`;
    openInNewTab('https://wa.me/?text=' + encodeURIComponent(message));
    navigate('/account/orders');
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <Container maxWidth={'md'} sx={{ marginTop: '1rem' }}>
      <CreditCard
        checkoutData={checkoutData}
        setCheckoutData={setCheckoutData}
        handleCheckout={handleCheckout}
        handleCheckoutWithCash={handleCheckoutWithCash}
        isPayLoading={isPayLoading}
        isPayWithCashLoading={isPayWithCashLoading}
      />
    </Container>
  );
}
