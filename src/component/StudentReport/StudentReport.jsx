import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaChartLine, FaLock } from "react-icons/fa";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

import { getTestReport } from "../../Redux/Reducers/Assessment/GetTestReportSlice";
import { createPayment } from "../../Redux/Reducers/Payment/createPaymentSlice"

const StudentReport = () => {
  const dispatch = useDispatch();
  const isFetched = useRef(false);

  const [reports, setReports] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const userId = localStorage.getItem("id");

  useEffect(() => {
      if (!isFetched.current) {
        const isPaid = localStorage.getItem("isPaid");
        setIsPaid(isPaid);
        fetchReports();
        isFetched.current = true;
      }
    }, []);
  
    const fetchReports = async () => {
      
      const resultResponse = await dispatch(getTestReport(userId));
  
      if (resultResponse?.payload?.status === true) {
        setReports(resultResponse.payload.data);
      }
    };

  /*const reports = [
    { id: 1, subject: "Assement1", score: "85%", grade: "B+" },
    { id: 2, subject: "Assement2", score: "92%", grade: "A" },
    { id: 3, subject: "Assement3", score: "78%", grade: "C+" },
    { id: 4, subject: "Assement4", score: "88%", grade: "B" },
    { id: 5, subject: "Assement5", score: "95%", grade: "A+" },
  ];*/

  
  /*const summaryData = {
    attemptedQuestions: 45, 
    category: "Assement 1",
  };*/

  const handlePayment = async () => {
    const values = {
      amount: 250,
      userId: userId,
      paymentFor: "Assessment",
      currencyType: "cad",
    };

    const paymentResponse = await dispatch(createPayment({ values }));
    if (paymentResponse?.payload?.status === true) {
      window.location.href = paymentResponse?.payload?.data?.paymentUrl;
    }
  };

  return (
    <div className="flex justify-center  py-16">
      <div className="bg-white rounded-lg p-6 w-full md:w-[800px] shadow-md">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FaChartLine /> Performance Report
        </h2>

        {/*<div className="mb-4">
          <p className="text-lg font-medium">Number of Questions Attempted: <span className="text-blue-600">{summaryData.attemptedQuestions}</span></p>
          <p className="text-lg font-medium">Category: <span className="text-green-600">{summaryData.category}</span></p>
        </div>*/}

        {/* Table Container */}
        <div className="relative">
          <div className={`${isPaid ? "" : "blur-md"} transition duration-300`}>
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="border border-gray-300 p-3">Attended Questions</th>
                  <th className="border border-gray-300 p-3">Score</th>
                  <th className="border border-gray-300 p-3">Test</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr
                    key={report.id}
                    className={`text-center ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="border border-gray-300 p-3">{report.noOfQusAttend}</td>
                    <td className="border border-gray-300 p-3">{report.scorePoints}</td>
                    <td className="border border-gray-300 p-3">{report.testName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lock Icon Overlay */}
          {!isPaid && (
            <div className="absolute inset-0 flex items-center justify-center">
              <FaLock className="text-gray-500 text-5xl opacity-80" />
            </div>
          )}
        </div>

        {/* Payment Button / Download Button */}
        <div className="flex justify-center mt-5">
        {!isPaid ? (
            <button
              onClick={handlePayment}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg w-48 font-semibold transition duration-300"
            >
              Pay to Unlock
            </button>
          ) : null} 
          {/* {!isPaid ? (
            <button
              onClick={handlePayment}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg w-48 font-semibold transition duration-300"
            >
              Pay to Unlock
            </button>
          ) : (
            <PDFDownloadLink
              document={<ReportPDF reports={reports} />}
              fileName="Student_Report.pdf"
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg w-48 font-semibold transition duration-300 text-center"
            >
              Download Report
            </PDFDownloadLink>
          )} */}
        </div>
      </div>
    </div>
  );
};

// PDF Report Component 
const ReportPDF = ({ reports }) => (
  <Document>
    <Page style={styles.page}>
      <View>
        <Text style={styles.title}>Student Performance Report</Text>
        <Text style={{ marginTop: 10 }}>Detailed Scores:</Text>
        {reports.map((report) => (
          <Text key={report.id}>
            {report.testName}: {report.scorePoints} ({report.noOfQusAttend})
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: { padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});

export default StudentReport;
