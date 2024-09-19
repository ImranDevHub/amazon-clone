import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../../components/Product/Product';
import { instance as axios } from '../../utils/axios';
import Loading from '../../components/Loading/Loading';

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
          <Loading />
        ) : (
          results.map((result, i) => <Product data={result} key={i} />)
        )}
      </section>
    </>
  );
}

export default Results;
