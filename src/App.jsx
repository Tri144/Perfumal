import NavigationBar from "./Component/NavigationBar";
import { Route, Routes, Navigate } from "react-router-dom";
import ProductDetail from "./Component/Products.jsx/ProductDetail";
import { useState } from "react";
import UserDetail from "./Component/User/UserDetail";
import Home from "./Component/Home/Home";
import Products from "./Component/Products.jsx/Products";
import CheckOut from "./Component/CartShopping/CheckOut";
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
