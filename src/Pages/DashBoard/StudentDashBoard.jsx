import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import StudentProfile from "../../component/StudentProfile/StudentProfile";
import StudentTest from "../../component/StudentTest/StudentTest";
import StudentReport from "../../component/StudentReport/StudentReport";
import StudentActivity from "../../component/StudentActivity/StudentActivity";
import School from "../School/School";
import { useDispatch } from "react-redux";
import { loginFn } from "../../Redux/Reducers/Login/LoginSlice";

const StudentDashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFetched = useRef(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (!isFetched.current) {
      const token = queryParams.get("token");
      const id = queryParams.get("userId");

      if (token) {
        // Check if the token is a valid JWT
        if (token.split(".").length === 3) {
          try {
            const decodedToken = jwtDecode(token);

            const userDetails = {
              id: id,
              role: decodedToken.role,
            };

            const data = {
              userDetails,
              token,
            };

            dispatch(loginFn(data));

            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            localStorage.setItem("token", token);
          } catch (error) {
            console.error("Error decoding JWT:", error);
          }
        } else {
          console.error("Invalid token format:", token);
        }
        navigate("/studentdashboard");
        isFetched.current = true;
      }
    }
  }, []);

  return (
    <div className="flex  pt-16">
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
