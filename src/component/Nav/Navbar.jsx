import React, { useState, useEffect } from "react";
import { Search, Bell, Settings, Moon, Sun, Maximize, Minimize, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import profile from "../../assets/profile.jpeg";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

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
    <nav className="bg-white text-black shadow-md w-full">
      <div className="h-17 flex flex-wrap items-center justify-between px-4 md:px-6 border-b border-[#F5F6FA]">
        <div className="flex items-center space-x-4 md:space-x-6 ml-auto">
          {/* Notification Icon */}
          <Link to="#" className="hover:text-pink-400 transition">
            <Bell size={20} />
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-2" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <img src={profile} alt="User Avatar" className="w-9 h-9 rounded-full border-2 border-gray-300 dark:border-gray-700" />
              <ChevronDown className="w-4 h-4 hidden sm:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden border dark:border-gray-700 z-50">
                <div className="px-4 py-3 flex items-center">
                  <img src={profile} alt="Profile" className="w-10 h-10 rounded-full mr-3" />
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

          {/* Hidden Icons on Small Screens */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link to="#" className="hover:text-pink-400 transition">
              <Search size={20} />
            </Link>
            <button onClick={toggleDarkMode} className="hover:text-pink-400 transition">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={toggleFullscreen} className="hover:text-pink-400 transition">
              {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;