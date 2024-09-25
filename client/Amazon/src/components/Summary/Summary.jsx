import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormatter from '../currencyFormatter/CurrencyFormatter';
import { MyContext } from '../DataProvider/DataProvider';

function Summary({ payment, onClick }) {
  const context = useContext(MyContext);
  const { state, dispatch } = context;

  const { basket, user } = state;

  const total = basket.reduce((acc, cur) => acc + cur?.price * cur?.amount, 0);
  return (
    <>
      <div className="subtotal order-1 order-md-2">
        {!payment && (
          <>
            <div>
              <p>Subtotal {basket?.length} items</p>
              <CurrencyFormatter amount={total} />
            </div>
            <div>
              <input type="checkbox" name="" id="" className="me-1" />
              <span>This Orders contain a gift</span>
            </div>
            <Link
              to="/payment"
              className="w-100 p-2 text-light fs-3 btn btn-warning"
            >
              Process to Checkout
            </Link>
          </>
        )}
        {payment && (
          <>
            <h4 className="fw-bold fs-3">Order Summery</h4>
            <div className="d-flex justify-content-between fs-4 ">
              <span>items:</span>
              <span>{basket?.length}</span>
            </div>{' '}
            <div className="d-flex justify-content-between fs-3 fw-bold text-danger-emphasis">
              <span>Order Total:</span>
              <CurrencyFormatter amount={total} />
            </div>
            {
              <button
                className="w-100 p-2 text-light fs-3 btn btn-warning"
                onClick={onClick}
              >
                Pay Now
              </button>
            }
          </>
        )}
      </div>
    </>
  );
}

export default Summary;
