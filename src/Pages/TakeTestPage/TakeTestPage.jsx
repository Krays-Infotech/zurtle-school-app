import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import telescopeImg from "../../assets/telescope.png";
import mapImg from "../../assets/map.png";
import locationMap from "../../assets/locationMap.png";
import plantImg from "../../assets/plant.png";
import mascotImg from "../../assets/mascot.png";
import logoImg from "../../assets/logo.png";
import flower from "../../assets/flower.png";

const TakeTestPage = () => {
  const navigate = useNavigate();
  const [hasTakenTest, setHasTakenTest] = useState(false);

  useEffect(() => {
    const testStatus = localStorage.getItem("testTaken");
    setHasTakenTest(testStatus === "true");
  }, []);

  const handleTest = () => {
    localStorage.setItem("testTaken", "true"); 
    navigate("/getAssement"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0fdf4] px-6 relative font-golos">
      <img
        src={telescopeImg}
        className="absolute top-50 left-60 w-24 hidden lg:block"
        alt="Telescope"
      />
      <img
        src={mapImg}
        className="absolute top-60 right-60 w-[100px] h-[75px] hidden lg:block"
        alt="Map"
      />
      <img
        src={locationMap}
        className="absolute top-8 right-24 w-[115px] h-[78px] hidden lg:block"
        alt="Location Map"
      />
      <img
        src={plantImg}
        className="absolute bottom-8 left-14 w-[151px] h-[151px] hidden lg:block"
        alt="Plant"
      />
      <img
        src={mascotImg}
        className="absolute bottom-20 right-50 w-[135px] h-[145px] hidden lg:block"
        alt="Mascot"
      />
      <img src={flower} className="absolute bottom-0 right-0" alt="Flower" />

      {/* Main Card */}
      <div className="bg-white rounded-3xl px-12 py-14 max-w-md w-full text-center border border-gray-200">
        {/* Logo and Title */}
        <div className="flex flex-col items-center">
          <img src={logoImg} alt="Expolarity" className="w-20 mb-3" />
          <h1 className="text-3xl font-bold text-gray-700">Expolarity</h1>
          <p className="text-sm text-gray-500 py-5">
            Take Your Test Now and Explore!
          </p>
        </div>

        {/* Take Test Button */}
        <button
          onClick={handleTest}
          className="w-full bg-gradient-to-r from-[#076555] to-[#054c44] hover:from-[#054c44] hover:to-[#076555] text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Take Test
        </button>

        {/* Already Taken Test? */}
        {hasTakenTest && (
          <div className="mt-4">
            <p className="text-gray-600 text-sm">
              Already taken the test?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 underline cursor-pointer hover:text-blue-800"
              >
                Login
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeTestPage;
