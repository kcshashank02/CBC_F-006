// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { MessageCircle, Heart, Calendar, BookOpen, Info, ChevronRight, Moon, Sun, User, HelpCircle } from 'lucide-react';

// function Home() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [showChat, setShowChat] = useState(false);
//   const navigate = useNavigate();
  
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };
  
//   const toggleChat = () => {
//     setShowChat(!showChat);
//   };
  
//   return (
//     <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-sky-50 text-slate-800'}`}>
//       {/* Navigation */}
//       <nav className={`px-6 py-4 ${darkMode ? 'bg-slate-800' : 'bg-sky-100'} shadow-md`}>
//         <div className="container mx-auto flex justify-between items-center">
//           <Link to="/" className="flex items-center space-x-2">
//             <Heart className="text-sky-600" size={24} />
//             <span className="text-xl font-semibold">Mind-Mate</span>
//           </Link>
          
//           <div className="flex items-center space-x-6">
//             <Link to="/" className="hover:text-sky-600 font-medium hidden md:block">Home</Link>
//             <Link to="/resources" className="hover:text-sky-600 font-medium hidden md:block">Resources</Link>
//             <Link to="/about" className="hover:text-sky-600 font-medium hidden md:block">About</Link>
//             <Link to="/contact" className="hover:text-sky-600 font-medium hidden md:block">Contact</Link>
            
//             <button 
//               onClick={toggleDarkMode}
//               className="p-2 rounded-full hover:bg-sky-200 dark:hover:bg-slate-700"
//             >
//               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
            
//             <Link to="/login" className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center">
//               <User size={16} className="mr-2" />
//               Login
//             </Link>
//           </div>
//         </div>
//       </nav>
      
//       {/* Hero Section */}
//       <section className="py-16 px-6">
//         <div className="container mx-auto flex flex-col md:flex-row items-center">
//           <div className="md:w-1/2 mb-10 md:mb-0">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
//               Your Personal <span className="text-sky-600">Mental Health</span> Companion
//             </h1>
//             <p className="text-lg mb-8 max-w-lg">
//               Take control of your mental wellbeing with our AI-powered companion that listens, supports, and guides you through your journey.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link 
//                 to="/chatbot"
//                 className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center"
//               >
//                 <MessageCircle size={20} className="mr-2" />
//                 Start Chatting
//               </Link>
//               <button className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-sky-100 hover:bg-sky-200'} px-6 py-3 rounded-lg font-medium flex items-center justify-center`}>
//                 <Info size={20} className="mr-2" />
//                 Learn More
//               </button>
//             </div>
//           </div>
//           <div className="md:w-1/2 flex justify-center">
//             <img 
//               src="https://cdni.iconscout.com/illustration/premium/thumb/mental-health-illustration-download-in-svg-png-gif-file-formats--clinician-psychotherapy-person-pack-healthcare-medical-illustrations-6814299.png" 
//               alt="Mental health illustration" 
//               className="rounded-xl shadow-lg max-w-md w-full"
//             />
//           </div>
//         </div>
//       </section>
      
//       {/* Features Section */}
//       <section id="features" className={`py-16 px-6 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-12">How We Can Help You</h2>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {/* Feature 1 */}
//             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-sky-50'} transition-all hover:shadow-lg`}>
//               <div className="bg-sky-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
//                 <MessageCircle size={24} className="text-sky-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">AI Chatbot</h3>
//               <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
//                 24/7 conversation partner trained to provide emotional support and coping strategies.
//               </p>
//             </div>
            
//             {/* Feature 2 */}
//             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-sky-50'} transition-all hover:shadow-lg`}>
//               <div className="bg-sky-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
//                 <Calendar size={24} className="text-sky-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Mood Tracking</h3>
//               <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
//                 Monitor your emotions over time to identify patterns and triggers.
//               </p>
//             </div>
            
//             {/* Feature 3 */}
//             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-sky-50'} transition-all hover:shadow-lg`}>
//               <div className="bg-sky-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
//                 <BookOpen size={24} className="text-sky-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Resource Library</h3>
//               <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
//                 Access articles, videos, and exercises curated by mental health professionals.
//               </p>
//             </div>
            
