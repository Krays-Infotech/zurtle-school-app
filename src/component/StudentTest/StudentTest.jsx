import React from "react";
import { FaCalendarAlt, FaBook, FaDoorOpen, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentTest = () => {
  const navigate = useNavigate();

  const tests = [
    { id: 1, subject: "Mathematics", date: "March 5, 2025", status: "Upcoming", hall: "A101" },
    { id: 2, subject: "Science", date: "Feb 28, 2025", status: "Completed", hall: "B202" },
    { id: 3, subject: "English", date: "Feb 25, 2025", status: "Completed", hall: "C303" },
    { id: 4, subject: "History", date: "March 10, 2025", status: "Upcoming", hall: "D404" },
    { id: 5, subject: "Geography", date: "March 15, 2025", status: "Upcoming", hall: "E505" },
    { id: 6, subject: "Physics", date: "Feb 20, 2025", status: "Completed", hall: "F606" },
    { id: 7, subject: "Chemistry", date: "March 18, 2025", status: "Upcoming", hall: "G707" },
    { id: 8, subject: "Biology", date: "March 22, 2025", status: "Upcoming", hall: "H808" },
  ];

  const handleClick = (test) => {
    if (test.status === "Upcoming") {
      navigate("/getAssement");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full md:w-[500px] mx-auto">
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
        <FaClipboardList /> Test Schedule
      </h2>

      <div className="max-h-86 overflow-y-auto space-y-4">
        {tests.map((test) => (
          <div
            key={test.id}
            className="flex justify-between items-center p-4 border border-[#cacdd0] rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
            onClick={() => handleClick(test)}
          >
            <div className="flex items-center space-x-3">
              <FaBook className="text-purple-500 text-lg" />
              <div>
                <p className="text-lg font-medium text-gray-900">{test.subject}</p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  {test.date}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <FaDoorOpen className="mr-2 text-red-500" />
                  Hall: {test.hall}
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                test.status === "Upcoming" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
              }`}
            >
              {test.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentTest;
