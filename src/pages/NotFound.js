import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      
      <div className="text-center max-w-xl">
        
        {/* Big 404 */}
        <h1 className="text-[120px] font-extrabold leading-none bg-gradient-to-r from-[#F11F73] to-[#0C2C75] bg-clip-text text-transparent drop-shadow-lg">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#0C2C75] mt-4">
          Page Not Found
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 mt-3 text-lg">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Illustration circle glow */}
        <div className="relative mt-10 flex justify-center">
          <div className="absolute w-64 h-64 bg-[#F11F73]/20 rounded-full blur-3xl"></div>
          <div className="absolute w-64 h-64 bg-[#0C2C75]/20 rounded-full blur-3xl"></div>
        </div>

        {/* Button */}
          <button className="mt-12 px-8 py-4 rounded-xl text-white font-semibold text-lg
           bg-gradient-to-r from-[#F11F73] to-[#0C2C75]
           hover:scale-105 transition duration-300 shadow-lg cursor-pointer" onClick={() => { window.location.href = "/" }}>
            Go Back Home
          </button>

      </div>
    </div>
  );
}
