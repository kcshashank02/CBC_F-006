// // // // import { useState } from 'react';
// // // // import { Link, useNavigate } from 'react-router-dom';
// // // // import axios from 'axios';

// // // // const Login = () => {
// // // //   const [formData, setFormData] = useState({ email: '', password: '' });
// // // //   const [errors, setErrors] = useState({});
// // // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // // //   const [loginError, setLoginError] = useState('');
// // // //   const navigate = useNavigate();

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData({ ...formData, [name]: value });
// // // //     if (errors[name]) setErrors({ ...errors, [name]: '' });
// // // //     if (loginError) setLoginError('');
// // // //   };

// // // //   const validateForm = () => {
// // // //     const newErrors = {};
// // // //     if (!formData.email.trim()) newErrors.email = 'Email is required';
// // // //     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
// // // //     if (!formData.password) newErrors.password = 'Password is required';
// // // //     return newErrors;
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     const newErrors = validateForm();
// // // //     if (Object.keys(newErrors).length > 0) {
// // // //       setErrors(newErrors);
// // // //       return;
// // // //     }
// // // //     setIsSubmitting(true);
// // // //     try {
// // // //       const res = await axios.post('http://localhost:6585/api/auth/login', formData, {
// // // //         withCredentials: true // Important for receiving cookies from the backend
// // // //       });
      
