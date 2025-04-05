import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveBasicDetails } from "../../Redux/Reducers/Login/saveBasic";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useNavigate } from "react-router-dom";

const BasicDetails = ({ setIsProfileCompleted }) => {
  const dispatch = useDispatch();
  const [basicDetails, setBasicDetails] = useState({});
  const [countries] = useState(countryList().getData());

  const { loading } = useSelector((state) => state.saveBasics);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBasicDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (selectedOption) => {
    setBasicDetails((prev) => ({ ...prev, country: selectedOption.label }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const userId = JSON.parse(sessionStorage.getItem("userId"));
      // const userId = localStorage.getItem("userId");
      if (userId) {
        const data = {
          userId,
          basicDetails,
        };
        const res = await dispatch(saveBasicDetails(data)).unwrap();
        // console.log("res", res);
        setIsProfileCompleted(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#1D4A28] w-[400px] h-[75vh] p-5 rounded-xl font-gilory">
      <p className=" text-white text-center text-[18px] gilory-medium">
        One more steps to see <br /> the result ! 🚀
      </p>
      <div className="flex justify-center w-full">
        <form onSubmit={handleSubmit}>
          <div className="relative w-[300px] md:w-[300px]">
            <label
              htmlFor="grade"
              className="block text-left text-white text-sm py-2"
            >
              Grade
            </label>

            <select
              id="grade"
              name="grade"
              className="w-full border bg-[#EAF0F7] border-gray-300 p-3 rounded-md text-sm outline-none"
              onChange={handleChange}
              required
            >
              <option value="">Select a Grade</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="6">7</option>
              <option value="6">8</option>
              <option value="6">9</option>
              <option value="6">10</option>
              <option value="6">11</option>
              <option value="6">12</option>
            </select>
          </div>

          <div className="relative w-full md:w-[300px]">
            <label
              htmlFor="gender"
              className="block text-left text-white text-sm py-2"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full border bg-[#EAF0F7] border-gray-300 p-3 rounded-md text-sm outline-none"
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="relative w-full md:w-[300px]">
            <label
              htmlFor="country"
              className="block text-left text-white text-sm py-2"
            >
              Country
            </label>
            <Select
              options={countries}
              onChange={handleCountryChange}
              placeholder="Select your country"
              className="text-black"
            />
          </div>

          <div className="flex py-5  items-center  font-gilory ">
            <div className="flex-grow border-t border-[#DFDFDF]"></div>
            <span className="flex-shrink mx-4 text-white text-xs">
              Test Result!
            </span>
            <div className="flex-grow border-t border-[#DFDFDF]"></div>
          </div>

          <button
            type="submit"
            className="gilory-medium text-white w-full md:w-[300px] text-center bg-[#38B76C] rounded-[8px] p-2 cursor-pointer"
          >
            {loading ? "loading..." : "Ready to go!"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BasicDetails;
