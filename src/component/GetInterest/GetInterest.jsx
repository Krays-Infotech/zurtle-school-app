import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import InterestOptions from "../InterestOptions/InterestOptions";
import logoImg from "../../assets/logo.png";
import questionmark from "../../assets/questionMarkLogo.png";
import testbg from "../../assets/testbg.png";
import { dummyTopics } from "../../utils/data";

const QUESTIONS_PER_PAGE = 4;

const GetInterest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFetched = useRef(false);

  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedInterestOptions, setSelectedInterestOptions] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [heading, setHeading] = useState("");

  useEffect(() => {
    if (!isFetched.current) {
      const formattedQuestions = dummyTopics.flatMap((topic) =>
        topic.questions.map((q) => ({
          id: q.id,
          options: q.options,
          topic: topic.topic,
        }))
      );

      setQuestions(formattedQuestions);
      setTotalQuestions(formattedQuestions.length);
      setTotalPages(Math.ceil(formattedQuestions.length / QUESTIONS_PER_PAGE));
      
      if (formattedQuestions.length > 0) {
        setHeading(formattedQuestions[0].topic);
      }

      isFetched.current = true;
    }
  }, []);

  const handleSelectOption = (questionId, updatedSelection) => {
    setSelectedInterestOptions((prev) => ({
      ...prev,
      [questionId]: updatedSelection,
    }));
  };

  const next = () => {
    if (currentIndex + QUESTIONS_PER_PAGE < totalQuestions) {
      setCurrentIndex(currentIndex + QUESTIONS_PER_PAGE);
      if (questions[currentIndex + QUESTIONS_PER_PAGE]) {
        setHeading(questions[currentIndex + QUESTIONS_PER_PAGE].topic);
      }
    } else {
      console.log("Final Selections before processing:", selectedInterestOptions);
  
      // Initialize formatted selection structure
      const formattedSelection = [
        { category: "Realistic", options: [], count: 0 },
        { category: "Investigative", options: [], count: 0 },
        { category: "Artistic", options: [], count: 0 },
        { category: "Social", options: [], count: 0 },
        { category: "Enterprising", options: [], count: 0 },
        { category: "Conventional", options: [], count: 0 },
      ];
  
      Object.entries(selectedInterestOptions).forEach(([questionId, selectedLabels]) => {
        const question = questions.find(q => q.id.toString() === questionId.toString());
  
        if (question) {
          selectedLabels.forEach(label => {
            const selectedOption = question.options.find(opt => opt.label === label);
  
            if (selectedOption) {
              const categoryName = selectedOption.category;
  
              // Ensure the selected category exists in formattedSelection
              const categoryIndex = formattedSelection.findIndex(item => item.category === categoryName);
              if (categoryIndex !== -1) {
                formattedSelection[categoryIndex].options.push(label);
                formattedSelection[categoryIndex].count += 1;
              }
            }
          });
        }
      });
  
      // Remove empty categories (categories with count = 0)
      const filteredFormattedSelection = formattedSelection.filter(item => item.count > 0);
  
      console.log("Final formatted selection:", filteredFormattedSelection);
  
      if (filteredFormattedSelection.length > 0) {
        navigate("/getAssement", { state: { selectedInterestOptions: filteredFormattedSelection } });
        setIsCompleted(true);
      } else {
        console.error("Error: No valid selections were processed!");
      }
    }
  };  

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - QUESTIONS_PER_PAGE);
      if (questions[currentIndex - QUESTIONS_PER_PAGE]) {
        setHeading(questions[currentIndex - QUESTIONS_PER_PAGE].topic);
      }
    }
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
            <h1 className="text-3xl font-bold text-gray-700">Expolarity.AI</h1>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          {heading}
        </h2>

        {!isCompleted ? (
          <div className="w-full flex items-center justify-center">
            <div className="w-full">
              {questions
                .slice(currentIndex, currentIndex + QUESTIONS_PER_PAGE)
                .map((q, idx) => (
                  <div key={currentIndex + idx} className="mb-6">
                    <div className="flex justify-start items-center space-x-4">
                      <p className="text-gray-700 text-lg text-justify font-semibold">
                        {currentIndex + idx + 1}. {q.question}
                      </p>
                    </div>
                    <InterestOptions
                      options={q.options}
                      selectedOptions={selectedInterestOptions[q.id] || []}
                      onSelectOption={(updatedSelection) => handleSelectOption(q.id, updatedSelection)}
                      questionIndex={q.id}
                    />
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-700">
            <h2 className="text-2xl font-semibold">Test Completed!</h2>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-6 py-3 bg-[#DBF4E5] rounded-md shadow-md transition-all"
            >
              Login to View Results
            </button>
          </div>
        )}

        {!isCompleted && (
          <div className="flex items-center justify-between py-4">
            {currentIndex > 0 && (
              <button
                className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2"
                onClick={prev}
              >
                Previous
              </button>
            )}
            <p className="text-sm text-gray-500">
              Page {Math.ceil(currentIndex / QUESTIONS_PER_PAGE) + 1} of {totalPages}
            </p>
            <button
              className="px-4 py-2 rounded-md shadow-md text-white bg-green-500 hover:bg-green-600"
              onClick={next}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetInterest;
