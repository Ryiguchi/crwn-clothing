import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import AccountSettings from './routes/account-settings/account-settings.component';
import OrderHistory from './routes/order-history/order-history.component';
import ForgotPassword from './routes/forgot-password/forgot-password.component';

import { checkUserSession } from './store/user/user.action';

import { GlobalStyle } from './global.styles';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<AccountSettings />} />
          <Route path="history" element={<OrderHistory />} />
          <Route path="forgot" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