//             {/* Feature 4 */}
//             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-sky-50'} transition-all hover:shadow-lg`}>
//               <div className="bg-sky-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
//                 <HelpCircle size={24} className="text-sky-600" />
//               </div>
//               <h3 className="text-xl font-semibold mb-3">Crisis Support</h3>
//               <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
//                 Immediate guidance and resources for difficult moments and emergencies.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Testimonials */}
//       <section id="testimonials" className="py-16 px-6">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             {/* Testimonial 1 */}
//             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
//               <div className="flex items-center mb-4">
//                 <div className="bg-sky-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
//                   <span className="font-semibold text-sky-700">JD</span>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Jamie D.</h4>
//                   <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Using for 6 months</p>
//                 </div>
//               </div>
//               <p className={`italic ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
//                 "The chatbot feels like talking to a friend who really listens. It's helped me through some tough anxiety moments."
//               </p>
//             </div>
            
//             {/* Testimonial 2 */}
//             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
//               <div className="flex items-center mb-4">
//                 <div className="bg-sky-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
//                   <span className="font-semibold text-sky-700">MR</span>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Michael R.</h4>
//                   <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Using for 3 months</p>
//                 </div>
//               </div>
//               <p className={`italic ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
//                 "The mood tracking helped me identify what triggers my depression. Now I can prepare for those situations better."
//               </p>
//             </div>
            
//             {/* Testimonial 3 */}
//             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
//               <div className="flex items-center mb-4">
//                 <div className="bg-sky-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
//                   <span className="font-semibold text-sky-700">SK</span>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">Sarah K.</h4>
//                   <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Using for 1 year</p>
//                 </div>
//               </div>
//               <p className={`italic ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
//                 "Having access to resources and exercises has been a game-changer for managing my stress levels day-to-day."
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* CTA Section */}
//       <section className={`py-16 px-6 ${darkMode ? 'bg-slate-800' : 'bg-sky-100'}`}>
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
//           <p className="text-lg mb-8 max-w-2xl mx-auto">
//             Join thousands of users who have improved their mental wellbeing with our supportive AI companion.
//           </p>
//           <Link to="/chatbot" className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center">
//             Get Started Now
//             <ChevronRight size={20} className="ml-2" />
//           </Link>
//         </div>
//       </section>
      
//       {/* Footer */}
//       <footer className={`px-6 py-10 ${darkMode ? 'bg-slate-900' : 'bg-sky-50'} border-t ${darkMode ? 'border-slate-700' : 'border-sky-200'}`}>
//         <div className="container mx-auto">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <Link to="/" className="flex items-center space-x-2 mb-4">
//                 <Heart className="text-sky-600" size={20} />
//                 <span className="text-lg font-semibold">Mind-Mate</span>
//               </Link>
//               <p className={`mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
//                 Your trusted AI partner for mental health support and wellness.
//               </p>
//             </div>
            
//             <div>
//               <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
//               <ul className="space-y-2">
//                 <li><Link to="/" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Home</Link></li>
//                 <li><Link to="/about" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>About Us</Link></li>
//                 <li><Link to="/#features" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Features</Link></li>
//                 <li><Link to="/#testimonials" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Testimonials</Link></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="font-semibold text-lg mb-4">Resources</h3>
//               <ul className="space-y-2">
//                 <li><Link to="/resources/articles" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Mental Health Articles</Link></li>
//                 <li><Link to="/resources/meditations" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Guided Meditations</Link></li>
//                 <li><Link to="/resources/professional-help" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Professional Help</Link></li>
//                 <li><Link to="/resources/crisis" className={`hover:text-sky-600 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Crisis Hotlines</Link></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="font-semibold text-lg mb-4">Contact</h3>
//               <ul className="space-y-2">
//                 <li className={darkMode ? 'text-slate-400' : 'text-slate-600'}>support@mindfulcompanion.com</li>
//                 <li className={darkMode ? 'text-slate-400' : 'text-slate-600'}>+1 (555) 123-4567</li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="mt-10 pt-6 border-t text-center text-sm text-slate-500">
//             <p>© 2025 MindfulCompanion. All rights reserved.</p>
//             <p className="mt-2">
//               <Link to="/privacy" className="hover:text-sky-600 mx-2">Privacy Policy</Link>
//               <Link to="/terms" className="hover:text-sky-600 mx-2">Terms of Service</Link>
//               <Link to="/cookies" className="hover:text-sky-600 mx-2">Cookie Policy</Link>
//             </p>
//           </div>
//         </div>
//       </footer>
      
