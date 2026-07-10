import { useState, useEffect } from 'react';
import { favoriteAPI, propertyAPI } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated]);

  const fetchFavorites = async () => {
    try {
      const response = await favoriteAPI.getAll();
      setFavorites(response.data.favorites || []);
    } catch (error) {
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Please login to view favorites</h1>
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Favorites</h1>

        {loading ? (
          <Loader />
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((favorite) => (
              <PropertyCard
                key={favorite._id}
                property={favorite}
                onFavoriteChange={fetchFavorites}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">You haven't added any favorites yet</p>
            <Link to="/properties" className="text-blue-500 hover:text-blue-600 font-semibold">
              Explore properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
