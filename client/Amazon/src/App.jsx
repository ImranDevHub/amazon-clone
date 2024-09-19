import 'bootstrap/dist/css/bootstrap.css';
import 'normalize.css/normalize.css';
import { useState } from 'react';
import './assets/css/style.css';
import options from './components/currencyData/currencyData';
import DataProvider from './components/DataProvider/DataProvider';
import Routing from './Router';
import { initialState, reducer } from './utils/reducer';

function App() {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <DataProvider
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      reducer={reducer}
      initialState={initialState}
    >
      <Routing />
    </DataProvider>
  );
}

export default App;
