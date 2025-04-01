import React from "react";

const Options = ({
  options,
  selectedOption,
  onSelectOption,
  questionIndex,
  type,
}) => {
  return (
    <div className="options mt-5 ">
      <div className="flex gap-5 mb-2 text-sm text-gray-600">
        <div className="flex gap-4">
          {type === "RATING" &&
            options.map((op, i) => (
              <input
                key={i}
                type="radio"
                name={`question-${questionIndex}`}
                className="cursor-pointer w-4 h-4 accent-green-500"
                checked={selectedOption === op}
                onChange={() => onSelectOption(op)}
                required
              />
            ))}
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
