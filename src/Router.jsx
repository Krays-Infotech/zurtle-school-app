import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./component/Nav/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./component/Sidebar/Sidebar";
import GetAssement from "./component/GetAssement/GetAssement";
import GetInterest from "./component/GetInterest/GetInterest.jsx";
import Header from "./component/Header/Header.jsx";
import PaymentSuccess from "./component/PaymentSuccess/PaymentSuccess.jsx";
import PaymentFailure from "./component/PaymentFailure/PaymentFailure.jsx";
import CareerMatchCard from "./component/CareerMatchCard/CareerMatchCard.jsx";
import CareerPath from "./Pages/CareerPath/CareerPath.jsx";
import Result from "./component/Result.jsx";
import Register from "./Pages/Register/Register.jsx";
import Assessment from "./Pages/Assessment/Assessment.jsx";
import { useSelector } from "react-redux";
import School from "./Pages/School/School";
import AddSchool from "./component/AddSchool/AddSchool";
import Teacher from "./Pages/School/Teacher";
import AddTeacher from "./component/AddTeacher/AddTeacher";
import Student from "./Pages/School/Student";
import AddStudent from "./component/AddStudent/AddStudent";
import Parent from "./Pages/School/Parent";
import AddParent from "./component/AddParent/AddParent";
import DashBoard from "./Pages/DashBoard/DashBoard";
import StudentDashboard from "./Pages/DashBoard/StudentDashBoard";
import TakeTestPage from "./Pages/TakeTestPage/TakeTestPage.jsx";
import StudentReport from "./component/StudentReport/StudentReport.jsx";
import ResultPage from "./component/ResultPage/ResultPage.jsx";
import Login from "./Pages/Login/Login.jsx";
import Personality from "./component/Personality/Personality.jsx";

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Assessment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Header />}>
          <Route path="/result" element={<Result />} />
          <Route path="/getAssement" element={<GetAssement />} />
          <Route path="/getInterest" element={<GetInterest />} />
          <Route path="/personality" element={<Personality />} />
          <Route path="/careerMatch" element={<CareerMatchCard />} />
          <Route path="/careerPath/:career" element={<CareerPath />} />
        </Route>

        <Route
          path="/paymentSuccess/:session_id"
          element={<PaymentSuccess />}
        />
        <Route
          path="/paymentFailure/:session_id"
          element={<PaymentFailure />}
        />

        {/* <Route element={<BarLayout />}>
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="dashboard/report" element={<StudentReport />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
