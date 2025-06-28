import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  {
    label: 'Cakes',
    href: '/all-cakes',
    dropdown: [
      { name: 'Chocolate Cakes', href: '/chocolate-cakes' },
      { name: 'Vanilla Cakes', href: '/vanilla-cakes' },
      { name: 'Red Velvet Cakes', href: '/all-cakes' },
      { name: 'Fruit Cakes', href: '/all-cakes' },
      { name: 'Cheesecakes', href: '/all-cakes' },
      { name: 'Ice Cream Cakes', href: '/all-cakes' },
    ],
  },
  {
    label: 'Theme Cakes',
    href: '/all-cakes',
    dropdown: [
      { name: 'Cartoon Theme', href: '/all-cakes' },
      { name: 'Superhero Theme', href: '/all-cakes' },
      { name: 'Princess Theme', href: '/all-cakes' },
      { name: 'Sports Theme', href: '/all-cakes' },
      { name: 'Nature Theme', href: '/all-cakes' },
      { name: 'Abstract Theme', href: '/all-cakes' },
    ],
  },
  {
    label: 'By Relationship',
    href: '/all-cakes',
    dropdown: [
      { name: 'For Parents', href: '/all-cakes' },
      { name: 'For Siblings', href: '/all-cakes' },
      { name: 'For Friends', href: '/all-cakes' },
      { name: 'For Colleagues', href: '/all-cakes' },
      { name: 'For Children', href: '/all-cakes' },
      { name: 'For Grandparents', href: '/all-cakes' },
    ],
  },
  {
    label: 'Desserts',
    href: '/all-cakes',
    dropdown: [
      { name: 'Cupcakes', href: '/all-cakes' },
      { name: 'Brownies', href: '/all-cakes' },
      { name: 'Cookies', href: '/all-cakes' },
      { name: 'Pastries', href: '/all-cakes' },
      { name: 'Muffins', href: '/all-cakes' },
      { name: 'Donuts', href: '/all-cakes' },
    ],
  },
  {
    label: 'Birthday',
    href: '/birthday-cakes',
    dropdown: [
      { name: 'Kids Birthday', href: '/birthday-cakes' },
      { name: 'Adult Birthday', href: '/birthday-cakes' },
      { name: 'Milestone Birthday', href: '/birthday-cakes' },
      { name: 'Surprise Birthday', href: '/birthday-cakes' },
      { name: 'Birthday Combos', href: '/birthday-cakes' },
      { name: 'Birthday Specials', href: '/birthday-cakes' },
    ],
  },
  {
    label: 'Hampers',
    href: '/all-cakes',
    badge: 'New',
    dropdown: [
      { name: 'Chocolate Hampers', href: '/all-cakes' },
      { name: 'Fruit Hampers', href: '/all-cakes' },
      { name: 'Gift Hampers', href: '/all-cakes' },
      { name: 'Premium Hampers', href: '/all-cakes' },
      { name: 'Corporate Hampers', href: '/all-cakes' },
      { name: 'Custom Hampers', href: '/all-cakes' },
    ],
  },
  {
    label: 'Anniversary',
    href: '/anniversary-cakes',
    dropdown: [
      { name: 'Wedding Anniversary', href: '/anniversary-cakes' },
      { name: 'Dating Anniversary', href: '/anniversary-cakes' },
      { name: 'Work Anniversary', href: '/anniversary-cakes' },
      { name: 'Friendship Anniversary', href: '/anniversary-cakes' },
      { name: 'Anniversary Combos', href: '/anniversary-cakes' },
      { name: 'Anniversary Specials', href: '/anniversary-cakes' },
    ],
  },
  {
    label: 'Occasion',
    href: '/all-cakes',
    dropdown: [
      { name: 'Wedding', href: '/wedding-cakes' },
      { name: 'Baby Shower', href: '/all-cakes' },
      { name: 'Graduation', href: '/graduation-cakes' },
      { name: 'House Warming', href: '/all-cakes' },
      { name: 'Farewell', href: '/all-cakes' },
      { name: 'Congratulations', href: '/all-cakes' },
    ],
  },
  {
    label: 'Customized Cakes',
    href: '/all-cakes',
    dropdown: [
      { name: 'Photo Cakes', href: '/all-cakes' },
      { name: 'Name Cakes', href: '/all-cakes' },
      { name: 'Designer Cakes', href: '/all-cakes' },
      { name: '3D Cakes', href: '/all-cakes' },
      { name: 'Fondant Cakes', href: '/all-cakes' },
      { name: 'Custom Flavors', href: '/all-cakes' },
    ],
  },
];

const VerticalSubNavbar = ({ vertical = false }) => {
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

  const handleDropdownItemClick = (href) => {
    navigate(href);
    setOpenDropdown(null);
    setHoveredItem(null);
  };

  return (
    <nav
      className={`w-full bg-white border-b border-gray-100 shadow-sm ${
        vertical ? '' : 'hidden md:block'
      } relative`}
    >
      <ul
        className={`flex ${
          vertical
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
                if (vertical) {
                  toggleDropdown(item.label);
                } else {
                  handleItemClick(item.href);
                }
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
                    <button
                      onClick={() => handleDropdownItemClick(dropdownItem.href)}
                      className="block w-full text-left py-1.5 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded px-2 transition-colors"
                    >
                      {dropdownItem.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Desktop dropdown */}
            {!vertical && hoveredItem === item.label && (
              <div className="fixed bg-white border border-gray-200 rounded-lg shadow-2xl z-50 min-w-[240px] py-2"
                style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }}
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800 text-sm">{item.label}</h3>
                </div>
                <ul className="py-1">
                  {item.dropdown.map((dropdownItem, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleDropdownItemClick(dropdownItem.href)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      >
                        {dropdownItem.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button
                    onClick={() => handleItemClick(item.href)}
                    className="text-sm text-rose-500 hover:text-rose-600 font-medium"
                  >
                    View All {item.label} →
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default VerticalSubNavbar;
