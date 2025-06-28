import React from 'react';
import { useNavigate } from 'react-router-dom';
import cake from '../assets/cake.jpg';

const Home = () => {
  const navigate = useNavigate();

  const trendingCakes = [
    { id: 1, name: 'Chocolate Cake', price: 25, image: cake },
    { id: 2, name: 'Vanilla Cake', price: 20, image: cake },
    { id: 3, name: 'Strawberry Cake', price: 30, image: cake },
    { id: 4, name: 'Red Velvet Cake', price: 35, image: cake },
  ];

  const surpriseCakes = [
    { id: 5, name: 'Birthday Surprise', price: 40, image: cake },
    { id: 6, name: 'Anniversary Special', price: 45, image: cake },
    { id: 7, name: 'Wedding Cake', price: 50, image: cake },
    { id: 8, name: 'Custom Design', price: 55, image: cake },
  ];

  const bestSellers = [
    { id: 9, name: 'Classic Chocolate', price: 28, image: cake },
    { id: 10, name: 'Carrot Cake', price: 32, image: cake },
    { id: 11, name: 'Cheesecake', price: 38, image: cake },
    { id: 12, name: 'Black Forest', price: 42, image: cake },
  ];

  const CakeCard = ({ cake }) => (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => navigate(`/cake/${cake.id}`)}
    >
      <div className="relative aspect-square">
        <img
          src={cake.image}
          alt={cake.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{cake.name}</h3>
        <p className="text-gray-600 mb-3">${cake.price}</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button 
            className="flex-1 bg-rose-300 hover:bg-rose-400 text-white px-4 py-2 rounded transition"
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic here
            }}
          >
            Add to Cart
          </button>
          <button 
            className="flex-1 border border-rose-300 text-rose-400 hover:bg-rose-50 px-4 py-2 rounded transition"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/cake/${cake.id}`);
            }}
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );

  const CakeSection = ({ title, cakes, description }) => (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cakes.map(cake => (
          <CakeCard key={cake.id} cake={cake} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cake}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-100/80 to-amber-100/80" />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Sweet Delights
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover our handcrafted cakes made with love and the finest ingredients
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-rose-400 hover:bg-rose-500 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            Explore Our Cakes
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CakeSection
          title="Our Trending Cakes"
          description="Discover our most popular cakes that everyone loves"
          cakes={trendingCakes}
        />
        
        <CakeSection
          title="Surprise Your Love"
          description="Make their special day even more memorable with our custom-designed cakes"
          cakes={surpriseCakes}
        />
        
        <CakeSection
          title="Our Best Sellers"
          description="These are the cakes our customers keep coming back for"
          cakes={bestSellers}
        />
      </div>
    </div>
  );
};

export default Home; 