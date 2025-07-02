import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import logo from '../assets/animation/Main Scene.json'
import { useNavigate } from 'react-router-dom';
const OrderSuccess = () => {
  const navigate=useNavigate();
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="text-center"
      >
        <Player
          autoplay
          loop={true}
          src={logo} // ✅ Replace with your Lottie link
          style={{ height: '200px', width: '200px' }}
        />
        <h1 className="text-3xl font-bold text-green-600 mt-4">Order Confirmed!</h1>
        <p className="text-gray-700 mt-2">Thanks for shopping with us 🎉</p>
        <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={()=>{navigate('/')}} >
          Continue Shopping
        </button>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
