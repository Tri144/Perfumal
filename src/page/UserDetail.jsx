import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserDetail = () => {
  const { users } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const SeeDetail = (productId) => {
    navigate(`/products/${productId}`);
  };
  if (users !== null) {
    const date = Object.keys(users[0].history).slice(
      1,
      Object.keys(users[0].history).length
    );
    return (
      <div className="w-full bg-[#006666] h-5/6 overflow-y-scroll">
        <div className="w-[60%] m-auto">
          <p className="text-2xl font-bold text-white">History</p>
          {date.map((values, index) => (
            <div key={index} className="bg-white mb-5 rounded-lg">
              {Object.values(users[0].history[values]).map((items, index) => (
                <div
                  key={index}
                  className="flex flex-wrap  border-b w-[95%] m-auto"
                >
                  <div className="w-full font-bold">
                    <p>{items.date}</p>
                  </div>
                  <div className="w-1/5">
                    <img src={items.imageUrl} alt="" />
                  </div>
                  <div className="w-4/5">
                    <p className="font-bold">{items.productName}</p>
                    <p>Quantity: {items.quantity}</p>
                    <p className="font-bold">{items.quantity * items.price}</p>
                    <button
                      className="border rounded-lg px-4 py-2"
                      onClick={() => SeeDetail(items.productId)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default UserDetail;
