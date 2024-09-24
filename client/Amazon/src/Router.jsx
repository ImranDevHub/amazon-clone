import { useContext, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MyContext } from './components/DataProvider/DataProvider';
import Layout from './components/Layout/Layout';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Auth from './pages/Auth/Auth';
import Cart from './pages/Cart/Cart';
import Home from './pages/home/Home';
import Orders from './pages/Orders/Orders';
import Payments from './pages/Payments/Payments';
import Results from './pages/Results/Results';
import { Type } from './utils/action.type';
import { auth } from './utils/firebase';

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
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Results />} />
            <Route path="/products/:productID" element={<ProductDetails />} />
            <Route path="/payment" element={<Payments />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </>
  );
}

export default Routing;
