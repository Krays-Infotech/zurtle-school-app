import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import StudentProfile from "../../component/StudentProfile/StudentProfile";
import StudentTest from "../../component/StudentTest/StudentTest";
import StudentReport from "../../component/StudentReport/StudentReport";
import StudentActivity from "../../component/StudentActivity/StudentActivity";

const StudentDashBoard = () => {

  const navigate = useNavigate();
  const isFetched = useRef(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (!isFetched.current) {
      const token = queryParams.get("token");
      const id = queryParams.get("userId");

      if (token) {
        localStorage.setItem("id", id);
        localStorage.setItem("role", "student");
        localStorage.setItem("token", token);
 
        navigate("/studentdashboard");
        isFetched.current = true;
      }
    }
  }, []);
  return (
    <div className="flex min-h-screen pt-16">
      <main className=" font-quicksand w-full">
        
        {/* Student Profile Section */}
        <div className="rounded-xl px-6 mb-6">
          <StudentProfile />
        </div>

        {/* Student Test & Student Report Section */}
        <div className="flex gap-6 mb-6">
          <div className="flex-1">
            <StudentTest />
          </div>
          {/* <div className="flex-1">
            <StudentReport />
          </div> */}
        </div>

        <div className="rounded-xl p-6">
          <StudentActivity />
        </div>

      </main>
    </div>
  );
};

export default StudentDashBoard;
