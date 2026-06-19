import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid,} from 'recharts';

const data = [
  { day: 'Mon', present: 90 },
  { day: 'Tue', present: 85 },
  { day: 'Wed', present: 92 },
  { day: 'Thu', present: 88 },
  { day: 'Fri', present: 95 },
  { day: 'Sat', present: 70 },
  { day: 'Sun', present: 60 },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border">
      
      <h2 className="font-semibold text-lg mb-4">
        Weekly Attendance
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />
          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="present"
            stroke="#7F26FD"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default AttendanceChart;