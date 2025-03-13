import React, { useState } from "react";
import { FaChartLine, FaLock } from "react-icons/fa";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const StudentReport = () => {
  const [isPaid, setIsPaid] = useState(false);

  const reports = [
    { id: 1, subject: "Assement1", score: "85%", grade: "B+" },
    { id: 2, subject: "Assement2", score: "92%", grade: "A" },
    { id: 3, subject: "Assement3", score: "78%", grade: "C+" },
    { id: 4, subject: "Assement4", score: "88%", grade: "B" },
    { id: 5, subject: "Assement5", score: "95%", grade: "A+" },
  ];

  
  const summaryData = {
    attemptedQuestions: 45, 
    category: "Assement 1",
  };

  const handlePayment = () => {
    setIsPaid(true);
  };

  return (
    <div className="flex justify-center bg-gray-100 py-16">
      <div className="bg-white rounded-lg p-6 w-full md:w-[800px] shadow-md">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FaChartLine /> Performance Report
        </h2>

        <div className="mb-4">
          <p className="text-lg font-medium">Number of Questions Attempted: <span className="text-blue-600">{summaryData.attemptedQuestions}</span></p>
          <p className="text-lg font-medium">Category: <span className="text-green-600">{summaryData.category}</span></p>
        </div>

        {/* Table Container */}
        <div className="relative">
          <div className={`${isPaid ? "" : "blur-md"} transition duration-300`}>
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="border border-gray-300 p-3">Subject</th>
                  <th className="border border-gray-300 p-3">Score</th>
                  <th className="border border-gray-300 p-3">Grade</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr
                    key={report.id}
                    className={`text-center ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="border border-gray-300 p-3">{report.subject}</td>
                    <td className="border border-gray-300 p-3">{report.score}</td>
                    <td className="border border-gray-300 p-3">{report.grade}</td>
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
          ) : (
            <PDFDownloadLink
              document={<ReportPDF reports={reports} summaryData={summaryData} />}
              fileName="Student_Report.pdf"
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg w-48 font-semibold transition duration-300 text-center"
            >
              Download Report
            </PDFDownloadLink>
          )}
        </div>
      </div>
    </div>
  );
};

// PDF Report Component 
const ReportPDF = ({ reports, summaryData }) => (
  <Document>
    <Page style={styles.page}>
      <View>
        <Text style={styles.title}>Student Performance Report</Text>
        <Text>Number of Questions Attempted: {summaryData.attemptedQuestions}</Text>
        <Text>Category: {summaryData.category}</Text>
        <Text style={{ marginTop: 10 }}>Detailed Scores:</Text>
        {reports.map((report) => (
          <Text key={report.id}>
            {report.subject}: {report.score} ({report.grade})
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
