import { Rating } from '@mui/material';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Type } from '../../utils/action.type';
import CurrencyFormatter from '../currencyFormatter/CurrencyFormatter';
import { MyContext } from '../DataProvider/DataProvider';
import './product.css';

function Product({ data, detail, cart }) {
  const { id, title, image, rating, description, price } = data;
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  const context = useContext(MyContext);
  //   console.log(context);
  const { state, dispatch } = context;

  //   console.log(state);

  const handleAddToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { id, title, image, rating, description, price },
    });
  };

  const handleTruncate = (str, num) =>
    str.length > num ? str.slice(0, num - 1) + '...' : str;

  return (
    <>
      <Card
        className={`category ${hover ? 'hover' : ''}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {detail && (
          <Card.Header>
            <Card.Title className="p-4 fs-3 text-center">{title}</Card.Title>
          </Card.Header>
        )}
        <Card.Body>
          <Link to={`${!cart ? '/products/' + id : ''}`}>
            <Card.Img
              alt={title}
              className="category__img card-img-top"
              src={image}
            />
          </Link>
        </Card.Body>

        <Card.Body className="p-4">
          {!detail && <Card.Title className="p-4 fs-4">{title}</Card.Title>}
          {detail && (
            <Card.Text className="w-75" title={description}>
              {handleTruncate(description, 150)}
            </Card.Text>
          )}
          <div className="fs-4">
            <Rating readOnly value={rating?.rate} precision={0.1} />
            {rating?.count}
          </div>
          <CurrencyFormatter amount={price} />
        </Card.Body>

        {!cart && (
          <Card.Footer>
            {hover && (
              <Button
                variant="warning"
                className="w-100 p-2 text-light fs-3"
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            )}
          </Card.Footer>
        )}
      </Card>
    </>
  );
}

export default Product;
