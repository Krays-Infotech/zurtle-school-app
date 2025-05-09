import React, { useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";
import logo from "../../assets/Login/LoginLogo.svg";
import flyingHuman from "../../assets/Login/flyingHuman.svg";
import google from "../../assets/Login/google.svg";
import apple from "../../assets/Login/apple.png";
import fb from "../../assets/Login/fb.svg";
import configuration from "../../config/configuration";
import { Link } from "react-router-dom";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const googleLogin = async (e) => {
    window.location.href = `${configuration.baseUrl}${configuration.apis.googleLogin}`;
  };

  return (
    <div className="patternBg min-h-screen flex items-center justify-center">
      <div className="loginBg w-[95%] sm:w-[90%] lg:w-[70%] sm:h-[75vh] lg:h-[80vh] rounded-xl shadow-md flex items-center justify-center p-2">
        <div className="flex flex-col sm:flex-row w-full max-w-4xl p-5  sm:p-40 md:p-20  gap-9">
          <div className="w-[400px] hidden md:flex flex-col  justify-center">
            <p className="text-white text-3xl tracking-wider  text-left font-inter">
              Sign In to <br /> Expolarity.ai
            </p>
            <div className="flex justify-end  mb-4">
              <img src={flyingHuman} alt="student" className="w-40 sm:w-72" />
            </div>
            <p className="text-white text-left font-gilory text-[13px]">
              If you don’t have an account
              <br /> you can {""}
              <Link to={"/register"} className="cursor-pointer">
                <span className="text-[#38B76C]">Register here!</span>
              </Link>
            </p>
          </div>

          <div className="w-full md:w-[300px] ">
            <div className="flex  justify-end md:-mt-10 mb-7">
              <img src={logo} alt="logo" className="w-28" />
            </div>

            <form className="flex md:items-end flex-col md:w-[300px]">
              <div className="relative w-full ">
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full border bg-[#EAF0F7] border-gray-300 p-3 pl-10 rounded-md text-sm outline-none"
                    placeholder="Enter Email"
                    required
                  />
                  <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-400">
                    <LuUserRound />
                  </span>
                </div>
              </div>

              <div className="relative w-full  pt-4">
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full border border-gray-300 bg-[#EAF0F7] p-2 pl-10 pr-10 rounded-md text-xl outline-none"
                    placeholder="••••••••"
                    required
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
              </div>
              <p className="text-xs font-gilory text-[#C7C7C7] pt-2 cursor-pointer">
                Recover Password ?
              </p>

              <div className="mt-9 w-full  text-center bg-[#38B76C] rounded-[8px] p-2 cursor-pointer">
                <button type="button" className="gilory-medium text-white ">
                  Sign In
                </button>
              </div>

              <p className="md:hidden text-xs font-gilory text-[#C7C7C7] pt-2 cursor-pointer flex items-center gap-1 justify-center">
                Don't have an Account Click here to
                <Link
                  to={"/register"}
                  className="text-[#38B76C] underline cursor-pointer"
                >
                  Register
                </Link>
              </p>
            </form>

            <div className="flex py-9 items-center  font-gilory ">
              <div className="flex-grow border-t border-[#DFDFDF]"></div>
              <span className="flex-shrink mx-4 text-white text-xs">
                Or continue with
              </span>
              <div className="flex-grow border-t border-[#DFDFDF]"></div>
            </div>

            <div
              onClick={() => googleLogin()}
              className="bg-white cursor-pointer gap-3 gilory-medium flex items-center justify-center p-2 py-3 rounded-[8px]"
            >
              <img src={google} alt="google" className="w-5 drop-shadow-2xl" />
              <p className="text-gray-500">Sign in with Google</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
