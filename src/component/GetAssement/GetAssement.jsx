import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import Options from "../Options/Options";
import { dummyQuestions } from "../../utils/data";
import student from "../../assets/student.png";

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
    <div className="min-h-screen  font-quicksand">
   {/* Main Card */}
   <div className=" flex justify-center">
<div className="relative w-full max-w-lg bg-white  rounded-xl p-6 border border-gray-200 pt-10">
  {/* Image inside the container at the top-right */}
  <img
    src={student}
    alt="Student Illustration"
    className="absolute top-2 right-2 w-16 lg:w-[30%]"
  />

  {isCompleted ? (
    <div className="text-center py-30">
      <p className="text-xl font-semibold text-gray-700 ">You Have Successfully Completed Your Test!</p>
      <button
        className="mt-5 bg-[#735CFC] hover:bg-blue-600 transition-all duration-200 rounded-md text-white px-6 py-2 text-md shadow-md"
        onClick={() => navigate("/studentDashBoard")}
      >
        View Result
      </button>
    </div>
  ) : (
    <>
      {/* Progress Circle */}
      <div className="flex justify-center items-center mb-6">
  <div className="relative w-24 h-24"> 
    <svg className="w-full h-full">
      {/* Background Circle */}
      <circle
        className="text-gray-300"
        strokeWidth="8" 
        stroke="currentColor"
        fill="transparent"
        r="40"  
        cx="48"
        cy="48"
      />
      {/* Progress Circle */}
      <circle
        className="text-[#735CFC] transition-all duration-500 ease-out"
        strokeWidth="8" 
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="40"
        cx="48"
        cy="48"
        strokeDasharray="251" 
        strokeDashoffset={`${251 - (currentIndex / totalQuestion) * 251}`}
      />
    </svg>
    {/* Percentage Display */}
    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#735CFC]">
      {Math.round((currentIndex / totalQuestion) * 100)}%
    </span>
  </div>
</div>


      {/* Question */}
      <div className="text-xl font-semibold  text-center mb-4 py-4">
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
            className="bg-[#735CFC] hover:bg-gray-300 text-white hover:text-gray-700 rounded-md px-4 py-2 text-md shadow-md transition-all"
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
</div>
    </div>
  );
};

export default GetAssessment;
