import React, { useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";
import logo from "../../assets/Login/loginLogo.svg";
import flyingHuman from "../../assets/Login/flyingHuman.svg";
import google from "../../assets/Login/google.svg";
import apple from "../../assets/Login/apple.png";
import fb from "../../assets/Login/fb.svg";
import configuration from "../../config/configuration";

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
      <div className="loginBg h-[85vh] rounded-xl shadow-md flex items-center justify-center ">
        <div className="flex flex-col sm:flex-row w-full max-w-4xl p-5  sm:p-40 md:p-20  gap-9">
          <div className="w-[400px] hidden md:flex flex-col ">
            <p className="text-white text-3xl tracking-wider  text-left font-inter">
              Sign In to <br /> Expolarity.ai
            </p>
            <div className="flex justify-end  mb-4">
              <img src={flyingHuman} alt="student" className="w-40 sm:w-64" />
            </div>
            <p className="text-white text-left font-gilory">
              If you don’t have an account
              <br /> you can {""}
              <span className="text-[#38B76C]">Register here!</span>
            </p>
          </div>

          <div className="w-full md:w-[300px] ">
            <div className="flex  justify-end md:-mt-14 mb-7">
              <img src={logo} alt="logo" className="w-28" />
            </div>

            <form className="flex md:items-end flex-col">
              <div className="relative w-full md:w-[300px]">
                {/* <label
                htmlFor="username"
                className="block text-left text-white text-sm py-2"
              >
                Username
              </label> */}
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full border bg-[#EAF0F7] border-gray-300 p-3 pl-10 rounded-md text-sm outline-none"
                    placeholder="Enter Email"
                    required
                    // onChange={handleChange}
                  />
                  <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-400">
                    <LuUserRound />
                  </span>
                </div>
              </div>

              <div className="relative w-full md:w-[300px] pt-4">
                {/* <label
                htmlFor="password"
                className="block text-left text-white text-sm py-2"
              >
                Password
              </label> */}
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full border border-gray-300 bg-[#EAF0F7] p-2 pl-10 pr-10 rounded-md text-xl outline-none"
                    // placeholder="Enter Password"
                    placeholder="••••••••"
                    required
                    // onChange={handleChange}
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

              <div className="mt-9 w-full md:w-[300px] text-center bg-[#38B76C] rounded-[8px] p-2 cursor-pointer">
                <button type="button" className="gilory-medium text-white ">
                  Sign In
                </button>
              </div>
            </form>

            <div className="flex py-9 items-center  font-gilory ">
              <div className="flex-grow border-t border-[#DFDFDF]"></div>
              <span className="flex-shrink mx-4 text-white text-xs">
                Or continue with
              </span>
              <div className="flex-grow border-t border-[#DFDFDF]"></div>
            </div>

            <div className="flex gap-5 items-center justify-center">
              <div
                onClick={() => googleLogin()}
                className="bg-white cursor-pointer w-[90px] flex items-center justify-center p-2 py-3 rounded-[8px]"
              >
                <img
                  src={google}
                  alt="google"
                  className="w-5 drop-shadow-2xl"
                />
              </div>

              <div className="bg-white cursor-pointer w-[90px] flex items-center justify-center p-2 py-2.5 rounded-[8px]">
                <img src={apple} alt="apple" className="w-5 drop-shadow-2xl" />
              </div>

              <div className="bg-white cursor-pointer w-[90px] flex items-center justify-center p-2 py-3 rounded-[8px]">
                <img src={fb} alt="fb" className="w-5 drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { saveTestReport } from "../../Redux/Reducers/Assessment/SaveTestReport";
// import { LuUserRound } from "react-icons/lu";
// import { FaLock } from "react-icons/fa";
// import telescopeImg from "../../assets/telescope.png";
// import mapImg from "../../assets/map.png";
// import locationMap from "../../assets/locationMap.png";
// import plantImg from "../../assets/plant.png";
// import mascotImg from "../../assets/mascot.png";
// import logoImg from "../../assets/logo.png";
// import flower from "../../assets/flower.png";
// import googleImg from "../../assets/google.png";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import configuration from "../../config/configuration";

// const Login = () => {
//   const [loginDetails, setLoginDetails] = useState({});
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginDetails((prev) => ({ ...prev, [name]: value }));
//   };
//   const togglePasswordVisibility = () => {
//     setPasswordVisible((prev) => !prev);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Login Details", loginDetails);
//     navigate("/studentdashboard");
//   };

//   const googleLogin = async (e) => {
//     window.location.href = `${configuration.baseUrl}${configuration.apis.googleLogin}`;
//   };

//   console.log(
//     "endpoint",
//     `${configuration.baseUrl}${configuration.apis.googleLogin}`
//   );

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white px-6 relative font-golos">
//       <img
//         src={telescopeImg}
//         className="absolute top-50 left-60 w-24 hidden lg:block"
//         alt="Telescope"
//       />
//       <img
//         src={mapImg}
//         className="absolute top-60 right-60 w-[100px] h-[75px] hidden lg:block"
//         alt="Map"
//       />
//       <img
//         src={locationMap}
//         className="absolute top-8 right-24 w-[115px] h-[78px] hidden lg:block"
//         alt="Location Map"
//       />
//       <img
//         src={plantImg}
//         className="absolute bottom-8 left-14 w-[151px] h-[151px] hidden lg:block"
//         alt="Plant"
//       />
//       <img
//         src={mascotImg}
//         className="absolute bottom-20 right-50 w-[135px] h-[145px] hidden lg:block"
//         alt="Mascot"
//       />
//       <img src={flower} className="absolute bottom-0 right-0" alt="Flower" />

//       <div className="bg-white rounded-3xl px-10 py-12 max-w-md w-full text-center ">
//         <div className="flex flex-col items-center">
//           <img src={logoImg} alt="Expolarity" className="w-16 mb-2" />
//           <h1 className="text-3xl font-bold text-gray-700">Expolarity.AI</h1>
//           <p className="text-sm text-gray-400 py-6">Login</p>
//         </div>

//         <form className="space-y-6">
// <div className="relative">
//   <label
//     htmlFor="username"
//     className="block text-left text-gray-600 text-sm py-2"
//   >
//     Username
//   </label>
//   <div className="relative">
//     <input
//       type="text"
//       id="username"
//       name="username"
//       className="w-full border border-gray-300 p-3 pl-10 rounded-md text-sm outline-none"
//       placeholder="Enter Email"
//       required
//       onChange={handleChange}
//     />
//     <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-400">
//       <LuUserRound />
//     </span>
//   </div>
// </div>

//           <div className="relative">
//             <label
//               htmlFor="password"
//               className="block text-left text-gray-600 text-sm py-2"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 className="w-full border border-gray-300 p-3 pl-10 pr-10 rounded-md text-sm outline-none"
//                 placeholder="Enter Password"
//                 required
//                 onChange={handleChange}
//               />
//               <span className="absolute top-[50%] left-3 transform -translate-y-1/2 text-gray-400">
//                 <FaLock />
//               </span>
//               <span
//                 className="absolute top-[50%] right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
//                 onClick={togglePasswordVisibility}
//               >
//                 {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#076555] hover:bg-green-800 text-white p-3 rounded-md transition duration-200"
//           >
//             Login
//           </button>
//           <div className="text-center ">
//             <p className="text-xs text-gray-600 flex items-center justify-center space-x-2">
//               <span className="w-[40px] h-[1px] bg-gray-300"></span>
//               <span>Or</span>
//               <span className="w-[40px] h-[1px] bg-gray-300"></span>
//             </p>
//           </div>
//           <div className="flex justify-center pt-4">
//             <button
//               type="button"
//               onClick={() => googleLogin()}
//               className="bg-white border cursor-pointer border-gray-300 rounded-lg p-5 flex items-center gap-2 text-sm hover:bg-gray-100 transition"
//             >
//               <img src={googleImg} alt="Google" className="h-6 w-6" />
//               <span>Sign in with Google</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
