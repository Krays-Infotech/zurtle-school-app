import { Edit, Eye } from "lucide-react";
import React from "react";

const teachers = [
  { name: "John Doe", qualification: "M.Sc Mathematics", subject: "Mathematics", image: "https://i.pravatar.cc/40?img=11" },
  { name: "Jane Smith", qualification: "M.A English", subject: "English", image: "https://i.pravatar.cc/40?img=4"},
  { name: "Alice Johnson", qualification: "Ph.D Physics", subject: "Physics" , image: "https://i.pravatar.cc/40?img=14" },
  {name: "Michael Brown", qualification: "B.Ed History", subject: "History", image: "https://i.pravatar.cc/40?img=1"},
  { name: "Sarah Wilson", qualification: "M.Sc Chemistry", subject: "Chemistry", image: "https://i.pravatar.cc/40?img=17"},
  {name: "David Miller", qualification: "M.Tech Computer Science", subject: "Computer Science" , image: "https://i.pravatar.cc/40?img=19" },
];

const TeacherList = () => {
  return (
    <div className="bg-white  rounded-sm p-5 w-full max-w-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Teachers List</h2>
      </div>
      {/* Table */}
      <div className="overflow-x-auto max-w-full">
        <table className="min-w-[500px]">
          <thead>
            <tr className="text-left text-sm border-b-2 border-[#F5F6FA]">
              <th className="py-2">Teacher</th>
              <th className="py-2">Qualification</th>
              <th className="py-2">Subject</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={index} className="border-b-2 border-[#F5F6FA]">
              <td className="py-3 flex items-center gap-2">
               <img src={teacher.image} alt={teacher.name} className="w-8 h-8 rounded-full" />
               <div className="flex flex-col">
                <span className="text-sm font-medium">{teacher.name}</span>
                </div>
                </td>

                <td className="text-sm">{teacher.qualification}</td>
                <td className="text-sm">{teacher.subject}</td>
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

export default TeacherList;
