import { useEffect, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import { useParams } from 'react-router-dom';
import Product from '../../components/Product/Product';
import { instance as axios } from '../../utils/axios';

function Results() {
  const { categoryName } = useParams();

  //   console.log(categoryName);

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(`/products/category/${categoryName}`);
        //   console.log(response);
        const data = response.data;
        //   console.log(data);
        setResults(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    })();
  }, [categoryName]);

  //   console.log(results);
  return (
    <>
      <h2 className="text-center">{categoryName.toLocaleUpperCase()}</h2>
      <section className="position-relative grid grid--1x3 grid--1x2 grid--1x4">
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
          results.map((result, i) => <Product data={result} key={i} />)
        )}
      </section>
    </>
  );
}

export default Results;
