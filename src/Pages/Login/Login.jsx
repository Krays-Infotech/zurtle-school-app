import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuUserRound } from "react-icons/lu";
import { FaLock } from "react-icons/fa";
import telescopeImg from "../../assets/telescope.png";
import mapImg from "../../assets/map.png";
import locationMap from "../../assets/locationMap.png";
import plantImg from "../../assets/plant.png";
import mascotImg from "../../assets/mascot.png";
import logoImg from "../../assets/logo.png";
import flower from "../../assets/flower.png";
import googleImg from "../../assets/google.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Details", loginDetails);
    navigate("/studentdashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 relative font-golos">
      <img
        src={telescopeImg}
        className="absolute top-50 left-60 w-24 hidden lg:block"
        alt="Telescope"
      />
      <img
        src={mapImg}
        className="absolute top-60 right-60 w-[100px] h-[75px] hidden lg:block"
        alt="Map"
      />
      <img
        src={locationMap}
        className="absolute top-8 right-24 w-[115px] h-[78px] hidden lg:block"
        alt="Location Map"
      />
      <img
        src={plantImg}
        className="absolute bottom-8 left-14 w-[151px] h-[151px] hidden lg:block"
        alt="Plant"
      />
      <img
        src={mascotImg}
        className="absolute bottom-20 right-50 w-[135px] h-[145px] hidden lg:block"
        alt="Mascot"
      />
      <img src={flower} className="absolute bottom-0 right-0" alt="Flower" />

      {/* Login Form */}
      <div className="bg-white rounded-3xl px-10 py-12 max-w-md w-full text-center ">
        {/* Logo and Title */}
        <div className="flex flex-col items-center">
          <img src={logoImg} alt="Expolarity" className="w-16 mb-2" />
          <h1 className="text-3xl font-bold text-gray-700">Expolarity</h1>
          <p className="text-sm text-gray-400 py-6">Login</p>
        </div>

        {/* Input Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          {/* <div className="relative">
            <label
              htmlFor="username"
              className="block text-left text-gray-600 text-sm py-2"
            >
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                className="w-full border border-gray-300 p-3 pl-10 rounded-md text-sm outline-none"
                placeholder="Enter Email"
                required
                onChange={handleChange}
              />
              <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-400">
                <LuUserRound />
              </span>
            </div>
          </div> */}

          {/* Password Field */}
          {/* <div className="relative">
            <label
              htmlFor="password"
              className="block text-left text-gray-600 text-sm py-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="w-full border border-gray-300 p-3 pl-10 pr-10 rounded-md text-sm outline-none"
                placeholder="Enter Password"
                required
                onChange={handleChange}
              />
              <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-400">
                <FaLock />
              </span>
              <span
                className="absolute top-[50%] right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div> */}

          {/* Submit Button */}
          {/* <button
            type="submit"
            className="w-full bg-[#076555] hover:bg-green-800 text-white p-3 rounded-md transition duration-200"
          >
            Login
          </button> */}
          {/* <div className="text-center ">
            <p className="text-xs text-gray-600 flex items-center justify-center space-x-2">
              <span className="w-[40px] h-[1px] bg-gray-300"></span>
              <span>Or</span>
              <span className="w-[40px] h-[1px] bg-gray-300"></span>
            </p>
          </div> */}
            {/* Google Login */}
            <div className="flex justify-center pt-4">
              <button className="bg-white border border-gray-300 rounded-lg p-5 flex items-center gap-2 text-sm hover:bg-gray-100 transition">
                <img src={googleImg} alt="Google" className="h-6 w-6" />
                <span>Sign in with Google</span>
              </button>
            </div>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
