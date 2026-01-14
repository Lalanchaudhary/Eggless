import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCakes } from '../services/cakeServices';
import { FaPhone, FaSearch } from 'react-icons/fa';

const menuItems = [
  {
    label: 'Cakes',
    href: '/all-cakes',
    dropdown: [
      { name: 'Chocolate Cakes', href: 'chocolate-cakes' },
      { name: 'Vanilla Cakes', href: 'vanilla-flavor' },
      { name: 'Red Velvet Cakes', href: 'redVelvet-flavor-cakes' },
      { name: 'Fruit Cakes', href: 'fruit-cakes' },
      { name: 'Pineapple Cake', href: 'pineapple-flavor-cakes' },
      { name: 'Butterscotch-cake', href: 'butterscotch-flavor-cakes' },
    ],
  },
  {
    label: 'Theme Cakes',
    href: '/Theme',
    dropdown: [
      { name: 'Cartoon Theme', href: 'cartoon-theme-cakes' },
      { name: 'Superhero Theme', href: 'superhero-theme-cakes' },
      { name: 'Cricket Theme', href: 'cricket-theme-cakes' },
      { name: 'Nature Theme', href: 'nature-theme-cakes' },
    ],
  },
  {
    label: 'Desserts',
    href: 'Desserts',
    dropdown: [
      { name: 'Cupcakes', href: 'Cupcakes' },
      { name: 'Brownies', href: 'brownies' },
      { name: 'Cookies', href: 'cookies' },
      { name: 'Pastries', href: 'pastries' },
      { name: 'Muffins', href: 'muffins' },
      { name: 'Donuts', href: 'donuts' },
    ],
  },
  {
    label: 'Birthday',
    href: 'Birthday',
    dropdown: [
      { name: 'Kids Birthday', href: 'kids-birthday' },
      { name: 'Adult Birthday', href: 'adult-birthday' },
      { name: 'Milestone Birthday', href: 'milestone-birthday' },
      { name: 'Surprise Birthday', href: 'surprise-birthday' },
      { name: 'Birthday Combos', href: 'birthday-combos' },
      { name: 'Birthday Specials', href: 'birthday-Specials' },
    ],
  },
  {
    label: 'Anniversary',
    href: 'anniversary',
    dropdown: [
      { name: 'First Anniversary', href: 'FirstAnniversary-cakes' },
      { name: 'Anniversary Combos', href: 'anniversary-cakes' },
      { name: 'Anniversary Specials', href: 'anniversary-cakes' },
    ],
  },
  {
    label: 'Occasion',
    href: '/all-cakes',
    dropdown: [
      { name: 'FriendShip Day', href: 'friendship-day-cakes' },
      { name: 'Baby Shower', href: 'baby-shower-cakes' },
      { name: 'Farewell', href: 'farewell-cakes' },
      { name: 'Congratulations', href: 'congratulations-cakes' },
    ],
  },
  {
    label: 'Customized Cakes',
    href: 'Customized',
    dropdown: [
      { name: 'Photo Cakes', href: 'photo-cakes' },
      { name: 'Name Cakes', href: 'name-cakes' },
      { name: 'Designer Cakes', href: 'designer-cakes' },
      { name: 'Fondant Cakes', href: 'fondant-cakes' },
      { name: 'Custom Flavors', href: 'custom-flavor-cakes' },
    ],
  },
];

