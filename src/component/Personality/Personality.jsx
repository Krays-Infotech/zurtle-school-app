import React, { useEffect, useState } from "react";
import logoImg from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getPersonality } from "../../Redux/Reducers/Assessment/GetPersonalitySlice";
import Options from "../Options/Options";
import Loader from "../Loader/Loader";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Personality = () => {
  const QUESTIONS_PER_PAGE = 5;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getLoading = useSelector((state) => state.getPersonality.loading);

  const [userId, setUserId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setUserId(Cookies.get("userId"));
    fetchPersonalityQuestions();
  }, []);

  useEffect(() => {
    if (totalQuestions > 0) {
      setTotalPages(Math.ceil(totalQuestions / QUESTIONS_PER_PAGE));
    }

    if (
      isPageCompleted() &&
      currentIndex + QUESTIONS_PER_PAGE < totalQuestions
    ) {
      const timeout = setTimeout(() => {
        next();
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [totalQuestions, selectedOptions]);

  const fetchPersonalityQuestions = async () => {
    try {
      const res = await dispatch(getPersonality()).unwrap();
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
      setQuestions(updatedQuestion);
      setTotalQuestions(updatedQuestion.length);
      console.log("updatedQuestion", updatedQuestion);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectOption = (questionId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

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
  const next = async () => {
    if (isPageCompleted()) {
      if (currentIndex + QUESTIONS_PER_PAGE < totalQuestions) {
        setCurrentIndex(currentIndex + QUESTIONS_PER_PAGE);
      } else {
        const answers = {
          ...selectedOptions,
        };

        console.log("Answers", answers);

        const data = {
          user_id: userId,
          answers,
        };

        // const res = await dispatch(saveTestReport(data)).unwrap();
        // console.log("response", res);
        navigate("/");
        setIsCompleted(true);
      }
    }
  };
  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - QUESTIONS_PER_PAGE);
  };

  return (
    <>
      {getLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen patternBg flex justify-center font-golos py-8">
          <div className="relative w-full max-w-4xl rounded-xl p-10">
            <div>
              <div className="flex flex-col items-center p-12">
                <img src={logoImg} alt="Expolarity" className="w-16 mb-2" />
                <h1 className="text-3xl font-bold text-gray-700">
                  Expolarity.AI
                </h1>
              </div>
            </div>

            {/* Questions */}
            <div className="w-full flex items-center justify-center">
              <div className="w-full md:w-[60%]">
                <div className="">
                  {questions &&
                    questions
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
                            onSelectOption={(option) =>
                              handleSelectOption(q.id, option)
                            }
                            questionIndex={q.id}
                            type={"SINGLE"}
                          />
                        </div>
                      ))}
                </div>
              </div>
            </div>

            {/* navigation buttons */}
            {!isCompleted && (
              <div className="flex items-center justify-between py-4">
                {currentIndex > 0 && (
                  <button
                    type="submit"
                    className="bg-green-500 cursor-pointer hover:bg-green-600 text-white rounded-md px-4 py-2 shadow-md transition-all"
                    onClick={prev}
                  >
                    Previous
                  </button>
                )}

                <p className="text-sm text-gray-500 ">
                  Page {currentIndex / QUESTIONS_PER_PAGE + 1} of {totalPages}
                </p>

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
          </div>
        </div>
      )}
    </>
  );
};

export default Personality;
