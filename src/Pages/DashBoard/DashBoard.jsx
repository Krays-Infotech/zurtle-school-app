import React from "react";
import { FaChalkboardTeacher, FaSchool, FaUserGraduate, FaUsers } from "react-icons/fa";
import StudentAnalysisChart from "../../component/StudentAnalysis/StudentAnalysis";
import TeacherList from "../../component/TeacherList/TeacherList";
import StudentTable from "../../component/StudentTable/StudentTable";

const DashBoard = () => {
  const dashboardData = [
    {
      id: 1,
      title: "Total Schools",
      value: "120",
      icon: <FaSchool className="text-blue-600" size={24} />,
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      title: "Total Teachers",
      value: "4,560",
      icon: <FaChalkboardTeacher className="text-green-600" size={24} />,
      bgColor: "bg-green-100",
    },
    {
      id: 3,
      title: "Total Students",
      value: "78,200",
      icon: <FaUserGraduate className="text-purple-600" size={24} />,
      bgColor: "bg-purple-100",
    },
    {
      id: 4,
      title: "Total Parents",
      value: "102,500",
      icon: <FaUsers className="text-red-600" size={24} />,
      bgColor: "bg-red-100",
    },
  ];

  return (
    <div className="flex pt-10">
      <main className="p-4 md:ml-56 font-quicksand min-h-screen w-full">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardData.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-2">
              <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${item.bgColor}`}>
                {item.icon}
              </div>
              <h2 className="text-xl font-bold">{item.value}</h2>
              <h3 className="text-gray-600">{item.title}</h3>
            </div>
          ))}
        </div>

       <div className="mt-4">
            <StudentAnalysisChart className="w-1/4"/> 
        </div>
        <div className="mt-4">
            <TeacherList className="w-1/4"/> 
        </div>
        <div className="mt-4">
        <StudentTable/>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
