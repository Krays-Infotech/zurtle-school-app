import React from "react";

const InterestOptions = ({
  options,
  selectedOptions = [],
  onSelectOption,
  questionIndex,
}) => {
  const handleSelection = (option) => {
    const updatedSelection = selectedOptions.includes(option.label)
      ? selectedOptions.filter((o) => o !== option.label)
      : option.label; //select single option
    // : [...selectedOptions, option.label]; //Select Multiple Options

    onSelectOption(updatedSelection);
  };

  return (
    <div className="options mt-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {options.map((opt, i) => (
          <label key={i} className="cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              checked={selectedOptions.includes(opt.label)}
              onChange={() => handleSelection(opt)}
              required
            />
            <div
              className={`flex flex-col items-center justify-center border rounded-lg p-2 transition-all duration-300 w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 ${
                selectedOptions.includes(opt.label)
                  ? "bg-green-300 border-green-500"
                  : "border-gray-300"
              }`}
            >
              <img
                src={opt.image}
                alt={opt.label}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-16 md:h-16 object-contain mb-1"
              />
              <span className="text-center text-xs sm:text-sm font-medium">
                {opt.label}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default InterestOptions;
