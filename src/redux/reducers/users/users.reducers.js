import usersActionType from "./users.actionType";
const initialState = {
  isLoading: false,
  users: null,
  err: null,
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case usersActionType.GET_USERS_START:
      return {
        ...state,
        isLoading: true,
      };
    case usersActionType.GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload,
      };
    case usersActionType.GET_USERS_ERR:
      return {
        ...state,
        isLoading: false,
        err: payload,
      };
    case usersActionType.ADD_CART_START:
    case usersActionType.DELETE_CART_START:
      return {
        ...state,
        isLoading: false,
      };
    case usersActionType.ADD_CART_SUCCESS:
    case usersActionType.DELETE_CART_SUCCESS:
    case usersActionType.INCREASE_QUANTITY_SUCCESS:
    case usersActionType.REDUCE_QUANTITY_SUCCESS:
    case usersActionType.CONFIRM_PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case usersActionType.ADD_CART_ERR:
    case usersActionType.DELETE_CART_ERR:
      return {
        ...state,
        isLoading: false,
        err: payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
