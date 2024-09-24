import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../../components/DataProvider/DataProvider';
import Product from '../../components/Product/Product';
import CurrencyFormatter from '../../components/currencyFormatter/CurrencyFormatter';
import { Type } from '../../utils/action.type';
import './cart.css';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
function Cart() {
  const context = useContext(MyContext);
  const { state, dispatch } = context;

  const { basket, user } = state;

  const total = basket.reduce((acc, cur) => acc + cur?.price * cur?.amount, 0);

  const handleIncrement = item => {
    dispatch({ type: Type.ADD_TO_BASKET, item });
  };

  const handleDecrement = id => {
    dispatch({ type: Type.REMOVE_FROM_BASKET, id });
  };
  return (
    <section className="container d-flex gap-5 mt-5 ">
      <div>
        {basket.length ? (
          basket?.map((item, i) => (
            <div key={i} className="position-relative">
              <Product data={item} detail={true} cart={true} />
              <div className="d-flex flex-column w-25 position-absolute top-50 btn__toggle">
                <button
                  className="btn btn-warning w-25 mb-3"
                  onClick={() => handleIncrement(item)}
                >
                  <IoIosArrowUp size={25} />
                </button>
                <span className="text-center w-25">{item.amount}</span>
                <button
                  className="btn fs-3 btn-warning w-25 mt-3"
                  onClick={() => handleDecrement(item.id)}
                >
                  <IoIosArrowDown size={25} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-5 fs-2 fw-bold">
            Opps! No Item in Your Chart :)
          </p>
        )}
      </div>
      {basket?.length !== 0 && (
        <div className="subtotal">
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
        </div>
      )}
    </section>
  );
}

export default Cart;
