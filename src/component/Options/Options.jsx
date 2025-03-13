import React from "react";


const Options = ({ options, selectedOption, onSelectOption, questionIndex }) => {
  return (
    <div className="options mt-5 ">
      <div className="flex gap-5 mb-2 text-sm text-gray-600">
        <span>Inaccurate</span>
        <div className="flex gap-4">
          {options.map((op, i) => (
            <input
              key={i}
              type="radio"
              name={`question-${questionIndex}`}
              className="cursor-pointer w-4 h-4 accent-green-500"
              checked={selectedOption === op}
              onChange={() => onSelectOption(op)}
            />
          ))}
        </div>
        <span>Accurate</span>
      </div>
    </div>
  );
};

export default Options;