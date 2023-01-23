import { lazy, useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Spinner from './components/spinner/spinner.component';

import { checkUserSession } from './store/user/user.action';

import { GlobalStyle } from './global.styles';

const Home = lazy(() => import('./routes/home/home.component'));
const Navigation = lazy(() =>
  import('./routes/navigation/navigation.component')
);
const Authentication = lazy(() =>
  import('./routes/authentication/authentication.component')
);
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const AccountSettings = lazy(() =>
  import('./routes/account-settings/account-settings.component')
);
const OrderHistory = lazy(() =>
  import('./routes/order-history/order-history.component')
);
const ForgotPassword = lazy(() =>
  import('./routes/forgot-password/forgot-password.component')
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<Spinner />}>
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
      </Suspense>
    </>
  );
};

export default App;
