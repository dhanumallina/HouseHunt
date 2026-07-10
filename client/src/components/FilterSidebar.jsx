import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const FilterSidebar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    parking: false,
    petsAllowed: false,
    furnished: '',
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    beds: true,
    type: true,
    amenities: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg p-6 h-fit"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-6">Filters</h3>

      {/* Price Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-semibold text-gray-800 mb-3"
        >
          Price Range
          <FaChevronDown
            size={14}
            className={`transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="100000"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="text-sm text-gray-600">
              ₹0 - ₹{filters.priceRange[1].toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Bedrooms */}
      <div className="mb-6 pb-6 border-b">
        <button
          onClick={() => toggleSection('beds')}
          className="w-full flex items-center justify-between font-semibold text-gray-800 mb-3"
        >
          Bedrooms
          <FaChevronDown
            size={14}
            className={`transition-transform ${expandedSections.beds ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.beds && (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="bedrooms"
                  value={num}
                  checked={filters.bedrooms === num.toString()}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">{num}+ Bedrooms</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Property Type */}
      <div className="mb-6 pb-6 border-b">
        <button
          onClick={() => toggleSection('type')}
          className="w-full flex items-center justify-between font-semibold text-gray-800 mb-3"
        >
          Property Type
          <FaChevronDown
            size={14}
            className={`transition-transform ${expandedSections.type ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.type && (
          <div className="space-y-2">
            {['Apartment', 'House', 'Villa', 'Studio'].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={filters.propertyType === type}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Amenities */}
      <div>
        <button
          onClick={() => toggleSection('amenities')}
          className="w-full flex items-center justify-between font-semibold text-gray-800 mb-3"
        >
          Amenities
          <FaChevronDown
            size={14}
            className={`transition-transform ${expandedSections.amenities ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.amenities && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.parking}
                onChange={(e) => handleFilterChange('parking', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-700">Parking</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.petsAllowed}
                onChange={(e) => handleFilterChange('petsAllowed', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-700">Pets Allowed</span>
            </label>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FilterSidebar;
