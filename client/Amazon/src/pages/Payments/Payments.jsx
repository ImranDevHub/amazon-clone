import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { doc, setDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../API/axios';
import { MyContext } from '../../components/DataProvider/DataProvider';
import Error from '../../components/Error/Error';
import Product from '../../components/Product/Product';
import Summary from '../../components/Summary/Summary';
import { Type } from '../../utils/action.type';
import { db } from '../../utils/firebase';
import './payment.css';

function Payments() {
  const context = useContext(MyContext);
  const { state, dispatch } = context;
  const { basket, user } = state;
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const total = basket.reduce((acc, cur) => acc + cur?.price * cur?.amount, 0);
  const amount = total.toFixed(2) * 100;

  // Stripe expects the total in cents

  const handleCard = function (e) {
    const message = e?.error?.message;
    setError(() => (message ? message : ''));
  };

  const handlePayment = async function (e) {
    e.preventDefault();
    setError('');
    if (!stripe || !elements) return; // Stripe.js has not loaded yet

    //  setProcessing(true);
    try {
      setIsLoading(true);

      const response = await axiosInstance({
        method: 'POST',
        url: `/payment/create?total=${amount}`,
      });

      // console.log(response);

      const { clientSecret } = response.data;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // Save order in Firestore using the v9 modular syntax
      await setDoc(doc(db, 'users', user.uid, 'orders', paymentIntent.id), {
        basket: basket, // order details
        amount: paymentIntent.amount, // amount in cents
        created: paymentIntent.created, // timestamp
      });
      setIsLoading(false);
      dispatch({ type: Type.CLEAR_BASKET });
      navigate('/orders', { state: { msg: 'You have placed new Orders:)' } });
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error(err);
      setIsLoading(false);
    }
  };

  const items = basket?.reduce((acc, cur) => acc + cur.amount, 0);

  return (
    <>
      <section className="bg-white position-relative pb-5">
        <header className="d-flex flex-column flex-md-row justify-content-between align-items-center payment__header py-4 shadow">
          <Link to="/">
            <div className="icon-other amazon-logo-bk"></div>
          </Link>
          <div className="fs-1 fw-medium">
            Checkout (<span className="text-primary">{items} items</span>)
          </div>
        </header>
        <div className="container d-flex gap-5 mt-5 flex-column flex-md-row">
          <div className="col-md-8 order-2 order-md-1">
            <h2 className="mt-5">1. Shipping Address</h2>
            <div className="border border-2 rounded rounded-4 p-4">
              <h3>Address</h3>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control fs-4"
                  value={user?.email}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="form-label">
                  Name:
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-control fs-4"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="Location" className="form-label">
                  Location:
                </label>
                <input
                  id="Location"
                  type="email"
                  className="form-control fs-4"
                />
              </div>
            </div>
            <h2 className="mt-5">2. Items and Shipping</h2>
            <div className="border border-2 rounded rounded-4 p-4">
              <h3>Review Items and Delivery</h3>
              {basket?.map((item, i) => (
                <Product
                  data={item}
                  key={i}
                  cart={true}
                  className="shadow-none"
                />
              ))}
            </div>
            <h2 className="mt-5">3. Payment Method</h2>
            {error && <Error error={error} />}
            <div
              className={`border border-2 rounded rounded-4 p-4${
                error ? ' border-danger' : ''
              }`}
            >
              <h3>Payment Method</h3>
              <div className="mt-3">
                <form onSubmit={handlePayment} className="text-end">
                  <CardElement onChange={handleCard} />
                  <button
                    type="submit"
                    className="btn btn-warning fs-4 w-50 text-light mt-4"
                    disabled={!stripe || isLoading} // Disable if Stripe isn't ready or while processing
                  >
                    {isLoading ? (
                      <OrbitProgress
                        variant="track-disc"
                        speedPlus="-2"
                        easing="ease-in-out"
                        size="small"
                        style={{ fontSize: '5px' }}
                        color="#fff"
                        dense
                      />
                    ) : (
                      'Pay Now'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <Summary payment="true" onClick={handlePayment} />
        </div>
      </section>
    </>
  );
}

export default Payments;
