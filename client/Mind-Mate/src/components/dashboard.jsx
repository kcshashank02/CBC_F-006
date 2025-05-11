// import { useState } from 'react';
// import { Search, Filter, Star, MapPin, Calendar, Clock, MessageCircle, UserCheck, MessageSquare } from 'lucide-react';
// import { Link } from 'react-router-dom';

// // Mock data for therapists
// const therapistsData = [
//   {
//     id: 1,
//     name: 'Dr. Sarah Johnson',
//     specialty: 'Anxiety & Depression',
//     rating: 4.9,
//     reviews: 124,
//     location: 'New York, NY',
//     distance: '2.3 miles',
//     availability: 'Today',
//     imgUrl: '/api/placeholder/400/400',
//     next: 'Available at 3:00 PM',
//     experience: '12 years',
//     price: '$120/session'
//   },
//   {
//     id: 2,
//     name: 'Dr. Michael Chen',
//     specialty: 'Trauma & PTSD',
//     rating: 4.8,
//     reviews: 98,
//     location: 'San Francisco, CA',
//     distance: '0.8 miles',
//     availability: 'Tomorrow',
//     imgUrl: '/api/placeholder/400/400',
//     next: 'Available at 10:00 AM',
//     experience: '8 years',
//     price: '$135/session'
//   },
//   {
//     id: 3,
//     name: 'Dr. Lisa Patel',
//     specialty: 'Relationship Counseling',
//     rating: 4.7,
//     reviews: 156,
//     location: 'Chicago, IL',
//     distance: '1.5 miles',
//     availability: 'Today',
//     imgUrl: '/api/placeholder/400/400',
//     next: 'Available at 5:30 PM',
//     experience: '15 years',
//     price: '$145/session'
//   },
//   {
//     id: 4,
//     name: 'Dr. James Wilson',
//     specialty: 'Grief & Loss',
//     rating: 4.9,
//     reviews: 87,
//     location: 'Boston, MA',
//     distance: '3.2 miles',
//     availability: 'Wednesday',
//     imgUrl: '/api/placeholder/400/400',
//     next: 'Available in 2 days',
//     experience: '10 years',
//     price: '$130/session'
//   },
//   {
//     id: 5,
//     name: 'Dr. Emily Rodriguez',
//     specialty: 'Stress Management',
//     rating: 4.6,
//     reviews: 110,
//     location: 'Austin, TX',
//     distance: '0.7 miles',
//     availability: 'Today',
//     imgUrl: '/api/placeholder/400/400',
//     next: 'Available at 1:15 PM',
//     experience: '7 years',
//     price: '$125/session'
//   },
//   {
//     id: 6,
//     name: 'Dr. David Kim',
//     specialty: 'Addiction Recovery',
//     rating: 4.8,
//     reviews: 132,
//     location: 'Seattle, WA',
//     distance: '2.1 miles',
//     availability: 'Thursday',
//     imgUrl: '/api/placeholder/400/400',
//     next: 'Available in 3 days',
//     experience: '14 years',
//     price: '$140/session'
//   }
// ];

// // Filter options
// const specialtyOptions = [
//   'All Specialties',
//   'Anxiety & Depression',
//   'Trauma & PTSD',
//   'Relationship Counseling',
//   'Grief & Loss',
//   'Stress Management',
//   'Addiction Recovery'
// ];

// const availabilityOptions = [
//   'Any Time',
//   'Today',
//   'Tomorrow',
//   'This Week'
// ];

// const distanceOptions = [
//   'Any Distance',
//   'Under 1 mile',
//   '1-5 miles',
//   '5-10 miles',
//   '10+ miles'
// ];

// export default function TherapistDashboard() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
//   const [selectedAvailability, setSelectedAvailability] = useState('Any Time');
//   const [selectedDistance, setSelectedDistance] = useState('Any Distance');
//   const [showFilters, setShowFilters] = useState(false);
  
