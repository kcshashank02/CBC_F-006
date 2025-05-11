import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Clock } from 'lucide-react';
import axios from 'axios';

// Define the API base URL
const API_URL = `${import.meta.env.VITE_API_URL}/api` || 'http://localhost:6585';
 // adjust to your actual API URL

export default function TherapistChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [therapist, setTherapist] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  
  // In a real app, you would get this from authentication
  const userId = 'user-123';
  const userName = 'John Doe';

  // Fetch therapist details
  useEffect(() => {
    const fetchTherapistDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/therapists/${id}`);
        if (response.data.success) {
          setTherapist(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch therapist details');
        }
      } catch (error) {
        console.error('Error fetching therapist details:', error);
        setError('Unable to load therapist information');
      } finally {
        setLoading(false);
      }
    };

    fetchTherapistDetails();
    
    // In a real app, you would fetch previous messages history
    // For now, we'll add a welcome message
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'therapist',
        content: "Welcome! How can I help you today?",
        timestamp: new Date().toISOString()
      }
    ]);
  }, [id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    setSending(true);
    
    // Add user message to the UI immediately for better UX
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: message,
      timestamp: new Date().toISOString(),
      pending: true // Flag to indicate it's being sent
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const tempMessage = message;
    setMessage('');
    
    try {
      const response = await axios.post(`${API_URL}/therapists/${id}/message`, {
        userId,
        message: tempMessage
      });
      
      if (response.data.success) {
        // Update the message to show it was sent successfully
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === userMessage.id ? { ...msg, pending: false } : msg
          )
        );
        
        // In a real app with WebSockets, the therapist's response would come asynchronously
        // For this demo, we'll simulate a response after a short delay
        setTimeout(() => {
          const therapistResponse = {
            id: `therapist-${Date.now()}`,
            sender: 'therapist',
            content: "Thank you for your message. I've received it and will respond as soon as possible.",
            timestamp: new Date().toISOString()
          };
          
          setMessages(prevMessages => [...prevMessages, therapistResponse]);
        }, 1500);
      } else {
        throw new Error(response.data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Remove the pending message and show error
      setMessages(prevMessages => 
        prevMessages.filter(msg => msg.id !== userMessage.id)
      );
      
      setError('Failed to send message. Please try again.');
      
      // Restore the message in the input
      setMessage(tempMessage);
    } finally {
      setSending(false);
    }
  };

  // Back to therapist list
  const handleBack = () => {
    navigate('/dashboard');
  };

  // Format timestamps for display
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-sky-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex items-center">
          <button 
            className="text-sky-800 hover:text-sky-600 mr-4"
            onClick={handleBack}
          >
            <ArrowLeft size={24} />
          </button>
          
          {loading ? (
            <div className="flex-1 h-10 animate-pulse bg-gray-200 rounded"></div>
          ) : therapist ? (
            <div className="flex items-center">
              <img 
                src={therapist.imageUrl || '/api/placeholder/400/400'} 
                alt={therapist.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <h2 className="font-bold text-sky-800">{therapist.name}</h2>
                <p className="text-sm text-gray-600">{therapist.specialty}</p>
              </div>
            </div>
          ) : (
            <div className="text-red-500">Therapist not found</div>
          )}
        </div>
      </div>
      
      {/* Chat area */}
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 self-center">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 pb-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md px-4 py-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-sky-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none'
                  } ${msg.pending ? 'opacity-70' : ''}`}
                >
                  <div className="text-sm">{msg.content}</div>
                  <div className="mt-1 flex items-center justify-end">
                    <span className={`text-xs ${msg.sender === 'user' ? 'text-sky-200' : 'text-gray-500'}`}>
                      {formatTime(msg.timestamp)}
                    </span>
                    {msg.pending && (
                      <Clock className={`ml-1 ${msg.sender === 'user' ? 'text-sky-200' : 'text-gray-500'}`} size={12} />
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Message input */}
        <div className="bg-white rounded-xl shadow-md p-3 max-w-3xl mx-auto w-full">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-2 border-none focus:ring-0 focus:outline-none"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={sending || !message.trim()}
              className={`ml-2 bg-sky-600 hover:bg-sky-700 text-white p-2 rounded-full ${
                (sending || !message.trim()) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}