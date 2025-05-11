import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ darkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userId: ''
  });
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create an instance of axios with default settings for debugging
      const axiosInstance = axios.create({
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // First, let's check if we have a cookie at all
      console.log("Cookies available:", document.cookie);
      
      // Try to get user data
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/user/data`);
      console.log("Full API response:", response);
      
      if (response.data.success) {
        // Adjust to match the structure your getUserData controller returns
        const { userData } = response.data;
        setFormData({
          name: userData?.name || '',
          email: userData?.email || '',
          userId: userData?.userId || ''
        });
        setDebugInfo({ 
          status: 'Success', 
          message: 'Data retrieved successfully',
          data: userData
        });
      } else {
        setError(response.data.message || 'Failed to fetch user data');
        setDebugInfo({ 
          status: 'API Error', 
          message: response.data.message,
          fullResponse: response.data
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.response?.data?.message || error.message || 'Error connecting to server');
      setDebugInfo({ 
        status: 'Exception', 
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setUpdateSuccess(false);
    
    try {
      // Since your userAuth middleware adds userId to req.body,
      // we don't need to send it explicitly - the backend will get it from the token
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/update`, // Assuming you have an update endpoint
        { 
          name: formData.name, 
          email: formData.email 
          // userId will be extracted from JWT token by middleware
        },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setUpdateSuccess(true);
        setIsEditing(false);
        // Re-fetch user data to ensure we have the latest
        fetchUserData();
      } else {
        setError(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating profile');
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && formData.name === '') {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-sky-50'} py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center`}>
        <div className="text-center">
          <p>Loading user profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-sky-50'} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-3xl mx-auto">
        <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} shadow overflow-hidden sm:rounded-lg`}>
          <div className="px-4 py-5 sm:px-6">
            <h3 className={`text-lg leading-6 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              User Profile
            </h3>
            <p className={`mt-1 max-w-2xl text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              Personal details and account settings.
            </p>
          </div>

          {error && (
            <div className="border-t border-gray-200 px-4 py-3 bg-red-50 text-red-700">
              <p>{error}</p>
              {debugInfo && (
                <button 
                  onClick={() => console.log('Debug Info:', debugInfo)}
                  className="text-xs underline mt-1"
                >
                  View Debug Info in Console
                </button>
              )}
            </div>
          )}

          {updateSuccess && (
            <div className="border-t border-gray-200 px-4 py-3 bg-green-50 text-green-700">
              <p>Profile updated successfully!</p>
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="name" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Full name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm rounded-md ${
                        darkMode ? 'bg-slate-700 border-gray-600 text-white' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm rounded-md ${
                        darkMode ? 'bg-slate-700 border-gray-600 text-white' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className={`px-4 py-3 ${darkMode ? 'bg-slate-800' : 'bg-gray-50'} text-right sm:px-6`}>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="border-t border-gray-200">
                <dl>
                  <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Full name</dt>
                    <dd className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
                      {formData.name || 'Not provided'}
                    </dd>
                  </div>
                  <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Email address</dt>
                    <dd className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
                      {formData.email || 'Not provided'}
                    </dd>
                  </div>
                  <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                    <dt className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>User ID</dt>
                    <dd className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'} sm:mt-0 sm:col-span-2`}>
                      {formData.userId || 'Not available'}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className={`px-4 py-3 ${darkMode ? 'bg-slate-800' : 'bg-gray-50'} text-right sm:px-6`}>
                <button
                  onClick={() => setIsEditing(true)}
                  disabled={isLoading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;