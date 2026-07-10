import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUser, FaSignOutAlt, FaHome, FaBuilding, FaHeart, FaEnvelope, FaBars } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          🏠 HouseHunt
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Public Links */}
          <Link to="/" className="hover:text-blue-100 transition-colors">
            Home
          </Link>
          <Link to="/properties" className="hover:text-blue-100 transition-colors">
            Properties
          </Link>

          {isAuthenticated ? (
            <>
              {/* User Links */}
              {user?.role === 'tenant' && (
                <Link to="/favorites" className="hover:text-blue-100 transition-colors">
                  ❤️ Favorites
                </Link>
              )}

              {user?.role === 'landlord' && (
                <>
                  <Link to="/dashboard" className="hover:text-blue-100 transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/my-properties" className="hover:text-blue-100 transition-colors">
                    My Properties
                  </Link>
                </>
              )}

              <Link to="/messages" className="hover:text-blue-100 transition-colors">
                Messages
              </Link>

              {/* Profile Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 hover:text-blue-100 transition-colors">
                  <FaUser size={18} />
                  {user?.name?.split(' ')[0]}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-2xl"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-4 space-y-3">
          <Link to="/" className="block hover:text-blue-100">
            Home
          </Link>
          <Link to="/properties" className="block hover:text-blue-100">
            Properties
          </Link>

          {isAuthenticated ? (
            <>
              {user?.role === 'tenant' && (
                <Link to="/favorites" className="block hover:text-blue-100">
                  ❤️ Favorites
                </Link>
              )}
              {user?.role === 'landlord' && (
                <>
                  <Link to="/dashboard" className="block hover:text-blue-100">
                    Dashboard
                  </Link>
                  <Link to="/my-properties" className="block hover:text-blue-100">
                    My Properties
                  </Link>
                </>
              )}
              <Link to="/messages" className="block hover:text-blue-100">
                Messages
              </Link>
              <Link to="/profile" className="block hover:text-blue-100">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left block hover:text-blue-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-blue-100">
                Login
              </Link>
              <Link to="/register" className="block hover:text-blue-100">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
