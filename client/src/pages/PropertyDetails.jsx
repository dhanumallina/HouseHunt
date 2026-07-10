import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaWifi, FaParking, FaPaw, FaCouch } from 'react-icons/fa';
import { propertyAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import ImageSlider from '../components/ImageSlider';
import ContactCard from '../components/ContactCard';
import PropertyCard from '../components/PropertyCard';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [landlord, setLandlord] = useState(null);
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await propertyAPI.getById(id);
        setProperty(response.data.property);
        setLandlord(response.data.property.owner);
        
        // Fetch related properties
        const relatedRes = await propertyAPI.getAll({
          city: response.data.property.city,
          limit: 3,
        });
        setRelatedProperties(
          relatedRes.data.properties.filter((p) => p._id !== id)
        );
      } catch (error) {
        toast.error('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) return <Loader />;

  if (!property) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Property not found</h1>
          <Link to="/properties" className="text-blue-500 hover:text-blue-600">
            Back to properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-20">
      {/* Image Gallery */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <ImageSlider images={property.images} />
        </div>
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>
                  {property.address}, {property.city}, {property.state}
                </span>
              </div>
              <div className="flex items-center gap-4">
                {property.available ? (
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    ✓ Available
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
                    ✗ Not Available
                  </span>
                )}
              </div>
            </motion.div>

            {/* Price & Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-blue-50 rounded-lg p-8 mb-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ₹{property.rent?.toLocaleString()}
                  </div>
                  <p className="text-gray-600 text-sm">per month</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800 mb-2">
                    <FaBed className="text-blue-500" />
                    {property.bedrooms}
                  </div>
                  <p className="text-gray-600 text-sm">Bedrooms</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800 mb-2">
                    <FaBath className="text-blue-500" />
                    {property.bathrooms}
                  </div>
                  <p className="text-gray-600 text-sm">Bathrooms</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800 mb-2">
                    <FaRuler className="text-blue-500" />
                    {property.area}
                  </div>
                  <p className="text-gray-600 text-sm">sqft</p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.parking && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaParking className="text-blue-500" size={20} />
                    <span>Parking Available</span>
                  </div>
                )}
                {property.petsAllowed && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaPaw className="text-blue-500" size={20} />
                    <span>Pets Allowed</span>
                  </div>
                )}
                {property.furnished && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaCouch className="text-blue-500" size={20} />
                    <span>Furnished</span>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaWifi className="text-blue-500" size={20} />
                  <span>WiFi Access</span>
                </div>
              </div>
            </motion.div>

            {/* Property Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Type</h2>
              <p className="text-lg text-gray-700 capitalize bg-gray-50 p-4 rounded-lg">
                {property.propertyType}
              </p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            {landlord && user?.role === 'tenant' && (
              <ContactCard property={property} landlord={landlord} />
            )}
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-16 pt-16 border-t"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Related Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProperties.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
