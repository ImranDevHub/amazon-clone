import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Type } from '../../utils/action.type';
import { auth } from '../../utils/firebase';
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown';
import { MyContext } from '../DataProvider/DataProvider';
import './header.css';
function Header() {
  const context = useContext(MyContext);
  const { state, dispatch } = context;
  const { basket, user } = state;

  const totalCart = basket?.reduce((acc, cur) => acc + cur.amount, 0);

  const handleLogout = () => {
    const areSure = confirm('Are you sure you want to logout?');
    if (areSure) auth.signOut();
    dispatch({ type: Type.CLEAR_BASKET });
  };

  return (
    <>
      <header className="header">
        <nav className="nav justify-content-between align-items-center flex-nowrap flex-column flex-lg-row">
          <div className="d-flex align-items-center me-5 justify-content-between">
            <Link to="/" className="hover--border ms-3 me-5 p-2">
              <span className="nav__logo icon amazon-logo align-middle"></span>
            </Link>

            <a className="hover--border text-center d-flex flex-column align-items-center p-2">
              <span className="fs-5 ps-4">Deliver to</span>

              <div className="d-flex justify-content-center align-items-center fs-4">
                <span className="icon location-sm"></span>
                <span className="fw-bold">Ethiopia</span>
              </div>
            </a>
          </div>
          <div className="input-group w-50 overflow-hidden flex-nowrap search-input flex-fill">
            <select name="" id="" className="form-select nav__select">
              <option value="1">All</option>
            </select>
            <input type="text" className="form-control" />
            <button className="search__icon btn">
              <span className="icon search"></span>
            </button>
          </div>
          <div className="d-flex ms-5">
            <a className="d-flex p-2 hover--border align-items-center justify-content-between">
              <CurrencyDropdown />
            </a>
            <Link
              to={!user && '/auth'}
              className="hover--border p-2 d-flex flex-column ms-2 text-nowrap"
            >
              {!user && (
                <>
                  <div>
                    <span className="fs-5">Hello, Sign In</span>
                  </div>
                  <span className="fw-bold fs-4">Account & List🔻</span>
                </>
              )}
              {user && (
                <>
                  <div>
                    <span className="fs-5">{user.email.split('@')[0]}</span>
                  </div>
                  <span className="fw-bold fs-4" onClick={handleLogout}>
                    Sign out
                  </span>
                </>
              )}
            </Link>
            <Link
              to="orders"
              className="d-flex flex-column ms-2 p-2 hover--border text-nowrap"
            >
              <span className="fs-5">Returns</span>
              <span className="fw-bold fs-4">& orders</span>
            </Link>
            <Link to="cart" className="p-2 hover--border ms-2 me-4 text-nowrap">
              <span className="icon cart-right-empty text-center ps-3 align-middle text-warning fw-bold fs-4">
                {totalCart}
              </span>
              <span className="align-bottom fw-bold fs-4">Cart</span>
            </Link>
          </div>
        </nav>
        <nav className="nav-main">
          <div className="nav-main__left">
            <ul>
              <li>
                <a href="#" className="hover--border pt-2 p-3">
                  <span className="icon menu-sm align-middle"></span>
                  <span className="ms-2 fw-bold align-middle">All</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover--border pt-2 p-3">
                  Today&apos;s Deals
                </a>
              </li>
              <li>
                <a href="#" className="hover--border pt-2 p-3">
                  Customer Service
                </a>
              </li>
              <li>
                <a href="#" className="hover--border pt-2 p-3">
                  Registry
                </a>
              </li>
              <li>
                <a href="#" className="hover--border pt-2 p-3">
                  Gift Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover--border pt-2 p-3">
                  Sell
                </a>
              </li>
            </ul>
          </div>
          <div className="nav-main__right">
            <ul>
              <li>
                <a href="#" className="hover--border pt-2 p-3">
                  Shop the Gaming Store
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