// // // //       if (res.data.success) {
// // // //         // No need to manually set token as it's in the cookie now
// // // //         navigate('/');
// // // //       } else {
// // // //         setLoginError(res.data.message || 'Login failed. Please try again.');
// // // //       }
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       setLoginError(
// // // //         err.response?.data?.message || 'Server error. Please try again later.'
// // // //       );
// // // //     } finally {
// // // //       setIsSubmitting(false);
// // // //     }
// // // //   };


// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
// // // //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// // // //         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
// // // //           Sign in to your account
// // // //         </h2>
// // // //       </div>

// // // //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// // // //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// // // //           {loginError && (
// // // //             <div className="rounded-md bg-red-50 p-4 mb-4">
// // // //               <div className="flex">
// // // //                 <div className="flex-shrink-0">
// // // //                   <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// // // //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// // // //                   </svg>
// // // //                 </div>
// // // //                 <div className="ml-3">
// // // //                   <p className="text-sm font-medium text-red-800">
// // // //                     {loginError}
// // // //                   </p>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           <form className="space-y-6" onSubmit={handleSubmit}>
// // // //             <div>
// // // //               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
// // // //                 Email address
// // // //               </label>
// // // //               <div className="mt-1">
// // // //                 <input
// // // //                   id="email"
// // // //                   name="email"
// // // //                   type="email"
// // // //                   autoComplete="email"
// // // //                   value={formData.email}
// // // //                   onChange={handleChange}
// // // //                   className={`appearance-none block w-full px-3 py-2 border ${
// // // //                     errors.email ? 'border-red-300' : 'border-gray-300'
// // // //                   } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
// // // //                 />
// // // //                 {errors.email && (
// // // //                   <p className="mt-2 text-sm text-red-600">{errors.email}</p>
// // // //                 )}
// // // //               </div>
// // // //             </div>

// // // //             <div>
// // // //               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
// // // //                 Password
// // // //               </label>
// // // //               <div className="mt-1">
// // // //                 <input
// // // //                   id="password"
// // // //                   name="password"
// // // //                   type="password"
// // // //                   autoComplete="current-password"
// // // //                   value={formData.password}
// // // //                   onChange={handleChange}
// // // //                   className={`appearance-none block w-full px-3 py-2 border ${
// // // //                     errors.password ? 'border-red-300' : 'border-gray-300'
// // // //                   } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
// // // //                 />
// // // //                 {errors.password && (
// // // //                   <p className="mt-2 text-sm text-red-600">{errors.password}</p>
// // // //                 )}
// // // //               </div>
// // // //             </div>

// // // //             <div className="flex items-center justify-between">
// // // //               <div className="flex items-center">
// // // //                 <input
// // // //                   id="remember-me"
// // // //                   name="remember-me"
// // // //                   type="checkbox"
// // // //                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
// // // //                 />
// // // //                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
// // // //                   Remember me
// // // //                 </label>
// // // //               </div>

// // // //               <div className="text-sm">
// // // //                 <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
// // // //                   Forgot your password?
// // // //                 </a>
// // // //               </div>
// // // //             </div>

// // // //             <div>
// // // //               <button
// // // //                 type="submit"
// // // //                 disabled={isSubmitting}
// // // //                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
// // // //               >
// // // //                 {isSubmitting ? (
// // // //                   <>
// // // //                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // // //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // // //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // // //                     </svg>
// // // //                     Signing in...
// // // //                   </>
// // // //                 ) : (
// // // //                   'Sign in'
// // // //                 )}
// // // //               </button>
// // // //             </div>
// // // //           </form>
          

// // // //           <div className="mt-6">
// // // //             <div className="relative">
// // // //               <div className="absolute inset-0 flex items-center">
// // // //                 <div className="w-full border-t border-gray-300"></div>
// // // //               </div>
// // // //               <div className="relative flex justify-center text-sm">
// // // //                 <span className="px-2 bg-white text-gray-500">
// // // //                   Don't have an account?
// // // //                 </span>
// // // //               </div>
// // // //             </div>

// // // //             <div className="mt-6">
// // // //               <Link
// // // //                 to="/signup"
// // // //                 className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
// // // //               >
// // // //                 Create an account
// // // //               </Link>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Login;
// // // import { useState } from 'react';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import axios from 'axios';

// // // const Login = () => {
// // //   const [formData, setFormData] = useState({ email: '', password: '' });
// // //   const [errors, setErrors] = useState({});
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [loginError, setLoginError] = useState('');
// // //   const [darkMode, setDarkMode] = useState(false);
// // //   const navigate = useNavigate();

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({ ...formData, [name]: value });
// // //     if (errors[name]) setErrors({ ...errors, [name]: '' });
// // //     if (loginError) setLoginError('');
// // //   };

// // //   const validateForm = () => {
// // //     const newErrors = {};
// // //     if (!formData.email.trim()) newErrors.email = 'Email is required';
// // //     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
// // //     if (!formData.password) newErrors.password = 'Password is required';
// // //     return newErrors;
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const newErrors = validateForm();
// // //     if (Object.keys(newErrors).length > 0) {
// // //       setErrors(newErrors);
// // //       return;
// // //     }
// // //     setIsSubmitting(true);
// // //     try {
// // //       const res = await axios.post('http://localhost:6585/api/auth/login', formData, {
// // //         withCredentials: true // Important for receiving cookies from the backend
// // //       });
      
// // //       if (res.data.success) {
// // //         // No need to manually set token as it's in the cookie now
// // //         navigate('/');
// // //       } else {
// // //         setLoginError(res.data.message || 'Login failed. Please try again.');
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       setLoginError(
// // //         err.response?.data?.message || 'Server error. Please try again later.'
// // //       );
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };


// // //   return (
// // //     <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-sky-50'} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
      
// // //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// // //         <h2 className={`mt-6 text-center text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
// // //           Sign in to your account
// // //         </h2>
// // //       </div>

// // //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// // //         <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} py-8 px-4 shadow sm:rounded-lg sm:px-10`}>
// // //           {loginError && (
// // //             <div className="rounded-md bg-red-50 p-4 mb-4">
// // //               <div className="flex">
// // //                 <div className="flex-shrink-0">
// // //                   <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// // //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// // //                   </svg>
// // //                 </div>
// // //                 <div className="ml-3">
// // //                   <p className="text-sm font-medium text-red-800">
// // //                     {loginError}
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           <form className="space-y-6" onSubmit={handleSubmit}>
// // //             <div>
// // //               <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
// // //                 Email address
// // //               </label>
// // //               <div className="mt-1">
// // //                 <input
// // //                   id="email"
// // //                   name="email"
// // //                   type="email"
// // //                   autoComplete="email"
// // //                   value={formData.email}
// // //                   onChange={handleChange}
// // //                   className={`appearance-none block w-full px-3 py-2 border ${
// // //                     errors.email ? 'border-red-300' : darkMode ? 'border-gray-600' : 'border-gray-300'
// // //                   } rounded-md shadow-sm placeholder-gray-400 ${
// // //                     darkMode ? 'bg-slate-700 text-white' : 'bg-white'
// // //                   } focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm`}
// // //                 />
// // //                 {errors.email && (
// // //                   <p className="mt-2 text-sm text-red-600">{errors.email}</p>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
// // //                 Password
// // //               </label>
// // //               <div className="mt-1">
// // //                 <input
// // //                   id="password"
// // //                   name="password"
// // //                   type="password"
// // //                   autoComplete="current-password"
// // //                   value={formData.password}
// // //                   onChange={handleChange}
// // //                   className={`appearance-none block w-full px-3 py-2 border ${
// // //                     errors.password ? 'border-red-300' : darkMode ? 'border-gray-600' : 'border-gray-300'
// // //                   } rounded-md shadow-sm placeholder-gray-400 ${
// // //                     darkMode ? 'bg-slate-700 text-white' : 'bg-white'
// // //                   } focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm`}
// // //                 />
// // //                 {errors.password && (
// // //                   <p className="mt-2 text-sm text-red-600">{errors.password}</p>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             <div className="flex items-center justify-between">
// // //               <div className="flex items-center">
// // //                 <input
// // //                   id="remember-me"
// // //                   name="remember-me"
// // //                   type="checkbox"
// // //                   className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
// // //                 />
// // //                 <label htmlFor="remember-me" className={`ml-2 block text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
// // //                   Remember me
// // //                 </label>
// // //               </div>

// // //               <div className="text-sm">
// // //                 <a href="#" className="font-medium text-sky-600 hover:text-sky-500">
// // //                   Forgot your password?
// // //                 </a>
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <button
// // //                 type="submit"
// // //                 disabled={isSubmitting}
// // //                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50"
// // //               >
// // //                 {isSubmitting ? (
// // //                   <>
// // //                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                     </svg>
// // //                     Signing in...
// // //                   </>
// // //                 ) : (
// // //                   'Sign in'
// // //                 )}
// // //               </button>
// // //             </div>
// // //           </form>
          

// // //           <div className="mt-6">
// // //             <div className="relative">
// // //               <div className="absolute inset-0 flex items-center">
// // //                 <div className={`w-full border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
// // //               </div>
// // //               <div className="relative flex justify-center text-sm">
// // //                 <span className={`px-2 ${darkMode ? 'bg-slate-800 text-gray-300' : 'bg-white text-gray-500'}`}>
// // //                   Don't have an account?
// // //                 </span>
// // //               </div>
// // //             </div>

// // //             <div className="mt-6">
// // //               <Link
// // //                 to="/signup"
// // //                 className={`w-full flex justify-center py-2 px-4 border ${
// // //                   darkMode ? 'border-gray-600 hover:bg-slate-700' : 'border-gray-300 hover:bg-gray-50'
// // //                 } rounded-md shadow-sm text-sm font-medium ${
// // //                   darkMode ? 'text-gray-200 bg-slate-800' : 'text-gray-700 bg-white'
// // //                 } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
// // //               >
// // //                 Create an account
// // //               </Link>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;
// // import { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../contexts/AuthContext'; // Update with correct path

// // const Login = ({ darkMode }) => {
// //   const [formData, setFormData] = useState({ email: '', password: '' });
// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [loginError, setLoginError] = useState('');
// //   const navigate = useNavigate();
// //   const { login } = useAuth();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //     if (errors[name]) setErrors({ ...errors, [name]: '' });
// //     if (loginError) setLoginError('');
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.email.trim()) newErrors.email = 'Email is required';
// //     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
// //     if (!formData.password) newErrors.password = 'Password is required';
// //     return newErrors;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const newErrors = validateForm();
// //     if (Object.keys(newErrors).length > 0) {
// //       setErrors(newErrors);
// //       return;
// //     }
    
