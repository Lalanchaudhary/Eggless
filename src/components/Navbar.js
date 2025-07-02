import { useEffect, useState, useRef } from 'react';
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "../lib/utils";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/Egglesscake.png'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SubNavbar from './SubNavbar';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { useUser } from '../context/UserContext';
import VerticalSubNavbar from './VerticalSubNavbar';
import { getAllCakes } from '../services/cakeServices';

export function NavbarDemo() {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [allCakes, setAllCakes] = useState([]);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);
  const [location, setLocation] = useState('Patiala');
  const [fullLocation] = useState('Patiala, Punjab, India');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const locationRef = useRef(null);
  const { user } = useUser();

  // Fetch all cakes for search
  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const cakes = await getAllCakes();
        setAllCakes(cakes);
      } catch (error) {
        console.error('Error fetching cakes for search:', error);
      }
    };
    fetchCakes();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    if (isMobileMenuOpen || showSearchResults) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, showSearchResults]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationDropdownOpen(false);
      }
    }
    if (locationDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [locationDropdownOpen]);

  // Search functionality
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);

    // Simulate search delay for better UX
    setTimeout(() => {
      const filteredCakes = allCakes.filter(cake => {
        const searchTerm = query.toLowerCase();
        return (
          cake.name?.toLowerCase().includes(searchTerm) ||
          cake.description?.toLowerCase().includes(searchTerm) ||
          cake.flavor?.toLowerCase().includes(searchTerm) ||
          cake.category?.toLowerCase().includes(searchTerm) ||
          cake.tag?.toLowerCase().includes(searchTerm)
        );
      });

      setSearchResults(filteredCakes.slice(0, 6)); // Limit to 6 results
      setShowSearchResults(true);
      setIsSearching(false);
    }, 300);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/all-cakes', { state: { searchQuery } });
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const handleSearchResultClick = (cake) => {
    console.log('Search result clicked:', cake);
    if (cake && cake._id) {
      navigate(`/cake/${cake._id}`);
      setShowSearchResults(false);
      setSearchQuery('');
    } else {
      console.error('Invalid cake data:', cake);
    }
  };

  const handleViewAllResults = () => {
    console.log('View all results clicked for:', searchQuery);
    navigate('/all-cakes', { state: { searchQuery } });
    setShowSearchResults(false);
    setSearchQuery('');
  };

  return (
    <div className='sticky top-0 z-50 py-2 md:py-3 px-3 md:px-6 border-b  border-gray-200  bg-white shadow-sm backdrop-blur-sm bg-white/95' style={{ height: isMobile ? '60px' : '100px' }}>
      <div className="max-w-7xl mx-auto" style={{ height: isMobile ? '60px' : '80px' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 md:space-x-6" onClick={() => { navigate("/") }}>
            <img src={logo} alt='logo' className='h-10 md:h-14 lg:h-20 transition-all duration-300 hover:scale-105' />
          </div>

          {/* Search input - visible on all screen sizes */}
          <div className="hidden md:block flex-1 max-w-md mx-4 relative" ref={searchRef}>
            <form onSubmit={handleSearch}>
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                  placeholder="Search cakes, flavors, occasions..."
                  className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#e098b0] focus:ring-2 focus:ring-[#e098b0]/20 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#e098b0] transition-colors duration-300"
                >
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#e098b0]"></div>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </form>

            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
                onClick={(e) => {
                  console.log('Search results container clicked');
                  e.stopPropagation();
                }}
              >
                {searchResults.length > 0 ? (
                  <>
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm text-gray-600">
                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                      </p>
                    </div>
                    <div className="py-2">
                      {searchResults.map((cake) => (
                        <button
                          key={cake._id}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Cake button clicked:', cake.name);
                            handleSearchResultClick(cake);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 flex items-center space-x-3 cursor-pointer focus:outline-none focus:bg-gray-50"
                        >
                          <img
                            src={cake.image}
                            alt={cake.name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/48x48?text=Cake';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {cake.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              ₹{cake.price} • {cake.flavor || cake.category}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-100">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('View all results clicked');
                          handleViewAllResults();
                        }}
                        className="w-full text-center text-sm text-[#e098b0] hover:text-[#d17a8f] font-medium py-2 hover:bg-gray-50 rounded transition-colors duration-200 cursor-pointer focus:outline-none focus:bg-gray-50"
                      >
                        View all results for "{searchQuery}" →
                      </button>
                    </div>
                  </>
                ) : searchQuery.trim() && !isSearching ? (
                  <div className="p-4 text-center">
                    <p className="text-gray-500 text-sm">No cakes found for "{searchQuery}"</p>
                    <p className="text-gray-400 text-xs mt-1">Try different keywords or browse all cakes</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 md:space-x-4">

            {/* Location Selector - Desktop (moved after Navbar) */}
            {
              user?.addresses &&
              <div className="hidden md:flex items-center space-x-2 ml-4 relative" ref={locationRef}>
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setLocationDropdownOpen((open) => !open)}
                >
                  <FaMapMarkerAlt className="text-rose-400 text-lg" />
                  <span className="text-gray-700 text-base font-medium">{user?.addresses[0]?.city}</span>
                  <IoIosArrowDown className={`text-gray-500 text-base transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {locationDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                    <div className="text-gray-800 text-base font-semibold mb-1">Your Location</div>
                    <div className="text-gray-600 text-sm">{user?.addresses[0]?.city}, {user?.addresses[0]?.state}</div>
                  </div>
                )}
              </div>
            }
            {
              !isMobile ? <Navbar /> : ''
            }

            {/* Cart Icon */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-1.5 md:p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 md:top-0 md:right-0 inline-flex items-center justify-center px-1.5 py-0.5 md:px-2 md:py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#e098b0] rounded-full">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Profile Icon */}
            <button
              onClick={() => navigate('/user-profile')}
              className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                // Close Icon (X)
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>
        </div>
        {/* Mobile menu with search */}
        <div
          ref={mobileMenuRef}
          className={cn(
            "relative w-full transition-all duration-300 ease-in-out bg-white",
            isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none md:hidden"
          )}>
          {/* Location Selector - Mobile */}
          {
            user?.addresses &&
            <div className="hidden md:flex items-center space-x-2 ml-4 relative" ref={locationRef}>
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setLocationDropdownOpen((open) => !open)}
              >
                <FaMapMarkerAlt className="text-rose-400 text-lg" />
                <span className="text-gray-700 text-base font-medium">{user?.addresses[0]?.city}</span>
                <IoIosArrowDown className={`text-gray-500 text-base transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {locationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                  <div className="text-gray-800 text-base font-semibold mb-1">Your Location</div>
                  <div className="text-gray-600 text-sm">{user?.addresses[0]?.city}, {user?.addresses[0]?.state}</div>
                </div>
              )}
            </div>
          }
          <Navbar />
          <VerticalSubNavbar vertical />
        </div>
      </div>
    </div>
  );
}

function Navbar({
  className
}) {
  const [active, setActive] = useState(null);
  return (
    <div
      className={cn(
        "inset-x-0 max-w-2xl mx-auto z-50",
        "mt-2 md:mt-0",
        className
      )}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Support">
          <div className="flex flex-col space-y-4 text-sm">
            <Link
              to="/about-us"
              className="text-gray-600 hover:text-rose-400"
              onClick={() => setActive('About Us')}
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="text-gray-600 hover:text-rose-400"
              onClick={() => setActive('Contact Us')}
            >
              Contact Us
            </Link>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
