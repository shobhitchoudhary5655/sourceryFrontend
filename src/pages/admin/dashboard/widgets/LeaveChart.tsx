import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

const data = [
  { name: 'Approved', value: 40 },
  { name: 'Pending', value: 15 },
  { name: 'Rejected', value: 5 },
];

const COLORS = ['#7F26FD', '#FBBF24', '#EF4444'];

const LeaveChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border">
      
      <h2 className="font-semibold text-lg mb-4">
        Leave Requests
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
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