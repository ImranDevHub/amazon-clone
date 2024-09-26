import { Type } from './action.type';

export const initialState = {
  basket: [],
  user: null,
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
      const isExist = state.basket.find(item => item.id === action.id);

      // console.log(isExist);

      if (isExist?.amount >= 1) {
        //   console.log(isExist.amount);

        const updateItem = state.basket.map(item =>
          item.id === action.id ? { ...item, amount: item.amount-- } : item
        );

        return {
          ...state,
          basket: updateItem,
        };
      }

      const clearItem = state.basket.filter(item => item.id !== action.id);
      return {
        ...state,
        basket: clearItem,
      };

    // }

    // const index = state.basket.findIndex(item => item.id === action.id);
    // let newBasket = [...state.basket];
    // // console.log(index);
    // if (index >= 0)
    //   if (newBasket[index].amount >= 1)
    //     newBasket[index] = {
    //       ...newBasket[index],
    //       amount: newBasket[index].amount--,
    //     };
    //   else newBasket.splice(index, 1);

    // return {
    //   ...state,
    //   basket: newBasket,
    // };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case Type.CLEAR_BASKET:
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};

// const [state, dispatch] = useReducer(reducer, initialState)
