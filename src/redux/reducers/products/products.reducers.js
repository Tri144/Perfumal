// import * as action from "./products.action";
import productsActionType from "./products.actionType";

const initialState = {
  products: null,
  err: null,
};

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case productsActionType.GET_PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
      };
    case productsActionType.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload,
      };
    case productsActionType.GET_PRODUCTS_ERR:
      return {
        ...state,
        isLoading: false,
        err: payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
