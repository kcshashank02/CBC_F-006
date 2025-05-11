// //suhas
// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';   

// const ResetPassword = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ 
//     email: location.state?.email || '', 
//     otp: '', 
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [passwordStrength, setPasswordStrength] = useState(0);

//   useEffect(() => {
//     if (form.newPassword) {
//       let strength = 0;
//       if (form.newPassword.length >= 8) strength += 1;
//       if (/[A-Z]/.test(form.newPassword)) strength += 1;
//       if (/[0-9]/.test(form.newPassword)) strength += 1;
//       if (/[^A-Za-z0-9]/.test(form.newPassword)) strength += 1;
//       setPasswordStrength(strength);
//     } else {
//       setPasswordStrength(0);
//     }
//   }, [form.newPassword]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleReset = async () => {
//     if (!form.email || !form.otp || !form.newPassword) {
//       setError('All fields are required');
//       return;
//     }

//     if (form.newPassword !== form.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (passwordStrength < 3) {
//       setError('Please create a stronger password');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {  //chnge this to your API URL for production or testing in your .env file
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: form.email,
//           otp: form.otp,
//           newPassword: form.newPassword
//         })
//       });
      
//       const data = await res.json();
      
//       if (!res.ok) {
//         throw new Error(data.message || 'Failed to reset password');
//       }
      
//       setMessage(data.message || 'Password reset successfully');
//       setError('');
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
      
//     } catch (err) {
//       setError(err.message || 'Failed to reset password');
//       setMessage('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStrengthColor = () => {
//     if (passwordStrength === 0) return 'bg-gray-300';
//     if (passwordStrength === 1) return 'bg-red-500';
//     if (passwordStrength === 2) return 'bg-yellow-500';
//     if (passwordStrength === 3) return 'bg-blue-500';
//     return 'bg-green-500';
//   };

//   return (
//     <div className="flex items-center justify-center bg-slate-100 min-h-screen pt-16 pb-16">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold text-blue-950">Reset Password</h2>
//           <p className="text-gray-600 mt-2">Enter the verification code and create a new password</p>
//         </div>
        
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//               value={form.email}
//               onChange={handleChange}
//               readOnly={location.state?.email}
//             />
//           </div>
          
//           <div>
//             <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
//             <input
//               id="otp"
//               name="otp"
//               type="text"
//               placeholder="Enter the code sent to your email"
//               className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//               value={form.otp}
//               onChange={handleChange}
//             />
//           </div>
          
//           <div>
//             <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
//             <input
//               id="newPassword"
//               name="newPassword"
//               type="password"
//               placeholder="Create a new password"
//               className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//               value={form.newPassword}
//               onChange={handleChange}
//             />
            
//             {form.newPassword && (
//               <div className="mt-2">
//                 <div className="flex items-center gap-2 mb-1">
//                   <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 1 ? getStrengthColor() : 'bg-gray-300'}`}></div>
//                   <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 2 ? getStrengthColor() : 'bg-gray-300'}`}></div>
//                   <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 3 ? getStrengthColor() : 'bg-gray-300'}`}></div>
//                   <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 4 ? getStrengthColor() : 'bg-gray-300'}`}></div>
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   Password should be at least 8 characters with uppercase, numbers and symbols
//                 </p>
//               </div>
//             )}
//           </div>
          
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//             <input
//               id="confirmPassword"
//               name="confirmPassword"
//               type="password"
//               placeholder="Confirm your new password"
//               className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//               value={form.confirmPassword}
//               onChange={handleChange}
//             />
            
//             {form.newPassword && form.confirmPassword && (
//               <p className="text-xs mt-1" style={{ color: form.newPassword === form.confirmPassword ? '#10B981' : '#EF4444' }}>
//                 {form.newPassword === form.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
//               </p>
//             )}
//           </div>
//         </div>
        
//         <button 
//           onClick={handleReset} 
//           disabled={loading}
//           className="w-full py-3 px-4 rounded-md font-medium text-white transition-colors duration-300 mt-6 bg-blue-950 hover:bg-blue-800"
//         >
//           {loading ? 'Resetting Password...' : 'Reset Password'}
//         </button>
        
//         {message && (
//           <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-md">
//             <p className="text-green-700 text-sm">{message}</p>
//           </div>
//         )}
        
//         {error && (
//           <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
//             <p className="text-red-700 text-sm">{error}</p>
//           </div>
//         )}
        
//         <div className="mt-6 text-center">
//           <Link to="/login" className="text-sm font-medium text-blue-950 hover:text-blue-700">
//             Back to Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';   

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ 
    email: location.state?.email || '', 
    otp: '', 
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (form.newPassword) {
      let strength = 0;
      if (form.newPassword.length >= 8) strength += 1;
      if (/[A-Z]/.test(form.newPassword)) strength += 1;
      if (/[0-9]/.test(form.newPassword)) strength += 1;
      if (/[^A-Za-z0-9]/.test(form.newPassword)) strength += 1;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [form.newPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = async () => {
    if (!form.email || !form.otp || !form.newPassword) {
      setError('All fields are required');
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setError('Please create a stronger password');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {  //chnge this to your API URL for production or testing in your .env file
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          otp: form.otp,
          newPassword: form.newPassword
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }
      
      setMessage(data.message || 'Password reset successfully');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Failed to reset password');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-300';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex items-center justify-center bg-slate-100 min-h-screen pt-16 pb-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-sky-600">Reset Password</h2>
          <p className="text-gray-600 mt-2">Enter the verification code and create a new password</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
              value={form.email}
              onChange={handleChange}
              readOnly={location.state?.email}
            />
          </div>
          
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
            <input
              id="otp"
              name="otp"
              type="text"
              placeholder="Enter the code sent to your email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
              value={form.otp}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Create a new password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
              value={form.newPassword}
              onChange={handleChange}
            />
            
            {form.newPassword && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 1 ? getStrengthColor() : 'bg-gray-300'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 2 ? getStrengthColor() : 'bg-gray-300'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 3 ? getStrengthColor() : 'bg-gray-300'}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 4 ? getStrengthColor() : 'bg-gray-300'}`}></div>
                </div>
                <p className="text-xs text-gray-500">
                  Password should be at least 8 characters with uppercase, numbers and symbols
                </p>
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            
            {form.newPassword && form.confirmPassword && (
              <p className="text-xs mt-1" style={{ color: form.newPassword === form.confirmPassword ? '#10B981' : '#EF4444' }}>
                {form.newPassword === form.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
              </p>
            )}
          </div>
        </div>
        
        <button 
          onClick={handleReset} 
          disabled={loading}
          className="w-full py-3 px-4 rounded-md font-medium text-white transition-colors duration-300 mt-6 bg-sky-600 hover:bg-sky-700"
        >
          {loading ? 'Resetting Password...' : 'Reset Password'}
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
          <Link to="/login" className="text-sm font-medium text-sky-600 hover:text-sky-700">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;