//       {/* Chat Widget */}
//       {showChat && (
//         <div className={`fixed bottom-6 right-6 w-80 sm:w-96 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-2xl overflow-hidden z-50`}>
//           <div className="bg-sky-600 text-white p-4 flex justify-between items-center">
//             <div className="flex items-center">
//               <MessageCircle size={20} className="mr-2" />
//               <span className="font-medium">Mental Health Assistant</span>
//             </div>
//             <div className="flex items-center">
//               <Link 
//                 to="/dashboard" 
//                 className="hover:bg-sky-700 p-1 rounded mr-2 flex items-center"
//               >
//                 <span className="text-sm mr-1">Full View</span>
//                 <ChevronRight size={16} />
//               </Link>
//               <button onClick={toggleChat} className="hover:bg-sky-700 p-1 rounded">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//           </div>
          
//           <div className="h-80 p-4 overflow-y-auto">
//             <div className={`mb-3 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} p-3 rounded-lg max-w-[80%]`}>
//               <p>Hi there! I'm your mental health assistant. How are you feeling today?</p>
//             </div>
            
//             <div className="flex justify-end mb-3">
//               <div className="bg-sky-600 text-white p-3 rounded-lg max-w-[80%]">
//                 <p>I'm feeling a bit anxious today.</p>
//               </div>
//             </div>
            
//             <div className={`mb-3 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} p-3 rounded-lg max-w-[80%]`}>
//               <p>I'm sorry to hear that you're feeling anxious. Would you like to talk about what's causing your anxiety, or would you prefer some quick relaxation techniques?</p>
//             </div>
//           </div>
          
//           <div className="p-4 border-t">
//             <div className="flex">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 className={`flex-1 py-2 px-3 rounded-l-lg ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-sky-500`}
//               />
//               <button className="bg-sky-600 hover:bg-sky-700 text-white rounded-r-lg px-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;
// // import { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { MessageCircle, Heart, Calendar, BookOpen, Info, ChevronRight, HelpCircle } from 'lucide-react';
// // import Header from './Header';
// // import Footer from './Footer';

// // function Home() {
// //   const [darkMode, setDarkMode] = useState(false);
// //   const [showChat, setShowChat] = useState(false);
// //   const navigate = useNavigate();
  
// //   const toggleChat = () => {
// //     setShowChat(!showChat);
// //   };
  
// //   return (
// //     <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-sky-50 text-slate-800'}`}>
// //       {/* Header Component */}
// //       <Header />
      
// //       {/* Hero Section */}
// //       <section className="py-16 px-6">
// //         <div className="container mx-auto flex flex-col md:flex-row items-center">
// //           <div className="md:w-1/2 mb-10 md:mb-0">
// //             <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
// //               Your Personal <span className="text-sky-600">Mental Health</span> Companion
// //             </h1>
// //             <p className="text-lg mb-8 max-w-lg">
// //               Take control of your mental wellbeing with our AI-powered companion that listens, supports, and guides you through your journey.
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-4">
// //               <Link 
// //                 to="/chatbot"
// //                 className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center"
// //               >
// //                 <MessageCircle size={20} className="mr-2" />
// //                 Start Chatting
// //               </Link>
// //               <button className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-sky-100 hover:bg-sky-200'} px-6 py-3 rounded-lg font-medium flex items-center justify-center`}>
// //                 <Info size={20} className="mr-2" />
// //                 Learn More
// //               </button>
// //             </div>
// //           </div>
// //           <div className="md:w-1/2 flex justify-center">
// //             <img 
// //               src="https://cdni.iconscout.com/illustration/premium/thumb/mental-health-illustration-download-in-svg-png-gif-file-formats--clinician-psychotherapy-person-pack-healthcare-medical-illustrations-6814299.png" 
// //               alt="Mental health illustration" 
// //               className="rounded-xl shadow-lg max-w-md w-full"
// //             />
// //           </div>
// //         </div>
// //       </section>
      
