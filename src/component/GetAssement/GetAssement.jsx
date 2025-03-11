import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Options from "../Options/Options";
import { dummyQuestions } from "../../utils/data";
import logoImg from "../../assets/logo.png";
import questionmark from "../../assets/questionMarkLogo.png";
import testbg from "../../assets/testbg.png";
import progressline from "../../assets/progressline.png";

const GetAssessment = () => {
  const [totalQuestion] = useState(dummyQuestions.length);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();

  const pre = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const next = () => {
    if (currentIndex < dummyQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
      console.log("Selected options:", selectedOptions);
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOptions((prev) => ({ ...prev, [currentIndex]: option }));
    setTimeout(() => next(), 300);
  };

  return (
    <div className="min-h-screen flex justify-center  font-golos py-8">
      {/* Main Card */}
      <div className="relative w-full max-w-4xl  rounded-xl p-10  ">
        {/* Header */}
        <div
          className="text-center mb-8 relative bg-cover bg-no-repeat bg-black/10 h-[280px] "
          style={{ backgroundImage: `url(${testbg})` }}
        >
          <div className="absolute left-50 top-30 transform -translate-y-1/2">
            <img src={questionmark} alt="Expolarity" className="w-16" />
          </div>

          <div className="absolute right-50 top-30 transform -translate-y-1/2">
            <img src={questionmark} alt="Expolarity" className="w-16" />
          </div>

          <div className="flex flex-col items-center  p-12  ">
            <img src={logoImg} alt="Expolarity" className="w-16 mb-2" />
            <h1 className="text-3xl font-bold text-gray-700">Expolarity</h1>
          </div>
          {isCompleted ? (
          <div className="text-center ">
            <p className="text-xl font-semibold text-gray-700">
              Your Test has done Successfully.
            </p>
            <p className="text-xl font-semibold text-gray-700">Thank You</p>
            <button
              className="mt-5 bg-[#DBF4E5] transition-all duration-200 rounded-md text-black px-6 py-2 text-md shadow-md"
              onClick={() => navigate("/login")}
            >
               Please log in to view the result.
            </button>
          </div>
        ) : (
          <>
            {/* Question */}
            <div className="text-xl font-semibold text-center mb-4">
              <p>{dummyQuestions[currentIndex].question}</p>
            </div>

            {/* Options */}
            <Options
              options={dummyQuestions[currentIndex].options}
              selectedOption={selectedOptions[currentIndex]}
              onSelectOption={handleSelectOption}
            />

            {/* Navigation Buttons */}
            <div className="flex items-center justify-end gap-3 py-4">
              {currentIndex !== 0 && (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 text-md shadow-md transition-all"
                  onClick={pre}
                >
                  Previous
                </button>
              )}
              <p className="text-sm text-gray-500">
                {currentIndex + 1} / {totalQuestion}
              </p>
            </div>
          </>
        )}
        </div>

        {/* Question Section */}
       
        <div className="relative w-full h-32 flex items-center justify-center mt-26">
          {/* Background Line */}
          <div
            className="absolute w-full h-[100px] top-1/2 -translate-y-1/2 bg-cover"
            style={{ backgroundImage: `url(${progressline})` }}
          />

          {/* Circles */}
          <div className="absolute left-10 bottom-5 w-14 h-14 bg-[#F0FBDA] rounded-full"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bottom-0 bg-[#38B76C] rounded-full shadow-lg"></div>
          <div className="absolute right-10 bottom-20 w-14 h-14 bg-[#F0FBDA] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default GetAssessment;
