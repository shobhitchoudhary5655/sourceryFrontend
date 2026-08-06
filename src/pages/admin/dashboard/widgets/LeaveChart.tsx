import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend,} from 'recharts';
export interface LeaveChartItem {
  name: string;
  value: number;
}

interface LeaveChartProps {
  data: LeaveChartItem[];
}

const COLORS = ['#7F26FD', '#FBBF24', '#EF4444', '#e9ac6b', '#5decc4', '#c04db3'];

const LeaveChart = ({ data }: LeaveChartProps) => {
  const filteredData = data.filter((item) => item.value > 0);
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Leave Requests
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={filteredData}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            innerRadius={55}
            paddingAngle={4}
            cornerRadius={8}
            label={({ value }) => value}
          >
            {filteredData.map((item, index) => (
              <Cell
                key={`${item.name}-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeaveChart;