import { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import ProtectedRoute from '../components/ProtectedRoute';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const Messages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await contactAPI.getMessages();
      setMessages(response.data.messages || []);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="pt-16 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Messages</h1>

          {loading ? (
            <Loader />
          ) : messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => setExpandedId(expandedId === message._id ? null : message._id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{message.name}</h3>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {message.propertyId && (
                    <p className="text-sm text-blue-600 mb-2">
                      Property: {message.propertyId.title}
                    </p>
                  )}

                  {expandedId === message._id && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-gray-600 whitespace-pre-wrap">{message.message}</p>
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-600">
                          <strong>Phone:</strong> {message.phone}
                        </p>
                        {user?.role === 'landlord' && (
                          <a
                            href={`mailto:${message.email}`}
                            className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Reply via Email
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-lg">No messages yet</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Messages;
