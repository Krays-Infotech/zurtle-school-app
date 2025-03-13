import React from "react";
import { Eye, Edit } from "lucide-react"; 

const students = [
  {serialNumber: "1", studentId: "STU-1001", name: "John Doe", gender: "Male", age: "20", image: "https://i.pravatar.cc/40?img=11", course: "Computer Science", contactNumber: "123-456-7892", enrollmentDate: "2023-09-01", classNo: "A1" },
  {serialNumber: "2", studentId: "STU-1002", name: "Jane Smith", gender: "Female", age: "22", image: "https://i.pravatar.cc/40?img=4", course: "Mechanical Engineering", contactNumber: "987-654-3210", enrollmentDate: "2022-08-15", classNo: "B3" },
  {serialNumber: "3", studentId: "STU-1003", name: "Robert Johnson", gender: "Male", age: "19", image: "https://i.pravatar.cc/40?img=14", course: "Electrical Engineering", contactNumber: "456-789-0123", enrollmentDate: "2021-07-20", classNo: "C2" },
  {serialNumber: "4", studentId: "STU-1004", name: "Emily Davis", gender: "Female", age: "21", image: "https://i.pravatar.cc/40?img=1", course: "Business Administration", contactNumber: "959-762-7362", enrollmentDate: "2023-06-18", classNo: "A4" },
  {serialNumber: "5", studentId: "STU-1005", name: "William Martinez", gender: "Male", age: "23", image: "https://i.pravatar.cc/40?img=17", course: "Civil Engineering", contactNumber: "789-234-1234", enrollmentDate: "2020-05-10", classNo: "B1" },
  {serialNumber: "6", studentId: "STU-1006", name: "Sarah Wilson", gender: "Female", age: "20", image: "https://i.pravatar.cc/40?img=19", course: "Information Technology", contactNumber: "567-890-1234", enrollmentDate: "2023-04-22", classNo: "C5" },
];

const StudentTable = () => {
  return (
    <div className="bg-white shadow-lg rounded-md p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">Students List</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search Here"
            className="text-sm text-gray-400 border-gray-400 border px-2 py-2 w-40 rounded-md focus:outline-none focus:border-[#735CFC]"
          />
          <button className="text-sm text-white px-2 py-2 font-bold rounded-md bg-[#735CFC]">
            Sort By
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm border-b border-gray-200">
              <th className="py-3 px-4">S.No</th>
              <th className="py-3 px-4">Student ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Gender</th>
              <th className="py-3 px-4">Age</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Contact Number</th>
              <th className="py-3 px-4">Enrollment Date</th>
              <th className="py-3 px-4">Class No</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b border-gray-200 bg-white">
                <td className="text-sm">{student.serialNumber}</td>
                <td className="text-sm">{student.studentId}</td>
                <td className="py-4 px-4 flex items-center gap-3">
                  <img src={student.image} alt={student.name} className="w-10 h-10 rounded-full" />
                  <span className="text-sm text-gray-700">{student.name}</span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{student.gender}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{student.age}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{student.course}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{student.contactNumber}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{student.enrollmentDate}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{student.classNo}</td>
                <td className="py-4 px-4 text-sm text-gray-600 flex gap-2">
                  <button className="bg-purple-100 text-purple-500 p-2 rounded-lg hover:bg-purple-200 transition">
                    <Eye size={16} />
                  </button>
                  <button className="bg-green-100 text-green-500 p-2 rounded-lg hover:bg-green-200 transition">
                    <Edit size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
