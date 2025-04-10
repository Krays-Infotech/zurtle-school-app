import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateCarrer } from "../../Redux/Reducers/Result/generateCareer";
import { getCareerPathById } from "../../Redux/Reducers/Result/getCareerPathById";
import { Link, useParams } from "react-router-dom";
import Loader from "../../component/Loader/Loader";
import Result from "../../component/Result";

const CareerPath = () => {
  const dispatch = useDispatch();
  const { career } = useParams();
  // console.log("career", career);

  const [careerDetails, setCareerDetails] = useState("");

  const studentDetails = useSelector((state) => state.getResult.resultDetails);
  const loading = useSelector((state) => state.genarateCarrer.loading);

  useEffect(() => {
    fetchCarrerPath();
  }, []);

  const fetchCarrerPath = async () => {
    try {
      // const result = await dispatch(
      //   getCareerPathById(student.student_id)
      // ).unwrap();

      // if (result) {
      // }
      const details = JSON.parse(sessionStorage.getItem("studentDetails"));
      const student = studentDetails.student || details;

      const data = {
        student_id: student.student_id,
        grade: student.class,
        country: student.country,
        assessment_result: career,
      };
      const res = await dispatch(generateCarrer(data)).unwrap();
      setCareerDetails(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="career-content">
          <Result data={careerDetails} />
          <div className="flex justify-end pr-5">
            <Link
              to={"/careerMatch?isLogin=True"}
              className="bg-blue-500 p-2 w-[120px] mb-3 flex items-center justify-center text-white rounded-md"
            >
              Back
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CareerPath;
