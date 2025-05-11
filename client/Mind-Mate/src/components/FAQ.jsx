import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  // FAQ data with questions and answers
  const faqData = [
    {
      question: "What is Mind-Mate?",
      answer: "Mind-Mate is an AI-powered mental health chatbot designed to provide emotional support, guidance, and resources for people facing mental health challenges. It offers a safe space to express your thoughts and feelings while providing personalized support 24/7."
    },
    {
      question: "Is Mind-Mate a replacement for therapy?",
      answer: "No, Mind-Mate is not a replacement for professional mental health care. While we provide support and resources, we recommend using Mind-Mate as a complement to professional therapy. If you're experiencing a mental health crisis, please contact emergency services or a crisis hotline immediately."
    },
    {
      question: "How does Mind-Mate protect my privacy?",
      answer: "We take your privacy seriously. All conversations with Mind-Mate are encrypted and confidential. We do not share your personal information with third parties. You can also delete your conversation history at any time. For more details, please review our Privacy Policy."
    },
    {
      question: "Can I use Mind-Mate for free?",
      answer: "Mind-Mate offers both free and premium tiers. The free version provides basic support features and resources. Our premium subscription unlocks additional features such as extended conversations, specialized guidance modules, and priority support."
    },
    {
      question: "How accurate is Mind-Mate's advice?",
      answer: "Mind-Mate is built on evidence-based mental health approaches and regularly reviewed by clinical professionals. However, as an AI tool, it has limitations. We continuously improve our system based on the latest research and feedback from mental health experts to provide the most accurate support possible."
    },
    {
      question: "Can Mind-Mate diagnose mental health conditions?",
      answer: "No, Mind-Mate cannot diagnose mental health conditions. Only licensed healthcare professionals can provide diagnoses. Mind-Mate can help you explore your feelings, provide coping strategies, and direct you to appropriate resources, but any concerns about specific conditions should be discussed with a healthcare provider."
    },
    {
      question: "Is Mind-Mate available in languages other than English?",
      answer: "Currently, Mind-Mate is primarily available in English, but we're actively working on expanding our language support. We plan to introduce additional languages in the near future to make our services accessible to more people worldwide."
    },
    {
      question: "How does Mind-Mate learn from our conversations?",
      answer: "Mind-Mate uses machine learning to better understand context and provide more personalized responses over time. It learns patterns in your conversations to offer more relevant support, while maintaining strict privacy protections. You can reset this personalization at any time through your account settings."
    },
    {
      question: "What should I do in a mental health emergency?",
      answer: "If you're experiencing thoughts of harming yourself or others, please contact emergency services immediately by calling 911 (US) or your local emergency number. You can also text HOME to 741741 to reach the Crisis Text Line, or call the National Suicide Prevention Lifeline at 1-800-273-8255. Mind-Mate is not equipped to handle emergency situations."
    },
    {
      question: "How can I provide feedback about Mind-Mate?",
      answer: "We value your feedback! You can provide feedback directly within the chat interface using the feedback button after each conversation. For more detailed feedback or suggestions, please contact our support team at support@mind-mate.com."
    }
  ];

  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState({});

  // Toggle the expanded state of an FAQ item
  const toggleItem = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-sky-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-sky-800 max-w-3xl mx-auto">
            Find answers to common questions about Mind-Mate and our services
          </p>
        </section>

        {/* FAQ Accordion */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {faqData.map((item, index) => (
              <div key={index} className="border-b border-sky-100 last:border-b-0">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-sky-50 transition-colors focus:outline-none"
                  onClick={() => toggleItem(index)}
                >
                  <span className="text-lg font-medium text-sky-900">{item.question}</span>
                  <svg 
                    className={`w-5 h-5 text-sky-600 transform transition-transform ${expandedItems[index] ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div 
                  className={`px-6 pb-4 transition-all duration-300 ${expandedItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                >
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="bg-sky-100 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-sky-900 mb-4">Still Have Questions?</h2>
            <p className="text-lg text-gray-700 mb-6">
              We're here to help! Reach out to our support team for assistance with any other questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:support@mind-mate.com" className="bg-sky-600 text-white py-3 px-6 rounded-md hover:bg-sky-700 transition-colors inline-flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Contact Support
              </a>
              <Link to="/about" className="bg-white text-sky-600 border border-sky-600 py-3 px-6 rounded-md hover:bg-sky-50 transition-colors inline-flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                About Mind-Mate
              </Link>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6 text-center">Mental Health Resources</h2>
            <p className="text-gray-700 mb-6 text-center">
              In addition to Mind-Mate, these resources can provide valuable support for your mental health journey:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/resources" className="bg-sky-50 hover:bg-sky-100 p-4 rounded-lg border border-sky-200 flex items-center transition-colors">
                <div className="bg-sky-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <span className="text-sky-900 font-medium">Articles & Self-Help Guides</span>
              </Link>
              <Link to="/find-therapist" className="bg-sky-50 hover:bg-sky-100 p-4 rounded-lg border border-sky-200 flex items-center transition-colors">
                <div className="bg-sky-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <span className="text-sky-900 font-medium">Find a Therapist</span>
              </Link>
              <Link to="/crisis" className="bg-sky-50 hover:bg-sky-100 p-4 rounded-lg border border-sky-200 flex items-center transition-colors">
                <div className="bg-sky-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                  </svg>
                </div>
                <span className="text-sky-900 font-medium">Crisis Resources</span>
              </Link>
              <Link to="/community" className="bg-sky-50 hover:bg-sky-100 p-4 rounded-lg border border-sky-200 flex items-center transition-colors">
                <div className="bg-sky-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <span className="text-sky-900 font-medium">Support Communities</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FAQ;