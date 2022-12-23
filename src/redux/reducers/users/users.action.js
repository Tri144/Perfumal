import usersActionType from "./users.actionType";
import firebaseDb from "../../../firebase";
import { onValue, ref, set, remove } from "firebase/database";
import { uid } from "uid";

export const getUsersStart = () => ({
  type: usersActionType.GET_USERS_START,
});

export const getUsersSuccess = (users) => ({
  type: usersActionType.GET_USERS_SUCCESS,
  payload: users,
});

export const getUsersErr = (err) => ({
  type: usersActionType.GET_PRODUCTS_ERR,
  payload: err,
});

export const addCartStart = () => ({
  type: usersActionType.ADD_CART_START,
});

export const addCartSuccess = () => ({
  type: usersActionType.ADD_CART_SUCCESS,
});

export const addCartErr = (err) => ({
  type: usersActionType.ADD_CART_ERR,
  payload: err,
});

export const deleteCartStart = () => ({
  type: usersActionType.DELETE_CART_START,
});

export const deleteCartSuccess = () => ({
  type: usersActionType.DELETE_CART_SUCCESS,
});

export const deleteCartErr = (err) => ({
  type: usersActionType.DELETE_CART_ERR,
  payload: err,
});

// export const IncreaseQuantityStart = () => ({
//   type: usersActionType.INCREASE_QUANTITY_START,
// });

export const IncreaseQuantitySuccess = () => ({
  type: usersActionType.INCREASE_QUANTITY_SUCCESS,
});

// export const IncreaseQuantityErr = (err) => ({
//   type: usersActionType.INCREASE_QUANTITY_ERR,
//   payload: err,
// });

export const reduceQuantitySuccess = () => ({
  type: usersActionType.REDUCE_QUANTITY_SUCCESS,
});

export const ConfirmPaymentSuccess = () => ({
  type: usersActionType.CONFIRM_PAYMENT_SUCCESS,
});

export const getUsers = () => {
  return function (dispatch) {
    dispatch(getUsersStart());
    onValue(ref(firebaseDb), (snapshot) => {
      try {
        if (snapshot.val() !== null) {
          const db = Object.values(snapshot.val());
          dispatch(getUsersSuccess(db[1]));
        }
      } catch (err) {
        dispatch(getUsersErr(err));
      }
    });
  };
};

export const AddUser = (product) => {
  return function (dispatch) {
    dispatch(addCartStart());
    set(
      ref(firebaseDb, `/users/0/cart/items/${product.productId}`),
      product,
      () => {
        dispatch(addCartSuccess());
      }
    );
  };
};

export const DeleteCart = (values) => {
  return function (dispatch) {
    dispatch(deleteCartStart());
    remove(ref(firebaseDb, `/users/0/cart/items/${values.productId}`), () => {
      dispatch(deleteCartSuccess());
    });
  };
};

export const IncreaseQuantity = (values) => {
  return function (dispatch) {
    set(
      ref(firebaseDb, `/users/0/cart/items/${values.productId}`),
      { ...values, quantity: values.quantity + 1 },
      () => {
        dispatch(IncreaseQuantitySuccess());
      }
    );
  };
};

export const reduceQuantity = (values) => {
  return function (dispatch) {
    set(
      ref(firebaseDb, `/users/0/cart/items/${values.productId}`),
      { ...values, quantity: values.quantity - 1 },
      () => {
        dispatch(reduceQuantitySuccess());
      }
    );
  };
};

export const confirmPayment = (items) => {
  return function (dispatch) {
    const date = new Date().getTime();
    set(ref(firebaseDb, `/users/0/history/${date}`), items, () => {
      dispatch(ConfirmPaymentSuccess());
    });
  };
};
