import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User, FileText } from 'lucide-react';
import axios from 'axios';

// Define the API base URL
const API_URL = `${import.meta.env.VITE_API_URL}/api` || 'http://localhost:6585';
 // adjust to your actual API URL

export default function TherapistBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState(null);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [userId, setUserId] = useState('user-123'); // Replace with actual user authentication
  const [userName, setUserName] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  // Fetch therapist details
  useEffect(() => {
    const fetchTherapistDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/therapists/${id}`);
        if (response.data.success) {
          setTherapist(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch therapist details');
        }
      } catch (error) {
        console.error('Error fetching therapist details:', error);
        setError('Unable to load therapist information');
      } finally {
        setLoading(false);
      }
    };

    fetchTherapistDetails();
  }, [id]);

  // Fetch therapist availability when date changes
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedDate) return;
      
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/therapists/${id}/availability`, {
          params: { date: selectedDate }
        });
        
        if (response.data.success) {
          const dateSlots = response.data.data.find(slot => slot.date === selectedDate);
          setAvailabilitySlots(dateSlots ? dateSlots.slots : []);
        } else {
          throw new Error(response.data.message || 'Failed to fetch availability');
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
        setError('Unable to load availability for the selected date');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [id, selectedDate]);

  // Handle booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !userName) {
      setError('Please fill in all required fields');
      return;
    }
    
    setBookingLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/therapists/${id}/book`, {
        date: selectedDate,
        time: selectedTime,
        userId,
        userName,
        notes
      });
      
      if (response.data.success) {
        setBookingSuccess(true);
        setBookingData(response.data.data);
      } else {
        throw new Error(response.data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError('Failed to book appointment. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  // Generate dates for the next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const formattedDate = date.toISOString().split('T')[0];
      const readableDate = date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      
      dates.push({ value: formattedDate, label: readableDate });
    }
    
    return dates;
  };
  
  const availableDates = generateDates();

  // Back to therapist list
  const handleBack = () => {
    navigate('/therapists');
  };

  // Book another appointment after success
  const bookAnother = () => {
    setBookingSuccess(false);
    setSelectedDate('');
    setSelectedTime('');
    setNotes('');
  };

  return (
    <div className="bg-sky-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <button 
          className="flex items-center text-sky-800 hover:text-sky-600 mb-6"
          onClick={handleBack}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Therapists
        </button>

        {loading && !bookingSuccess ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-700"></div>
          </div>
        ) : error && !bookingSuccess ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : bookingSuccess ? (
          <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-sky-800">Appointment Booked!</h2>
              <p className="text-gray-600 mt-2">Your appointment has been successfully scheduled.</p>
            </div>
            
            <div className="bg-sky-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-sky-800 mb-2">Appointment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Therapist:</p>
                  <p className="font-medium">{bookingData.therapistName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Appointment ID:</p>
                  <p className="font-medium">{bookingData.appointmentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date:</p>
                  <p className="font-medium">{new Date(bookingData.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time:</p>
                  <p className="font-medium">{bookingData.time}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between flex-wrap gap-4">
              <button
                onClick={handleBack}
                className="bg-white border border-sky-600 text-sky-600 hover:bg-sky-50 px-6 py-2 rounded-lg"
              >
                Return to Browse
              </button>
              <button
                onClick={bookAnother}
                className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg"
              >
                Book Another Session
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Therapist Info */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {therapist && (
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <img 
                      src={therapist.imageUrl || '/api/placeholder/400/400'} 
                      alt={therapist.name}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-sky-800">{therapist.name}</h3>
                      <p className="text-gray-600">{therapist.specialty}</p>
                      {therapist.rating && (
                        <div className="flex items-center mt-1">
                          <div className="flex text-yellow-400">
                            {[...Array(Math.floor(therapist.rating))].map((_, i) => (
                              <span key={i} className="text-lg">★</span>
                            ))}
                          </div>
                          <span className="ml-1 text-gray-600">{therapist.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <h4 className="font-semibold text-sky-800 mb-2">About</h4>
                    <p className="text-gray-600 text-sm mb-4">{therapist.bio || "Information not available"}</p>
                    
                    {therapist.price && (
                      <div className="flex items-center mb-2">
                        <span className="font-medium text-sky-700">{therapist.price}</span>
                      </div>
                    )}
                    
                    {therapist.location && (
                      <div className="text-sm text-gray-600 mb-2">
                        <p>
                          <span className="font-medium">Location:</span> {therapist.location}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Booking Form */}
            <div className="bg-white rounded-xl shadow-md p-6 col-span-1 lg:col-span-2">
              <h2 className="text-xl font-bold mb-6 text-sky-800">Book an Appointment</h2>
              
              <form onSubmit={handleBooking}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-2" />
                      Select Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      required
                    >
                      <option value="">Choose a date</option>
                      {availableDates.map(date => (
                        <option key={date.value} value={date.value}>{date.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock size={16} className="inline mr-2" />
                      Select Time
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      disabled={!selectedDate || availabilitySlots.length === 0}
                      required
                    >
                      <option value="">Choose a time</option>
                      {availabilitySlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    {selectedDate && availabilitySlots.length === 0 && (
                      <p className="text-red-500 text-sm mt-1">No available slots for this date</p>
                    )}
                  </div>
                  
                  {/* User Name Input */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User size={16} className="inline mr-2" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  {/* Notes */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText size={16} className="inline mr-2" />
                      Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Anything specific you'd like to discuss?"
                      rows={4}
                    ></textarea>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-2">
                  <button
                    type="submit"
                    disabled={bookingLoading || !selectedDate || !selectedTime || !userName}
                    className={`w-full bg-sky-600 hover:bg-sky-700 text-white py-3 px-4 rounded-lg flex items-center justify-center ${
                      (bookingLoading || !selectedDate || !selectedTime || !userName) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {bookingLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Processing...
                      </>
                    ) : (
                      'Book Appointment'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}