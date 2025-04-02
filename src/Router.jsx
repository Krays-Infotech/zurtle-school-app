import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./component/Nav/Navbar";
import { Outlet } from "react-router-dom";
import School from "./Pages/School/School";
import AddSchool from "./component/AddSchool/AddSchool";
import Teacher from "./Pages/School/Teacher";
import AddTeacher from "./component/AddTeacher/AddTeacher";
import Student from "./Pages/School/Student";
import AddStudent from "./component/AddStudent/AddStudent";
import Parent from "./Pages/School/Parent";
import AddParent from "./component/AddParent/AddParent";
import Login from "./Pages/Login/Login.jsx";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Sidebar from "./component/Sidebar/Sidebar";
import StudentDashboard from "./Pages/DashBoard/StudentDashBoard";
import GetAssement from "./component/GetAssement/GetAssement";
import GetInterest from "./component/GetInterest/GetInterest.jsx";
import TakeTestPage from "./Pages/TakeTestPage/TakeTestPage.jsx";
import Header from "./component/Header/Header.jsx";
import StudentReport from "./component/StudentReport/StudentReport.jsx";
import PaymentSuccess from "./component/PaymentSuccess/PaymentSuccess.jsx";
import PaymentFailure from "./component/PaymentFailure/PaymentFailure.jsx";
import ResultPage from "./component/ResultPage/ResultPage.jsx";
import CareerMatchCard from "./component/CareerMatchCard/CareerMatchCard.jsx";

const BarLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className=" min-h-screen">
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? "w-0" : "w-0 lg:w-64"
        }`}
      >
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </div>

      <div className="lg:ml-[256px] flex flex-col">
        <Navbar
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <div className=" sm:p-6 bg-[#F0FDF4] min-h-screen p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Router = () => {
  const token =
    useSelector((state) => state.loginDetails.token) ||
    localStorage.getItem("token");
  // const token = true;
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            token ? <Navigate to="/studentdashboard" replace /> : <Login />
          }
        />

        <Route element={<Header />}>
          <Route path="/getAssement" element={<GetAssement />} />
          <Route path="/getInterest" element={<GetInterest />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/careerMatch" element={<CareerMatchCard />} />
        </Route>
        <Route path="/" element={<TakeTestPage />} />

        <Route
          path="/paymentSuccess/:session_id"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paymentFailure/:session_id"
          element={
            <ProtectedRoute>
              <PaymentFailure />
            </ProtectedRoute>
          }
        />

        <Route element={<BarLayout />}>
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route
            path="dashboard/report"
            element={
              // <ProtectedRoute>
              <StudentReport />
              // </ProtectedRoute>
            }
          />

          {/*
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="dashboard/school" element={<School />} />
          <Route path="dashboard/teacher" element={<Teacher />} />
          <Route path="dashboard/student" element={<Student />} />
          <Route path="dashboard/parent" element={<Parent />} />
          <Route path="dashboard/school/addSchool" element={<AddSchool />} />
          <Route path="dashboard/teacher/addTeacher" element={<AddTeacher />} />
          <Route path="dashboard/student/addStudent" element={<AddStudent />} />
          <Route path="dashboard/parent/addParent" element={<AddParent />} />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
