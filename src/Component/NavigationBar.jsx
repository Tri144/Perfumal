import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../redux/reducers/users/users.action";
import logo from "../images/logo.png";
import { BsCart, BsPerson } from "react-icons/bs";
const NavigationBar = () => {
  const { isLoading, users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  if (users != null) {
    const myUsers = users[0];
    return (
      <div className="bg-[#00b3b3] h-1/6">
        <div className="w-[95%] md:w-[80%] m-auto flex h-full">
          <NavLink
            to="/home"
            className="md:w-1/5 w-2/3 h-full flex items-center"
          >
            <div className="w-1/2 h-full">
              <img src={logo} alt="Logo" className="h-full m-auto" />
            </div>
            <h1 className="font-bold text-black text-2xl w-1/2">Perfumer</h1>
          </NavLink>
          <div className="md:flex md:w-3/5 hidden items-center justify-center">
            <NavLink to={"/products"} className="text-2xl font-bold">
              Products
            </NavLink>
          </div>
          <div className="md:w-1/5 flex items-center w-1/3 justify-center">
            <div className="md:mr-5 md:block">
              <NavLink
                to={"/userDetail"}
                className="flex flex-col items-center"
              >
                <BsPerson size={50}></BsPerson>
                {Object.values(myUsers?.userName)}
              </NavLink>
            </div>
            <div className="md:block hidden">
              <NavLink to={"/checkout"} className="relative">
                <BsCart size={50} className="py-1"></BsCart>
                <span className="absolute top-0 right-0 border rounded-full py-1/2 px-1 text-sm bg-red-300">
                  {Object.values(myUsers?.cart.items).length - 1}
                </span>
              </NavLink>
            </div>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    );
  }
};

export default NavigationBar;
