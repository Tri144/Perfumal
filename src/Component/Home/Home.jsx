import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/reducers/products/products.action";
import { useEffect } from "react";
import Slideshow from "./SlideShow";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const goToStore = () => {
    navigate("/products/1");
  };
  let productsImg = [];
  if (products != null) {
    for (let i = 0; i < products.length; i++) {
      productsImg.push(products[i].imageUrl);
    }
    return (
      <div className="w-full bg-[#006666] h-5/6 flex flex-wrap items-center overflow-y-auto">
        <div className="w-[80%] flex flex-wrap items-center m-auto h-full pt-10">
          <div className="lg:text-8xl text-5xl front-bold text-white lg:w-1/2 w-full text-center lg:p-10 lg:h-5/6 h-1/2 pt-8">
            Welcome to perfume store
          </div>
          <div className="lg:w-1/2 w-full md:h-5/6">
            <Slideshow productsImg={productsImg}></Slideshow>
          </div>
          <div className=" w-1/2 m-auto bg-[#006666]">
            <button
              className="bg-sky-500 rounded-lg w-full py-5 m-auto hover:bg-sky-700 shadow-2xl"
              onClick={goToStore}
            >
              Go to Store
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
