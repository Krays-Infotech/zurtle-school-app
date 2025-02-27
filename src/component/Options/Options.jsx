import React from "react";

const Options = ({ options, selectedOption, onSelectOption }) => {
  return (
    <div className="options mt-5">
      <ul className="flex flex-col gap-2">
      {options &&
  options.map((op, i) => (
    <li
      key={i}
      className="flex items-center h-[33px] gap-2 cursor-pointer w-full
      border border-gray-600/[0.5] p-1.5 rounded-md text-md outline-none "
      onClick={() => onSelectOption(op)}
    >
      <input
        type="radio"
        name="option"
        className="cursor-pointer w-[15px] h-[15px] outline-none"
        checked={selectedOption === op}
        readOnly
      />
      <label className="w-full flex items-center gap-2 cursor-pointer">
        {op}
      </label>
    </li>
  ))}

      </ul>
    </div>
  );
};

export default Options;
