import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createTeacher } from "../../Redux/Reducers/Teacher/CreateTeacherSlice";
import { updateTeacher } from "../../Redux/Reducers/Teacher/UpdateTeacherSlice";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Success, Error } from "../../config/helper";

const AddTeacher = ({ selectedTeacher = {} }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [teacher, setTeacher] = useState(location.state?.teacher || {});

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    subject: "",
    qualification: "",
    experience: "",
    mobileNo: "",
    emailId: "",
    gender: "",
    password: "",
  });
  const [passwordVisible,setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.teacher) {
      setTeacher(location.state.teacher);
      setFormData(teacher);
    }
  }, [location.state]);

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

    if (name === "mobileNo") {
      if (!validateMobileNo(value)) {
        setErrors((prev) => ({ ...prev, mobileNo: "Invalid mobile number" }));
      } else {
        setErrors((prev) => ({ ...prev, mobileNo: "" }));
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      if (formData.id) {
        const resultResponse = await dispatch(updateTeacher({ id: formData.id, values: formData }));

        if (resultResponse?.payload?.status === true) {
          Success("Successfully Updated Teacher.");
          setTimeout(() => navigate("/dashboard/teacher"), 1000);
        } else {
          Error("Failed to update teacher");
        }
      } else {
        const resultResponse = await dispatch(createTeacher(formData));

        if (resultResponse?.payload?.status === true) {
          Success("Successfully Added Teacher.");
          setTimeout(() => navigate("/dashboard/teacher"), 1000);
        } else {
          Error("Failed to add teacher");
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
            onClick={() => navigate("/dashboard/teacher")}
            className="text-[#735CFC]"
            size={20}
          />
          <h2 className="text-2xl font-semibold text-gray-700">
            Add New Teacher
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Teacher Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Teacher Name"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Qualification</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Qualification"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">
              Years of Experience
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Experience"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Contact No.</label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
            {errors.mobileNo && <p className="text-red-500 text-sm">{errors.mobileNo}</p>}
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Email ID</label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="Email ID"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
            {errors.emailId && <p className="text-red-500 text-sm">{errors.emailId}</p>}
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Gender</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Gender"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
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
              onClick={() => navigate("/dashboard/teacher")}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
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

export default AddTeacher;
