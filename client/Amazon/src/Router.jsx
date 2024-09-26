import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useContext, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MyContext } from './components/DataProvider/DataProvider';
import Layout from './components/Layout/Layout';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import Auth from './pages/Auth/Auth';
import Cart from './pages/Cart/Cart';
import Home from './pages/home/Home';
import Orders from './pages/Orders/Orders';
import Payments from './pages/Payments/Payments';
import Results from './pages/Results/Results';
import { Type } from './utils/action.type';
import { auth } from './utils/firebase';

const stripePromise = loadStripe(
  'pk_test_51Q2S96EwLipksm8HjahLqnDLEtouJZnxldClU4u7OY4oL9hZUHDWrPxgMZEnbKIFCWli6eHdJc8dhpZ3rsumKC7E00QHjXv9jV'
);

function Routing() {
  const context = useContext(MyContext);
  const { state, dispatch } = context;
  //   console.log(context);
  const { user, basket } = state;

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) dispatch({ type: Type.SET_USER, user });
      else dispatch({ type: Type.SET_USER, user: null });
    });
  }, [dispatch]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Results />} />
            <Route path="/products/:productID" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/orders"
              element={
                <ProtectRoute
                  redirect="/orders"
                  msg="You must login to access your order:)"
                >
                  <Orders />
                </ProtectRoute>
              }
            />
          </Route>
          <Route
            path="/payment"
            element={
              <ProtectRoute
                redirect="/payment"
                msg="You must Login in to pay:)"
              >
                <Elements stripe={stripePromise}>
                  <Payments />
                </Elements>
              </ProtectRoute>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </>
  );
}

export default Routing;
