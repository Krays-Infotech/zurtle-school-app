import React from "react";
import { FaUser, FaPhone, FaEnvelope, FaIdBadge, FaChalkboardTeacher } from "react-icons/fa";

const StudentProfile = ({ student }) => {

  return (
    <div className="bg-white rounded-xl p-4 max-w-6xl flex items-center gap-6 border border-gray-200">
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <img
          src="https://i.pravatar.cc/150?img=4"
          alt="Profile"
          className="w-38 h-38 rounded-full border-4 border-gray-50 shadow-lg"
        />
      </div>

      {/* Student Details */}
      <div className="w-full">
        <h3 className="text-2xl font-bold text-[#3A3A3A] flex items-center gap-2">
          <FaUser className="text-[#735CFC]" /> {student.name}
        </h3>

        {/* Details in One Line */}
        <div className="flex flex-wrap items-center gap-6 mt-3 text-lg text-gray-700">
          <div className="flex items-center gap-2">
            <FaChalkboardTeacher className="text-[#735CFC] text-xl"/>
            <span className="font-medium">Class: {student.standard} ({student.section})</span>
          </div>
          <div className="flex items-center gap-2">
            <FaIdBadge className="text-[#735CFC] text-xl" />
            <span className="font-medium">Roll No: {student.rollNo}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="text-[#735CFC] text-xl" />
            <span className="font-medium">{student.mobileNo}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-[#735CFC] text-2xl" />
            <span className="font-medium">{student.emailId}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
