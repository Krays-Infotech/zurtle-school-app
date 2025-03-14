import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import profile from "../../assets/navprofile.png";
import logoImg from "../../assets/logo.png";


const Header = () => {
  useEffect(() => {}, []);

  return (
    <>
      <nav className="bg-[#076555] text-black w-full fixed top-0 left-0 z-50">
        <div className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-[#F5F6FA]">
          {/* Logo and Expolar Text */}
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Logo" className="w-8 h-8" />
            <span className="text-white text-lg ">Expolarity.AI</span>
          </div>

          {/* Profile Image */}
          <div className="relative">
            <img
              src={profile}
              alt="User Avatar"
              className="w-9 h-9 rounded-full border-2 border-gray-300 dark:border-gray-700"
            />
          </div>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Header;
