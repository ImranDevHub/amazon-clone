import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../utils/axios';
import Loading from '../Loading/Loading';
import Product from '../Product/Product';
import { OrbitProgress } from 'react-loading-indicators';

function ProductDetails() {
  const { productID } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await instance.get(`/products/${productID}`);
        const data = response.data;
        //   console.log(data);
        setProduct(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    })();
  }, [productID]);

  return (
    <section className="position-relative">
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
        <Product data={product} detail={true} />
      )}
    </section>
  );
}

export default ProductDetails;
