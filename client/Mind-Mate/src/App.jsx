// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import Signup from './components/Signup.jsx';
// // import Login from './components/Login.jsx'; 
// // import ChatInterface from './components/ChatInterface.jsx';
// // import Home from './components/home.jsx';
// // // import Contact from './components/Contact.jsx';



// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/signup" element={<Signup />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/chatbot" element={<ChatInterface />} />
// //         <Route path="/" element={<Home />} />
// //         {/* <Route path="/" element={<Contact />} /> */}
// //         {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;
// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import { useState } from 'react';
// import Signup from './components/Signup.jsx';
// import Login from './components/Login.jsx';
// import ChatInterface from './components/ChatInterface.jsx';
// import Home from './components/home.jsx';
// import NotFoundPage from './components/NotFoundPage.jsx'

// import Contact from './components/Contact.jsx';
// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
// import AboutUs from './components/AboutUs.jsx';
// import FAQ from './components/FAQ.jsx'

// // Layout component to wrap routes that should have header/footer
// function Layout() {
//   const [darkMode, setDarkMode] = useState(false);
  
//   // Function to toggle dark mode that can be passed to Header
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };
  
//   return (
//     <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-slate-900 text-white' : 'bg-sky-50 text-slate-800'}`}>
//       <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
//       <main className="flex-grow">
//         <Outlet />
//       </main>
//       <Footer darkMode={darkMode} />
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public routes without header/footer */}
//         {/* <Route path="/login" element={<Login />} /> */}
//         {/* <Route path="/signup" element={<Signup />} /> */}
//         <Route path="/" element={<Home />} />
//         {/* Routes with header/footer */}
//         <Route element={<Layout />}>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/faq" element={<FAQ />} />
//         <Route path="*" element={<NotFoundPage />} />
//         <Route path="/chatbot" element={<ChatInterface />} />
//         <Route path="/contact" element={<Contact />} />
//         {/* Add other routes that need header/footer here */}
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import ChatInterface from './components/ChatInterface.jsx';
import Home from './components/home.jsx';
import NotFoundPage from './components/NotFoundPage.jsx'

import Contact from './components/Contact.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AboutUs from './components/AboutUs.jsx';
import FAQ from './components/FAQ.jsx'
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import TherapistDashboard from './components/dashboard.jsx';
// import TherapistDashboard from './components/TherapistDashboard';
import TherapistBooking from './components/TherapistBooking';
import TherapistChat from './components/TherapistChat';
import MentalHealthResourcesPage from './components/MentalHealthResourcesPage.jsx'
import MentalHealthCrisisPage from './components/MentalHealthCrisisPage.jsx'
import MentalHealthResources from './components/MentalHealthResources.jsx'

// Create context for dark mode
export const DarkModeContext = createContext();

// Layout component to wrap routes that should have header/footer
function Layout() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-slate-900 text-white' : 'bg-sky-50 text-slate-800'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}

// Home wrapper component that applies dark mode styling
function HomeWrapper() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-sky-50 text-slate-800'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Home darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
      <AuthProvider>
        <Routes>
          {/* Home route with dark mode applied */}
          <Route path="/" element={<PrivateRoute><HomeWrapper /></PrivateRoute>} />
          
          {/* Routes with header/footer */}
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <Profile/>
                  </PrivateRoute>} />
                  {/* <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <TherapistDashboard/>
                  </PrivateRoute>} /> */}
                  <Route path="/dashboard" element={<TherapistDashboard />} />
        <Route path="/therapist/:id/book" element={<TherapistBooking />} />
        <Route path="/therapist/:id/chat" element={<TherapistChat />} />
        <Route path="/resources/professional-help" element={<MentalHealthResourcesPage />} />
                <Route path="/resources/crisis" element={<MentalHealthCrisisPage />} />
                <Route path="/resources/articles" element={<MentalHealthResources />} />
                

        
                  
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/chatbot" element={<ChatInterface />} />
            <Route path="/contact" element={<Contact />} />
            {/* Add other routes that need header/footer here */}
          </Route>
        </Routes>
        </AuthProvider>
      </Router>
    </DarkModeContext.Provider>
  );
}

export default App;