// //       {/* Features Section */}
// //       <section id="features" className={`py-16 px-6 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
// //         <div className="container mx-auto">
// //           <h2 className="text-3xl font-bold text-center mb-12">How We Can Help You</h2>
          
// //           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
// //             {/* Feature 1 */}
// //             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-sky-50'} transition-all hover:shadow-lg`}>
// //               <div className="bg-sky-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
// //                 <MessageCircle size={24} className="text-sky-600" />
// //               </div>
// //               <h3 className="text-xl font-semibold mb-3">AI Chatbot</h3>
// //               <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
// //                 24/7 conversation partner trained to provide emotional support and coping strategies.
// //               </p>
// //             </div>
            
// //             {/* Feature 2 */}
// //             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-sky-50'} transition-all hover:shadow-lg`}>
// //               <div className="bg-sky-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
// //                 <Calendar size={24} className="text-sky-600" />
// //               </div>
// //               <h3 className="text-xl font-semibold mb-3">Mood Tracking</h3>
// //               <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
// //                 Monitor your emotions over time to identify patterns and triggers.
// //               </p>
// //             </div>
            
// //             {/* Feature 3 */}
// //             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-sky-50'} transition-all hover:shadow-lg`}>
// //               <div className="bg-sky-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
// //                 <BookOpen size={24} className="text-sky-600" />
// //               </div>
// //               <h3 className="text-xl font-semibold mb-3">Resource Library</h3>
// //               <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
// //                 Access articles, videos, and exercises curated by mental health professionals.
// //               </p>
// //             </div>
            
// //             {/* Feature 4 */}
// //             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-sky-50'} transition-all hover:shadow-lg`}>
// //               <div className="bg-sky-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
// //                 <HelpCircle size={24} className="text-sky-600" />
// //               </div>
// //               <h3 className="text-xl font-semibold mb-3">Crisis Support</h3>
// //               <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
// //                 Immediate guidance and resources for difficult moments and emergencies.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
      
// //       {/* Testimonials */}
// //       <section id="testimonials" className="py-16 px-6">
// //         <div className="container mx-auto">
// //           <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
// //           <div className="grid md:grid-cols-3 gap-8">
// //             {/* Testimonial 1 */}
// //             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
// //               <div className="flex items-center mb-4">
// //                 <div className="bg-sky-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
// //                   <span className="font-semibold text-sky-700">JD</span>
// //                 </div>
// //                 <div>
// //                   <h4 className="font-semibold">Jamie D.</h4>
// //                   <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Using for 6 months</p>
// //                 </div>
// //               </div>
// //               <p className={`italic ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
// //                 "The chatbot feels like talking to a friend who really listens. It's helped me through some tough anxiety moments."
// //               </p>
// //             </div>
            
// //             {/* Testimonial 2 */}
// //             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
// //               <div className="flex items-center mb-4">
// //                 <div className="bg-sky-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
// //                   <span className="font-semibold text-sky-700">MR</span>
// //                 </div>
// //                 <div>
// //                   <h4 className="font-semibold">Michael R.</h4>
// //                   <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Using for 3 months</p>
// //                 </div>
// //               </div>
// //               <p className={`italic ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
// //                 "The mood tracking helped me identify what triggers my depression. Now I can prepare for those situations better."
// //               </p>
// //             </div>
            
// //             {/* Testimonial 3 */}
// //             <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
// //               <div className="flex items-center mb-4">
// //                 <div className="bg-sky-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
// //                   <span className="font-semibold text-sky-700">SK</span>
// //                 </div>
// //                 <div>
// //                   <h4 className="font-semibold">Sarah K.</h4>
// //                   <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Using for 1 year</p>
// //                 </div>
// //               </div>
// //               <p className={`italic ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
// //                 "Having access to resources and exercises has been a game-changer for managing my stress levels day-to-day."
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
      
