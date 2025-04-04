import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Tick from "../../assets/tick.jpeg";

import { paymentStatus } from "../../Redux/Reducers/Payment/paymentStatusSlice";

const PaymentSuccess = () => {
  const { session_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentSuccess, setPaymentSuccess] = useState(true);

  useEffect(() => {
    handleSuccessPayment();
  }, []);

  const handleSuccessPayment = async () => {
    try {
      if (session_id) {
        setPaymentSuccess(false);
        const userId = localStorage.getItem("userId");
        if (userId) {
          const result = await dispatch(
            paymentStatus({
              userId,
              sessionId: session_id,
              paymentStatus: true,
            })
          ).unwrap();

          if (result.status) {
            localStorage.setItem("isPaid", "true");
            setTimeout(() => {
              navigate("/dashboard/report");
            }, 1000);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return paymentSuccess ? (
    <div className="flex min-h-[80vh] items-center justify-center">
      Loading...
    </div>
  ) : (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <div className="flex justify-center">
          <img src={Tick} alt="tick" className="w-[100px]" />
        </div>

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          Payment Successful!
        </h1>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
