import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaIdBadge,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { useDispatch } from "react-redux";

import { getStudent } from "../../Redux/Reducers/Student/GetStudentSlice";

const StudentProfile = () => {
  const dispatch = useDispatch();

  const [student, setStudent] = useState([]);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    var userId = "";
    if (userDetails) {
      userId = userDetails.id;
    }
    const result = await dispatch(getStudent(userId)).unwrap();

    if (result?.status === true) {
      setStudent(result.data);
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 max-w-6xl border border-gray-200 w-full mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <img
          src={student.profileImage}
          alt="Profile"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-50 shadow-lg"
        />
      </div>

      {/* Student Details */}
      <div className="w-full text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-[#3A3A3A] flex items-center gap-2 justify-center sm:justify-start">
          <FaUser className="text-[#2A6656]" /> {student.name}
        </h3>

        {/* Details in One Line */}
        <div className="flex flex-col sm:flex-wrap sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mt-3 text-lg text-gray-700">
          {student.standard && (
            <div className="flex items-center gap-2">
              <FaChalkboardTeacher className="text-[#2A6656] text-xl" />
              <span className="font-medium">
                Class: {student.standard} ({student.section})
              </span>
            </div>
          )}
          {student.rollNo && (
            <div className="flex items-center gap-2">
              <FaIdBadge className="text-[#2A6656] text-xl" />
              <span className="font-medium">Roll No: {student.rollNo}</span>
            </div>
          )}
          {student.mobileNo && (
            <div className="flex items-center gap-2">
              <FaPhone className="text-[#2A6656] text-xl" />
              <span className="font-medium">{student.mobileNo}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-[#2A6656] text-2xl" />
            <span className="font-medium">{student.emailId}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
