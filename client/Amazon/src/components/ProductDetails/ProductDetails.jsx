import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../utils/axios';
import Loading from '../Loading/Loading';
import Product from '../Product/Product';

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
        console.log(data);
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
      {isLoading ? <Loading /> : <Product data={product} detail={true} />}
    </section>
  );
}

export default ProductDetails;
