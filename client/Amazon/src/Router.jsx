import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProductDetails from './components/ProductDetails/ProductDetails';
import SignUp from './pages/Auth/SignUp';
import Cart from './pages/Cart/Cart';
import Home from './pages/home/Home';
import Orders from './pages/Orders/Orders';
import Payments from './pages/Payments/Payments';
import Results from './pages/Results/Results';

function Routing() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Results />} />
            <Route path="/products/:productID" element={<ProductDetails />} />
            <Route path="/auth" element={<SignUp />} />
            <Route path="/payment" element={<Payments />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default Routing;
