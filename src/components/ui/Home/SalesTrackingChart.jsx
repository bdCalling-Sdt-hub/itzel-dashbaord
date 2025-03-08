import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEarningStateQuery } from "../../../redux/apiSlices/dashboardSlice";
import { Spin } from "antd";

const data = Array.from({ length: 30 }, (_, i) => ({
  name: `${i + 1}`,
  Sales: Math.floor(Math.random() * 1000) + 1000,
  Revenue: Math.floor(Math.random() * 1000) + 500,
}));

const SalesTrackingChart = () => {
  const { data: earnings, isLoading } = useEarningStateQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const earningData = earnings?.data || [];
  // console.log(earningData);

  return (
    <div>
      <h1 className="font-bold ms-5 text-xl mb-5">Total Earnings</h1>
      <div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={earningData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="30%" // Adjust gap between bars
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Thinner bars */}
            <Bar
              dataKey="totalEarning"
              stackId="a"
              fill="#008de7"
              radius={[20, 20, 0, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesTrackingChart;