// //     setIsSubmitting(true);
// //     try {
// //       const result = await login(formData.email, formData.password);
      
// //       if (result.success) {
// //         navigate('/');
// //       } else {
// //         setLoginError(result.message || 'Login failed. Please try again.');
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setLoginError(
// //         'Server error. Please try again later.'
// //       );
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-sky-50'} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
      
// //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //         <h2 className={`mt-6 text-center text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
// //           Sign in to your account
// //         </h2>
// //       </div>

// //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} py-8 px-4 shadow sm:rounded-lg sm:px-10`}>
// //           {loginError && (
// //             <div className="rounded-md bg-red-50 p-4 mb-4">
// //               <div className="flex">
// //                 <div className="flex-shrink-0">
// //                   <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
// //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// //                   </svg>
// //                 </div>
// //                 <div className="ml-3">
// //                   <p className="text-sm font-medium text-red-800">
// //                     {loginError}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           <form className="space-y-6" onSubmit={handleSubmit}>
// //             <div>
// //               <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
// //                 Email address
// //               </label>
// //               <div className="mt-1">
// //                 <input
// //                   id="email"
// //                   name="email"
// //                   type="email"
// //                   autoComplete="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   className={`appearance-none block w-full px-3 py-2 border ${
// //                     errors.email ? 'border-red-300' : darkMode ? 'border-gray-600' : 'border-gray-300'
// //                   } rounded-md shadow-sm placeholder-gray-400 ${
// //                     darkMode ? 'bg-slate-700 text-white' : 'bg-white'
// //                   } focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm`}
// //                 />
// //                 {errors.email && (
// //                   <p className="mt-2 text-sm text-red-600">{errors.email}</p>
// //                 )}
// //               </div>
// //             </div>

// //             <div>
// //               <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
// //                 Password
// //               </label>
// //               <div className="mt-1">
// //                 <input
// //                   id="password"
// //                   name="password"
// //                   type="password"
// //                   autoComplete="current-password"
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   className={`appearance-none block w-full px-3 py-2 border ${
// //                     errors.password ? 'border-red-300' : darkMode ? 'border-gray-600' : 'border-gray-300'
// //                   } rounded-md shadow-sm placeholder-gray-400 ${
// //                     darkMode ? 'bg-slate-700 text-white' : 'bg-white'
// //                   } focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm`}
// //                 />
// //                 {errors.password && (
// //                   <p className="mt-2 text-sm text-red-600">{errors.password}</p>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center">
// //                 <input
// //                   id="remember-me"
// //                   name="remember-me"
// //                   type="checkbox"
// //                   className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
// //                 />
// //                 <label htmlFor="remember-me" className={`ml-2 block text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
// //                   Remember me
// //                 </label>
// //               </div>

// //               <div className="text-sm">
// //                 <a href="/forgot-password" className="font-medium text-sky-600 hover:text-sky-500">
// //                   Forgot your password?
// //                 </a>
// //               </div>
// //             </div>

// //             <div>
// //               <button
// //                 type="submit"
// //                 disabled={isSubmitting}
// //                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50"
// //               >
// //                 {isSubmitting ? (
// //                   <>
// //                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                     </svg>
// //                     Signing in...
// //                   </>
// //                 ) : (
// //                   'Sign in'
// //                 )}
// //               </button>
// //             </div>
// //           </form>
          
// //           <div className="mt-6">
// //             <div className="relative">
// //               <div className="absolute inset-0 flex items-center">
// //                 <div className={`w-full border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
// //               </div>
// //               <div className="relative flex justify-center text-sm">
// //                 <span className={`px-2 ${darkMode ? 'bg-slate-800 text-gray-300' : 'bg-white text-gray-500'}`}>
// //                   Don't have an account?
// //                 </span>
// //               </div>
// //             </div>

// //             <div className="mt-6">
// //               <Link
// //                 to="/signup"
// //                 className={`w-full flex justify-center py-2 px-4 border ${
// //                   darkMode ? 'border-gray-600 hover:bg-slate-700' : 'border-gray-300 hover:bg-gray-50'
// //                 } rounded-md shadow-sm text-sm font-medium ${
// //                   darkMode ? 'text-gray-200 bg-slate-800' : 'text-gray-700 bg-white'
// //                 } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
// //               >
// //                 Create an account
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext'; // Update with correct path

// const Login = ({ darkMode }) => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loginError, setLoginError] = useState('');
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) setErrors({ ...errors, [name]: '' });
//     if (loginError) setLoginError('');
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//     if (!formData.password) newErrors.password = 'Password is required';
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
    
