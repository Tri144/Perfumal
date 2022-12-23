import NavigationBar from "./Component/NavigationBar";
import { Route, Routes, Navigate } from "react-router-dom";
import ProductDetail from "./Component/ProductDetail";
import { useState } from "react";
import UserDetail from "./page/UserDetail";
import Home from "./page/Home";
import Products from "./page/Products";
import CheckOut from "./page/CheckOut";
function App() {
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  return (
    <div className="App bg-[#E5E7EB] h-screen">
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"}></Navigate>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route
          path="/products"
          element={<Navigate to={"/products/1"}></Navigate>}
        ></Route>
        <Route
          path="/products"
          element={<Products show={show} setShow={setShow}></Products>}
        >
          <Route
            path=":productId"
            element={
              <ProductDetail
                quantity={quantity}
                setQuantity={setQuantity}
                show={show}
                setShow={setShow}
              />
            }
          ></Route>
        </Route>
        <Route path="/checkout" element={<CheckOut />}></Route>
        <Route path="/userDetail" element={<UserDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
