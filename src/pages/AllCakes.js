import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllCakes } from '../services/cakeServices';
import CakeCard from '../components/CakeCard';
const AllCakes = () => {
  const [activeSection, setActiveSection] = useState('all');
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    rating: 0,
    dietary: [],
    flavor: [],
    occasion: []
  });
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Filter options
  const dietaryOptions = ['Eggless', 'Vegan', 'Gluten Free', 'Sugar Free'];
  const flavorOptions = ['Chocolate', 'Vanilla', 'Strawberry', 'Butterscotch', 'Red Velvet', 'Fruit'];
  const occasionOptions = ['Birthday', 'Anniversary', 'Wedding', 'Graduation', 'Corporate'];

  // Handle search query from navbar
  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
      // Clear the state to prevent it from persisting on refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  // Fetch cakes from API
  useEffect(() => {
    const fetchCakes = async () => {
      try {
        setLoading(true);
        const data = await getAllCakes();
        setCakes(data);
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

  // Filter cakes based on active section, filters, and search query
  const getFilteredCakes = () => {
    let filteredCakes = [...cakes];

    // Filter by search query first
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredCakes = filteredCakes.filter(cake => 
        cake.name?.toLowerCase().includes(query) ||
        cake.description?.toLowerCase().includes(query) ||
        cake.flavor?.toLowerCase().includes(query) ||
        cake.category?.toLowerCase().includes(query) ||
        cake.tag?.toLowerCase().includes(query)
      );
    }

    // Filter by category (active section)
    if (activeSection !== 'all') {
      filteredCakes = filteredCakes.filter(cake => 
        cake.category?.toLowerCase() === activeSection ||
        cake.flavor?.toLowerCase() === activeSection
      );
    }

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

    // Filter by occasion
    if (filters.occasion.length > 0) {
      filteredCakes = filteredCakes.filter(cake => 
        filters.occasion.some(occasion => 
          cake.tag?.toLowerCase().includes(occasion.toLowerCase()) ||
          cake.description?.toLowerCase().includes(occasion.toLowerCase())
        )
      );
    }

    return filteredCakes;
  };

  // Get unique categories from fetched data
  const getCategories = () => {
    const categories = [
      { id: 'all', name: 'All Cakes' }
    ];

    // Extract unique categories and flavors from the data
    const uniqueCategories = [...new Set(cakes.map(cake => cake.category).filter(Boolean))];
    const uniqueFlavors = [...new Set(cakes.map(cake => cake.flavor).filter(Boolean))];

    // Add categories
    uniqueCategories.forEach(category => {
      categories.push({
        id: category.toLowerCase(),
        name: category
      });
    });

    // Add flavors (avoid duplicates)
    uniqueFlavors.forEach(flavor => {
      const flavorId = flavor.toLowerCase();
      if (!categories.find(cat => cat.id === flavorId)) {
        categories.push({
          id: flavorId,
          name: flavor
        });
      }
    });

    return categories;
  };

  const categories = getCategories();
  const filteredCakes = getFilteredCakes();

  /* Helper function to render star ratings (unused)
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
  */

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

  const clearSearch = () => {
    setSearchQuery('');
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 2000],
      rating: 0,
      dietary: [],
      flavor: [],
      occasion: []
    });
    setSearchQuery('');
  };

  const HorizontalFilters = () => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Search Results Header */}
      {searchQuery && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Search results for:</span>
              <span className="font-medium text-rose-600">"{searchQuery}"</span>
              <span className="text-sm text-gray-500">({filteredCakes.length} results)</span>
            </div>
            <button
              onClick={clearSearch}
              className="text-rose-500 hover:text-rose-600 text-sm font-medium"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

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
        {dietaryOptions
          .filter((option) => option !== 'Eggless')
          .map((option) => (
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

        {/* Occasions */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Occasion:</span>
          <div className="flex flex-wrap gap-2">
            {occasionOptions.map((option) => (
              <label key={option} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={filters.occasion.includes(option)}
                  onChange={() => handleCheckboxChange('occasion', option)}
                  className="rounded text-rose-500 focus:ring-rose-500"
                />
                <span className="text-xs text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear All Button */}
        <button
          onClick={clearAllFilters}
          className="px-3 py-1 text-sm text-rose-500 hover:text-rose-600 border border-rose-300 rounded hover:bg-rose-50 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cakes...</p>
        </div>
      </div>
    );
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
            Our Cake Collection
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover our wide range of delicious eggless cakes, each crafted with love and the finest ingredients.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveSection(category.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === category.id
                  ? 'bg-rose-300 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-rose-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Horizontal Filters */}
        <HorizontalFilters />

        {/* Cake Grid */}
        <div className="w-full">
          {filteredCakes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No cakes found matching your criteria.</p>
              <button
                onClick={() => setFilters({
                  priceRange: [0, 2000],
                  rating: 0,
                  dietary: [],
                  flavor: [],
                  occasion: []
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
                  {activeSection === 'all' ? 'All Cakes' : categories.find(cat => cat.id === activeSection)?.name}
                </h2>
                <p className="text-gray-600">
                  {filteredCakes.length} cake{filteredCakes.length !== 1 ? 's' : ''} found
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

export default AllCakes;