//   // Filter therapists based on search and filters
//   const filteredTherapists = therapistsData.filter(therapist => {
//     const matchesSearch = searchTerm === '' || 
//       therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       therapist.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
//     const matchesSpecialty = selectedSpecialty === 'All Specialties' || 
//       therapist.specialty === selectedSpecialty;
      
//     const matchesAvailability = selectedAvailability === 'Any Time' || 
//       (selectedAvailability === 'Today' && therapist.availability === 'Today') ||
//       (selectedAvailability === 'Tomorrow' && (therapist.availability === 'Today' || therapist.availability === 'Tomorrow')) ||
//       selectedAvailability === 'This Week';
      
//     // For distance, we'd normally do actual calculations, but for mock data we'll use the string
//     const matchesDistance = selectedDistance === 'Any Distance' ||
//       (selectedDistance === 'Under 1 mile' && parseFloat(therapist.distance) < 1) ||
//       (selectedDistance === '1-5 miles' && parseFloat(therapist.distance) >= 1 && parseFloat(therapist.distance) <= 5) ||
//       (selectedDistance === '5-10 miles' && parseFloat(therapist.distance) > 5 && parseFloat(therapist.distance) <= 10) ||
//       (selectedDistance === '10+ miles' && parseFloat(therapist.distance) > 10);
      
//     return matchesSearch && matchesSpecialty && matchesAvailability && matchesDistance;
//   });

//   const toggleFilters = () => {
//     setShowFilters(!showFilters);
//   };
  
//   return (
//     <div className="bg-sky-100 min-h-screen pb-10 relative">
//       {/* Floating Chatbot Button */}
//       <Link 
//         to="/chatbot"
//         className="fixed bottom-6 right-6 bg-sky-600 hover:bg-sky-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50 transition-all hover:scale-105"
//         aria-label="Open chatbot"
//       >
//         <MessageSquare size={24} />
//       </Link>
      
//       {/* Main Content */}
//       <div className="container mx-auto pt-6 px-4">
//         <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//           <h1 className="text-2xl font-bold mb-4 text-sky-800">Find Your Therapist</h1>
          
//           {/* Search and Filter Bar */}
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <div className="relative flex-grow">
//               <input
//                 type="text"
//                 placeholder="Search by name, specialty, or location..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//               />
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             </div>
            
//             <button
//               onClick={toggleFilters}
//               className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-3 rounded-lg transition-colors"
//             >
//               <Filter size={18} />
//               <span>Filters</span>
//             </button>
//           </div>
          
//           {/* Filters Section */}
//           {showFilters && (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-sky-50 rounded-lg">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
//                 <select
//                   value={selectedSpecialty}
//                   onChange={(e) => setSelectedSpecialty(e.target.value)}
//                   className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                 >
//                   {specialtyOptions.map(option => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
//                 <select
//                   value={selectedAvailability}
//                   onChange={(e) => setSelectedAvailability(e.target.value)}
//                   className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                 >
//                   {availabilityOptions.map(option => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Distance</label>
//                 <select
//                   value={selectedDistance}
//                   onChange={(e) => setSelectedDistance(e.target.value)}
//                   className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
//                 >
//                   {distanceOptions.map(option => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Results Count */}
//         <div className="mb-4">
//           <h2 className="text-lg font-semibold">
//             {filteredTherapists.length} Therapists Available
//           </h2>
//         </div>
        
