import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { HiOutlineTrash } from "react-icons/hi2";

import {
  IncreaseQuantity,
  reduceQuantity,
  DeleteCart,
  confirmPayment,
} from "../../redux/reducers/users/users.action";

const CheckOut = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const Increase = (values) => {
    dispatch(IncreaseQuantity(values));
  };
  const reduce = (values) => {
    if (values.quantity === 1) {
      Swal.fire({
        title: "Do you to delete",
        showCancelButton: true,
        confirmButtonText: "OK",
        denyButtonText: `Cancel`,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(DeleteCart(values));
        }
      });
    } else {
      dispatch(reduceQuantity(values));
    }
  };
  const navigate = useNavigate();
  const continueShopping = () => {
    navigate("/products");
  };
  const notify = () => toast.success("Payment Complete");
  const ConfirmPayment = (users) => {
    Swal.fire({
      title: "Do you to buy",
      showCancelButton: true,
      confirmButtonText: "Ok",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(confirmPayment(users));
        for (let items of users) {
          dispatch(DeleteCart(items));
        }
        notify();
      }
    });
  };
  const Delete = (items) => {
    Swal.fire({
      title: "Do you to delete",
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteCart(items));
      }
    });
  };
  const total = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i]?.price * arr[i]?.quantity;
    }
    return sum;
  };
  const ship = Math.floor(Math.random() * 10) + 1;
  if (users != null) {
    const myUsers = Object.values(users[0]?.cart.items).slice(
      1,
      Object.values(users[0]?.cart.items).length
    );
    const userName = Object.values(users)[0].userName;
    if (myUsers.length === 0) {
      return (
        <div className="w-full m-autu bg-[#006666] h-5/6 flex flex-col justify-center items-center">
          <div>
            <img
              src="https://salt.tikicdn.com/desktop/img/mascot@2x.png"
              className="flex-col justify-center"
            />
          </div>
          <button
            onClick={continueShopping}
            className="bg-green-500 py-2 rounded-lg mt-5 px-3 hover:bg-green-200"
          >
            Continue shopping
          </button>
        </div>
      );
    }
    return (
      <div className="bg-[#006666] w-full h-5/6 overflow-y-scroll">
        <div className="w-[80%] m-auto py-5">
          <h1 className="text-2xl text-white font-bold mb-5">Cart</h1>
          <div className="flex flex-wrap justify-between">
            <div className="md:w-[65%] w-full">
              {myUsers.map((values, index) => (
                <div
                  key={index}
                  className="bg-white flex flex-wrap mb-5 relative rounded-lg py-3"
                >
                  <div className="w-1/3">
                    <img
                      src={values.imageUrl}
                      className="w-auto h-[150px] p-2"
                    />
                  </div>
                  <div className="w-2/3">
                    <p className="font-bold text-xl">{values.productName}</p>
                    <p className="text-lg">{values.description}</p>
                    <p>
                      Price:{" "}
                      <span className="text-red-500">${values.price}</span>
                    </p>
                  </div>
                  <button
                    className="absolute right-0 top-0"
                    onClick={() => {
                      Delete(values);
                    }}
                  >
                    <HiOutlineTrash size={30}></HiOutlineTrash>
                  </button>
                  <div className="flex w-1/5 ml-2 bg-gray-200 rounded-lg">
                    <button
                      className="w-1/3 text-[#FF7300]"
                      onClick={() => {
                        reduce(values);
                      }}
                    >
                      -
                    </button>
                    <span className="w-1/3 text-center ">
                      {values.quantity}
                    </span>
                    <button
                      className="w-1/3 text-[#FF7300]"
                      onClick={() => {
                        Increase(values);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:w-[30%] w-full auto-rows-min h-full rounded-md flex flex-row-reverse flex-wrap">
              <div className="w-full bg-white rounded-lg py-3  mb-5">
                <h2 className="text-2xl font-bold text-center">Your payment</h2>
              </div>
              <div className="flex flex-wrap bg-white justify-between text-xl font-bold px-3 w-full py-3 rounded-lg">
                <div className="w-1/2">
                  <p>Total:</p>
                  <p>Shipment Cost:</p>
                  <p>Final:</p>
                </div>
                <div className="text-red-500 text-right w-1/2">
                  <p>${total(myUsers).toFixed(2)}</p>
                  <p>${ship}</p>
                  <p>${(total(myUsers) + ship).toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => ConfirmPayment(myUsers)}
                className="bg-[#009999] text-white font-bold rounded-lg w-full py-3 mt-5"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CheckOut;
