import React from "react";
import Scientist from "../../assets/scientist.png";
import GoldStar from "../../assets/goldStar.png";
import { BsRocketTakeoff } from "react-icons/bs";

const CareerMatchCard = () => {
  return (
    <div className=" font-roboto  px-4 ">
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

        <h3 className="text-xl md:text-2xl font-semibold text-[#076555] mt-6 flex items-center gap-2">
          Let's see what suits you best!
          <span className="text-red-700">
            <BsRocketTakeoff />
          </span>
        </h3>

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
      </div>
    </div>
  );
};

export default CareerMatchCard;
