import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import TakeTestPage from "./Pages/TakeTestPage/TakeTestPage.jsx";
import Header from "./component/Header/Header.jsx";


const BarLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F5F6FA] min-h-screen">
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
        {/* Public Routes Without BarLayout */}
        <Route element={<Header />} >
        <Route path="/getAssement" element={<GetAssement />} />
        </Route>
        <Route path="/" element={<TakeTestPage />} />
        <Route path="/login" element={<Login />} />
        {/* Protected With BarLayout */}
        <Route element={<BarLayout />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route
            path="dashboard/school"
            element={<School  />}
          />
          <Route
            path="dashboard/teacher"
            element={<Teacher  />}
          />
          <Route
            path="dashboard/student"
            element={<Student  />}
          />
          <Route
            path="dashboard/parent"
            element={<Parent />}
          />
          <Route
            path="dashboard/school/addSchool"
            element={<AddSchool />}
          />
          <Route
            path="dashboard/teacher/addTeacher"
            element={<AddTeacher  />}
          />
          <Route
            path="dashboard/student/addStudent"
            element={<AddStudent  />}
          />
          <Route
            path="dashboard/parent/addParent"
            element={<AddParent/>}
          />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
