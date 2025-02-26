import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";

const data = [
  { name: "Week 1", Tests: 3, Assignments: 2, Projects: 1 },
  { name: "Week 2", Tests: 4, Assignments: 3, Projects: 1 },
  { name: "Week 3", Tests: 2, Assignments: 5, Projects: 2 },
  { name: "Week 4", Tests: 5, Assignments: 4, Projects: 3 },
  { name: "Week 5", Tests: 4, Assignments: 6, Projects: 8 },
];

const StudentActivity = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Student Activity Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          {/* Gradient line */}
          <defs>
            <linearGradient id="colorTests" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAssignments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid, Axis, and Labels */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
          <YAxis tick={{ fill: "#6b7280" }} />
          <Tooltip />
          <Legend />

          {/* Area Lines with Smooth Gradient */}
          <Area type="monotone" dataKey="Tests" stroke="#8884d8" strokeWidth={3} fill="url(#colorTests)" />
          <Area type="monotone" dataKey="Assignments" stroke="#82ca9d" strokeWidth={3} fill="url(#colorAssignments)" />
          <Area type="monotone" dataKey="Projects" stroke="#ffc658" strokeWidth={3} fill="url(#colorProjects)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentActivity;
