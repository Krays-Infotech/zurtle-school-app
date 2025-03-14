import React, { useState, useEffect, useRef } from "react"; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Options from "../Options/Options";
import { storeQuestionResponse } from "../../Redux/Reducers/Assessment/StoreSlice";
import { getQuestions } from "../../Redux/Reducers/Assessment/GetQuestionsSlice";
import logoImg from "../../assets/logo.png";
import questionmark from "../../assets/questionMarkLogo.png";
import testbg from "../../assets/testbg.png";
import progressline from "../../assets/progressline.png";

const QUESTIONS_PER_PAGE = 5;

const GetAssessment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFetched = useRef(false);

  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFetched.current) {
      fetchQuestions();
      isFetched.current = true;
    }
  }, []);

  const fetchQuestions = async () => {
    setLoading(true); 
    const resultResponse = await dispatch(getQuestions());

    if (resultResponse?.payload?.status === true) {
      setQuestions(resultResponse.payload.data);
      setTotalQuestions(resultResponse.payload.data.length);
    }
    setLoading(false); 
  };

  useEffect(() => {
    if (totalQuestions > 0) {
      setTotalPages(Math.ceil(totalQuestions / QUESTIONS_PER_PAGE));
    }
  }, [totalQuestions]);

  const handleSelectOption = (questionId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const isPageCompleted = () => true;

  const next = () => {
    if (isPageCompleted()) {
      if (currentIndex + QUESTIONS_PER_PAGE < totalQuestions) {
        setCurrentIndex(currentIndex + QUESTIONS_PER_PAGE);
      } else {
        const formattedData = Object.entries(selectedOptions)
          .map(([questionId, option]) => ({
            questionId,
            option: {
              id: option?.id || "",
              option: option?.option || "",
              points: option?.points || 0,
            },
          }))
          .filter(Boolean);

        dispatch(storeQuestionResponse(formattedData));
        setIsCompleted(true);
      }
    }
  };

  const pre = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - QUESTIONS_PER_PAGE);
  };

  return (
    <div className="min-h-screen flex justify-center font-golos py-8">
      <div className="relative w-full max-w-4xl rounded-xl p-10">
        {loading ? (
          <div className="text-center text-gray-700">
            <p className="text-lg font-semibold">Loading Questions...</p>
          </div>
        ) : (
          <div className="text-center mb-8 relative bg-cover bg-no-repeat bg-black/10 h-[280px]"
            style={{ backgroundImage: `url(${testbg})` }}>
            
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

            {isCompleted ? (
              <div className="text-center text-gray-700">
                <h2 className="text-2xl font-semibold">Your Test has been completed successfully.</h2>
                <p className="mt-2 text-lg text-gray-500">Thank You</p>
                {/* Login Button to View Results */}
                <button
                  onClick={() => navigate("/login")}
                  className="mt-4 px-6 py-3 bg-[#DBF4E5] rounded-md shadow-md transition-all"
                >
                  Please Login to View the Result
                </button>
              </div>
            ) : (
              <>
                <div className="w-full flex items-center justify-center">
                  <div className="w-[60%]">
                    <div className="pr-4">
                      {questions
                        .slice(currentIndex, currentIndex + QUESTIONS_PER_PAGE)
                        .map((q, idx) => (
                          <div key={currentIndex + idx} className="mb-6">
                            <div className="flex justify-start items-center space-x-4">
                              <p className="text-gray-700 text-lg text-justify font-semibold">
                                {currentIndex + idx + 1}. {q.question}
                              </p>
                            </div>
                            <Options
                              options={q.options}
                              selectedOption={selectedOptions[q.id]}
                              onSelectOption={(option) => handleSelectOption(q.id, option)}
                              questionIndex={q.id}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            {!isCompleted && (
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
                >
                  {currentIndex + QUESTIONS_PER_PAGE < totalQuestions ? "Next" : "Finish"}
                </button>
              </div>
            )}

            {/* Progress Bar */}
            <div className="relative w-full h-32 items-center justify-center hidden md:block">
              <div
                className="absolute w-full h-[100px] top-1/2 -translate-y-1/2 bg-cover"
                style={{ backgroundImage: `url(${progressline})` }}
              />
              <div className="absolute left-10 bottom-5 w-14 h-14 bg-[#F0FBDA] rounded-full"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bottom-0 bg-[#38B76C] rounded-full shadow-lg"></div>
              <div className="absolute right-10 bottom-20 w-14 h-14 bg-[#F0FBDA] rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAssessment;
