import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaDollarSign, FaBed, FaBath } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.location) params.append('city', search.location);
    if (search.minPrice) params.append('minPrice', search.minPrice);
    if (search.maxPrice) params.append('maxPrice', search.maxPrice);
    if (search.bedrooms) params.append('bedrooms', search.bedrooms);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSearch}
      className="bg-white rounded-lg shadow-lg p-6 -mt-8 relative z-10 max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaMapMarkerAlt className="inline mr-2" />
            Location
          </label>
          <input
            type="text"
            placeholder="City"
            value={search.location}
            onChange={(e) => setSearch({ ...search, location: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaDollarSign className="inline mr-2" />
            Min Price
          </label>
          <input
            type="number"
            placeholder="Min"
            value={search.minPrice}
            onChange={(e) => setSearch({ ...search, minPrice: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaDollarSign className="inline mr-2" />
            Max Price
          </label>
          <input
            type="number"
            placeholder="Max"
            value={search.maxPrice}
            onChange={(e) => setSearch({ ...search, maxPrice: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaBed className="inline mr-2" />
            Bedrooms
          </label>
          <select
            value={search.bedrooms}
            onChange={(e) => setSearch({ ...search, bedrooms: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <FaSearch size={16} />
          Search
        </button>
      </div>
    </motion.form>
  );
};

export default SearchBar;
