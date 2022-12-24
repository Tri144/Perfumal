import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { AddUser } from "../../redux/reducers/users/users.action";
import { toast } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
const ProductDetail = ({ show, setShow }) => {
  const [quantity, setQuantity] = useState(1);
  const productId = useParams();
  useEffect(() => {
    setQuantity(1);
  }, [productId.productId]);
  const { products } = useSelector((state) => state.products);
  const productsDetail = products[productId.productId - 1];
  const Increase = () => {
    setQuantity(quantity + 1);
  };
  const Decrease = () => {
    setQuantity(quantity - 1);
  };
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const notify = () => toast("Add to cart complete");
  const AddToCart = (productsDetail, cart) => {
    notify();
    const product = {
      productId: productsDetail.productId,
      productName: productsDetail.productName,
      description: productsDetail.description,
      price: productsDetail.price,
      imageUrl: productsDetail.imageUrl,
      quantity: (cart[productsDetail.productId]?.quantity || 0) + quantity,
      date: new Date().toDateString(),
      dayBuy: new Date().toLocaleString().split(",")[0],
    };
    dispatch(AddUser(product));
    setQuantity(1);
  };
  const closed = () => {
    setShow(false);
  };
  if (productsDetail != null) {
    const cart = users[0].cart.items;
    return (
      <div className="bg-white w-full h-full rounded-lg relative">
        <div className="w-4/5 m-auto flex flex-col rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="h-full">
            <img
              className="rounded-lg m-auto h-[400px] w-auto"
              src={productsDetail.imageUrl}
            />
          </div>
          <div className="p-5 flex justify-between mb-2 font-bold tracking-tight dark:text-white text-center">
            <h5 className={`${show ? "text-sm" : "text-lg"} text-gray-900`}>
              {productsDetail.productName}
            </h5>
            <h5 className={`${show ? "text-sm" : "text-lg"} text-red-500`}>
              ${productsDetail.price}
            </h5>
          </div>
        </div>
        <div className="flex w-full justify-between p-6">
          <div className="w-1/3 bg-gray-200 rounded-lg font-bold flex justify-between items-center">
            <button
              className="w-1/3 m-auto text-red-500"
              onClick={Decrease}
              disabled={quantity === 1 ? true : false}
            >
              -
            </button>
            <span className="w-1/3 m-auto text-center text-green-500">
              {quantity}
            </span>
            <button className="w-1/3 m-auto text-blue-500" onClick={Increase}>
              +
            </button>
          </div>
          <div className="w-1/3">
            <button
              className="bg-blue-500 py-2 w-full m-auto rounded-lg font-bold text-white"
              onClick={() => AddToCart(productsDetail, cart)}
            >
              Add to cart
            </button>
          </div>
        </div>
        <div className="w-full">
          <p className="font-bold">Description :</p>
          <p>{productsDetail.description}</p>
        </div>
        <button
          className="rounded-full bg-gray-300 absolute top-0 right-0 py-2 px-4"
          onClick={closed}
        >
          X
        </button>
      </div>
    );
  } else {
    return <div className="bg-black h-screen text-white">Loading</div>;
  }
};

export default ProductDetail;
