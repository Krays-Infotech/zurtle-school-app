import React from "react";
import { useLocation } from "react-router-dom";
import StudentProfile from "../../component/StudentProfile/StudentProfile";
import StudentTest from "../../component/StudentTest/StudentTest";
import StudentReport from "../../component/StudentReport/StudentReport";
import StudentActivity from "../../component/StudentActivity/StudentActivity";

const StudentDashBoard = () => {
  const location = useLocation();
  const student = location.state?.student;

  return (
    <div className="flex min-h-screen pt-16">
      <main className="md:ml-56 font-quicksand w-full">
        
        {/* Student Profile Section */}
        <div className="rounded-xl px-6 mb-6">
          <StudentProfile student={student} />
        </div>

        {/* Student Test & Student Report Section */}
        <div className="flex gap-6 mb-6">
          <div className="flex-1">
            <StudentTest />
          </div>
          <div className="flex-1">
            <StudentReport student={student} />
          </div>
        </div>

        <div className="rounded-xl p-6">
          <StudentActivity />
        </div>

      </main>
    </div>
  );
};

export default StudentDashBoard;
