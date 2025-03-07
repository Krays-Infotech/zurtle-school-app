import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createParent } from "../../Redux/Reducers/Parent/CreateParentSlice";
import { updateParent } from "../../Redux/Reducers/Parent/UpdateParentSlice";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Success, Error } from "../../config/helper";

const AddParent = () => {
  const location = useLocation();
  
  const [parent, setParent] = useState(location.state?.parent || {});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state?.parent) {
      setParent(location.state.parent);
      setFormData(parent);
    }
  }, [location.state]);

  const [formData, setFormData] = useState({
    id: "",
    motherName: "",
    fatherName: "",
    address: "",
    mobileNo1: "",
    mobileNo2: "",
    emailId: "",
    password:"",
  });
  const [passwordVisible,setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const validateMobileNo = (mobileNo) => {
    const mobilePattern = /^[6-9]\d{9}$/;
    return mobilePattern.test(mobileNo);
  };

  const validateEmail = (emailId) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(emailId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "mobileNo1") {
      if (!validateMobileNo(value)) {
        setErrors((prev) => ({ ...prev, mobileNo1: "Invalid mobile number" }));
      } else {
        setErrors((prev) => ({ ...prev, mobileNo1: "" }));
      }
    }

    if (name === "mobileNo2") {
      if (!validateMobileNo(value)) {
        setErrors((prev) => ({ ...prev, mobileNo2: "Invalid mobile number" }));
      } else {
        setErrors((prev) => ({ ...prev, mobileNo2: "" }));
      }
    }

    if (name === "emailId") {
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, emailId: "Invalid Email Id" }));
      } else {
        setErrors((prev) => ({ ...prev, emailId: "" }));
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Parent Data Submitted:", formData);

    try {
      if (formData.id) {
        const resultResponse = await dispatch(updateParent({ id: formData.id, values: formData }));

        if (resultResponse?.payload?.status === true) {
          Success("Successfully Updated Parent.");
          setTimeout(() => navigate("/dashboard/parent"), 1000);
        } else {
          Error("Failed to update parent");
        }
      } else {
        const resultResponse = await dispatch(createParent(formData));

        if (resultResponse?.payload?.status === true) {
          Success("Successfully Added Parent.");
          setTimeout(() => navigate("/dashboard/parent"), 1000);
        } else {
          Error("Failed to add parent");
        }
      }
      
    } catch (error) {
      console.error("Error:", error);
      Error("An error occurred. Please try again.");
    } finally {
    }
  };

  return (
    <div className="flex font-quicksand">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[80%] ml-auto transition-transform transform duration-300">
        <div className="flex items-center space-x-2 border-b-2 border-[#F5F6FA] pb-3 mb-6">
          <MdCancel
            onClick={() => navigate("/dashboard/parent")}
            className="text-[#735CFC] cursor-pointer"
            size={20}
          />
          <h2 className="text-2xl font-semibold text-gray-700">Add Parent</h2>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              placeholder="Father's Name"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Mother's Name</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              placeholder="Mother's Name"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Contact No</label>
            <input
              type="text"
              name="mobileNo1"
              value={formData.mobileNo1}
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
            {errors.mobileNo1 && <p className="text-red-500 text-sm">{errors.mobileNo1}</p>}
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Alternate Contact No</label>
            <input
              type="text"
              name="mobileNo2"
              value={formData.mobileNo2}
              onChange={handleChange}
              placeholder="Alternate Contact Number"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
            />
            {errors.mobileNo2 && <p className="text-red-500 text-sm">{errors.mobileNo2}</p>}
          </div>
          <div className="col-span-2">
            <label className="block text-gray-600 mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              placeholder="Address"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
            {errors.emailId && <p className="text-red-500 text-sm">{errors.emailId}</p>}
          </div>
          <div className="relative">
      <label className="block text-gray-600 mb-2">Password</label>
      <div className="relative">
        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          value={formData.password}
          className="w-full p-2 border border-[#cacdd0] rounded-md text-sm pr-10"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <span
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    </div>
          <div className="flex justify-between col-span-2 mt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/parent")}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#735CFC] text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddParent;
