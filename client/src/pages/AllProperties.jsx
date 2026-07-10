import { useState, useEffect } from 'react';
import { propertyAPI } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import Loader from '../components/Loader';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const AllProperties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    parking: false,
    petsAllowed: false,
  });

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = {
        city: searchParams.get('city') || '',
        minPrice: searchParams.get('minPrice') || 0,
        maxPrice: searchParams.get('maxPrice') || 100000,
        bedrooms: searchParams.get('bedrooms') || '',
        limit: 12,
      };

      const response = await propertyAPI.getAll(params);
      setProperties(response.data.properties || []);
    } catch (error) {
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    // Apply filters
    const filtered = properties.filter((p) => {
      const priceMatch = p.rent >= newFilters.priceRange[0] && p.rent <= newFilters.priceRange[1];
      const bedroomMatch = !newFilters.bedrooms || p.bedrooms >= parseInt(newFilters.bedrooms);
      const typeMatch = !newFilters.propertyType || p.propertyType === newFilters.propertyType;
      const parkingMatch = !newFilters.parking || p.parking;
      const petsMatch = !newFilters.petsAllowed || p.petsAllowed;

      return priceMatch && bedroomMatch && typeMatch && parkingMatch && petsMatch;
    });
  };

  return (
    <div className="pt-16 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">All Properties</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar onFilter={handleFilter} />
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <Loader />
            ) : properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} onFavoriteChange={fetchProperties} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No properties found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProperties;
