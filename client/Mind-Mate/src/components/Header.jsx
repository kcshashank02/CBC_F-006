// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Heart, Moon, Sun, User } from 'lucide-react';

// function Header() {
//   const [darkMode, setDarkMode] = useState(false);
  
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };
  
//   return (
//     <nav className={`px-6 py-4 ${darkMode ? 'bg-slate-800' : 'bg-sky-100'} shadow-md`}>
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="flex items-center space-x-2">
//           <Heart className="text-sky-600" size={24} />
//           <span className="text-xl font-semibold">Mind-Mate</span>
//         </Link>
        
//         <div className="flex items-center space-x-6">
//           <Link to="/" className="hover:text-sky-600 font-medium hidden md:block">Home</Link>
//           <Link to="/resources" className="hover:text-sky-600 font-medium hidden md:block">Resources</Link>
//           <Link to="/about" className="hover:text-sky-600 font-medium hidden md:block">About</Link>
//           <Link to="/contact" className="hover:text-sky-600 font-medium hidden md:block">Contact</Link>
          
//           <button 
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full hover:bg-sky-200 dark:hover:bg-slate-700"
//           >
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
          
//           <Link to="/login" className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center">
//             <User size={16} className="mr-2" />
//             Login
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Header;
// import { Link } from 'react-router-dom';
// import { Heart, Moon, Sun, User } from 'lucide-react';

// function Header({ darkMode, toggleDarkMode }) {
//   return (
//     <nav className={`px-6 py-4 ${darkMode ? 'bg-slate-800 text-white' : 'bg-sky-100'} shadow-md`}>
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="flex items-center space-x-2">
//           <Heart className="text-sky-600" size={24} />
//           <span className="text-xl font-semibold">Mind-Mate</span>
//         </Link>
        
//         <div className="flex items-center space-x-6">
//           <Link to="/" className="hover:text-sky-600 font-medium hidden md:block">Home</Link>
//           <Link to="/faq" className="hover:text-sky-600 font-medium hidden md:block">FAQ</Link>
//           <Link to="/about" className="hover:text-sky-600 font-medium hidden md:block">About</Link>
//           <Link to="/contact" className="hover:text-sky-600 font-medium hidden md:block">Contact</Link>
          
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full hover:bg-sky-200 dark:hover:bg-slate-700"
//           >
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
          
//           <Link to="/login" className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center">
//             <User size={16} className="mr-2" />
//             Login
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Header;
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Moon, Sun, User, LogOut, Settings, ChevronDown, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Header({ darkMode, toggleDarkMode }) {
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  const handleLogout = async () => {
    setLoading(true);
    setDropdownOpen(false);
    try {
      const result = await logout();
      
      if (result.success) {
        navigate('/login');
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className={`px-6 py-4 ${darkMode ? 'bg-slate-800 text-white' : 'bg-sky-100'} shadow-md`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="text-sky-600" size={24} />
          <span className="text-xl font-semibold">Mind-Mate</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-sky-600 font-medium hidden md:block">Home</Link>
          <Link to="/faq" className="hover:text-sky-600 font-medium hidden md:block">FAQ</Link>
          <Link to="/about" className="hover:text-sky-600 font-medium hidden md:block">About</Link>
          <Link to="/contact" className="hover:text-sky-600 font-medium hidden md:block">Contact</Link>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-sky-200 dark:hover:bg-slate-700"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 hover:text-sky-600"
              >
                <UserCircle size={24} />
                <span className="hidden md:block">{currentUser?.name || 'User'}</span>
                <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 py-2 ${darkMode ? 'bg-slate-700' : 'bg-white'} rounded-md shadow-xl z-10`}>
                  <Link 
                    to="/profile" 
                    className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-200 hover:bg-slate-600' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      <span>Profile</span>
                    </div>
                  </Link>
                  <div className={`border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'} my-1`}></div>
                  <button 
                    onClick={handleLogout}
                    disabled={loading}
                    className={`w-full text-left block px-4 py-2 text-sm ${darkMode ? 'text-gray-200 hover:bg-slate-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center">
                      {loading ? (
                        <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <LogOut size={16} className="mr-2" />
                      )}
                      <span>{loading ? 'Logging out...' : 'Logout'}</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center">
              <User size={16} className="mr-2" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;