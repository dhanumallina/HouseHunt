import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllProperties from './pages/AllProperties';
import PropertyDetails from './pages/PropertyDetails';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import MyProperties from './pages/MyProperties';
import AddProperty from './pages/AddProperty';
import Messages from './pages/Messages';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/properties" element={<AllProperties />} />
              <Route path="/property/:id" element={<PropertyDetails />} />

              {/* Protected Routes - Tenant */}
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes - General */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes - Landlord */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requiredRole="landlord">
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-properties"
                element={
                  <ProtectedRoute requiredRole="landlord">
                    <MyProperties />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-property"
                element={
                  <ProtectedRoute requiredRole="landlord">
                    <AddProperty />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
