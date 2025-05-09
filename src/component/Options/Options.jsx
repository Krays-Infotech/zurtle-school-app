import React from "react";

const Options = ({
  options,
  selectedOption,
  onSelectOption,
  questionIndex,
  type,
}) => {
  return (
    <div className="options mt-5">
      <div className="flex gap-5 mb-2 text-sm text-gray-600">
        <div className="flex gap-4 flex-col sm:flex-row  justify-center items-center ">
          {type === "RATING" && (
            <>
              <p className="text-gray-700 text-xs font-medium">
                Strongly Agree
              </p>
              {options.map((op, i) => (
                <button
                  key={i}
                  className={`w-8 cursor-pointer h-8 flex items-center justify-center rounded-full border 
                        ${
                          selectedOption === op
                            ? "bg-green-500 text-white border-green-500"
                            : "border-gray-400 text-gray-700"
                        }
                        transition-all duration-200 hover:bg-green-200`}
                  onClick={() => onSelectOption(op)}
                >
                  {i + 1}
                </button>
              ))}
              <p className="text-gray-700 font-medium text-xs">
                Strongly Disagree
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {type === "SINGLE" &&
          options.map((op, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={`question-${questionIndex}`}
                className="w-4 h-4 accent-green-500 shrink-0 cursor-pointer"
                checked={selectedOption === op.value}
                onChange={() => onSelectOption(op.value)}
                required
              />
              <span className="text-left text-gray-700 text-base leading-tight">
                {op.label}
              </span>
            </label>
          ))}
      </div>
    </div>
  );
};

export default Options;
