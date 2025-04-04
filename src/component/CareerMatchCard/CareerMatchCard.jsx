import React, { useEffect, useState } from "react";
import Scientist from "../../assets/scientist.png";
import GoldStar from "../../assets/goldStar.png";
import BasicDetails from "../BasicDetails/BasicDetails";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUnlockAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { saveUserIds } from "../../Redux/Reducers/Login/saveUser";
import { createPayment } from "../../Redux/Reducers/Payment/createPaymentSlice";
import { getResult } from "../../Redux/Reducers/Result/ResultSlice";
import loader from "../../assets/gif/save.gif";

const CareerMatchCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isProfileCompleted, setIsProfileCompleted] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState("");

  const loading = useSelector((state) => state.getResult.loading);

  useEffect(() => {
    sendIds();
  }, []);

  const sendIds = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const isLogin = params.get("isLogin");
      const userId = params.get("userId");
      console.log("userId", userId);

      // const reqId = localStorage.getItem("assessmentId");
      const reqId = JSON.parse(sessionStorage.getItem("assessmentId"));

      if (userId) {
        // localStorage.setItem("userId", userId);
        sessionStorage.setItem("userId", userId);

        const data = {
          reqId,
          userId,
        };
        const res = await dispatch(saveUserIds(data)).unwrap();
      }
      if (isLogin === "True") {
        setIsProfileCompleted(true);
      }
      navigate("/careerMatch");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (isProfileCompleted && location.pathname === "/careerMatch") {
      fetchRecommendation();
    }
  }, [isProfileCompleted, location.pathname]);

  const fetchRecommendation = async () => {
    try {
      const repId = JSON.parse(sessionStorage.getItem("assessmentId"));
      // const repId = localStorage.getItem("assessmentId");
      const res = await dispatch(getResult(repId)).unwrap();
      if (res) {
        setRecommendation(res?.career_recommendations);

        console.log("res?.career_recommendations", res?.career_recommendations);
        setStudentDetails(res.student);
        sessionStorage.setItem("studentDetails", JSON.stringify(res.student));
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(recommendation);

  const seeCarrerPath = async (career) => {
    console.log(career);
    navigate(`/careerPath/${career}`);
  };

  const handlePayment = async () => {
    const values = {
      amount: 5,
      userId: 5,
      paymentFor: "Assessment",
      currencyType: "cad",
    };

    const res = await dispatch(createPayment({ values })).unwrap();
    if (res) {
      window.location.href = res?.data?.paymentUrl;
    }
  };

  return (
    <>
      {loading ? (
        <div className="gilory-medium flex flex-col items-center justify-center w-full min-h-screen">
          <img src={loader} alt="Animated GIF" className="w-[150px]" />
          <p className="mt-2 text-center">Loading...</p>
        </div>
      ) : (
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
                personality, interests, and skills to find the best career
                options for you. These careers will match your natural strengths
                and make you feel happy and successful in the future!
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

            <div className="flex mt-9 mb-6 rounded-md flex-col w-[80%] items-center bg-gradient-to-b from-purple-600 to-indigo-900 py-12 px-5">
              <h2 className="text-3xl md:text-4xl text-white font-bold mb-6">
                Recommended Careers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {recommendation &&
                  recommendation.map((rec, i) => {
                    const prefix = rec.includes("[")
                      ? rec.substring(0, rec.indexOf("[")).trim()
                      : rec;
                    const traits = rec.includes("[")
                      ? rec
                          .substring(rec.indexOf("[") + 1, rec.indexOf("]"))
                          .trim()
                      : "";

                    const maxLength = 55;
                    const shortPrefix =
                      prefix.length > maxLength
                        ? prefix.slice(0, maxLength) + "..."
                        : prefix;

                    return (
                      <div
                        onClick={() => seeCarrerPath(prefix)}
                        key={i}
                        className="bg-white cursor-pointer shadow-lg rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                      >
                        <h3 className="text-[14px]  font-semibold text-gray-800">
                          {shortPrefix}
                        </h3>
                        {/* {traits && (
                          <p className="text-gray-600 text-[12px] mt-2">
                            {traits}
                          </p>
                        )} */}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* 
            <div className="bg-[#750AD5]  shadow-md rounded-2xl p-6 mt-4 flex flex-col items-center w-full max-w-sm">
              <img
                src={Scientist}
                alt="Scientist"
                className="w-24 h-24 md:w-28 md:h-28"
              />
              <h3 className="text-[24px] md:text-[28px] text-white mt-4">
                {recommendation && recommendation[0].split(" ")[0]}
              </h3>

              <button
                onClick={() => seeCarrerPath()}
                className="mt-4 cursor-pointer bg-white text-[#750AD5] px-4 py-2 rounded-lg text-[16px] md:text-[20px] font-semibold"
              >
                See your Career Path
              </button>
            </div>

            <p className="text-[13px] md:text-[14px] mt-2 text-center max-w-md">
              Kids who love exploring, experimenting, and discovering new
              things!
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
            </div> */}

            <motion.div
              className="fixed bottom-6 right-6 "
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
            >
              <button
                onClick={() => handlePayment()}
                className="flex items-center cursor-pointer gap-2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-semibold hover:bg-green-600 transition"
              >
                Pay $5 to Explore More <FaUnlockAlt />
              </button>
            </motion.div>
          </div>

          {!isProfileCompleted && (
            <div className="fixed inset-0 z-50 flex items-center backdrop-blur-sm justify-center bg-gray-400/30 ">
              <BasicDetails setIsProfileCompleted={setIsProfileCompleted} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CareerMatchCard;
