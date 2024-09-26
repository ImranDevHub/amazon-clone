import { Link } from 'react-router-dom';
import emptyCart from '../../assets/img/empty-cart.png';

function EmptyMessage({ msg, redirect }) {
  return (
    <Link to={redirect}>
      <h2 className="text-center mt-5 fs-1 fw-bold">{msg}</h2>
      <div className="empty--cart">
        <img src={emptyCart} alt="empty cart" className="w-100" />
      </div>
    </Link>
  );
}

export default EmptyMessage;
