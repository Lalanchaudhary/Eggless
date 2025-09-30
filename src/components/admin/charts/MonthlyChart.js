import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyChart = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(Array(12).fill(0)); // Array for monthly revenue
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Example: API call simulation
  useEffect(() => {
    // Example dummy data
    const fetchedData = [1200, 1500, 1000, 1800, 2000, 2500, 3000, 2800, 3200, 4000, 3700, 4500];
    setMonthlyRevenue(fetchedData);
    setTotalOrders(324);
    setTotalRevenue(fetchedData.reduce((a, b) => a + b, 0));
  }, []);

  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: monthlyRevenue,
        backgroundColor: "#3B82F6", // Tailwind blue-500
        hoverBackgroundColor: "#1E40AF", // Tailwind blue-900
        borderRadius: 6,
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
          label: (tooltipItem) => `₹${tooltipItem.raw.toLocaleString()}`,
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
        grid: {
          drawBorder: false,
          color: "rgba(0, 0, 0, 0.05)",
        },
        beginAtZero: true,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
        const month = data.labels[clickedIndex];
        const revenue = data.datasets[0].data[clickedIndex];
        alert(`Month: ${month}\nRevenue: ₹${revenue}`);
      }
    },
  };

  return (
    <div className="bg-whit w-full h-[380px] p-6 rounded-2xl shadow-md mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h3 className="text-lg font-bold text-gray-700">Monthly Revenue</h3>
        <p className="text-2xl font-extrabold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
        <p className="text-gray-500 text-sm">
          Generated from <span className="font-semibold">{totalOrders}</span> Orders
        </p>
      </div>
      <div className="w-full md:w-2/3 h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MonthlyChart;
