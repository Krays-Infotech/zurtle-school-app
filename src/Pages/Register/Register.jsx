import React, { useState } from "react";
import flyingHuman from "../../assets/Login/flyingHuman.svg";
import logo from "../../assets/Login/LoginLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { LuBook, LuUser, LuUserRound, LuGlobe } from "react-icons/lu";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useForm, Controller } from "react-hook-form";
import { registerUser } from "../../Redux/Reducers/Register/RegisterSLice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [countries] = useState(countryList().getData());
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#EAF0F7",
      borderColor: "#D1D5DB",
      borderRadius: "0.375rem",
      paddingLeft: "2rem",
      minHeight: "40px",
      fontSize: "0.875rem",
      boxShadow: state.isFocused ? "0 0 0 1px #38B76C" : provided.boxShadow,
      "&:hover": {
        borderColor: "#38B76C",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF",
    }),
  };

  const { loading } = useSelector((state) => state.registerUser);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      country: data.country?.label || "",
    };
    console.log("Submitted data:", formData);

    const res = await dispatch(registerUser(formData)).unwrap();
    console.log("result", res);
    navigate("/login");
  };

  return (
    <div className="patternBg min-h-screen flex items-center justify-center">
      <div className="loginBg w-[95%] sm:w-[90%] lg:w-[70%] h-full sm:h-[98vh] rounded-xl shadow-md flex items-center justify-center overflow-hidden">
        <div className="flex flex-col  sm:flex-row w-full max-w-4xl p-5 md:p-10 lg:p-16 gap-9">
          <div className="w-[400px] hidden md:flex flex-col justify-center">
            <p className="text-white text-3xl tracking-wider text-left font-inter">
              Sign In to <br /> Expolarity.ai
            </p>
            <div className="flex justify-end mb-4">
              <img src={flyingHuman} alt="student" className="w-40 sm:w-80" />
            </div>
            <p className="text-white text-left font-gilory">
              Already have an account
              <br /> you can{" "}
              <Link to={"/login"} className="cursor-pointer">
                <span className="text-[#38B76C]">Login here!</span>
              </Link>
            </p>
          </div>

          <div className="w-full md:w-[300px]">
            <div className="flex justify-end md:-mt-6 mb-7">
              <img src={logo} alt="logo" className="w-28" />
            </div>

            <form
              className="flex md:items-end flex-col sm:w-[300px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                {/* Name */}
                <div className="sm:w-[300px]">
                  <div className="relative">
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      className="w-full bg-[#EAF0F7] border-gray-300 p-3 pl-10 rounded-md text-sm outline-none"
                      placeholder="Enter Name"
                    />
                    <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-400">
                      <LuUserRound />
                    </span>
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs ">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Grade */}
                <div className="w-full pt-4">
                  <div className="relative">
                    <select
                      {...register("grade", {
                        required: "Grade is required",
                      })}
                      className="w-full border pl-9 bg-[#EAF0F7] border-gray-300 p-3 rounded-md text-sm outline-none"
                    >
                      <option value="">Select a Grade</option>
                      {[5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-400">
                      <LuBook />
                    </span>
                  </div>
                  {errors.grade && (
                    <p className="text-red-500 text-xs ">
                      {errors.grade.message}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div className="w-full pt-4">
                  <div className="relative">
                    <select
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      className="w-full border bg-[#EAF0F7] pl-9 border-gray-300 p-3 rounded-md text-sm outline-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-400">
                      <LuUser />
                    </span>
                  </div>
                  {errors.gender && (
                    <p className="text-red-500 text-xs ">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div className="w-full pt-4">
                  <div className="relative">
                    <Controller
                      control={control}
                      name="country"
                      rules={{ required: "Country is required" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={countries}
                          placeholder="Select your country"
                          styles={customStyles}
                        />
                      )}
                    />
                    <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-400">
                      <LuGlobe />
                    </span>
                  </div>
                  {errors.country && (
                    <p className="text-red-500 text-xs ">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative w-full pt-4">
                  <div className="relative">
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      className="w-full border bg-[#EAF0F7] border-gray-300 p-3 pl-10 rounded-md text-sm outline-none"
                      placeholder="Enter Email"
                    />
                    <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-400">
                      <LuUserRound />
                    </span>
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs ">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative w-full pt-4">
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      type={passwordVisible ? "text" : "password"}
                      className="w-full border border-gray-300 bg-[#EAF0F7] p-3 pl-10 pr-10 rounded-md text-sm outline-none"
                      placeholder="••••••••"
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
                  {errors.password && (
                    <p className="text-red-500 text-xs ">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex py-5 items-center font-gilory">
                  <div className="flex-grow border-t border-[#DFDFDF]"></div>
                  <span className="flex-shrink mx-4 text-white text-xs">
                    Click to Register
                  </span>
                  <div className="flex-grow border-t border-[#DFDFDF]"></div>
                </div>

                <button
                  type="submit"
                  className="gilory-medium text-white cursor-pointer w-full text-center bg-[#38B76C] rounded-[8px] p-2"
                >
                  {loading ? "Loading..." : "Sign Up"}
                </button>

                <p className="text-xs font-gilory text-[#C7C7C7] pt-2 cursor-pointer flex items-center gap-1 justify-center">
                  Already have an Account click here to{" "}
                  <Link
                    to={"/login"}
                    className="text-[#38B76C] underline cursor-pointer"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
