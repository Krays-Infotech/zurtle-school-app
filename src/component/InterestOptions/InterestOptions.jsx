import React from "react";

const InterestOptions = ({ options, selectedOptions = [], onSelectOption, questionIndex }) => {
  const handleSelection = (option) => {
    const updatedSelection = selectedOptions.includes(option.label)
      ? selectedOptions.filter((o) => o !== option.label)
      : [...selectedOptions, option.label];

    onSelectOption(updatedSelection);
  };

  return (
    <div className="options mt-5">
      <div className="grid grid-cols-6 gap-4">
        {options.map((opt, i) => (
          <label key={i} className="cursor-pointer">
            <input type="checkbox" className="hidden" checked={selectedOptions.includes(opt.label)} onChange={() => handleSelection(opt)} />
            <div className={`flex flex-col items-center justify-center border rounded-lg p-2 transition-all duration-300 ${selectedOptions.includes(opt.label) ? "bg-green-300 border-green-500" : "border-gray-300"}`}>
              <img src={opt.image} alt={opt.label} className="w-12 h-12 object-contain mb-1" />
              <span className="text-center text-xs font-medium">{opt.label}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default InterestOptions;
