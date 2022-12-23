import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import configureStore from "./redux/store/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { usePromiseTracker } from "react-promise-tracker";
import ScrollToTop from "./Component/ScrollToTop";
const store = configureStore();

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress && <h1>Hey some async call in progress ! </h1>;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer autoClose={500} />
        <ScrollToTop />
        <App />
        <LoadingIndicator></LoadingIndicator>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
