// components/SalesCard.jsx
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
  { value: 100 },
  { value: 300 },
  { value: 200 },
  { value: 400 },
  { value: 250 },
  { value: 350 },
  { value: 300 },
  { value: 380 },
  { value: 320 },
  { value: 400 },
];

const RevenueCard = () => {
  return (
    <div className="bg-white shadow-sm rounded-md p-4 w-full max-w-sm">
      <div className="text-2xl font-semibold text-gray-800">$424,652</div>
      <div className="text-gray-500 text-sm">Sales</div>
      <div className="mt-4 h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke="#0000FF" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueCard;
