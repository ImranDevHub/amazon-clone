import { useContext } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MyContext } from '../../components/DataProvider/DataProvider';
import EmptyMessage from '../../components/EmptyMessage/EmptyMessage';
import Product from '../../components/Product/Product';
import Summary from '../../components/Summary/Summary';
import { Type } from '../../utils/action.type';
import './cart.css';
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
    <section className="container d-flex flex-column flex-md-row gap-5 mt-5 justify-content-center">
      <div>
        {basket.length ? (
          basket?.map((item, i) => (
            <div key={i} className="position-relative order-2 order-md-1">
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
          <EmptyMessage msg="Your Amazon Cart is empty :)" redirect="/" />
        )}
      </div>
      {basket?.length !== 0 && (
        //   <div className="subtotal">
        //     <div>
        //       <p>Subtotal {basket?.length} items</p>
        //       <CurrencyFormatter amount={total} />
        //     </div>
        //     <div>
        //       <input type="checkbox" name="" id="" className="me-1" />
        //       <span>This Orders contain a gift</span>
        //     </div>
        //     <Link
        //       to="/payment"
        //       className="w-100 p-2 text-light fs-3 btn btn-warning"
        //     >
        //       Process to Checkout
        //     </Link>
        //   </div>

        <Summary />
      )}
    </section>
  );
}

export default Cart;