const SubNavbar = ({ vertical = false }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const itemRefs = useRef({});
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [allCakes, setAllCakes] = useState([]);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  
    useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHoveredItem(false);
      }
    };

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hoveredItem]);


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
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
        // Don't close search input when clicking on the search icon
        if (!event.target.closest('button[aria-label="toggle-search"]')) {
          setShowSearchInput(false);
        }
      }
    };
    if (showSearchResults || showSearchInput) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchResults, showSearchInput]);

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    setIsSearching(true);
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
      setSearchResults(filteredCakes.slice(0, 6));
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
      navigate('/eggless-cakes', { state: { searchQuery } });
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
    navigate('/eggless-cakes', { state: { searchQuery } });
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const handleMouseEnter = (label) => {
    if(hoveredItem){
      setHoveredItem(null);
      return;
    }
    if (!vertical && itemRefs.current[label]) {
      const rect = itemRefs.current[label].getBoundingClientRect();
      const dropdownWidth = 260;
      const margin = 12;
  
      let calculatedLeft = rect.left + rect.width / 2;
      if (calculatedLeft - dropdownWidth / 2 < margin) {
        calculatedLeft = dropdownWidth / 2 + margin;
      }
  
      setDropdownPos({
        top: rect.bottom + 4,
        left: calculatedLeft,
      });
      setHoveredItem(label);
    }
  };
  


  return (
    <>
      {/* Phone numbers with search icon for mobile */}
      {isMobile && (
        <div className="w-full px-2 py-2 bg-white border-b border-gray-100 sticky top-[60px] z-40">
          {/* Phone numbers in rows */}
          <div className="flex flex-row items-center justify-between">
            <a href="tel:7503333332" className="flex items-center space-x-2 text-gray-700 hover:text-[#e098b0] transition-colors duration-300 mb-1">
              <FaPhone className="text-[#e098b0]" />
              <span className="text-sm font-medium">750-333-3332</span>
            </a>
            <a href="tel:8285500500" className="flex items-center space-x-2 text-gray-700 hover:text-[#e098b0] transition-colors duration-300">
              <FaPhone className="text-[#e098b0]" />
              <span className="text-sm font-medium">828-550-0500</span>
            </a>
                      {/* Search icon and toggle */}
          <div className="flex justify-center">
            <button 
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
              aria-label="toggle-search"
            >
              <FaSearch className="text-[#e098b0] w-4 h-4" />
            </button>
          </div>
          </div>
          

          
          {/* Search input that appears when search icon is clicked */}
          {showSearchInput && (
            <div className="mt-2" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                  placeholder="Search cakes, flavors, occasions..."
                  className="w-full px-4 py-1 rounded-lg border border-gray-200 focus:outline-none focus:border-[#e098b0] focus:ring-2 focus:ring-[#e098b0]/20 transition-all duration-300 bg-gray-50 hover:bg-white"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#e098b0] transition-colors duration-300"
                >
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#e098b0]"></div>
                  ) : (
                    <FaSearch className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>
          )}
          {/* Mobile Search Results Dropdown */}
          {showSearchResults && (
            <div
              className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
              onClick={(e) => {
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
      )}
      {/* SubNavbar horizontal menu as before */}
      <nav
        className={`w-full bg-white border-b border-gray-100 shadow-sm sticky top-[95px] z-30 ${
          vertical ? '' : 'hidden md:block'
        } relative`}
      >
        <ul
          className={`flex ${
            vertical
              ? 'flex-col gap-2 items-start px-4 py-2'
              : 'flex-row justify-between items-center px-8  py-3 md:py-4 overflow-x-auto whitespace-nowrap'
          }`}
        >
          {menuItems.map((item) => {
            const isActive = hoveredItem === item.label;

            return (
              <div
                key={item.label}
                className="relative"
                onClick={() => handleMouseEnter(item.label)}
                ref={dropdownRef}
              >
                <li
                  ref={(el) => (itemRefs.current[item.label] = el)}
                  className="relative flex flex-col items-start group"
                >
                  <button
                    // onClick={() => navigateTo(item.href)}
                    className={`text-lg md:text-xl font-medium text-black hover:text-rose-500 transition-colors px-2 ${
                      vertical ? 'py-1' : ''
                    }`}
                  >
                    {item.label}
                    <span className="ml-auto text-[12px] text-gray-500">{hoveredItem ===item.label?' ▲' : ' ▼'}</span>
                  </button>
                </li>

                {/* Dropdown shown inside same wrapper */}
                {isActive && (
                  <div
                    className="fixed bg-white border border-gray-200 rounded-lg shadow-2xl z-50 min-w-[240px] py-2"
                    style={{
                      top: dropdownPos.top,
                      left: dropdownPos.left,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800 text-sm">{item.label}</h3>
                    </div>
                    <ul className="py-1">
                      {item.dropdown.map((dropdownItem, index) => (
                        <li key={index}>
                          <Link to={`/cakes/${dropdownItem.href}`}
                            
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                          >
                            {dropdownItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="px-4 py-2 border-t border-gray-100">
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default SubNavbar;