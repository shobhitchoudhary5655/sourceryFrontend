import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export interface AttendanceChartItem {
  day: string;
  present: number;
  absent: number;
  leave: number;
}

interface AttendanceChartProps {
  data: AttendanceChartItem[];
}

const AttendanceChart = ({ data }: AttendanceChartProps) => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Weekly Attendance
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          {/* <Line
            type="monotone"
            dataKey="present"
            name="Present"
            stroke="#7F26FD"
            strokeWidth={3}
          /> */}
          <Line
            dataKey="present"
            name="Present"
            stroke="#22C55E"
            strokeWidth={3}
          />

          <Line
            dataKey="absent"
            name="Absent"
            stroke="#EF4444"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="leave"
            name="Leave"
            stroke="#F59E0B"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;