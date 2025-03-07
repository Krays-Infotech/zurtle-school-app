import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddSchool = ({  }) => {
  const navigate = useNavigate();
  const selectedSchool = useSelector((state) => state.school.selectedSchool);
  const [formData, setFormData] = useState({
    registerNo: "",
    schoolName: "",
    studentsCount: "",
    principalName: "",
    contactNo: "",
    emailId: "",
    userName: "",
    password: "",
    address: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (selectedSchool) {
      setFormData(selectedSchool);
    }
  }, [selectedSchool]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    navigate("/dashboard/school");
  };

  return (
    <div className="flex font-quicksand pt-16">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[80%] ml-auto transition-transform transform duration-300">
        <div className="flex items-center space-x-2 border-b-2 border-[#F5F6FA] pb-3 mb-6">
          <MdCancel
            onClick={() => navigate("/dashboard/school")}
            className="text-[#735CFC]"
            size={20}
          />
          <h2 className="text-2xl font-semibold text-gray-700">
            Add New School
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Register No.</label>
            <input
              type="text"
              name="registerNo"
              value={formData.registerNo}
              onChange={handleChange}
              placeholder="Register No."
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">School Name</label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              placeholder="School Name"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">No. of Students</label>
            <input
              type="number"
              name="studentsCount"
              value={formData.studentsCount}
              onChange={handleChange}
              placeholder="Student Count"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Principal Name</label>
            <input
              type="text"
              name="principalName"
              value={formData.principalName}
              onChange={handleChange}
              placeholder="Principal Name"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Contact No.</label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
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
          </div>
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Username"
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
          <div className="flex justify-between col-span-2 mt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/school")}
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
    </div>
  );
};

export default AddSchool;
