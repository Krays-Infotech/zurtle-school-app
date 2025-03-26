import React from "react";
import { FiArrowRight } from "react-icons/fi";
import trophy from "../../assets/tropy.png";

const recommendations = [
  {
    id: 1,
    title: "Test 2",
    description: "Lorem ipsum is a dummy or placeholder text commonly used.",
  },
  {
    id: 2,
    title: "Test 2",
    description: "Lorem ipsum is a dummy or placeholder text commonly used.",
  },
  {
    id: 3,
    title: "Test 2",
    description: "Lorem ipsum is a dummy or placeholder text commonly used.",
  },
];

const ResultPage = () => {
  return (
    <div className="flex flex-col items-center justify-center font-roboto min-h-screen bg-gradient-to-b from-[#E0F7FA] to-[#E0F2F1] px-4 py-16">
      {/* Result Section */}
      <div className="text-center w-full max-w-2xl px-4">
        <h2 className="text-[#292D32] text-[28px] md:text-[36px] ">
          Your Result
        </h2>
        <div className="mt-2">
          <div className="flex items-center justify-center">
            <img src={trophy} alt="Trophy" className="w-16 h-16 md:w-20 md:h-20 " />
          </div>
          <p className="text-[32px] md:text-[40px]  mt-2 text-[#292D32]">
            76 of 100
          </p>
        </div>
        <p className="text-[36px] md:text-[48px] text-[#076555]  mt-2">
          Great
        </p>
        <p className="text-[#076555] text-[18px] md:text-[24px] mt-2 leading-[1.4] w-full px-2 md:px-4">
          You score higher than <span className="">65%</span> of the
          people <br className="hidden md:block" /> who have taken these tests.
        </p>
      </div>

      {/* Recommendations Section */}
      <div className="mt-10 w-full max-w-3xl px-4">
        <h3 className="text-gray-700  text-[18px] md:text-[20px] mb-4">
          My Recommendations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommendations.map((test) => (
            <div
              key={test.id}
              className="bg-white shadow-lg rounded-lg p-4 text-center"
            >
              <h4 className="text-gray-700  text-[16px] md:text-[18px]">
                {test.title}
              </h4>
              <p className="text-sm text-gray-500 mt-1">{test.description}</p>
              <button className="mt-3 flex items-center justify-center gap-2 bg-[#076555] text-white w-full px-4 py-2 rounded-md text-[14px]  hover:bg-green-700">
                Take Test <FiArrowRight />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