//     setIsSubmitting(true);
//     try {
//       const result = await login(formData.email, formData.password);
      
//       if (result.success) {
//         navigate('/');
//       } else {
//         setLoginError(result.message || 'Login failed. Please try again.');
//       }
//     } catch (err) {
//       console.error(err);
//       setLoginError(
//         'Server error. Please try again later.'
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-sky-50'} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
      
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className={`mt-6 text-center text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//           Sign in to your account
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} py-8 px-4 shadow sm:rounded-lg sm:px-10`}>
//           {loginError && (
//             <div className="rounded-md bg-red-50 p-4 mb-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-red-800">
//                     {loginError}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`appearance-none block w-full px-3 py-2 border ${
//                     errors.email ? 'border-red-300' : darkMode ? 'border-gray-600' : 'border-gray-300'
//                   } rounded-md shadow-sm placeholder-gray-400 ${
//                     darkMode ? 'bg-slate-700 text-white' : 'bg-white'
//                   } focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm`}
//                 />
//                 {errors.email && (
//                   <p className="mt-2 text-sm text-red-600">{errors.email}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`appearance-none block w-full px-3 py-2 border ${
//                     errors.password ? 'border-red-300' : darkMode ? 'border-gray-600' : 'border-gray-300'
//                   } rounded-md shadow-sm placeholder-gray-400 ${
//                     darkMode ? 'bg-slate-700 text-white' : 'bg-white'
//                   } focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm`}
//                 />
//                 {errors.password && (
//                   <p className="mt-2 text-sm text-red-600">{errors.password}</p>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className={`ml-2 block text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <Link to="/forgot-password" className="font-medium text-sky-600 hover:text-sky-500">
//                   Forgot your password?
//                 </Link>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Signing in...
//                   </>
//                 ) : (
//                   'Sign in'
//                 )}
//               </button>
//             </div>
//           </form>
          
