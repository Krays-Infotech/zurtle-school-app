import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { paymentStatus } from "../../Redux/Reducers/Payment/paymentStatusSlice";
import Tick from "../../assets/tick.jpeg";
import Cookies from "js-cookie";

const PaymentSuccess = () => {
  const { session_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleSuccessPayment();
  }, []);

  const handleSuccessPayment = async () => {
    try {
      if (session_id) {
        const userId = Cookies.get("userId");
        if (userId) {
          const result = await dispatch(
            paymentStatus({
              user_id: userId,
              session_id: session_id,
              payment_status: true,
            })
          ).unwrap();

          console.log("result", result);
          sessionStorage.setItem("isPaid", true);

          setTimeout(() => {
            navigate("/careerMatch");
          }, 1500);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      {loading ? (
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 animate-spin text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-sm">Verifying your payment...</p>
        </div>
      ) : (
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl transition-all duration-300">
          <img src={Tick} alt="tick" className="mx-auto w-20 mb-4" />
          <h1 className="text-2xl font-semibold text-green-600">
            Payment Successful!
          </h1>
          <p className="mt-2 text-gray-700">
            Thank you for your payment. You’re being redirected...
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