// //       {/* CTA Section */}
// //       <section className={`py-16 px-6 ${darkMode ? 'bg-slate-800' : 'bg-sky-100'}`}>
// //         <div className="container mx-auto text-center">
// //           <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
// //           <p className="text-lg mb-8 max-w-2xl mx-auto">
// //             Join thousands of users who have improved their mental wellbeing with our supportive AI companion.
// //           </p>
// //           <Link to="/dashboard" className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center">
// //             Get Started Now
// //             <ChevronRight size={20} className="ml-2" />
// //           </Link>
// //         </div>
// //       </section>
      
// //       {/* Footer Component */}
// //       <Footer darkMode={darkMode} />
      
// //       {/* Chat Widget */}
// //       {showChat && (
// //         <div className={`fixed bottom-6 right-6 w-80 sm:w-96 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-2xl overflow-hidden z-50`}>
// //           <div className="bg-sky-600 text-white p-4 flex justify-between items-center">
// //             <div className="flex items-center">
// //               <MessageCircle size={20} className="mr-2" />
// //               <span className="font-medium">Mental Health Assistant</span>
// //             </div>
// //             <div className="flex items-center">
// //               <Link 
// //                 to="/dashboard" 
// //                 className="hover:bg-sky-700 p-1 rounded mr-2 flex items-center"
// //               >
// //                 <span className="text-sm mr-1">Full View</span>
// //                 <ChevronRight size={16} />
// //               </Link>
// //               <button onClick={toggleChat} className="hover:bg-sky-700 p-1 rounded">
// //                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>
          
// //           <div className="h-80 p-4 overflow-y-auto">
// //             <div className={`mb-3 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} p-3 rounded-lg max-w-[80%]`}>
// //               <p>Hi there! I'm your mental health assistant. How are you feeling today?</p>
// //             </div>
            
// //             <div className="flex justify-end mb-3">
// //               <div className="bg-sky-600 text-white p-3 rounded-lg max-w-[80%]">
// //                 <p>I'm feeling a bit anxious today.</p>
// //               </div>
// //             </div>
            
// //             <div className={`mb-3 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} p-3 rounded-lg max-w-[80%]`}>
// //               <p>I'm sorry to hear that you're feeling anxious. Would you like to talk about what's causing your anxiety, or would you prefer some quick relaxation techniques?</p>
// //             </div>
// //           </div>
          
// //           <div className="p-4 border-t">
// //             <div className="flex">
// //               <input
// //                 type="text"
// //                 placeholder="Type your message..."
// //                 className={`flex-1 py-2 px-3 rounded-l-lg ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-sky-500`}
// //               />
// //               <button className="bg-sky-600 hover:bg-sky-700 text-white rounded-r-lg px-4">
// //                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
// //                 </svg>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Home;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Heart, Calendar, BookOpen, Info, ChevronRight, HelpCircle } from 'lucide-react';

