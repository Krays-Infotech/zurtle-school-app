import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", thisYear: 20, previousYear: 30 },
  { month: "Feb", thisYear: 40, previousYear: 50 },
  { month: "Mar", thisYear: 60, previousYear: 70 },
  { month: "Apr", thisYear: 55, previousYear: 80 },
  { month: "May", thisYear: 55, previousYear: 85 },
  { month: "Jun", thisYear: 65, previousYear: 60 },
  { month: "Jul", thisYear: 45, previousYear: 75 },
  { month: "Aug", thisYear: 70, previousYear: 90 },
  { month: "Sep", thisYear: 50, previousYear: 65 },
  { month: "Oct", thisYear: 80, previousYear: 95 },
  { month: "Nov", thisYear: 55, previousYear: 70 },
  { month: "Dec", thisYear: 85, previousYear: 100 },
];

const StudentAnalysisChart = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-lg ">
      <h2 className="text-lg font-semibold text-gray-700 text-center">Student Analysis</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="thisYear" stroke="#6b46c1" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="previousYear" stroke="#ccc" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentAnalysisChart;
