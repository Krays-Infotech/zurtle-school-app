import React, { useState } from "react";
import {
  FaHome,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserTie,
  FaSchool,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { BiSolidReport } from "react-icons/bi";


const menuItems = [
  {
    title: "Dashboards",
    icon: <FaHome className="w-5 h-5" />,
    path: "/studentdashboard",
    submenu: [
      // {
      //   name: "School",
      //   path: "/dashboard/school",
      //   icon: <FaSchool className="w-4 h-4" />,
      // },
      {
        name: "Report",
        path: "/dashboard/report",
        icon: <BiSolidReport  className="w-4 h-4" />,
      },
      // {
      //   name: "Teacher",
      //   path: "/dashboard/teacher",
      //   icon: <FaChalkboardTeacher className="w-4 h-4" />,
      // },
      // {
      //   name: "Student",
      //   path: "/dashboard/student",
      //   icon: <FaUserGraduate className="w-4 h-4" />,
      // },
      // {
      //   name: "Parent",
      //   path: "/dashboard/parent",
      //   icon: <FaUserTie className="w-4 h-4" />,
      // },
    ],
  },
];

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    if (!item.submenu) {
      navigate(item.path);
    } else {
      setOpenMenus((prev) => ({
        ...prev,
        [item.title]: !prev[item.title],
      }));
      if (!openMenus[item.title]) {
        navigate(item.path);
      }
    }
  };

  return (
    <>
      {/* Hamburger Menu for Small Screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#2A6656] text-white p-2 rounded-full"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
      </button>
  
      {/* Sidebar */}
      <div
        className={`bg-white fixed h-full p-4 border-r border-[#F5F6FA] flex flex-col transition-all duration-300 z-40
          ${isSidebarOpen ? "w-64 left-0" : "w-64 -left-64"}
          lg:w-64 lg:left-0`}
      >
        <div className="flex items-center justify-start border-b border-[#F5F6FA] pb-3 mb-4">
          <h2 className="ml-2 text-xl font-bold font-quicksand text-black">
            RMS School 
          </h2>
        </div>

        {/* Menu */}
        <ul className="text-black space-y-2">
          {menuItems.map((item) => {
            const isMainActive = location.pathname.startsWith(item.path);
            return (
              <li key={item.title} className="mb-2 rounded py-2">
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`px-3 h-10 flex items-center w-full text-left font-quicksand rounded transition ${
                    isMainActive
                      ? "bg-[#2A6656] text-white"
                      : "hover:bg-[#f6f6f6] hover:text-black"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                  {item.submenu &&
                    (openMenus[item.title] ? (
                      <ChevronUp className="ml-auto w-4 h-4" />
                    ) : (
                      <ChevronDown className="ml-auto w-4 h-4" />
                    ))}
                </button>

                {/* Submenu */}
                {openMenus[item.title] && item.submenu && (
                  <ul className="ml-6 mt-1 space-y-1 text-sm font-normal font-quicksand">
                    {item.submenu.map((subItem) => {
                      const isSubActive = location.pathname.startsWith(subItem.path);
                      return (
                        <li key={subItem.name} className="py-1">
                          <Link
                            to={subItem.path}
                            className={`py-1 px-2 flex items-center space-x-2 rounded ${
                              isSubActive ? "bg-[#ebe9f1] text-black" : "text-black"
                            }`}
                          >
                            {subItem.icon}
                            <span>{subItem.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
