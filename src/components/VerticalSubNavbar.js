import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

const VerticalSubNavbar = ({ vertical = false ,setIsMobileMenuOpen}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null); // for vertical mode
  const navigate = useNavigate();

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleItemClick = (href) => {
    navigate(href);
    setOpenDropdown(null);
    setHoveredItem(null);
  };


  return (
    <nav
      className={`w-full bg-white border-b border-gray-100 shadow-sm ${vertical ? '' : 'hidden md:block'
        } relative`}
    >
      <ul
        className={`flex ${vertical
            ? 'flex-col gap-2 items-start px-4 py-2'
            : 'flex-row justify-center items-center gap-10 py-3 md:py-4 overflow-x-auto whitespace-nowrap'
          }`}
      >
        {menuItems.map((item) => (
          <li
            key={item.label}
            className="w-full relative"
            onMouseEnter={() => !vertical && setHoveredItem(item.label)}
            onMouseLeave={() => !vertical && setHoveredItem(null)}
          >
            <button
              onClick={() => {
                  toggleDropdown(item.label);
              }}
              className="w-full text-left text-base md:text-lg font-medium text-black hover:text-rose-500 px-4 py-2 transition-colors flex justify-between items-center"
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                  {item.badge}
                </span>
              )}
              {vertical && (
                <span className="ml-auto text-sm text-gray-500">{openDropdown === item.label ? '▲' : '▼'}</span>
              )}
            </button>

            {/* Mobile (vertical) dropdown */}
            {vertical && openDropdown === item.label && item.dropdown && (
              <ul className="w-full px-4 pb-3">
                {item.dropdown.map((dropdownItem, index) => (
                  <li key={index}>
                    <Link
                      to={`/cakes/${dropdownItem.href}`}
                      onClick={() => {
                        setIsMobileMenuOpen && setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-1.5 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded px-2 transition-colors"
                    >
                      {dropdownItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default VerticalSubNavbar;