//         {/* Therapist Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTherapists.map(therapist => (
//             <div key={therapist.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//               <div className="p-4">
//                 <div className="flex items-center mb-4">
//                   <img 
//                     src={therapist.imgUrl} 
//                     alt={therapist.name}
//                     className="w-16 h-16 rounded-full object-cover mr-4"
//                   />
//                   <div>
//                     <h3 className="font-bold text-sky-800">{therapist.name}</h3>
//                     <p className="text-sm text-gray-600">{therapist.specialty}</p>
//                     <div className="flex items-center mt-1">
//                       <Star className="fill-yellow-400 stroke-yellow-400" size={16} />
//                       <span className="text-sm font-medium ml-1">{therapist.rating}</span>
//                       <span className="text-sm text-gray-500 ml-1">({therapist.reviews} reviews)</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-2 mb-4">
//                   <div className="flex items-center text-sm text-gray-600">
//                     <MapPin size={14} className="mr-1 text-sky-600" />
//                     <span>{therapist.distance}</span>
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <Calendar size={14} className="mr-1 text-sky-600" />
//                     <span>{therapist.availability}</span>
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <Clock size={14} className="mr-1 text-sky-600" />
//                     <span>{therapist.experience}</span>
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <span className="font-medium text-sky-700">{therapist.price}</span>
//                   </div>
//                 </div>
                
//                 <div className="text-sm text-gray-600 mb-4">
//                   <p><span className="font-medium">Next available:</span> {therapist.next}</p>
//                 </div>
                  
//                 <div className="flex gap-2">
//                   <button className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-lg flex items-center justify-center">
//                     <Calendar size={16} className="mr-2" />
//                     Schedule
//                   </button>
//                   <button className="flex-1 bg-white border border-sky-600 text-sky-600 hover:bg-sky-50 py-2 px-4 rounded-lg flex items-center justify-center">
//                     <MessageCircle size={16} className="mr-2" />
//                     Message
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* No Results */}
//         {filteredTherapists.length === 0 && (
//           <div className="bg-white rounded-xl shadow-md p-8 text-center">
//             <h3 className="text-xl font-semibold mb-2">No therapists found</h3>
//             <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
//             <button 
//               onClick={() => {
//                 setSearchTerm('');
//                 setSelectedSpecialty('All Specialties');
//                 setSelectedAvailability('Any Time');
//                 setSelectedDistance('Any Distance');
//               }}
//               className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg"
//             >
//               Reset Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, Calendar, Clock, MessageCircle, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is installed: npm install axios

// Define the API base URL (can be moved to .env file in production)
const API_URL = `${import.meta.env.VITE_API_URL}/api`;
 // adjust to your actual API URL

