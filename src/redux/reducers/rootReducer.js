import productsReducer from "./products/products.reducers";
import usersReducer from "./users/users.reducers";
import { combineReducers } from "redux";

const rootReducer = () =>
  combineReducers({
    products: productsReducer,
    users: usersReducer,
  });

export default rootReducer;
