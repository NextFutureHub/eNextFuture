import { createStore } from 'redux';

const initialState = {
  products: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
