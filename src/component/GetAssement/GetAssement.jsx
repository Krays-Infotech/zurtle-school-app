import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Options from "../Options/Options";
import { dummyQuestions } from "../../utils/data";
import logoImg from "../../assets/logo.png";
import questionmark from "../../assets/questionMarkLogo.png";
import testbg from "../../assets/testbg.png";
import progressline from "../../assets/progressline.png";

const QUESTIONS_PER_PAGE = 5; // Number of questions per page

const GetAssessment = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate();

  const totalPages = Math.ceil(dummyQuestions.length / QUESTIONS_PER_PAGE);

  const handleSelectOption = (questionIndex, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const isPageCompleted = () => {
    const start = currentIndex;
    const end = Math.min(start + QUESTIONS_PER_PAGE, dummyQuestions.length);
    for (let i = start; i < end; i++) {
      if (!selectedOptions[i]) return false;
    }
    return true;
  };

  const next = () => {
    if (isPageCompleted()) {
      if (currentIndex + QUESTIONS_PER_PAGE < dummyQuestions.length) {
        setCurrentIndex(currentIndex + QUESTIONS_PER_PAGE);
      } else {
        console.log("Selected options:", selectedOptions);
        navigate("/login"); // Navigate after completing all questions
      }
    }
  };

  const pre = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - QUESTIONS_PER_PAGE);
  };

  return (
    <div className="min-h-screen flex justify-center font-golos py-8">
      <div className="relative w-full max-w-4xl rounded-xl p-10">
        <div
          className="text-center mb-8 relative bg-cover bg-no-repeat bg-black/10 h-[280px]"
          style={{ backgroundImage: `url(${testbg})` }}
        >
          <div className="absolute left-50 top-30 transform -translate-y-1/2">
            <img src={questionmark} alt="Expolarity" className="w-16" />
          </div>

          <div className="absolute right-50 top-30 transform -translate-y-1/2">
            <img src={questionmark} alt="Expolarity" className="w-16" />
          </div>

          <div className="flex flex-col items-center p-12">
            <img src={logoImg} alt="Expolarity" className="w-16 mb-2" />
            <h1 className="text-3xl font-bold text-gray-700">Expolarity</h1>
          </div>

          {/* Display Five Questions */}
          {dummyQuestions
            .slice(currentIndex, currentIndex + QUESTIONS_PER_PAGE)
            .map((q, idx) => (
              <div key={currentIndex + idx} className="mb-6">
                <div className="flex items-center space-x-4 ml-60">
                  <p className="text-gray-700 text-lg font-semibold">
                    {currentIndex + idx + 1}. {q.question}
                  </p>
                  <p className="text-gray-500 text-sm">Select one option.</p>
                </div>
                <Options
                  options={q.options}
                  selectedOption={selectedOptions[currentIndex + idx]}
                  onSelectOption={(option) =>
                    handleSelectOption(currentIndex + idx, option)
                  }
                  questionIndex={currentIndex + idx}
                />
              </div>
            ))}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between py-4">
            {currentIndex > 0 && (
              <button
                className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 shadow-md transition-all"
                onClick={pre}
              >
                Previous
              </button>
            )}

            <p className="text-sm text-gray-500">
              Page {currentIndex / QUESTIONS_PER_PAGE + 1} of {totalPages}
            </p>

            <button
              className={`px-4 py-2 rounded-md shadow-md text-white ${
                isPageCompleted()
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={next}
              disabled={!isPageCompleted()}
            >
              {currentIndex + QUESTIONS_PER_PAGE < dummyQuestions.length
                ? "Next"
                : "Finish"}
            </button>
          </div>
          <div className="relative w-full h-32 flex items-center justify-center ">
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
    </div>
  );
};

export default GetAssessment;
