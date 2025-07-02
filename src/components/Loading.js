// components/Loading.js
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import LoderAnimation from '../assets/animation/Loder.json';

const Loading = () => {
  return (
    <div className="loading flex items-center justify-center min-h-screen bg-white/50">
      <Player
        autoplay
        loop
        src={LoderAnimation}
        style={{ height: '140px', width: '140px' }}
      />
    </div>
  );
};

export default Loading;
