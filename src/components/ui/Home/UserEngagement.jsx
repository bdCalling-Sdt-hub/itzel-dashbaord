import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    month: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    month: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    month: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    month: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    month: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    month: "Jul",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    month: "Aug",
    uv: 3590,
    pv: 4400,
    amt: 2200,
  },
  {
    month: "Sep",
    uv: 3690,
    pv: 4500,
    amt: 2300,
  },
  {
    month: "Oct",
    uv: 3790,
    pv: 4600,
    amt: 2400,
  },
  {
    month: "Nov",
    uv: 3890,
    pv: 4700,
    amt: 2500,
  },
  {
    month: "Dec",
    uv: 3990,
    pv: 4800,
    amt: 2600,
  },
];

const UserEngagement = () => {
  return (
    <div className="bg-white border rounded-2xl p-4">
      <h1 className="font-bold text-xl mb-5">User Engagement</h1>
      <div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="pv"
              radius={[20, 20, 0, 0]}
              barSize={30}
              fill="#236e9e"
            />
            <Bar
              dataKey="uv"
              radius={[20, 20, 0, 0]}
              barSize={30}
              fill="#9fa9c0"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserEngagement;
