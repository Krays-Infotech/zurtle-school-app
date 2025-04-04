import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const PaymentFailure = () => {
  const { session_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current) {
      handleFailurePayment();
      isFetched.current = true;
    }
  }, []);

  const handleFailurePayment = async () => {
    if (session_id) {
      const userId = localStorage.getItem("id");
      await dispatch(
        paymentStatus({ userId, sessionId: session_id, paymentStatus: false })
      );

      localStorage.setItem("isPaid", "false");
    } else {
      navigate("/careerMatch?isLogin=True");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-16 w-16 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 9l-6 6m0-6l6 6"
            ></path>
          </svg>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-red-700">
          Payment Failed!
        </h1>
        <p className="mt-2 text-gray-600">
          Something went wrong with your payment. Please try again.
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate("/studentdashboard")}
            className="inline-block rounded-lg bg-red-500 px-6 py-2 text-white transition duration-300 hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
