// src/components/DonutChart.jsx

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import * as adminService from '../../../services/adminService';
import { useEffect, useState } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);

const OrderChart = () => {
  const [orders, setOrders] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelled, setCancelled] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [pending, setPending] = useState(0);
  const loadOrders = async () => {
    try {
      const data = await adminService.getAllOrders();
      console.log(data)
      setCancelled(data.orders.filter(order => order.status === 'Cancelled').length);
      setDelivered(data.orders.filter(order => order.status === 'Delivered').length);
      setPending(data.orders.filter(order => order.status === 'Pending').length);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const data = {
    labels: ['Delivered', 'Pending', 'Cancelled'],
    datasets: [
      {
        data: [delivered, pending, cancelled], // Example percentages
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const legends = [
    { label: 'Delivered', color: '#10B981' },
    { label: 'Pending', color: '#F59E0B' },
    { label: 'Cancelled', color: '#EF4444' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="w-64 h-64">
        <Doughnut data={data} options={options} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Orders Status</h2>
        <ul className="space-y-2">
          {legends.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className="text-gray-800">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderChart;
