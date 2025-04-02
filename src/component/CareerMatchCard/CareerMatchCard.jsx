import React, { useEffect, useState } from "react";
import Scientist from "../../assets/scientist.png";
import GoldStar from "../../assets/goldStar.png";
import BasicDetails from "../BasicDetails/BasicDetails";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaUnlockAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { saveUserIds } from "../../Redux/Reducers/Login/saveUser";

const CareerMatchCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProfileCompleted, setIsProfileCompleted] = useState(null);

  useEffect(() => {
    sendIds();
  }, []);

  const sendIds = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const isLogin = params.get("isLogin");
      const userId = params.get("userId");

      const reqId = localStorage.getItem("assessmentId");

      if (userId) {
        localStorage.setItem("userId", userId);
      }

      const data = {
        reqId,
        userId,
      };

      const res = await dispatch(saveUserIds(data)).unwrap();

      if (isLogin === "True") {
        setIsProfileCompleted(true);
      }
      navigate("/careerMatch");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" font-roboto  px-4 relative">
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="text-center max-w-2xl pt-16">
          <h2 className="text-[20px] md:text-[24px] font-semibold ">
            Your Result
          </h2>
          <p className="text-gray-600 mt-2 text-[14px] md:text-[16px]">
            Your Perfect Career Match!
          </p>
        </div>

        <div className="w-full md:w-[80%] lg:w-[73%] text-center">
          <p className="text-gray-600 mt-2 text-[14px] md:text-[16px]">
            Hey there! Based on the test you just took, we've analyzed your
            personality, interests, and skills to find the best career options
            for you. These careers will match your natural strengths and make
            you feel happy and successful in the future!
          </p>
        </div>

        <div className="w-full flex justify-center mt-3">
          <div className="relative w-full max-w-3xl text-center py-2">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-green-100 to-white"></div>
            <p className="relative text-green-800 font-semibold">
              Let's see what suits you best! 🚀
            </p>
          </div>
        </div>

        <div className="bg-[#750AD5] shadow-md rounded-2xl p-6 mt-4 flex flex-col items-center w-full max-w-sm">
          <img
            src={Scientist}
            alt="Scientist"
            className="w-24 h-24 md:w-28 md:h-28"
          />
          <h3 className="text-[24px] md:text-[28px] text-white mt-4">
            Scientists
          </h3>
          <button className="mt-4 bg-white text-[#750AD5] px-4 py-2 rounded-lg text-[16px] md:text-[20px] font-semibold">
            See your Career Path
          </button>
        </div>

        <p className="text-[13px] md:text-[14px] mt-2 text-center max-w-md">
          Kids who love exploring, experimenting, and discovering new things!
        </p>

        <div className="mt-6 max-w-lg">
          <h4 className="text-[14px] md:text-[16px] font-semibold">
            Why it fits you
          </h4>
          <ul className="py-4 space-y-4">
            <li className="flex items-center text-[14px] md:text-[16px]">
              <img src={GoldStar} alt="star" className="w-5 h-5 mr-2" />
              You are very organized and focused (High Conscientiousness).
            </li>
            <li className="flex items-center text-[14px] md:text-[16px]">
              <img src={GoldStar} alt="star" className="w-5 h-5 mr-2" />
              Learning new things and thinking creatively (High Openness).
            </li>
            <li className="flex items-center text-[14px] md:text-[16px]">
              <img src={GoldStar} alt="star" className="w-5 h-5 mr-2" />
              You enjoy solving problems and figuring out how things work.
            </li>
          </ul>
        </div>

        <motion.div
          className="fixed bottom-6 right-6 "
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
        >
          <button className="flex items-center cursor-pointer gap-2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-semibold hover:bg-green-600 transition">
            Pay to Explore More <FaUnlockAlt />
          </button>
        </motion.div>
      </div>

      {!isProfileCompleted && (
        <div className="fixed inset-0 z-50 flex items-center backdrop-blur-sm justify-center bg-gray-400/30 ">
          <BasicDetails setIsProfileCompleted={setIsProfileCompleted} />
        </div>
      )}
    </div>
  );
};

export default CareerMatchCard;
