import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import Product from './Product';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const results = await fetch('https://fakestoreapi.com/products');
        //   console.log(results);
        const data = await results.json();
        //   console.log(data);
        setProducts(() => data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading color="#ffcd4f" />
      ) : (
        products.map((product, i) => <Product key={i} data={product} />)
      )}
    </>
  );
}

export default Products;
