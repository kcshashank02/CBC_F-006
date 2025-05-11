import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';

const SendOTP = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use email from state if available (when redirected from another page)
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);
  
  const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';
  
  const handleSendOTP = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/send-reset-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      setMessage(data.message || 'OTP sent successfully');
      setError('');
      setTimeout(() => {
        navigate('/reset-password', { state: { email } });
      }, 1500);
      
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Heart className="text-sky-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-gray-600 mt-2">We'll send a verification code to your email</p>
        </div>
        
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full text-gray-800 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <button
          onClick={handleSendOTP}
          disabled={loading}
          className="w-full py-3 px-4 rounded-md font-medium text-white bg-sky-600 hover:bg-sky-700 transition-colors duration-300 flex items-center justify-center"
        >
          {loading ? 'Sending...' : 'Send Verification Code'}
        </button>
        
        {message && (
          <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-md">
            <p className="text-green-700 text-sm">{message}</p>
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm font-medium text-sky-600 hover:text-sky-700 flex items-center justify-center">
            <ArrowLeft size={16} className="mr-1" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SendOTP;