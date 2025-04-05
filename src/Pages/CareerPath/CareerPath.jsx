import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateCarrer } from "../../Redux/Reducers/Result/generateCareer";
import Scientist from "../../assets/scientist.png";
import GoldStar from "../../assets/goldStar.png";
import { getCareerPathById } from "../../Redux/Reducers/Result/getCareerPathById";
import { Link, useParams } from "react-router-dom";
import Loader from "../../component/Loader/Loader";
import Result from "../../component/Result";

const DetailsView = ({ content }) => {
  const lines = content.split("\n");

  let elements = [];
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul
          key={elements.length}
          className="ml-6 list-disc space-y-1 text-gray-800"
        >
          {listBuffer.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: item }}></li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((line, index) => {
    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={index} className="text-3xl font-extrabold text-blue-700 mt-6">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={index} className="text-2xl font-bold text-blue-600 mt-4">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      // Remove ** from subheading inside list items
      listBuffer.push(line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1"));
    } else if (/\*\*(.*?)\*\*/.test(line)) {
      flushList();
      const formattedText = line.replace(/\*\*(.*?)\*\*/g, "$1"); // Remove ** but keep text
      elements.push(
        <p key={index} className="text-lg text-gray-700 leading-relaxed">
          {formattedText}
        </p>
      );
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      elements.push(
        <p key={index} className="text-gray-700 leading-relaxed">
          {line}
        </p>
      );
    }
  });

  flushList();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      {elements}
    </div>
  );
};

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
        // <div className="flex flex-col mt-14 items-center justify-center min-h-screen">
        <div className="result_bg">
          {/* <DetailsView content={careerDetails} /> */}
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
