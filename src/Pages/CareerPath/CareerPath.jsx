import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateCarrer } from "../../Redux/Reducers/Result/generateCareer";
import Scientist from "../../assets/scientist.png";
import GoldStar from "../../assets/goldStar.png";
import { getCareerPathById } from "../../Redux/Reducers/Result/getCareerPathById";
import { useParams } from "react-router-dom";
import Loader from "../../component/Loader/Loader";

const CareerPath = () => {
  const dispatch = useDispatch();
  const { career } = useParams();
  console.log("career", career);

  const [careerDetails, setCareerDetails] = useState("");

  const studentDetails = useSelector((state) => state.getResult.resultDetails);
  const loading = useSelector((state) => state.genarateCarrer.loading);

  useEffect(() => {
    fetchCarrerPath();
  }, []);

  const fetchCarrerPath = async () => {
    try {
      const details = JSON.parse(sessionStorage.getItem("studentDetails"));
      console.log("details", details);

      const student = studentDetails.student || details;

      const data = {
        student_id: student.student_id,
        grade: student.class,
        country: student.country,
        assessment_result: career,
      };
      console.log(data);
      const res = await dispatch(generateCarrer(data)).unwrap();
      setCareerDetails(res.data);

      console.log(res);
      // const result = await dispatch(getCareerPathById(data.student)).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col mt-6 items-center justify-center min-h-screen">
          <div className="bg-[#750AD5]  shadow-md rounded-2xl p-6 mt-4 flex flex-col items-center w-full max-w-sm">
            <img
              src={Scientist}
              alt="Scientist"
              className="w-24 h-24 md:w-28 md:h-28"
            />
            <h3 className="text-[24px] md:text-[28px] text-white mt-4">
              {career}
            </h3>

            {/* <button className="mt-4 cursor-pointer bg-white text-[#750AD5] px-4 py-2 rounded-lg text-[16px] md:text-[20px] font-semibold">
              See your Career Path
            </button> */}
          </div>

          {/* <p className="text-[13px] md:text-[14px] mt-2 text-center max-w-md">
            Kids who love exploring, experimenting, and discovering new things!
          </p>

          <div className="mt-6 max-w-lg">
            <h4 className="text-[14px] md:text-[16px] font-semibold">
              Why it fits you
            </h4>
            <ul className="py-4 space-y-4">
              <li className="flex items-center text-[14px] md:text-[16px]">
                <img src={GoldStar} alt="star" className="w-5 h-5 mr-2" />
                You are very organized and focused (High Conscientiousness).
              </li>
              <li className="flex items-center text-[14px] md:text-[16px]">
                <img src={GoldStar} alt="star" className="w-5 h-5 mr-2" />
                Learning new things and thinking creatively (High Openness).
              </li>
              <li className="flex items-center text-[14px] md:text-[16px]">
                <img src={GoldStar} alt="star" className="w-5 h-5 mr-2" />
                You enjoy solving problems and figuring out how things work.
              </li>
            </ul>
          </div> */}

          <p>{careerDetails}</p>
        </div>
      )}
    </>
  );
};

export default CareerPath;
