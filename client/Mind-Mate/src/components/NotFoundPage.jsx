import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const messages = [
    "This page might be taking a break — just like we all need sometimes.",
    "The support you’re looking for isn’t here... but we’re here to help you find it.",
    "Looks like this part of the site is off on a mindfulness retreat.",
    "This page doesn’t exist, but your journey to wellness continues.",
    "You’ve reached a quiet corner of our platform — let’s guide you back."
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  const suggestedLinks = [
    { name: "Home", path: "/" },
    { name: "Chat with Companion", path: "/chatbot" },
    { name: "Mental Health Articles", path: "/" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-md p-8">
        <div className="text-center">
          {/* Calm icon */}
          <div className="mb-6 text-6xl inline-block text-sky-400">
            🌿
          </div>

          <h1 className="text-6xl font-bold text-sky-400 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-6">{randomMessage}</p>

          <div className="mb-8 p-4 bg-sky-50 rounded-lg">
            <p className="text-gray-700">
              Here are some places that might support your journey:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {suggestedLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-sm hover:bg-sky-200 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-sky-400 text-white font-medium rounded-lg hover:bg-sky-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
            >
              Return Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Go Back
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            Still need support? <Link to="/support" className="text-sky-500 hover:underline">Reach out to us</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
