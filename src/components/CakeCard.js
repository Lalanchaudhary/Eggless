import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const CakeCard = ({ cake }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity] = useState(1);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log("Hello");

    if (!cake) return;

    const selectedSizeData = cake.sizes?.[0]; // assuming first size as default
    if (!selectedSizeData) {
      toast('Please select a size');
      return;
    }

    const cartItem = {
      id: cake._id,
      name: cake.name,
      image: cake.image,
      price: selectedSizeData.price,
      selectedSize: selectedSizeData.size,
      quantity,
      totalPrice: selectedSizeData.price * quantity,
    };

    addToCart(cartItem);
    const token = localStorage.getItem('token');
    if (token) {
      toast('Added to cart successfully!');
    } else {
      toast('Please login to add items to cart');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfStar)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div
      className="group bg-white rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/cake/${cake.slug}`)}
    >
      <div className="w-full aspect-square relative overflow-hidden p-4 pb-0">
        <img
          src={cake.image}
          alt={cake.name}
            onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/images/placeholder-cake.jpg";
  }}
          className="w-full h-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="w-full p-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-rose-500 font-medium text-sm">₹{cake.price}</p>
          <div className="flex items-center gap-1">
            <div className="hidden lg:flex">{renderStars(cake.rating)}</div>
            <span className="text-xs text-gray-600">({cake.reviews})</span>
          </div>
        </div>

        <h3 className="font-medium text-sm text-gray-800 group-hover:text-rose-500 transition-colors duration-300 mb-2">
          {cake.name}
        </h3>

        <p className="hidden lg:block text-xs text-gray-600 mb-3 line-clamp-2">
          {cake.description.slice(0, 100)}...
        </p>

        <div className="flex gap-2">
          <button
            className="hidden lg:block flex-1 bg-rose-300 hover:bg-rose-400 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors duration-300"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="hidden lg:block flex-1 border border-rose-300 text-rose-500 hover:bg-rose-50 px-2 py-1.5 rounded text-xs font-medium transition-colors duration-300"
            onClick={() => navigate(`/cake/${cake.slug}`)}

          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CakeCard;
