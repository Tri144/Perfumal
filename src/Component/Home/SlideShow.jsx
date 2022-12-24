import React from "react";
import { useState, useRef } from "react";
function Slideshow({ productsImg }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 2000;
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === productsImg.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
  return (
    <div className="slideshow flex flex-col h-full">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {productsImg.map((url, index) => (
          <div className="slide bg-white" key={index}>
            <img src={url} alt="" className="h-full m-auto rounded-full" />
          </div>
        ))}
      </div>
      <div className="slideshowDots h-1/4">
        {productsImg.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
