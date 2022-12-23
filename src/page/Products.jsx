import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../redux/reducers/products/products.action";
const Products = ({ show, setShow }) => {
  const { isLoading, products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const SeeDetail = (productId) => {
    navigate(`/products/${productId}`);
    setShow(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  if (isLoading === true) {
    return <div className="bg-black text-white">isLoading</div>;
  }
  if (isLoading === false) {
    return (
      <div className="flex flex-wrap w-full bg-[#006666] h-5/6 justify-center">
        <div className="w-[80%] m-auto h-full flex justify-between">
          <div
            className={`${
              show ? "md:w-[70%] w-[100%] p-5" : "hidden"
            } bg-white overflow-y-auto mt-5 rounded-lg `}
          >
            <Outlet></Outlet>
          </div>
          <div
            className={`${
              show ? "w-[20%]" : " w-full"
            } h-full flex flex-wrap justify-between overflow-y-auto`}
          >
            {products.map((product, index) => (
              <div
                key={index}
                className={`my-5 ${
                  show
                    ? "md:w-[100%] md:block hidden"
                    : "md:w-[30%] sm:w-[40%] w-[60%] mx-auto"
                }`}
                onClick={() => SeeDetail(product.productId)}
              >
                <div className="bg-white h-full border flex flex-col border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <div className="h-full">
                    <img
                      className="rounded-lg m-auto h-full w-auto"
                      src={product.imageUrl}
                    />
                  </div>
                  <div className="p-5 flex justify-between mb-2 font-bold tracking-tight dark:text-white text-center">
                    <h5
                      className={`${
                        show ? "text-sm" : "text-lg"
                      } text-gray-900`}
                    >
                      {product.productName}
                    </h5>
                    <h5
                      className={`${show ? "text-sm" : "text-lg"} text-red-500`}
                    >
                      ${product.price}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Products;
