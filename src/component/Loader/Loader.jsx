import React from "react";
import loader from "../../assets/gif/save.gif";

const Loader = () => {
  return (
    <div className="gilory-medium flex flex-col items-center justify-center w-full min-h-screen">
      <img src={loader} alt="Animated GIF" className="w-[150px]" />
      <p className="mt-2 text-center">Loading...</p>
    </div>
  );
};

export default Loader;
