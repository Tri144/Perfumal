import productsActionType from "./products.actionType";
import firebaseDb from "../../../firebase";
import { onValue, ref } from "firebase/database";

export const getProductsStart = () => ({
  type: productsActionType.GET_PRODUCTS_START,
});

export const getProductsSuccess = (products) => ({
  type: productsActionType.GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const getProductsErr = (err) => ({
  type: productsActionType.GET_PRODUCTS_ERR,
  payload: err,
});

export const getProducts = () => {
  return function (dispatch) {
    dispatch(getProductsStart());
    onValue(ref(firebaseDb), (snapshot) => {
      try {
        if (snapshot.val() !== null) {
          const db = Object.values(snapshot.val());
          dispatch(getProductsSuccess(db[0]));
        }
      } catch (err) {
        dispatch(getProductsErr(err));
      }
    });
  };
};
