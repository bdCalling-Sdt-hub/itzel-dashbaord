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

const data = Array.from({ length: 30 }, (_, i) => ({
  name: `${i + 1}`,
  Sales: Math.floor(Math.random() * 1000) + 1000,
  Revenue: Math.floor(Math.random() * 1000) + 500,
}));

const SalesTrackingChart = () => {
  return (
    <div>
      <h1 className="font-bold ms-5 text-xl mb-5">Total Earnings</h1>
      <div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="30%" // Adjust gap between bars
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Thinner bars */}
            <Bar
              dataKey="Sales"
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
