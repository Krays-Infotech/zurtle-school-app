import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Options from "../Options/Options";
import { getQuestions } from "../../Redux/Reducers/Assessment/GetQuestionsSlice";
import logoImg from "../../assets/logo.png";
import questionmark from "../../assets/questionMarkLogo.png";
import testbg from "../../assets/testbg.png";
import { saveTestReport } from "../../Redux/Reducers/Assessment/SaveTestReport";

const QUESTIONS_PER_PAGE = 5;

const GetAssessment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isFetched = useRef(false);

  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Retrieve selected interest options
  const selectedInterestOptions = location.state?.selectedInterestOptions || {};

  useEffect(() => {
    if (!isFetched.current) {
      fetchQuestions();
      isFetched.current = true;
    }
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    const res = await dispatch(getQuestions()).unwrap();

    const questionsData = res.reduce((acc, curr) => {
      if (!acc[curr.type]) {
        acc[curr.type] = [];
      }

      acc[curr.type].push(curr);
      return acc;
    }, {});

    const updatedQuestion = questionsData.SINGLE.map((d) => ({
      ...d,
      options: [
        { value: "A", label: d.option_a },
        { value: "B", label: d.option_b },
        { value: "C", label: d.option_c },
        { value: "D", label: d.option_d },
      ],
    }));

    const combained = [...questionsData.RATING, ...updatedQuestion];

    setQuestions(combained);
    setTotalQuestions(combained.length);
    setLoading(false);
  };

  useEffect(() => {
    if (totalQuestions > 0) {
      setTotalPages(Math.ceil(totalQuestions / QUESTIONS_PER_PAGE));
    }
  }, [totalQuestions]);

  const handleSelectOption = (questionId, option) => {
    console.log(questionId, option);
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // const isPageCompleted = () => true;
  const isPageCompleted = () => {
    const currentPageQuestions = questions.slice(
      currentIndex,
      currentIndex + QUESTIONS_PER_PAGE
    );

    return currentPageQuestions.every(
      (q) =>
        selectedOptions[q.id] !== undefined && selectedOptions[q.id] !== null
    );
  };

  const getSelectedOptionsString = (topicName) => {
    const topicData = selectedInterestOptions.find(
      (item) => item.topic === topicName
    );

    if (topicData) {
      return topicData.selectedOptions.join(", ");
    } else {
      return null;
    }
  };

  const next = async () => {
    if (isPageCompleted()) {
      if (currentIndex + QUESTIONS_PER_PAGE < totalQuestions) {
        setCurrentIndex(currentIndex + QUESTIONS_PER_PAGE);
      } else {
        const areYou = getSelectedOptionsString("Are you?");
        const canYou = getSelectedOptionsString("Can you?");
        const likeTo = getSelectedOptionsString("Like to?");

        const intrestData = {
          176: areYou,
          177: canYou,
          178: likeTo,
        };

        const answers = {
          // ...selectedInterestOptions,
          ...selectedOptions,
          ...intrestData,
        };

        console.log("Answers", answers);
        const res = await dispatch(saveTestReport(answers)).unwrap();
        console.log("response", res);

        setIsCompleted(true);
      }
    }
  };

  const pre = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - QUESTIONS_PER_PAGE);
  };

  return (
    <div className="min-h-screen patternBg flex justify-center font-golos py-8">
      <div className="relative w-full max-w-4xl rounded-xl p-10">
        {loading ? (
          <div className="text-center text-gray-700">
            <p className="text-lg font-semibold">Loading Questions...</p>
          </div>
        ) : (
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
              <h1 className="text-3xl font-bold text-gray-700">
                Expolarity.AI
              </h1>
            </div>

            {isCompleted ? (
              <div className="text-center text-gray-700">
                <h2 className="text-2xl font-semibold">
                  Your Test has been completed successfully.
                </h2>
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
                      {questions &&
                        questions
                          .slice(
                            currentIndex,
                            currentIndex + QUESTIONS_PER_PAGE
                          )
                          .map((q, idx) => (
                            <div key={currentIndex + idx} className="mb-6">
                              <div className="flex justify-start items-center space-x-4">
                                <p className="text-gray-700 text-lg text-justify font-semibold">
                                  {currentIndex + idx + 1}. {q.question}
                                </p>
                              </div>

                              {q.type === "RATING" && (
                                <Options
                                  options={[1, 2, 3, 4, 5]}
                                  selectedOption={selectedOptions[q.id]}
                                  onSelectOption={(option) =>
                                    handleSelectOption(q.id, option)
                                  }
                                  questionIndex={q.id}
                                  type={"RATING"}
                                />
                              )}

                              {q.type === "SINGLE" && (
                                <Options
                                  options={q.options}
                                  selectedOption={selectedOptions[q.id]}
                                  onSelectOption={(option) =>
                                    handleSelectOption(q.id, option)
                                  }
                                  questionIndex={q.id}
                                  type={"SINGLE"}
                                />
                              )}
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
                    type="submit"
                    className="bg-green-500 cursor-pointer hover:bg-green-600 text-white rounded-md px-4 py-2 shadow-md transition-all"
                    onClick={pre}
                  >
                    Previous
                  </button>
                )}

                <p className="text-sm text-gray-500">
                  Page {currentIndex / QUESTIONS_PER_PAGE + 1} of {totalPages}
                </p>

                {/* <button
                  type="submit"
                  className={`px-4 py-2 rounded-md shadow-md text-white cursor-pointer ${
                    isPageCompleted()
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={next}
                >
                  {currentIndex + QUESTIONS_PER_PAGE < totalQuestions
                    ? "Next"
                    : "Finish"}
                </button> */}

                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md shadow-md text-white cursor-pointer ${
                    isPageCompleted()
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={next}
                  disabled={!isPageCompleted()}
                >
                  {currentIndex + QUESTIONS_PER_PAGE < totalQuestions
                    ? "Next"
                    : "Finish"}
                </button>
              </div>
            )}

            {/* Progress Bar with Moving Circles */}
            <div className="relative w-full h-32  items-center justify-center hidden md:block">
              {/* SVG Curved Path */}
              <svg
                className="absolute w-[95%] h-[120px] top-1/2 -translate-y-1/2"
                viewBox="0 0 1000 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Define the curved path */}
                <path
                  id="progress-path"
                  d="M 50 90 C 300 180, 700 -30, 950 90"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Gradient for Stroke */}
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0"
                    y1="0"
                    x2="1000"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#EAF4D3" />
                    <stop offset="100%" stopColor="#A4E19D" />
                  </linearGradient>
                </defs>

                {/* Calculate the circle positions along the path */}
                {(() => {
                  const progress = currentIndex / totalQuestions;

                  const getPointOnPath = (progress) => {
                    const path = document.getElementById("progress-path");
                    if (!path) return { x: 0, y: 0 };

                    const length = path.getTotalLength();
                    const point = path.getPointAtLength(length * progress);
                    return { x: point.x, y: point.y };
                  };

                  const leftPoint = getPointOnPath(progress * 0.44);
                  const rightPoint = getPointOnPath(1 - progress * 0.44);

                  return (
                    <>
                      <circle
                        cx={leftPoint.x}
                        cy={leftPoint.y}
                        r="30"
                        fill="#EAF4D3"
                      />

                      <circle cx="500" cy="80" r="50" fill="#00B050" />

                      <circle
                        cx={rightPoint.x}
                        cy={rightPoint.y}
                        r="30"
                        fill="#EAF4D3"
                      />
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAssessment;
