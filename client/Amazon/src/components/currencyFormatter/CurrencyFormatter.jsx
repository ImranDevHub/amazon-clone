import { useContext, useEffect, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import { MyContext } from '../DataProvider/DataProvider';

function CurrencyFormatter({ amount }) {
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);
  const context = useContext(MyContext);
  const { selectedOption } = context;

  useEffect(() => {
    const convertCurrency = async () => {
      try {
        // If the selected currency is USD, no conversion is needed
        if (selectedOption?.value === 'USD') {
          setConvertedAmount(amount);
          return;
        }

        setError('');

        // Fetch the conversion rates
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=USD&to=${selectedOption?.value}`
        );
        const data = await response.json();

        // Set the converted amount
        setConvertedAmount(data.rates[selectedOption?.value]);
        //   console.log(data.rates[selectedOption?.value]);
      } catch (err) {
        setError(`Error fetching conversion data: ${err.message}`);
      }
    };

    convertCurrency();
  }, [selectedOption?.value, amount]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : convertedAmount !== null ? (
        `${convertedAmount?.toFixed(2)} ${selectedOption?.value}`
      ) : (
        <OrbitProgress
          variant="track-disc"
          speedPlus="-2"
          easing="ease-in-out"
          size="small"
          style={{ fontSize: '5px' }}
          color="#ffcd4f"
          dense
        />
      )}
    </div>
  );
}

export default CurrencyFormatter;
