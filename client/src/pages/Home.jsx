import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaSearch, FaHome, FaUsers } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { useState, useEffect } from 'react';
import { propertyAPI } from '../services/api';
import Loader from '../components/Loader';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await propertyAPI.getAll({ limit: 6 });
        setProperties(response.data.properties || []);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Find Your Dream Home
          </motion.h1>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 opacity-90"
          >
            Discover the perfect rental property for you
          </motion.p>
        </div>
      </motion.section>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
        <SearchBar />
      </div>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Featured Properties</h2>
          <p className="text-gray-600 text-lg">Explore our handpicked selection of premium rental properties</p>
        </motion.div>

        {loading ? (
          <Loader />
        ) : properties.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
            >
              {properties.map((property) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center">
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                View All Properties <FaArrowRight size={16} />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No properties available yet</p>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Why Choose HouseHunt?</h2>
            <p className="text-gray-600 text-lg">We make finding your perfect home easy and hassle-free</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaSearch,
                title: 'Easy Search',
                description: 'Find properties with advanced filters and search options'
              },
              {
                icon: FaHome,
                title: 'Quality Properties',
                description: 'Browse verified and quality-checked rental properties'
              },
              {
                icon: FaUsers,
                title: 'Direct Contact',
                description: 'Connect directly with landlords and property owners'
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <item.icon className="text-blue-500" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to find your home?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of satisfied renters and landlords</p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold"
          >
            Get Started Now
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
