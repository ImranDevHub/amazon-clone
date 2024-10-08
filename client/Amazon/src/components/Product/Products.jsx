import { useEffect, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
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
        <OrbitProgress
          variant="track-disc"
          speedPlus="-2"
          easing="ease-in-out"
          size="small"
          style={{
            fontSize: '10px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '-100px',
          }}
          color="#ffcd4f"
          dense
        />
      ) : (
        products.map((product, i) => <Product key={i} data={product} />)
      )}
    </>
  );
}

export default Products;
