import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

export interface LeaveChartItem {
  name: string;
  value: number;
}

interface LeaveChartProps {
  data: LeaveChartItem[];
}

const COLORS = ['#7F26FD', '#FBBF24', '#EF4444'];

const LeaveChart = ({ data }: LeaveChartProps) => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">
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
            {data.map((item, index) => (
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

// import {
//   PieChart,
//   Pie,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
//   Legend,
// } from 'recharts';

// const data = [
//   { name: 'Approved', value: 40 },
//   { name: 'Pending', value: 15 },
//   { name: 'Rejected', value: 5 },
// ];

// const COLORS = ['#7F26FD', '#FBBF24', '#EF4444'];

// const LeaveChart = () => {
//   return (
//     <div className="bg-white p-6 rounded-2xl border">
      
//       <h2 className="font-semibold text-lg mb-4">
//         Leave Requests
//       </h2>

//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             outerRadius={100}
//             label
//           >
//             {data.map((_, index) => (
//               <Cell
//                 key={index}
//                 fill={COLORS[index]}
//               />
//             ))}
//           </Pie>

//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>

//     </div>
//   );
// };

// export default LeaveChart;