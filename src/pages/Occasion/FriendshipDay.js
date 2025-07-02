import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCakes } from '../../services/cakeServices';
import Loading from '../../components/Loading';

const FriendshipDay = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    rating: 0,
    dietary: [],
    flavor: []
  });
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Filter options
  const dietaryOptions = ['Eggless', 'Vegan', 'Gluten Free', 'Sugar Free'];
  const flavorOptions = ['Chocolate', 'Vanilla', 'Strawberry', 'Butterscotch', 'Red Velvet', 'Fruit'];

  // Fetch cakes from API
  useEffect(() => {
    const fetchCakes = async () => {
      try {
        setLoading(true);
        const data = await getAllCakes();
        const fiterData=data.filter((e)=>{
            return e.label=='friendship-day-cakes'
        })
        console.log('Fetched cakes:', fiterData);
        setCakes(fiterData);
        setError(null);
      } catch (err) {
        console.error('Error fetching cakes:', err);
        setError('Failed to fetch cakes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCakes();
  }, []);

  // Filter cakes for Friendhhip Day Cakes
  const getFilteredCakes = () => {
    let filteredCakes = cakes.filter(cake => 
      cake.tag?.toLowerCase().includes('Theme-Cake') ||
      cake.description?.toLowerCase().includes('Theme-Cake') ||
      cake.name?.toLowerCase().includes('Theme-Cake')
    );

    // Filter by price range
    filteredCakes = filteredCakes.filter(cake => 
      cake.price >= filters.priceRange[0] && cake.price <= filters.priceRange[1]
    );

    // Filter by rating
    if (filters.rating > 0) {
      filteredCakes = filteredCakes.filter(cake => cake.rating >= filters.rating);
    }

    // Filter by dietary preferences
    if (filters.dietary.length > 0) {
      filteredCakes = filteredCakes.filter(cake => 
        filters.dietary.some(dietary => 
          cake.label?.toLowerCase().includes(dietary.toLowerCase()) ||
          cake.description?.toLowerCase().includes(dietary.toLowerCase())
        )
      );
    }

    // Filter by flavor
    if (filters.flavor.length > 0) {
      filteredCakes = filteredCakes.filter(cake => 
        filters.flavor.some(flavor => 
          cake.flavor?.toLowerCase().includes(flavor.toLowerCase()) ||
          cake.name?.toLowerCase().includes(flavor.toLowerCase())
        )
      );
    }

    return filteredCakes;
  };

  const filteredCakes = cakes;

  // Helper function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
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

    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCheckboxChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const HorizontalFilters = () => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Price Range */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Price:</span>
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
            className="w-16 px-2 py-1 border rounded text-sm"
            min="0"
            placeholder="Min"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
            className="w-16 px-2 py-1 border rounded text-sm"
            min="0"
            placeholder="Max"
          />
        </div>

        {/* Rating Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Rating:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleFilterChange('rating', star)}
                className={`p-1 rounded ${
                  filters.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Dietary:</span>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((option) => (
              <label key={option} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={filters.dietary.includes(option)}
                  onChange={() => handleCheckboxChange('dietary', option)}
                  className="rounded text-rose-500 focus:ring-rose-500"
                />
                <span className="text-xs text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Flavors */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Flavor:</span>
          <div className="flex flex-wrap gap-2">
            {flavorOptions.map((option) => (
              <label key={option} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={filters.flavor.includes(option)}
                  onChange={() => handleCheckboxChange('flavor', option)}
                  className="rounded text-rose-500 focus:ring-rose-500"
                />
                <span className="text-xs text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear All Button */}
        <button
          onClick={() => setFilters({
            priceRange: [0, 2000],
            rating: 0,
            dietary: [],
            flavor: []
          })}
          className="px-3 py-1 text-sm text-rose-500 hover:text-rose-600 border border-rose-300 rounded hover:bg-rose-50 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );

  const CakeCard = ({ cake }) => (
    <div 
      className="group bg-white rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/cake/${cake._id}`)}
    >
      <div className="w-full aspect-square relative overflow-hidden p-4 pb-0">
        <img
          src={cake.image}
          alt={cake.name}
          className="w-full h-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="w-full p-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-rose-500 font-medium text-sm">₹{cake.price}</p>
          <div className='flex items-center gap-1'>
            <div className="hidden lg:flex">
              {renderStars(cake.rating)}
            </div>
            <div className='block lg:hidden'>
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-xs text-gray-600">({cake.reviews || 0})</span>
          </div>
        </div>
        <h3 className="font-medium text-sm text-gray-800 group-hover:text-rose-500 transition-colors duration-300 mb-2">
          {cake.name}
        </h3>
        <p className="hidden lg:block md:block text-xs text-gray-600 mb-3 line-clamp-2">
          {cake.description?.slice(0, 100)}...
        </p>
        <div className="flex gap-2">
          <button 
            className="hidden lg:block flex-1 bg-rose-300 hover:bg-rose-400 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic here
            }}
          >
            Add to Cart
          </button>
          <button 
            className="hidden lg:block flex-1 border border-rose-300 text-rose-500 hover:bg-rose-50 px-2 py-1.5 rounded text-xs font-medium transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/cake/${cake._id}`);
            }}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Friendhhip Day Cakes
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Make every birthday special with our delicious eggless Friendhhip Day Cakes. Perfect for celebrating life's beautiful moments!
          </p>
        </div>

        {/* Horizontal Filters */}
        <HorizontalFilters />

        {/* Cake Grid */}
        <div className="w-full">
          {filteredCakes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No Friendhhip Day Cakes found matching your criteria.</p>
              <button
                onClick={() => setFilters({
                  priceRange: [0, 2000],
                  rating: 0,
                  dietary: [],
                  flavor: []
                })}
                className="mt-4 px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Friendhhip Day Cakes
                </h2>
                <p className="text-gray-600">
                  {filteredCakes.length} Friendhhip Day Cake{filteredCakes.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 lg:gap-4">
                {filteredCakes.map(cake => (
                  <CakeCard key={cake._id} cake={cake} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendshipDay; 