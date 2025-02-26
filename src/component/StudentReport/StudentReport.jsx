import React from "react";
import { FaChartLine } from "react-icons/fa";

const StudentReport = () => {
  const reports = [
    { id: 1, subject: "Mathematics", score: "85%", grade: "B+" },
    { id: 2, subject: "Science", score: "92%", grade: "A" },
    { id: 3, subject: "English", score: "78%", grade: "C+" },
    { id: 4, subject: "History", score: "88%", grade: "B" },
    { id: 5, subject: "Computer Science", score: "95%", grade: "A+" },
  ];

  const handleDownload = () => {
    alert("Report Downloaded!");
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full md:w-[500px]">
         <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FaChartLine /> Performance Report
            </h2>

      <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-800">
            <th className="border border-gray-300 p-3">Subject</th>
            <th className="border border-gray-300 p-3">Score</th>
            <th className="border border-gray-300 p-3">Grade</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr
              key={report.id}
              className={`text-center ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="border border-gray-300 p-3">{report.subject}</td>
              <td className="border border-gray-300 p-3">{report.score}</td>
              <td className="border border-gray-300 p-3">{report.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          className="mt-5 bg-[#735CFC] cursor-pointer text-white px-5 py-2 rounded-lg w-48 font-semibold transition duration-300"
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

export default StudentReport;
