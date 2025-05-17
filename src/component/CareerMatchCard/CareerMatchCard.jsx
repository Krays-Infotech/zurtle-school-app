import React, { useEffect, useState } from "react";
import BasicDetails from "../BasicDetails/BasicDetails";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUnlockAlt } from "react-icons/fa";
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
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [user, setUserId] = useState(null);

  const [detailsCompleted, setDetailsCompleted] = useState(false);

  const loading = useSelector((state) => state.getResult.loading);

  const [basicData, setBasicData] = useState(null);

  useEffect(() => {
    sendIds();
    setBasicData(JSON.parse(sessionStorage.getItem("studentDetails")) || null);
  }, []);

  const sendIds = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const isLogin = params.get("isLogin");
      const userId = params.get("userId");

      const reqId = JSON.parse(sessionStorage.getItem("assessmentId"));

      if (userId) {
        setUserId(userId);
        sessionStorage.setItem("userId", userId);
        console.log("userId", userId);
      }

      if (userId && reqId) {
        const data = {
          reqId,
          userId,
        };
        const res = await dispatch(saveUserIds(data)).unwrap();
        console.log(res);
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
    // if (isProfileCompleted && location.pathname === "/careerMatch") {
    fetchRecommendation();
    // }
  }, [isProfileCompleted, location.pathname]);

  const fetchRecommendation = async () => {
    try {
      console.log("working");
      const userId = user || JSON.parse(sessionStorage.getItem("userId"));
      const res = await dispatch(getResult(userId)).unwrap();
      if (res) {
        setRecommendation(res?.career_recommendations);
        sessionStorage.setItem("isPaid", JSON.stringify(res?.payment_status));
        sessionStorage.setItem("studentDetails", JSON.stringify(res.student));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const seeCarrerPath = async (career) => {
    const paid = JSON.parse(sessionStorage.getItem("isPaid")) || null;

    if (paid) {
      navigate(`/careerPath/${career}`);
    } else {
      setIsPaymentCompleted(true);
    }
  };

  const payloading = useSelector((state) => state.createPayment.loading);

  const handlePayment = async () => {
    const values = {
      amount: 5,
      userId: user || JSON.parse(sessionStorage.getItem("userId")),
      paymentFor: "Assessment",
      currencyType: "cad",
    };

    console.log(values);

    const res = await dispatch(createPayment({ values })).unwrap();
    if (res) {
      window.location.href = res?.data?.paymentUrl;
    }
  };

  const PaymentModel = ({ setIsPaymentCompleted, handlePayment }) => {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center relative">
        <button
          onClick={() => setIsPaymentCompleted(false)}
          className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Unlock Advanced Career Path Insights
        </h2>

        <p className="text-gray-600 mb-6">
          Dive deeper into your personalized career trajectory with exclusive
          insights curated by experts. Understand your strengths, ideal
          industries, skill gaps, and next steps — tailored just for you!
        </p>

        <button
          onClick={handlePayment}
          className="flex cursor-pointer items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-semibold hover:bg-green-600 transition w-full"
        >
          {payloading ? (
            "Loading..."
          ) : (
            <>
              Pay $5 to See My Advanced Career Path" <FaUnlockAlt />
            </>
          )}
        </button>

        <p className="text-sm text-gray-500 mt-4">
          One-time payment. Instant access. No hidden charges.
        </p>
      </div>
    );
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
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* {!isProfileCompleted && !basicData && (
            <div className="fixed inset-0 z-50 flex items-center backdrop-blur-sm justify-center bg-gray-400/30 ">
              <BasicDetails setIsProfileCompleted={setIsProfileCompleted} />
            </div>
          )} */}

          {isPaymentCompleted && (
            <div className="fixed inset-0 z-50 flex items-center backdrop-blur-sm justify-center bg-gray-400/30 ">
              <PaymentModel
                setIsPaymentCompleted={setIsPaymentCompleted}
                handlePayment={handlePayment}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CareerMatchCard;
