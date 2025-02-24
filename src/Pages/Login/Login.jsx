import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Details", loginDetails);
    navigate("/dashboard");
  };

  return (
    <div className="bg-[#735CFC]/20 w-full flex items-center justify-center min-h-screen bg-cover bg-center px-4 font-quicksand">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden max-w-[800px] w-full">
        {/* Left Side Image */}
        <div className="hidden md:flex w-1/2  bg-gray-50">
          <img src={loginImg} alt="Login Illustration" className=" object-contain" />
        </div>

        {/* Right Side Form */}
        <form className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8" onSubmit={handleSubmit}>
          <div className="w-full space-y-6">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-2">Welcome Back,</h2>
              <p className="text-sm text-gray-500">Please Enter Login Details Below</p>
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 p-3 rounded-md text-sm outline-none"
                  placeholder="Enter Email"
                  required
                  onChange={handleChange}
                />
                <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
                  <LuUserRound />
                </span>
              </div>

              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  className="w-full border border-gray-300 p-3 rounded-md text-sm outline-none"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-gray-600 text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="h-4 w-4 cursor-pointer" />
                <span className="ml-2">Remember me</span>
              </label>
              <p className="cursor-pointer underline">Forgot Password?</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-[#735CFC] rounded-md p-3 text-white text-sm md:text-base font-semibold transition duration-200 ${
                loading ? "cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                "Sign in"
              )}
            </button>

            {/* Register Link */}
            <p className="text-xs text-center text-gray-500">
              Don't have an account yet?{" "}
              <Link to="/" className="text-blue-500 font-semibold">
                Register now!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
