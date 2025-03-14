import React from "react";
import { FaUser, FaPhone, FaEnvelope, FaIdBadge, FaChalkboardTeacher } from "react-icons/fa";

const StudentProfile = () => {
  const student = {
    studentId: 1,
    studentName: "John Doe",
    class: "10th",
    section: "A",
    rollNo: "101",
    phone: "9876543210",
    email: "john.doe@example.com",
    profilePic: "https://i.pravatar.cc/150?img=4",
  };

  return (
    <div className="bg-white rounded-xl p-4 max-w-6xl border border-gray-200 w-full mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <img
          src={student.profilePic}
          alt="Profile"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-50 shadow-lg"
        />
      </div>

      {/* Student Details */}
      <div className="w-full text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-[#3A3A3A] flex items-center gap-2 justify-center sm:justify-start">
          <FaUser className="text-[#735CFC]" /> {student.studentName}
        </h3>

        {/* Details in One Line */}
        <div className="flex flex-col sm:flex-wrap sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mt-3 text-lg text-gray-700">
          <div className="flex items-center gap-2">
            <FaChalkboardTeacher className="text-[#735CFC] text-xl"/>
            <span className="font-medium">Class: {student.class} ({student.section})</span>
          </div>
          <div className="flex items-center gap-2">
            <FaIdBadge className="text-[#735CFC] text-xl" />
            <span className="font-medium">Roll No: {student.rollNo}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaIdBadge className="text-[#735CFC] text-xl" />
            <span className="font-medium">ID: #{student.studentId}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="text-[#735CFC] text-xl" />
            <span className="font-medium">{student.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-[#735CFC] text-2xl" />
            <span className="font-medium">{student.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
