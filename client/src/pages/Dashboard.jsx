import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute requiredRole="landlord">
      <div className="pt-16 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Welcome, {user?.name?.split(' ')[0]}!
          </h1>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* My Properties Card */}
            <Link
              to="/my-properties"
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="mb-4">
                <div className="text-4xl font-bold text-blue-500">📋</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">My Properties</h2>
              <p className="text-gray-600">Manage and view all your property listings</p>
            </Link>

            {/* Add Property Card */}
            <Link
              to="/add-property"
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="mb-4">
                <div className="text-4xl font-bold text-green-500">➕</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Add Property</h2>
              <p className="text-gray-600">List a new property for rent</p>
            </Link>

            {/* Messages Card */}
            <Link
              to="/messages"
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="mb-4">
                <div className="text-4xl font-bold text-purple-500">💬</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Messages</h2>
              <p className="text-gray-600">View inquiries from interested tenants</p>
            </Link>

            {/* Profile Card */}
            <Link
              to="/profile"
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="mb-4">
                <div className="text-4xl font-bold text-orange-500">👤</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile</h2>
              <p className="text-gray-600">Manage your profile settings</p>
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