//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className={`w-full border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className={`px-2 ${darkMode ? 'bg-slate-800 text-gray-300' : 'bg-white text-gray-500'}`}>
//                   Don't have an account?
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <Link
//                 to="/signup"
//                 className={`w-full flex justify-center py-2 px-4 border ${
//                   darkMode ? 'border-gray-600 hover:bg-slate-700' : 'border-gray-300 hover:bg-gray-50'
//                 } rounded-md shadow-sm text-sm font-medium ${
//                   darkMode ? 'text-gray-200 bg-slate-800' : 'text-gray-700 bg-white'
//                 } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
//               >
//                 Create an account
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Update with correct path

// Access the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:6585';

const Login = ({ darkMode }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
    if (loginError) setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Use the API_URL constant when making API calls
      console.log(`Using API URL: ${API_URL}`);
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate('/');
      } else {
        setLoginError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setLoginError(
        'Server error. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-sky-50'} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className={`mt-6 text-center text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} py-8 px-4 shadow sm:rounded-lg sm:px-10`}>
          {loginError && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    {loginError}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-300' : darkMode ? 'border-gray-600' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 ${
                    darkMode ? 'bg-slate-700 text-white' : 'bg-white'
                  } focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-300' : darkMode ? 'border-gray-600' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 ${
                    darkMode ? 'bg-slate-700 text-white' : 'bg-white'
                  } focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm`}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className={`ml-2 block text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-sky-600 hover:text-sky-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${darkMode ? 'bg-slate-800 text-gray-300' : 'bg-white text-gray-500'}`}>
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signup"
                className={`w-full flex justify-center py-2 px-4 border ${
                  darkMode ? 'border-gray-600 hover:bg-slate-700' : 'border-gray-300 hover:bg-gray-50'
                } rounded-md shadow-sm text-sm font-medium ${
                  darkMode ? 'text-gray-200 bg-slate-800' : 'text-gray-700 bg-white'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;