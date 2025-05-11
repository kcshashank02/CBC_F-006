import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-sky-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">About Mind-Mate</h1>
          <p className="text-xl text-sky-800 max-w-3xl mx-auto">
            Your trusted companion on the journey to better mental health
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-sky-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              At Mind-Mate, we believe everyone deserves access to mental health support whenever they need it. 
              Our mission is to break down barriers to mental healthcare by providing an accessible, 
              confidential, and supportive AI companion available 24/7.
            </p>
            <p className="text-lg text-gray-700">
              We aim to complement traditional therapy by offering continuous support between 
              sessions and providing a judgment-free space for reflection and growth.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-sky-900 mb-8 text-center">How Mind-Mate Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-sky-800 mb-3 text-center">Chat Anytime</h3>
              <p className="text-gray-600">
                Connect with Mind-Mate whenever you need someone to talk to. Our AI is available 24/7, providing immediate support during difficult moments.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-sky-800 mb-3 text-center">Private & Secure</h3>
              <p className="text-gray-600">
                Your conversations are completely private. We prioritize your confidentiality with state-of-the-art encryption and strict privacy controls.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="bg-sky-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-sky-800 mb-3 text-center">Personalized Support</h3>
              <p className="text-gray-600">
                Mind-Mate learns from your interactions to provide more personalized support over time, adapting to your unique needs and concerns.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-sky-900 mb-8 text-center">Our Team</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 mb-6">
              Mind-Mate was created by a dedicated team of mental health professionals, AI researchers, and 
              developers passionate about increasing access to mental health support.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our diverse team brings together expertise in clinical psychology, machine learning, and user 
              experience design to create a compassionate and effective mental health companion.
            </p>
            <p className="text-lg text-gray-700">
              We work closely with licensed therapists and mental health organizations to ensure 
              our approach aligns with best practices in mental healthcare.
            </p>
          </div>
        </section>

        {/* Important Note */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="bg-sky-100 border-l-4 border-sky-600 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-sky-900 mb-3">Important Note</h3>
            <p className="text-gray-700 mb-4">
              While Mind-Mate provides support and guidance, it is not a substitute for professional mental health care. 
              If you're experiencing a crisis or need immediate help, please contact emergency services or a mental health crisis hotline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/resources" className="bg-sky-600 text-white py-2 px-6 rounded-md hover:bg-sky-700 transition-colors inline-block text-center">
                Crisis Resources
              </Link>
              <Link to="/find-therapist" className="bg-white text-sky-600 border border-sky-600 py-2 px-6 rounded-md hover:bg-sky-50 transition-colors inline-block text-center">
                Find a Therapist
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-sky-900 mb-8 text-center">Contact Us</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 mb-6 text-center">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="mailto:support@mind-mate.com" className="flex items-center justify-center bg-sky-600 text-white py-3 px-6 rounded-md hover:bg-sky-700 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Email Support
              </a>
              <Link to="/faq" className="flex items-center justify-center bg-white text-sky-600 border border-sky-600 py-3 px-6 rounded-md hover:bg-sky-50 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                FAQ
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;