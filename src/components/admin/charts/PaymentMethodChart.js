import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import * as adminService from '../../../services/adminService';
ChartJS.register(ArcElement, Tooltip, Legend);

const PaymentMethodChart = () => {
    
    const [COD, setCOD] = useState(0);
    const [UPI, setUPI] = useState(0);
    const [Card, setCard] = useState(0);
    const [Wallet, setWallet] = useState(0);
    const loadOrders = async () => {
      try {
        const data = await adminService.getAllOrders();
        console.log(data)
        setCOD(data.orders.filter(order => order.paymentMethod === 'COD').length);
        setUPI(data.orders.filter(order => order.paymentMethod === 'UPI').length);
        setCard(data.orders.filter(order => order.paymentMethod === 'Card').length);
        setWallet(data.orders.filter(order => order.paymentMethod === 'Wallet').length);
        
      } catch (err) {
        console.error(err.message || 'Failed to load orders');
      }
    };
  
    useEffect(() => {
      loadOrders();
    }, []);
  
  const [paymentData, setPaymentData] = useState({
    UPI: 0,
    Card: 0,
    COD: 0,
    Wallet: 0,
  });

  useEffect(() => {
    // Dummy data (replace later with API)
    const fetchedData = {
      UPI: UPI,
      Card: Card,
      COD: COD,
      Wallet: Wallet,
    };
    setPaymentData(fetchedData);
  }, [COD,UPI,Card,Wallet]);

  const data = {
    labels: ["UPI", "Card", "COD", "Wallet"],
    datasets: [
      {
        data: Object.values(paymentData),
        backgroundColor: [
          "#3B82F6", // blue
          "#10B981", // green
          "#F59E0B", // orange
          "#EF4444", // red
        ],
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw} Payments`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6 flex flex-col items-center">
      <h3 className="text-lg font-bold text-gray-700 mb-4">
        Payment Methods
      </h3>
      <div className="w-72 h-72">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default PaymentMethodChart;
