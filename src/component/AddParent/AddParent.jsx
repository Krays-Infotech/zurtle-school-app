import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AddParent = ({selectedParent}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: "",
    motherName: "",
    fatherName: "",
    address: "",
    phone: "",
    email: "",
    password:"",
  });
  const [passwordVisible,setPasswordVisible] = useState(false);
  
  useEffect (()=>{ 
     if (selectedParent){
        setFormData(selectedParent);
     }
  },[selectedParent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parent Data Submitted:", formData);
    navigate("/school/parent");
  };

  return (
    <div className="flex font-quicksand">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[80%] ml-auto transition-transform transform duration-300">
        <div className="flex items-center space-x-2 border-b-2 border-[#F5F6FA] pb-3 mb-6">
          <MdCancel
            onClick={() => navigate("/school/parent")}
            className="text-[#735CFC] cursor-pointer"
            size={20}
          />
          <h2 className="text-2xl font-semibold text-gray-700">Add Parent</h2>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-gray-600 mb-2">Student ID</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Student ID"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
          </div>
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
            <label className="block text-gray-600 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border border-[#cacdd0] rounded-md text-sm"
              required
            />
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
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
              onClick={() => navigate("/school/parent")}
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

export default AddParent;
