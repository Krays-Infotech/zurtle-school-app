import React, { useState } from "react";
import {
  FaHome,
  FaSchool,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, Link, useNavigate } from "react-router-dom";
import profile from "../../assets/profile.jpeg";

const menuItems = [
  {
    title: "Dashboards",
    icon: <FaHome className="w-5 h-5" />,
    path: "/dashboard",
  },
  {
    title: "Schools",
    icon: <FaSchool className="w-4 h-4" />,
    path: "/school",
    submenu: [
      {
        name: "Teacher",
        path: "/school/teacher",
        icon: <FaChalkboardTeacher className="w-4 h-4" />,
      },
      {
        name: "Student",
        path: "/school/student",
        icon: <FaUserGraduate className="w-4 h-4" />,
      },
      {
        name: "Parent",
        path: "/school/parent",
        icon: <FaUserTie className="w-4 h-4" />,
      },
    ],
  },
];

const Sidebar = ({ isCollapsed }) => {
  const [openMenus, setOpenMenus] = useState({});
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
    <motion.div
      animate={{ width: isCollapsed ? "80px" : "250px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white fixed h-full p-4 border-r border-[#F5F6FA] flex flex-col"
    >
      <div
        className={`flex items-center ${
          isCollapsed ? "justify-center" : "justify-start"
        } border-b border-[#F5F6FA] pb-3 mb-4`}
      >
        <img src={profile} alt="Logo" className="w-10 h-10" />
        {!isCollapsed && (
          <h2 className="ml-2 text-xl font-bold font-quicksand text-black">
            School
          </h2>
        )}
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
                    ? "bg-[#735CFC] text-white"
                    : "hover:bg-[#f6f6f6] hover:text-black"
                }`}
              >
                {item.icon}
                {!isCollapsed && <span className="ml-3">{item.title}</span>}
                {!isCollapsed &&
                  item.submenu &&
                  (openMenus[item.title] ? (
                    <ChevronUp className="ml-auto w-4 h-4" />
                  ) : (
                    <ChevronDown className="ml-auto w-4 h-4" />
                  ))}
              </button>

              {/* Submenu */}
              {!isCollapsed && openMenus[item.title] && item.submenu && (
                <ul className="ml-6 mt-1 space-y-1 text-sm font-normal font-quicksand">
                  {item.submenu.map((subItem) => {
                    const isSubActive = location.pathname.startsWith(subItem.path);
                    return (
                      <li key={subItem.name} className="py-1">
                        <Link
                          to={subItem.path}
                          className={`py-1 px-2 flex items-center space-x-2 rounded ${
                            isSubActive
                              ? "bg-[#ebe9f1] text-black"
                              : "text-black"
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
    </motion.div>
  );
};

export default Sidebar;
