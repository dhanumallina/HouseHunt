import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRuler, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';
import { favoriteAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const PropertyCard = ({ property, onFavoriteChange }) => {
  const { isAuthenticated, isTenant } = useAuth();
  const [isFavorite, setIsFavorite] = useState(property.isFavorite || false);
  const [loading, setLoading] = useState(false);

  const handleFavorite = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      return;
    }

    if (!isTenant) {
      toast.error('Only tenants can add favorites');
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        await favoriteAPI.remove(property._id);
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await favoriteAPI.add(property._id);
        setIsFavorite(true);
        toast.success('Added to favorites');
      }
      if (onFavoriteChange) {
        onFavoriteChange();
      }
    } catch (error) {
      toast.error('Failed to update favorites');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <Link to={`/property/${property._id}`} className="block">
        {/* Image */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          {property.available && (
            <span className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Available
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
            {property.title}
          </h3>

          {/* Location */}
          <p className="text-sm text-gray-600 mb-3">
            📍 {property.city}, {property.state}
          </p>

          {/* Rent Price */}
          <div className="text-2xl font-bold text-blue-600 mb-3">
            ₹{property.rent?.toLocaleString()}/month
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <FaBed size={16} className="text-blue-500" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <FaBath size={16} className="text-blue-500" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <FaRuler size={16} className="text-blue-500" />
              <span>{property.area} sqft</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Footer */}
      <div className="px-4 pb-4 flex gap-2">
        <Link
          to={`/property/${property._id}`}
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-center font-medium hover:bg-blue-600 transition-colors"
        >
          View Details
        </Link>
        {isTenant && (
          <button
            onClick={handleFavorite}
            disabled={loading}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" size={20} />
            ) : (
              <FaRegHeart className="text-gray-600" size={20} />
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyCard;
