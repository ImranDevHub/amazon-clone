import CreatableSelect from 'react-select/creatable';

import { useContext } from 'react';
import Flag from 'react-world-flags';
import options from '../currencyData/currencyData';
import { MyContext } from '../DataProvider/DataProvider';
import './currencyDropdown.css';

// Custom option renderer to include flags
const customSingleValue = ({ data }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      color: 'gray',
      backgroundColor: 'transparent',
    }}
  >
    <Flag code={data.flag} style={{ width: '24px', marginRight: '10px' }} />
    {data.label}
  </div>
);

const customOption = props => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        color: 'gray',
        backgroundColor: 'transparent',
      }}
    >
      <Flag code={data.flag} style={{ width: '24px', marginRight: '10px' }} />
      {data.label}
    </div>
  );
};

function CurrencyDropdown() {
  const context = useContext(MyContext);
  //   console.log(context);

  const { selectedOption, setSelectedOption } = context;

  //   console.log(selectedOption);
  // Set the initial state to the first option (USD in this case)

  // Handle change event when an option is selected
  const handleChange = option => {
    setSelectedOption(option);
  };

  return (
    <CreatableSelect
      options={options}
      defaultValue={options[0]}
      components={{ SingleValue: customSingleValue, Option: customOption }}
      isSearchable={false}
      value={selectedOption} // Bind the selected option to the state
      onChange={handleChange} // Update state when a new option is selected
      className="currency-dropdown" // Apply custom styles to the dropdown element
    />
  );
}

export default CurrencyDropdown;
