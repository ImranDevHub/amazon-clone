import { createContext, useReducer } from 'react';

export const MyContext = createContext();

function DataProvider({
  children,
  reducer,
  initialState,
  selectedOption,
  setSelectedOption,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider
      value={{ state, dispatch, selectedOption, setSelectedOption }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default DataProvider;
