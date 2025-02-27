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
        <div className="flex-1 overflow-y-auto p-6 bg-[#F5F6FA]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Router = () => {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes Without BarLayout */}
        <Route path="/" element={<Login />} />

        {/* Protected With BarLayout */}
        <Route element={<BarLayout />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route
            path="dashboard/school"
            element={<School setSelectedSchool={setSelectedSchool} />}
          />
          <Route
            path="dashboard/teacher"
            element={<Teacher setSelectedTeacher={setSelectedTeacher} />}
          />
          <Route
            path="dashboard/student"
            element={<Student setSelectedStudent={setSelectedStudent} />}
          />
          <Route
            path="dashboard/parent"
            element={<Parent setSelectedParent={setSelectedParent}/>}
          />
          <Route
            path="dashboard/school/addSchool"
            element={<AddSchool selectedSchool={selectedSchool} />}
          />
          <Route
            path="dashboard/teacher/addTeacher"
            element={<AddTeacher selectedTeacher={selectedTeacher} />}
          />
          <Route
            path="dashboard/student/addStudent"
            element={<AddStudent selectedStudent={selectedStudent} />}
          />
          <Route
            path="dashboard/parent/addParent"
            element={<AddParent selectedParent={selectedParent}/>}
          />
          <Route path="/getAssement" element={<GetAssement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
