import React, { useState, useEffect } from "react";
import { Search, Bell, Settings, Moon, Sun, Maximize, Minimize, AlignJustify, 
    X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import profile from "../../assets/profile.jpeg";


const Navbar = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Sidebar Icon
  const handleSidebarToggle = () => {
    setMenuOpen(!menuOpen);
    toggleSidebar();
  };

  // Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Fullscreen Mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <><nav className="bg-white text-black shadow-md">
      <div className="h-17 flex items-center justify-between px-6 border-b border-[#F5F6FA]">
        {/* Sidebar */}
        <div className={`absolute ${menuOpen ? "left-[100px]" : "left-[275px]"} top-6`}>
          {menuOpen ? (
            <X size={18} className="cursor-pointer" onClick={handleSidebarToggle} />
          ) : (
            <AlignJustify size={18} className="cursor-pointer" onClick={handleSidebarToggle} />
          )}
        </div>

        {/* Icons - Aligned Right */}
        <div className="flex items-center space-x-6 ml-auto">
          <Link to="#" className="hover:text-pink-400 transition">
            <Search size={20} />
          </Link>
          <button onClick={toggleDarkMode} className="hover:text-pink-400 transition">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="#" className="hover:text-pink-400 transition">
            <Bell size={20} />
          </Link>
          <button onClick={toggleFullscreen} className="hover:text-pink-400 transition">
            {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-2" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <img
                src={profile}
                alt="User Avatar"
                className="w-9 h-9 rounded-full border-2 border-gray-300 dark:border-gray-700" />
              <span className="text-sm font-medium hidden md:block font-quicksand">Mr. Don</span>
              <ChevronDown className="w-4 h-4 hidden md:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden border dark:border-gray-700">
                <div className="px-4 py-3 flex items-center">
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="text-sm font-semibold font-quicksand">Mr. Don</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-quicksand">don@gmail.com</p>
                  </div>
                </div>
                <hr className="border-gray-200 dark:border-gray-600" />
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 font-quicksand">
                  Profile
                </Link>
                <hr className="border-gray-200 dark:border-gray-600" />
                <button className="font-quicksand block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Rotating Settings Icon */}
          <Link to="#" className="hover:text-pink-400 transition">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
              <Settings size={20} />
            </motion.div>
          </Link>
        </div>
      </div>
    </nav></>
  );
};

export default Navbar;