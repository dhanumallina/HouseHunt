import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { propertyAPI } from '../services/api';
import Loader from '../components/Loader';
import ProtectedRoute from '../components/ProtectedRoute';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const MyProperties = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const response = await propertyAPI.getAll({ owner: user?._id });
      setProperties(response.data.properties || []);
    } catch (error) {
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await propertyAPI.delete(id);
        toast.success('Property deleted successfully');
        fetchMyProperties();
      } catch (error) {
        toast.error('Failed to delete property');
      }
    }
  };

  return (
    <ProtectedRoute requiredRole="landlord">
      <div className="pt-16 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">My Properties</h1>
            <Link
              to="/add-property"
              className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              <FaPlus size={16} />
              Add Property
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {properties.map((property) => (
                <div
                  key={property._id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                    {/* Image */}
                    <div className="md:col-span-1">
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-300 rounded-lg flex items-center justify-center">
                          <span className="text-gray-600">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                      <p className="text-gray-600 mb-2">
                        {property.city}, {property.state}
                      </p>
                      <p className="text-lg font-semibold text-blue-600 mb-2">
                        ₹{property.rent?.toLocaleString()}/month
                      </p>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>🛏️ {property.bedrooms} Beds</span>
                        <span>🚿 {property.bathrooms} Baths</span>
                        <span>📐 {property.area} sqft</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-1 flex gap-3 justify-end">
                      <Link
                        to={`/edit-property/${property._id}`}
                        className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-lg mb-4">You haven't added any properties yet</p>
              <Link
                to="/add-property"
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaPlus size={16} />
                Add Your First Property
              </Link>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MyProperties;