export default function TherapistDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyOptions, setSpecialtyOptions] = useState(['All Specialties']);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedAvailability, setSelectedAvailability] = useState('Any Time');
  const [selectedDistance, setSelectedDistance] = useState('Any Distance');
  const [showFilters, setShowFilters] = useState(false);
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Fixed filter options for availability and distance
  const availabilityOptions = [
    'Any Time',
    'Today',
    'Tomorrow',
    'This Week'
  ];

  const distanceOptions = [
    'Any Distance',
    'Under 1 mile',
    '1-5 miles',
    '5-10 miles',
    '10+ miles'
  ];

  // Get user's current location (if permission is granted)
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // Fetch specialties for the dropdown
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get(`${API_URL}/therapists/specialties`);
        if (response.data.success) {
          setSpecialtyOptions(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching specialties:', error);
        setError('Failed to load specialty options');
      }
    };

    fetchSpecialties();
  }, []);

  // Fetch therapists with filtering
  useEffect(() => {
    const fetchTherapists = async () => {
      setLoading(true);
      try {
        // Prepare query parameters for filtering
        const params = {
          page: currentPage,
          limit: 9, // Number of therapists per page
          search: searchTerm || undefined,
        };

        // Add filters if selected
        if (selectedSpecialty !== 'All Specialties') {
          params.specialty = selectedSpecialty;
        }

        if (selectedAvailability !== 'Any Time') {
          params.availability = selectedAvailability;
        }

        // Add distance filter if user location is available
        if (selectedDistance !== 'Any Distance' && userLocation.lat && userLocation.lng) {
          params.distance = selectedDistance;
          params.lat = userLocation.lat;
          params.lng = userLocation.lng;
        }

        const response = await axios.get(`${API_URL}/therapists`, { params });
        
        if (response.data.success) {
          setTherapists(response.data.data);
          setTotalPages(response.data.pages);
        } else {
          throw new Error(response.data.message || 'Failed to fetch therapists');
        }
      } catch (error) {
        console.error('Error fetching therapists:', error);
        setError('Failed to load therapists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, [searchTerm, selectedSpecialty, selectedAvailability, selectedDistance, currentPage, userLocation]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Handle therapist booking
  const handleSchedule = async (therapistId) => {
    // Navigate to booking page for this therapist
    navigate(`/therapist/${therapistId}/book`);
  };

  // Handle sending a message to therapist
  const handleMessage = async (therapistId) => {
    // For simplicity, you could redirect to a chat page
    navigate(`/therapist/${therapistId}/chat`);
    
    // Alternatively, you could open a message modal right here
    // and use the sendMessage API endpoint directly
  };

  // Handle pagination
  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('All Specialties');
    setSelectedAvailability('Any Time');
    setSelectedDistance('Any Distance');
    setCurrentPage(1);
  };
  
  return (
    <div className="bg-sky-100 min-h-screen pb-10 relative">
      {/* Floating Chatbot Button */}
      <Link 
        to="/chatbot"
        className="fixed bottom-6 right-6 bg-sky-600 hover:bg-sky-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50 transition-all hover:scale-105"
        aria-label="Open chatbot"
      >
        <MessageSquare size={24} />
      </Link>
      
      {/* Main Content */}
      <div className="container mx-auto pt-6 px-4">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4 text-sky-800">Find Your Therapist</h1>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by name, specialty, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            <button
              onClick={toggleFilters}
              className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-3 rounded-lg transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>
          
          {/* Filters Section */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-sky-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                >
                  {specialtyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                >
                  {availabilityOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distance</label>
                <select
                  value={selectedDistance}
                  onChange={(e) => setSelectedDistance(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  disabled={!userLocation.lat || !userLocation.lng}
                >
                  {distanceOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {!userLocation.lat && !userLocation.lng && (
                  <p className="text-xs text-red-500 mt-1">Enable location access to use distance filter</p>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Error state */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-700"></div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                {therapists.length} Therapists Available
              </h2>
            </div>
            
            {/* Therapist Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapists.map(therapist => (
                <div key={therapist._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <img 
                        src={therapist.imageUrl || '/api/placeholder/400/400'} 
                        alt={therapist.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-bold text-sky-800">{therapist.name}</h3>
                        <p className="text-sm text-gray-600">{therapist.specialty}</p>
                        <div className="flex items-center mt-1">
                          <Star className="fill-yellow-400 stroke-yellow-400" size={16} />
                          <span className="text-sm font-medium ml-1">{therapist.rating || 'N/A'}</span>
                          <span className="text-sm text-gray-500 ml-1">
                            ({therapist.reviewCount || 0} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {therapist.distance && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin size={14} className="mr-1 text-sky-600" />
                          <span>{therapist.distance} miles</span>
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={14} className="mr-1 text-sky-600" />
                        <span>{therapist.availability || 'Check availability'}</span>
                      </div>
                      {therapist.experience && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={14} className="mr-1 text-sky-600" />
                          <span>{therapist.experience}</span>
                        </div>
                      )}
                      {therapist.price && (
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium text-sky-700">{therapist.price}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-4">
                      <p>
                        <span className="font-medium">Location:</span> {therapist.location}
                      </p>
                    </div>
                      
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleSchedule(therapist._id)}
                        className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                      >
                        <Calendar size={16} className="mr-2" />
                        Schedule
                      </button>
                      <button 
                        onClick={() => handleMessage(therapist._id)}
                        className="flex-1 bg-white border border-sky-600 text-sky-600 hover:bg-sky-50 py-2 px-4 rounded-lg flex items-center justify-center"
                      >
                        <MessageCircle size={16} className="mr-2" />
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-sky-600 text-white hover:bg-sky-700'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center px-4">
                    <span className="text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-sky-600 text-white hover:bg-sky-700'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {/* No Results */}
            {therapists.length === 0 && !loading && (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No therapists found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button 
                  onClick={resetFilters}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}