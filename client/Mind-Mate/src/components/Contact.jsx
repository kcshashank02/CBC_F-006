import React, { useState, useEffect } from 'react';
import useWeb3Forms from "@web3forms/react";
import { Mail, MapPin, Phone, Heart } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [fieldsVisible, setFieldsVisible] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => setFormVisible(true), 300);
    const timeout2 = setTimeout(() => setFieldsVisible(true), 800);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  const apiKey = import.meta.env.VITE_WEB3FORMS_API_KEY;
 
  const { submit } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: "Mind-Mate",
      subject: "New Contact Message from Mind-Mate",
    },
    onSuccess: () => {
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
      setSubmitting(false);
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    },
    onError: (msg) => {
      console.error('Form submission error:', msg);
      setSubmitting(false);
      alert("There was a problem submitting your form. Please try again.");
    },
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
   
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleSubjectChange = (subject) => {
    setFormData(prevData => ({ ...prevData, subject }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      
      const errorFields = document.querySelectorAll('.border-red-500');
      errorFields.forEach(field => {
        field.classList.add('shake-animation');
        setTimeout(() => field.classList.remove('shake-animation'), 500);
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      await submit({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitting(false);
      alert("There was a problem submitting your form. Please try again.");
    }
  };

  const subjectOptions = ['General Inquiry', 'Product Inquiry', 'Feedback', 'Other'];

  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 bg-sky-50">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }
        
        .slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        .pulse-animation {
          animation: pulse 0.5s ease-in-out;
        }
        
        .shake-animation {
          animation: shake 0.5s ease-in-out;
        }
        
        .staggered-item {
          opacity: 0;
          transform: translateY(10px);
        }
        
        .staggered-visible {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>

      {/* Section Title */}
      <div className="text-center mb-12 fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-sky-700">Contact Us</h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Any question or remarks? Just write us a message!
        </p>
      </div>

      {/* Contact Card */}
      <div 
        className={`max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row ${formVisible ? 'fade-in' : 'opacity-0'}`}
        style={{ transition: 'all 0.5s ease-out' }}
      >
       
        <div className="bg-sky-600 text-white p-8 sm:p-10 md:w-1/2 flex flex-col justify-between slide-in relative overflow-hidden">
          
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="text-white" size={24} />
              <h3 className="text-xl font-semibold">Mind-Mate</h3>
            </div>
            <p className="text-sm mb-8 text-sky-100">
              We're here to help with your questions!
            </p>

            <div className="space-y-6 text-sm">
              <div className={`flex items-center space-x-3 staggered-item ${fieldsVisible ? 'staggered-visible' : ''}`} style={{ animationDelay: '0.1s' }}>
                <Phone size={18} />
                <span>+91 7892125239</span>
              </div>
              <div className={`flex items-center space-x-3 staggered-item ${fieldsVisible ? 'staggered-visible' : ''}`} style={{ animationDelay: '0.2s' }}>
                <Mail size={18} />
                <span>infomindmatecompanion@gmail.com</span>
              </div>
              <div className={`flex items-start space-x-3 staggered-item ${fieldsVisible ? 'staggered-visible' : ''}`} style={{ animationDelay: '0.3s' }}>
                <MapPin size={18} className="mt-1" />
                <span>
                Bangalore, India
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className={`flex space-x-4 mt-8 staggered-item relative z-10 ${fieldsVisible ? 'staggered-visible' : ''}`} style={{ animationDelay: '0.4s' }}>
            {[
              { name: 'twitter', url: 'https://twitter.com/mindmate' },
              { name: 'instagram', url: 'https://www.instagram.com/mindmate/' },
              { name: 'linkedin', url: 'https://www.linkedin.com/company/mindmate/' },
            ].map((icon, i) => (
              <a
                key={i}
                href={icon.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-sky-600 hover:opacity-80 transition-all duration-300 hover:scale-110"
                aria-label={`Visit our ${icon.name} page`}
              >
                <i className={`fab fa-${icon.name}`} />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form Panel */}
        <form className="p-8 sm:p-10 md:w-1/2 slide-in" onSubmit={handleSubmit} style={{ animationDelay: '0.3s' }}>
          {/* Success Message */}
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md pulse-animation">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}
          
          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  
            <div className={`staggered-item ${fieldsVisible ? 'staggered-visible' : ''}`} style={{ animationDelay: '0.5s' }}>
              <label className="block text-sm font-medium text-gray-800">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full border-b ${errors.firstName ? 'border-red-500' : 'border-gray-300'} py-2 bg-transparent focus:outline-none focus:border-sky-600 transition-all duration-300`}
                required
              />
              {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
            </div>
            

            <div className={`staggered-item ${fieldsVisible ? 'staggered-visible' : ''}`} style={{ animationDelay: '0.6s' }}>
              <label className="block text-sm font-medium text-gray-800">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-sky-600 transition-all duration-300"
              />
            </div>
 
            <div className={`staggered-item ${fieldsVisible ? 'staggered-visible' : ''}`} style={{ animationDelay: '0.7s' }}>
              <label className="block text-sm font-medium text-gray-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} py-2 bg-transparent focus:outline-none focus:border-sky-600 transition-all duration-300`}
                placeholder="abc@gmail.com"
                required
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className={`staggered-item ${fieldsVisible ? 'staggered-visible' : ''}`} style={{ animationDelay: '0.8s' }}>
              <label className="block text-sm font-medium text-gray-800">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border-b ${errors.phone ? 'border-red-500' : 'border-gray-300'} py-2 bg-transparent focus:outline-none focus:border-sky-600 transition-all duration-300`}
                required
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
          </div>

          <div className={`mt-6 staggered-item ${fieldsVisible ? 'staggered-visible' : ''}`} style={{ animationDelay: '0.9s' }}>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Select Subject?
            </label>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {subjectOptions.map((subject, idx) => (
                <label 
                  key={idx} 
                  className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-200"
                >
                  <input 
                    type="radio" 
                    name="subject"
                    checked={formData.subject === subject}
                    onChange={() => handleSubjectChange(subject)}
                    className="accent-sky-600" 
                  />
                  <span>{subject}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={`mt-6 staggered-item ${fieldsVisible ? 'staggered-visible' : ''}`} style={{ animationDelay: '1s' }}>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full border-b ${errors.message ? 'border-red-500' : 'border-gray-300'} py-2 bg-transparent focus:outline-none focus:border-sky-600 transition-all duration-300`}
              rows="4"
              placeholder="Write your message..."
              required
            ></textarea>
            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
          </div>

          <div
            className={`mt-8 staggered-item ${fieldsVisible ? 'staggered-visible' : ''}`}
            style={{ animationDelay: '1.1s' }}
          >
            <button
              type="submit"
              disabled={submitting}
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-full transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;