function Home({ darkMode }) {
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  
  const toggleChat = () => {
    setShowChat(!showChat);
  };
  
  return (
    <div className="min-h-screen"> {/* Container div - no need for bg classes here as they're applied in the wrapper */}
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Your Personal <span className="text-sky-600">Mental Health</span> Companion
            </h1>
            <p className="text-lg mb-8 max-w-lg">
              Take control of your mental wellbeing with our AI-powered companion that listens, supports, and guides you through your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
  <Link 
    to="/chatbot"
    className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center"
  >
    <MessageCircle size={20} className="mr-2" />
    Start Chatting
  </Link>

  <Link 
    to="/about"
    className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-sky-100 hover:bg-sky-200'} px-6 py-3 rounded-lg font-medium flex items-center justify-center`}
  >
    <Info size={20} className="mr-2" />
    Learn More
  </Link>
</div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://cdni.iconscout.com/illustration/premium/thumb/mental-health-illustration-download-in-svg-png-gif-file-formats--clinician-psychotherapy-person-pack-healthcare-medical-illustrations-6814299.png" 
              alt="Mental health illustration" 
              className="rounded-xl shadow-lg max-w-md w-full"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className={`py-16 px-6 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How We Can Help You</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-sky-50'} transition-all hover:shadow-lg`}>
              <div className="bg-sky-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MessageCircle size={24} className="text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Chatbot</h3>
              <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                24/7 conversation partner trained to provide emotional support and coping strategies.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-sky-50'} transition-all hover:shadow-lg`}>
              <div className="bg-sky-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Calendar size={24} className="text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mood Tracking</h3>
              <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Monitor your emotions over time to identify patterns and triggers.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-sky-50'} transition-all hover:shadow-lg`}>
              <div className="bg-sky-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Resource Library</h3>
              <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Access articles, videos, and exercises curated by mental health professionals.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-sky-50'} transition-all hover:shadow-lg`}>
              <div className="bg-sky-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <HelpCircle size={24} className="text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Crisis Support</h3>
              <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Immediate guidance and resources for difficult moments and emergencies.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
              <div className="flex items-center mb-4">
                <div className="bg-sky-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-semibold text-sky-700">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">Jamie D.</h4>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Using for 6 months</p>
                </div>
              </div>
              <p className={`italic ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                "The chatbot feels like talking to a friend who really listens. It's helped me through some tough anxiety moments."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
              <div className="flex items-center mb-4">
                <div className="bg-sky-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-semibold text-sky-700">MR</span>
                </div>
                <div>
                  <h4 className="font-semibold">Michael R.</h4>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Using for 3 months</p>
                </div>
              </div>
              <p className={`italic ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                "The mood tracking helped me identify what triggers my depression. Now I can prepare for those situations better."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}>
              <div className="flex items-center mb-4">
                <div className="bg-sky-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-semibold text-sky-700">SK</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah K.</h4>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Using for 1 year</p>
                </div>
              </div>
              <p className={`italic ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                "Having access to resources and exercises has been a game-changer for managing my stress levels day-to-day."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className={`py-16 px-6 ${darkMode ? 'bg-slate-800' : 'bg-sky-100'}`}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who have improved their mental wellbeing with our supportive AI companion.
          </p>
          <Link to="/dashboard" className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center">
            Get Started Now
            <ChevronRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
      
      {/* Chat Widget */}
      {showChat && (
        <div className={`fixed bottom-6 right-6 w-80 sm:w-96 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-2xl overflow-hidden z-50`}>
          <div className="bg-sky-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle size={20} className="mr-2" />
              <span className="font-medium">Mental Health Assistant</span>
            </div>
            <div className="flex items-center">
              <Link 
                to="/chatbot" 
                className="hover:bg-sky-700 p-1 rounded mr-2 flex items-center"
              >
                <span className="text-sm mr-1">Full View</span>
                <ChevronRight size={16} />
              </Link>
              <button onClick={toggleChat} className="hover:bg-sky-700 p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="h-80 p-4 overflow-y-auto">
            <div className={`mb-3 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} p-3 rounded-lg max-w-[80%]`}>
              <p>Hi there! I'm your mental health assistant. How are you feeling today?</p>
            </div>
            
            <div className="flex justify-end mb-3">
              <div className="bg-sky-600 text-white p-3 rounded-lg max-w-[80%]">
                <p>I'm feeling a bit anxious today.</p>
              </div>
            </div>
            
            <div className={`mb-3 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} p-3 rounded-lg max-w-[80%]`}>
              <p>I'm sorry to hear that you're feeling anxious. Would you like to talk about what's causing your anxiety, or would you prefer some quick relaxation techniques?</p>
            </div>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                placeholder="Type your message..."
                className={`flex-1 py-2 px-3 rounded-l-lg ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-200'} border focus:outline-none focus:ring-2 focus:ring-sky-500`}
              />
              <button className="bg-sky-600 hover:bg-sky-700 text-white rounded-r-lg px-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;