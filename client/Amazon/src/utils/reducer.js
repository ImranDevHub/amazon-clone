import { Type } from './action.type';

export const initialState = {
  basket: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const isExists = state.basket.find(item => item.id === action.item.id);
      if (!isExists)
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      const updatedItem = state.basket.map(item =>
        item.id === action.item.id ? { ...item, amount: item.amount++ } : item
      );

      return {
        ...state,
        basket: updatedItem,
      };

    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex(item => item.id === action.id);
      let newBasket = [...state.basket];
      // console.log(index);
      if (index >= 0)
        if (newBasket[index].amount >= 1)
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount--,
          };
        else newBasket.splice(index, 1);

      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

// const [state, dispatch] = useReducer(reducer, initialState)
