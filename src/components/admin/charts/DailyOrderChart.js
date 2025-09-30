import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DailyOrderChart = () => {
  const [dailyOrders, setDailyOrders] = useState(Array(30).fill(0));

  useEffect(() => {
    // Dummy data (replace with API later)
    const fetchedOrders = Array.from({ length: 30 }, () =>
      Math.floor(Math.random() * 100) + 10
    );
    setDailyOrders(fetchedOrders);
  }, []);

  const data = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Orders",
        data: dailyOrders,
        borderColor: "#10B981", // Tailwind green-500
        backgroundColor: "rgba(16,185,129,0.2)",
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#fff",
        tension: 0.3, // smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} Orders`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
  };

  return (
<div className="bg-white p-6 rounded-2xl shadow-md mt-6">
  <h3 className="text-lg font-bold text-gray-700 mb-4">Daily Orders</h3>
  <div className="w-[550px] h-[250px]">  {/* increased height */}
    <Line
      data={data}
      options={{ 
        ...options,
        maintainAspectRatio: false, // allow responsive resizing
      }}
    />
  </div>
</div>

  );
};

export default DailyOrderChart;
