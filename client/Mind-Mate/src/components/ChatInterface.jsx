// // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // import axios from 'axios';

// // // // // // // const ChatInterface = () => {
// // // // // // //   const [messages, setMessages] = useState([]);
// // // // // // //   const [input, setInput] = useState('');
// // // // // // //   const [userId, setUserId] = useState('');
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [emotionalInsight, setEmotionalInsight] = useState(null);
// // // // // // //   const messagesEndRef = useRef(null);
  
// // // // // // //   // Speech recognition states
// // // // // // //   const [isListening, setIsListening] = useState(false);
// // // // // // //   const [speechRecognition, setSpeechRecognition] = useState(null);
// // // // // // //   const [speechSupported, setSpeechSupported] = useState(false);

// // // // // // //   // Emotion colors for visual cues
// // // // // // //   const emotionColors = {
// // // // // // //     anxiety: 'bg-blue-100 border-blue-300',
// // // // // // //     sadness: 'bg-indigo-100 border-indigo-300',
// // // // // // //     anger: 'bg-red-100 border-red-300',
// // // // // // //     joy: 'bg-yellow-100 border-yellow-300',
// // // // // // //     overwhelm: 'bg-purple-100 border-purple-300',
// // // // // // //     loneliness: 'bg-gray-100 border-gray-300',
// // // // // // //     hope: 'bg-green-100 border-green-300',
// // // // // // //     neutral: 'bg-white border-gray-200'
// // // // // // //   };

// // // // // // //   // Initialize speech recognition
// // // // // // //   useEffect(() => {
// // // // // // //     // Check if browser supports speech recognition
// // // // // // //     if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
// // // // // // //       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// // // // // // //       const recognition = new SpeechRecognition();
      
// // // // // // //       recognition.continuous = false;
// // // // // // //       recognition.interimResults = true;
// // // // // // //       recognition.lang = 'en-US';
      
// // // // // // //       recognition.onresult = (event) => {
// // // // // // //         const transcript = Array.from(event.results)
// // // // // // //           .map(result => result[0])
// // // // // // //           .map(result => result.transcript)
// // // // // // //           .join('');
          
// // // // // // //         setInput(transcript);
// // // // // // //       };
      
// // // // // // //       recognition.onend = () => {
// // // // // // //         setIsListening(false);
// // // // // // //       };
      
// // // // // // //       recognition.onerror = (event) => {
// // // // // // //         console.error('Speech recognition error', event.error);
// // // // // // //         setIsListening(false);
// // // // // // //       };
      
// // // // // // //       setSpeechRecognition(recognition);
// // // // // // //       setSpeechSupported(true);
// // // // // // //     } else {
// // // // // // //       console.log('Speech recognition not supported');
// // // // // // //       setSpeechSupported(false);
// // // // // // //     }
// // // // // // //   }, []);

// // // // // // //   // Handle toggling speech recognition
// // // // // // //   const toggleListening = () => {
// // // // // // //     if (isListening) {
// // // // // // //       speechRecognition.stop();
// // // // // // //       setIsListening(false);
// // // // // // //     } else {
// // // // // // //       setInput('');
// // // // // // //       speechRecognition.start();
// // // // // // //       setIsListening(true);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Load chat history when userId changes
// // // // // // //   useEffect(() => {
// // // // // // //     if (userId) {
// // // // // // //       fetchChatHistory();
// // // // // // //     }
// // // // // // //   }, [userId]);

// // // // // // //   // Auto-scroll to bottom of messages
// // // // // // //   useEffect(() => {
// // // // // // //     scrollToBottom();
// // // // // // //   }, [messages]);

// // // // // // //   const scrollToBottom = () => {
// // // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // // //   };

// // // // // // //   const fetchChatHistory = async () => {
// // // // // // //     try {
// // // // // // //       setLoading(true);
// // // // // // //       const response = await axios.get(`/api/chatbot/history?userId=${userId}`);
// // // // // // //       if (response.data.success) {
// // // // // // //         const chatHistory = response.data.data.map(chat => ({
// // // // // // //           id: chat._id,
// // // // // // //           user: chat.userInput,
// // // // // // //           bot: chat.botResponse,
// // // // // // //           emotion: chat.emotionalData?.detectedEmotion || 'neutral',
// // // // // // //           copingStrategy: chat.emotionalData?.copingStrategy || null,
// // // // // // //           timestamp: new Date(chat.timestamp)
// // // // // // //         }));
// // // // // // //         setMessages(chatHistory);
        
// // // // // // //         // Set emotional insight if available
// // // // // // //         if (response.data.emotionalInsight) {
// // // // // // //           setEmotionalInsight(response.data.emotionalInsight);
// // // // // // //         }
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error fetching chat history:', error);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSendMessage = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     if (!input.trim()) return;

// // // // // // //     // Stop listening if active
// // // // // // //     if (isListening && speechRecognition) {
// // // // // // //       speechRecognition.stop();
// // // // // // //       setIsListening(false);
// // // // // // //     }

// // // // // // //     // Add user message immediately for better UX
// // // // // // //     const userMessage = {
// // // // // // //       id: Date.now(),
// // // // // // //       user: input,
// // // // // // //       bot: null,
// // // // // // //       emotion: 'neutral',
// // // // // // //       timestamp: new Date()
// // // // // // //     };
    
// // // // // // //     setMessages(prev => [...prev, userMessage]);
// // // // // // //     setInput('');
// // // // // // //     setLoading(true);

// // // // // // //     try {
// // // // // // //       // Use the main handleChat endpoint
// // // // // // //       const response = await axios.post('http://localhost:6585/api/chatbot/analyze', {
// // // // // // //         userInput: input,
// // // // // // //         userId: userId || null
// // // // // // //       });

// // // // // // //       if (response.data.success) {
// // // // // // //         const { botResponse, emotionalData } = response.data.data;
        
// // // // // // //         // Update the message with the bot response
// // // // // // //         setMessages(prev => 
// // // // // // //           prev.map(msg => 
// // // // // // //             msg.id === userMessage.id 
// // // // // // //               ? { 
// // // // // // //                   ...msg, 
// // // // // // //                   bot: botResponse, 
// // // // // // //                   emotion: emotionalData?.detectedEmotion || 'neutral',
// // // // // // //                   copingStrategy: emotionalData?.copingStrategy || null
// // // // // // //                 } 
// // // // // // //               : msg
// // // // // // //           )
// // // // // // //         );
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error sending message:', error);
// // // // // // //       // Update with error message
// // // // // // //       setMessages(prev => 
// // // // // // //         prev.map(msg => 
// // // // // // //           msg.id === userMessage.id 
// // // // // // //             ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
// // // // // // //             : msg
// // // // // // //         )
// // // // // // //       );
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleQuickResponse = async () => {
// // // // // // //     if (!input.trim()) return;
    
// // // // // // //     // Stop listening if active
// // // // // // //     if (isListening && speechRecognition) {
// // // // // // //       speechRecognition.stop();
// // // // // // //       setIsListening(false);
// // // // // // //     }
    
// // // // // // //     const userMessage = {
// // // // // // //       id: Date.now(),
// // // // // // //       user: input,
// // // // // // //       bot: null,
// // // // // // //       emotion: 'neutral',
// // // // // // //       timestamp: new Date()
// // // // // // //     };
    
// // // // // // //     setMessages(prev => [...prev, userMessage]);
// // // // // // //     setInput('');
// // // // // // //     setLoading(true);

// // // // // // //     try {
// // // // // // //       // Use the quick response endpoint that doesn't store in DB
// // // // // // //       const response = await axios.post('http://localhost:6585/api/chatbot/quick-response', {
// // // // // // //         userInput: input
// // // // // // //       });

// // // // // // //       if (response.data.success) {
// // // // // // //         // Update the message with the bot response
// // // // // // //         setMessages(prev => 
// // // // // // //           prev.map(msg => 
// // // // // // //             msg.id === userMessage.id 
// // // // // // //               ? { ...msg, bot: response.data.data.response } 
// // // // // // //               : msg
// // // // // // //           )
// // // // // // //         );
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error getting quick response:', error);
// // // // // // //       setMessages(prev => 
// // // // // // //         prev.map(msg => 
// // // // // // //           msg.id === userMessage.id 
// // // // // // //             ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
// // // // // // //             : msg
// // // // // // //         )
// // // // // // //       );
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const analyzeEmotionOnly = async () => {
// // // // // // //     if (!input.trim()) return;
    
// // // // // // //     // Stop listening if active
// // // // // // //     if (isListening && speechRecognition) {
// // // // // // //       speechRecognition.stop();
// // // // // // //       setIsListening(false);
// // // // // // //     }
    
// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       const response = await axios.post('http://localhost:6585/api/chatbot/emotion', {
// // // // // // //         userInput: input
// // // // // // //       });

// // // // // // //       if (response.data.success) {
// // // // // // //         alert(`Detected emotion: ${response.data.data.emotionalState.emotion} (${response.data.data.emotionalState.intensity})`);
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error analyzing emotion:', error);
// // // // // // //       alert('Failed to analyze emotion. Please try again.');
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const formatDate = (date) => {
// // // // // // //     return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="flex flex-col h-screen bg-blue-50">
// // // // // // //       {/* Header */}
// // // // // // //       <header className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 shadow-md">
// // // // // // //         <div className="container mx-auto flex justify-between items-center">
// // // // // // //           <h1 className="text-2xl font-bold">Mental Health Chat Assistant</h1>
// // // // // // //           <div className="flex items-center">
// // // // // // //             <input
// // // // // // //               type="text"
// // // // // // //               placeholder="Enter User ID (optional)"
// // // // // // //               value={userId}
// // // // // // //               onChange={(e) => setUserId(e.target.value)}
// // // // // // //               className="mr-2 px-3 py-1 rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
// // // // // // //             />
// // // // // // //             <button 
// // // // // // //               onClick={fetchChatHistory}
// // // // // // //               disabled={!userId}
// // // // // // //               className="bg-white text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-50 disabled:opacity-50"
// // // // // // //             >
// // // // // // //               Load History
// // // // // // //             </button>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </header>

// // // // // // //       <div className="flex flex-1 overflow-hidden p-4 md:p-8 bg-blue-50">
// // // // // // //         {/* Centered Chat Container */}
// // // // // // //         <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
// // // // // // //           {/* Messages */}
// // // // // // //           <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-blue-50 to-white">
// // // // // // //             {messages.length === 0 ? (
// // // // // // //               <div className="flex items-center justify-center h-full text-gray-500">
// // // // // // //                 <div className="text-center p-8 bg-blue-50 bg-opacity-50 rounded-xl border border-blue-100">
// // // // // // //                   <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
// // // // // // //                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
// // // // // // //                       <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
// // // // // // //                     </svg>
// // // // // // //                   </div>
// // // // // // //                   <h3 className="font-medium text-lg text-blue-600 mb-2">Start a conversation</h3>
// // // // // // //                   <p className="mb-2 text-gray-600">How are you feeling today? I'm here to listen and support you.</p>
// // // // // // //                   {speechSupported && (
// // // // // // //                     <p className="text-sm mt-2 text-blue-500">
// // // // // // //                       <span className="inline-flex items-center">
// // // // // // //                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
// // // // // // //                           <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
// // // // // // //                         </svg>
// // // // // // //                         You can use the microphone to speak
// // // // // // //                       </span>
// // // // // // //                     </p>
// // // // // // //                   )}
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             ) : (
// // // // // // //               messages.map((msg, index) => (
// // // // // // //                 <div key={msg.id || index} className="mb-4">
// // // // // // //                   {/* User message */}
// // // // // // //                   <div className="flex justify-end mb-2">
// // // // // // //                     <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none py-2 px-4 max-w-md shadow-sm">
// // // // // // //                       <p>{msg.user}</p>
// // // // // // //                       <p className="text-xs text-blue-100 mt-1">{formatDate(msg.timestamp)}</p>
// // // // // // //                     </div>
// // // // // // //                   </div>
                  
// // // // // // //                   {/* Bot response */}
// // // // // // //                   {msg.bot ? (
// // // // // // //                     <div className="flex justify-start">
// // // // // // //                       <div className={`rounded-2xl rounded-tl-none py-2 px-4 border max-w-md shadow-sm ${emotionColors[msg.emotion]}`}>
// // // // // // //                         <p>{msg.bot}</p>
// // // // // // //                         {msg.copingStrategy && (
// // // // // // //                           <div className="mt-2 p-2 bg-white bg-opacity-70 rounded-md">
// // // // // // //                             <p className="text-sm font-medium text-blue-700">Coping Strategy:</p>
// // // // // // //                             <p className="text-sm">{msg.copingStrategy}</p>
// // // // // // //                           </div>
// // // // // // //                         )}
// // // // // // //                         <div className="flex justify-between items-center mt-1">
// // // // // // //                           <span className="text-xs text-gray-500">{formatDate(msg.timestamp)}</span>
// // // // // // //                           {msg.emotion !== 'neutral' && (
// // // // // // //                             <span className="text-xs px-2 py-0.5 bg-white bg-opacity-70 rounded-full text-blue-700">
// // // // // // //                               {msg.emotion}
// // // // // // //                             </span>
// // // // // // //                           )}
// // // // // // //                         </div>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   ) : loading ? (
// // // // // // //                     <div className="flex justify-start">
// // // // // // //                       <div className="bg-blue-50 rounded-2xl rounded-tl-none py-3 px-4 max-w-md border border-blue-100">
// // // // // // //                         <div className="flex space-x-1">
// // // // // // //                           <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
// // // // // // //                           <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
// // // // // // //                           <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
// // // // // // //                         </div>
// // // // // // //                       </div>
// // // // // // //                     </div>
// // // // // // //                   ) : null}
// // // // // // //                 </div>
// // // // // // //               ))
// // // // // // //             )}
// // // // // // //             <div ref={messagesEndRef} />
// // // // // // //           </div>

// // // // // // //           {/* Input area */}
// // // // // // //           <div className="border-t border-blue-100 p-4 bg-white">
// // // // // // //             <form onSubmit={handleSendMessage} className="flex space-x-2">
// // // // // // //               <input
// // // // // // //                 type="text"
// // // // // // //                 value={input}
// // // // // // //                 onChange={(e) => setInput(e.target.value)}
// // // // // // //                 placeholder="Type your message..."
// // // // // // //                 className="flex-1 border border-blue-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50"
// // // // // // //                 disabled={loading}
// // // // // // //               />
              
// // // // // // //               {/* Voice input button */}
// // // // // // //               {speechSupported && (
// // // // // // //                 <button 
// // // // // // //                   type="button"
// // // // // // //                   onClick={toggleListening}
// // // // // // //                   disabled={loading}
// // // // // // //                   className={`rounded-full p-2 w-12 h-12 flex items-center justify-center ${
// // // // // // //                     isListening 
// // // // // // //                       ? 'bg-red-500 text-white animate-pulse hover:bg-red-600' 
// // // // // // //                       : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
// // // // // // //                   }`}
// // // // // // //                 >
// // // // // // //                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
// // // // // // //                     <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
// // // // // // //                   </svg>
// // // // // // //                 </button>
// // // // // // //               )}
              
// // // // // // //               {/* Send button */}
// // // // // // //               <button
// // // // // // //                 type="submit"
// // // // // // //                 disabled={loading || !input.trim()}
// // // // // // //                 className="bg-blue-500 text-white rounded-full p-2 w-12 h-12 flex items-center justify-center hover:bg-blue-600 disabled:opacity-50 shadow-sm"
// // // // // // //               >
// // // // // // //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
// // // // // // //                   <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
// // // // // // //                 </svg>
// // // // // // //               </button>
// // // // // // //             </form>
            
// // // // // // //             {/* Speech recognition status indicator */}
// // // // // // //             {isListening && (
// // // // // // //               <div className="text-center mt-2 text-sm text-red-500">
// // // // // // //                 <div className="inline-flex items-center">
// // // // // // //                   <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
// // // // // // //                   Listening... Speak now
// // // // // // //                 </div>
// // // // // // //               </div>
// // // // // // //             )}
            
// // // // // // //             <div className="flex justify-center mt-3 space-x-3 text-sm">
// // // // // // //               <button
// // // // // // //                 onClick={handleQuickResponse}
// // // // // // //                 disabled={loading || !input.trim()}
// // // // // // //                 className="text-blue-600 hover:underline disabled:opacity-50 px-2 py-1 rounded hover:bg-blue-50"
// // // // // // //               >
// // // // // // //                 Quick Response (No Save)
// // // // // // //               </button>
// // // // // // //               <span className="text-blue-200">|</span>
// // // // // // //               <button
// // // // // // //                 onClick={analyzeEmotionOnly}
// // // // // // //                 disabled={loading || !input.trim()}
// // // // // // //                 className="text-blue-600 hover:underline disabled:opacity-50 px-2 py-1 rounded hover:bg-blue-50"
// // // // // // //               >
// // // // // // //                 Analyze Emotion Only
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Emotion Insights Sidebar - Made responsive */}
// // // // // // //         {emotionalInsight && (
// // // // // // //           <div className="hidden lg:block w-64 ml-4 flex-shrink-0">
// // // // // // //             <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100">
// // // // // // //               <h3 className="font-semibold text-blue-700 mb-3 flex items-center">
// // // // // // //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
// // // // // // //                   <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
// // // // // // //                   <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
// // // // // // //                 </svg>
// // // // // // //                 Emotional Insights
// // // // // // //               </h3>
// // // // // // //               <div className="bg-blue-50 rounded-lg p-3">
// // // // // // //                 <p className="text-sm mb-2">
// // // // // // //                   <span className="font-medium text-blue-700">Dominant emotion:</span> {emotionalInsight.dominantEmotion}
// // // // // // //                 </p>
// // // // // // //                 <p className="text-sm mb-3">
// // // // // // //                   <span className="font-medium text-blue-700">Emotional state:</span> {emotionalInsight.emotionalState}
// // // // // // //                 </p>
                
// // // // // // //                 <h4 className="text-xs font-medium text-blue-600 mb-2">Emotion Frequency</h4>
// // // // // // //                 {Object.entries(emotionalInsight.emotionFrequency).map(([emotion, count]) => (
// // // // // // //                   <div key={emotion} className="mb-2">
// // // // // // //                     <div className="flex justify-between text-xs mb-1">
// // // // // // //                       <span className="capitalize">{emotion}</span>
// // // // // // //                       <span>{count}</span>
// // // // // // //                     </div>
// // // // // // //                     <div className="w-full bg-blue-100 rounded-full h-2">
// // // // // // //                       <div 
// // // // // // //                         className={`h-2 rounded-full ${emotion === 'joy' || emotion === 'hope' ? 'bg-green-500' : 'bg-blue-500'}`}
// // // // // // //                         style={{ width: `${Math.min(count * 20, 100)}%` }}
// // // // // // //                       ></div>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 ))}
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default ChatInterface;
// // // // // // import { useState, useEffect, useRef } from 'react';
// // // // // // import { Mic, Send, MessageCircle, Sun, Moon } from 'lucide-react';

// // // // // // const ChatInterface = () => {
// // // // // //   const [messages, setMessages] = useState([]);
// // // // // //   const [input, setInput] = useState('');
// // // // // //   const [userId, setUserId] = useState('');
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [emotionalInsight, setEmotionalInsight] = useState(null);
// // // // // //   const messagesEndRef = useRef(null);
  
// // // // // //   // Speech recognition states
// // // // // //   const [isListening, setIsListening] = useState(false);
// // // // // //   const [speechRecognition, setSpeechRecognition] = useState(null);
// // // // // //   const [speechSupported, setSpeechSupported] = useState(false);
  
// // // // // //   // Dark mode state (synced with header)
// // // // // //   const [darkMode, setDarkMode] = useState(false);

// // // // // //   // Emotion colors for visual cues
// // // // // //   const emotionColors = {
// // // // // //     anxiety: darkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-100 border-blue-300',
// // // // // //     sadness: darkMode ? 'bg-indigo-900 border-indigo-700' : 'bg-indigo-100 border-indigo-300',
// // // // // //     anger: darkMode ? 'bg-red-900 border-red-700' : 'bg-red-100 border-red-300',
// // // // // //     joy: darkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-100 border-yellow-300',
// // // // // //     overwhelm: darkMode ? 'bg-purple-900 border-purple-700' : 'bg-purple-100 border-purple-300',
// // // // // //     loneliness: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300',
// // // // // //     hope: darkMode ? 'bg-green-900 border-green-700' : 'bg-green-100 border-green-300',
// // // // // //     neutral: darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
// // // // // //   };

// // // // // //   // Initialize speech recognition
// // // // // //   useEffect(() => {
// // // // // //     // Check if browser supports speech recognition
// // // // // //     if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
// // // // // //       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// // // // // //       const recognition = new SpeechRecognition();
      
// // // // // //       recognition.continuous = false;
// // // // // //       recognition.interimResults = true;
// // // // // //       recognition.lang = 'en-US';
      
// // // // // //       recognition.onresult = (event) => {
// // // // // //         const transcript = Array.from(event.results)
// // // // // //           .map(result => result[0])
// // // // // //           .map(result => result.transcript)
// // // // // //           .join('');
          
// // // // // //         setInput(transcript);
// // // // // //       };
      
// // // // // //       recognition.onend = () => {
// // // // // //         setIsListening(false);
// // // // // //       };
      
// // // // // //       recognition.onerror = (event) => {
// // // // // //         console.error('Speech recognition error', event.error);
// // // // // //         setIsListening(false);
// // // // // //       };
      
// // // // // //       setSpeechRecognition(recognition);
// // // // // //       setSpeechSupported(true);
// // // // // //     } else {
// // // // // //       console.log('Speech recognition not supported');
// // // // // //       setSpeechSupported(false);
// // // // // //     }
// // // // // //   }, []);

// // // // // //   // Handle toggling speech recognition
// // // // // //   const toggleListening = () => {
// // // // // //     if (isListening) {
// // // // // //       speechRecognition.stop();
// // // // // //       setIsListening(false);
// // // // // //     } else {
// // // // // //       setInput('');
// // // // // //       speechRecognition.start();
// // // // // //       setIsListening(true);
// // // // // //     }
// // // // // //   };

// // // // // //   // Load chat history when userId changes
// // // // // //   useEffect(() => {
// // // // // //     if (userId) {
// // // // // //       fetchChatHistory();
// // // // // //     }
// // // // // //   }, [userId]);

// // // // // //   // Auto-scroll to bottom of messages
// // // // // //   useEffect(() => {
// // // // // //     scrollToBottom();
// // // // // //   }, [messages]);

// // // // // //   const scrollToBottom = () => {
// // // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // // //   };

// // // // // //   const fetchChatHistory = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);
// // // // // //       // Mock fetch for demo purposes (would be replaced with actual API call)
// // // // // //       setTimeout(() => {
// // // // // //         // Mock response
// // // // // //         if (userId === 'demo') {
// // // // // //           setMessages([
// // // // // //             {
// // // // // //               id: 1,
// // // // // //               user: "I've been feeling really anxious lately",
// // // // // //               bot: "I'm sorry to hear you've been feeling anxious. That's really challenging. Can you tell me more about what's been triggering these feelings?",
// // // // // //               emotion: "anxiety",
// // // // // //               timestamp: new Date()
// // // // // //             },
// // // // // //             {
// // // // // //               id: 2,
// // // // // //               user: "Work pressure mostly, I think",
// // // // // //               bot: "Work pressure can definitely cause anxiety. It might help to identify specific aspects that feel overwhelming. Would you like to explore some simple coping strategies for workplace anxiety?",
// // // // // //               emotion: "anxiety",
// // // // // //               copingStrategy: "Try taking short breaks throughout your workday for deep breathing exercises - even 2 minutes can help reset your nervous system.",
// // // // // //               timestamp: new Date()
// // // // // //             }
// // // // // //           ]);
          
// // // // // //           setEmotionalInsight({
// // // // // //             dominantEmotion: "Anxiety",
// // // // // //             emotionalState: "Moderately elevated stress levels",
// // // // // //             emotionFrequency: {
// // // // // //               anxiety: 2,
// // // // // //               sadness: 0,
// // // // // //               anger: 0,
// // // // // //               joy: 0,
// // // // // //               hope: 1
// // // // // //             }
// // // // // //           });
// // // // // //         }
// // // // // //         setLoading(false);
// // // // // //       }, 1000);
// // // // // //     } catch (error) {
// // // // // //       console.error('Error fetching chat history:', error);
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSendMessage = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     if (!input.trim()) return;

// // // // // //     // Stop listening if active
// // // // // //     if (isListening && speechRecognition) {
// // // // // //       speechRecognition.stop();
// // // // // //       setIsListening(false);
// // // // // //     }

// // // // // //     // Add user message immediately for better UX
// // // // // //     const userMessage = {
// // // // // //       id: Date.now(),
// // // // // //       user: input,
// // // // // //       bot: null,
// // // // // //       emotion: 'neutral',
// // // // // //       timestamp: new Date()
// // // // // //     };
    
// // // // // //     setMessages(prev => [...prev, userMessage]);
// // // // // //     setInput('');
// // // // // //     setLoading(true);

// // // // // //     try {
// // // // // //       // Mock API call for demo purposes
// // // // // //       setTimeout(() => {
// // // // // //         // Mock response
// // // // // //         const responses = [
// // // // // //           "I understand how challenging that can feel. Would you like to talk more about what's contributing to these feelings?",
// // // // // //           "That sounds difficult. Have you noticed any patterns in when these feelings come up?",
// // // // // //           "I appreciate you sharing that with me. What strategies have you tried so far to manage these feelings?",
// // // // // //           "I'm here to support you. Would it help to explore some coping techniques we could try together?"
// // // // // //         ];
        
// // // // // //         const emotions = ["anxiety", "sadness", "hope", "neutral"];
// // // // // //         const randomResponse = responses[Math.floor(Math.random() * responses.length)];
// // // // // //         const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        
// // // // // //         // Update the message with the bot response
// // // // // //         setMessages(prev => 
// // // // // //           prev.map(msg => 
// // // // // //             msg.id === userMessage.id 
// // // // // //               ? { 
// // // // // //                   ...msg, 
// // // // // //                   bot: randomResponse, 
// // // // // //                   emotion: randomEmotion,
// // // // // //                   copingStrategy: randomEmotion !== 'neutral' ? "Remember to practice self-compassion and acknowledge your feelings without judgment." : null
// // // // // //                 } 
// // // // // //               : msg
// // // // // //           )
// // // // // //         );
// // // // // //         setLoading(false);
// // // // // //       }, 1500);
// // // // // //     } catch (error) {
// // // // // //       console.error('Error sending message:', error);
// // // // // //       // Update with error message
// // // // // //       setMessages(prev => 
// // // // // //         prev.map(msg => 
// // // // // //           msg.id === userMessage.id 
// // // // // //             ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
// // // // // //             : msg
// // // // // //         )
// // // // // //       );
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleQuickResponse = async () => {
// // // // // //     if (!input.trim()) return;
    
// // // // // //     // Stop listening if active
// // // // // //     if (isListening && speechRecognition) {
// // // // // //       speechRecognition.stop();
// // // // // //       setIsListening(false);
// // // // // //     }
    
// // // // // //     const userMessage = {
// // // // // //       id: Date.now(),
// // // // // //       user: input,
// // // // // //       bot: null,
// // // // // //       emotion: 'neutral',
// // // // // //       timestamp: new Date()
// // // // // //     };
    
// // // // // //     setMessages(prev => [...prev, userMessage]);
// // // // // //     setInput('');
// // // // // //     setLoading(true);

// // // // // //     try {
// // // // // //       // Mock quick response
// // // // // //       setTimeout(() => {
// // // // // //         setMessages(prev => 
// // // // // //           prev.map(msg => 
// // // // // //             msg.id === userMessage.id 
// // // // // //               ? { ...msg, bot: "I understand. Can you tell me more about how that's affecting you?" } 
// // // // // //               : msg
// // // // // //           )
// // // // // //         );
// // // // // //         setLoading(false);
// // // // // //       }, 800);
// // // // // //     } catch (error) {
// // // // // //       console.error('Error getting quick response:', error);
// // // // // //       setMessages(prev => 
// // // // // //         prev.map(msg => 
// // // // // //           msg.id === userMessage.id 
// // // // // //             ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
// // // // // //             : msg
// // // // // //         )
// // // // // //       );
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const analyzeEmotionOnly = async () => {
// // // // // //     if (!input.trim()) return;
    
// // // // // //     // Stop listening if active
// // // // // //     if (isListening && speechRecognition) {
// // // // // //       speechRecognition.stop();
// // // // // //       setIsListening(false);
// // // // // //     }
    
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       // Mock emotion analysis
// // // // // //       setTimeout(() => {
// // // // // //         const emotions = ["anxiety", "sadness", "joy", "hope", "anger"];
// // // // // //         const intensities = ["mild", "moderate", "high"];
        
// // // // // //         const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
// // // // // //         const randomIntensity = intensities[Math.floor(Math.random() * intensities.length)];
        
// // // // // //         alert(`Detected emotion: ${randomEmotion} (${randomIntensity})`);
// // // // // //         setLoading(false);
// // // // // //       }, 1000);
// // // // // //     } catch (error) {
// // // // // //       console.error('Error analyzing emotion:', error);
// // // // // //       alert('Failed to analyze emotion. Please try again.');
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const formatDate = (date) => {
// // // // // //     return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // // // //   };

// // // // // //   // Toggle dark mode function (for demo purposes)
// // // // // //   const toggleDarkMode = () => {
// // // // // //     setDarkMode(!darkMode);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className={`flex flex-col h-screen ${darkMode ? 'bg-slate-900' : 'bg-sky-50'}`}>
// // // // // //       {/* Chat Header */}
// // // // // //       <div className={`w-full py-4 ${darkMode ? 'bg-slate-800 text-white' : 'bg-sky-500 text-white'} shadow-md`}>
// // // // // //         <div className="container mx-auto px-4 flex justify-between items-center">
// // // // // //           <h1 className="text-2xl font-bold">Mental Health Chat Assistant</h1>
// // // // // //           <div className="flex items-center">
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               placeholder="Enter User ID (optional)"
// // // // // //               value={userId}
// // // // // //               onChange={(e) => setUserId(e.target.value)}
// // // // // //               className={`mr-2 px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 ${darkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800'}`}
// // // // // //             />
// // // // // //             <button 
// // // // // //               onClick={fetchChatHistory}
// // // // // //               disabled={!userId}
// // // // // //               className={`${darkMode ? 'bg-slate-700 text-sky-400 hover:bg-slate-600' : 'bg-white text-sky-600 hover:bg-sky-100'} px-3 py-1 rounded text-sm disabled:opacity-50`}
// // // // // //             >
// // // // // //               Load History
// // // // // //             </button>
            
// // // // // //             {/* Dark mode toggle (for demo purposes) */}
// // // // // //             <button 
// // // // // //               onClick={toggleDarkMode} 
// // // // // //               className="ml-3 p-1 rounded-full hover:bg-opacity-20 hover:bg-white"
// // // // // //             >
// // // // // //               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className={`flex flex-1 overflow-hidden p-4 ${darkMode ? 'bg-slate-900' : 'bg-sky-50'}`}>
// // // // // //         {/* Centered Chat Container */}
// // // // // //         <div className={`w-full max-w-4xl mx-auto ${darkMode ? 'bg-slate-800 text-white' : 'bg-white'} rounded-xl shadow-lg overflow-hidden flex flex-col`}>
// // // // // //           {/* Messages */}
// // // // // //           <div className={`flex-1 overflow-y-auto p-4 ${darkMode ? 'bg-gradient-to-b from-slate-800 to-slate-900' : 'bg-gradient-to-b from-sky-50 to-white'}`}>
// // // // // //             {messages.length === 0 ? (
// // // // // //               <div className="flex items-center justify-center h-full text-gray-500">
// // // // // //                 <div className={`text-center p-8 ${darkMode ? 'bg-slate-800 bg-opacity-50 border border-slate-700 text-slate-300' : 'bg-sky-50 bg-opacity-50 rounded-xl border border-sky-100'}`}>
// // // // // //                   <div className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} rounded-full flex items-center justify-center`}>
// // // // // //                     <MessageCircle className={`${darkMode ? 'text-sky-400' : 'text-sky-500'}`} size={24} />
// // // // // //                   </div>
// // // // // //                   <h3 className={`font-medium text-lg ${darkMode ? 'text-sky-400' : 'text-sky-600'} mb-2`}>Start a conversation</h3>
// // // // // //                   <p className={`mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>How are you feeling today? I'm here to listen and support you.</p>
// // // // // //                   {speechSupported && (
// // // // // //                     <p className={`text-sm mt-2 ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
// // // // // //                       <span className="inline-flex items-center">
// // // // // //                         <Mic className="h-4 w-4 mr-1" />
// // // // // //                         You can use the microphone to speak
// // // // // //                       </span>
// // // // // //                     </p>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               messages.map((msg, index) => (
// // // // // //                 <div key={msg.id || index} className="mb-4">
// // // // // //                   {/* User message */}
// // // // // //                   <div className="flex justify-end mb-2">
// // // // // //                     <div className={`${darkMode ? 'bg-sky-700' : 'bg-sky-600'} text-white rounded-2xl rounded-tr-none py-2 px-4 max-w-md shadow-sm`}>
// // // // // //                       <p>{msg.user}</p>
// // // // // //                       <p className={`text-xs ${darkMode ? 'text-sky-300' : 'text-sky-100'} mt-1`}>{formatDate(msg.timestamp)}</p>
// // // // // //                     </div>
// // // // // //                   </div>
                  
// // // // // //                   {/* Bot response */}
// // // // // //                   {msg.bot ? (
// // // // // //                     <div className="flex justify-start">
// // // // // //                       <div className={`rounded-2xl rounded-tl-none py-2 px-4 border max-w-md shadow-sm ${emotionColors[msg.emotion]}`}>
// // // // // //                         <p>{msg.bot}</p>
// // // // // //                         {msg.copingStrategy && (
// // // // // //                           <div className={`mt-2 p-2 ${darkMode ? 'bg-slate-700 bg-opacity-70' : 'bg-white bg-opacity-70'} rounded-md`}>
// // // // // //                             <p className={`text-sm font-medium ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>Coping Strategy:</p>
// // // // // //                             <p className="text-sm">{msg.copingStrategy}</p>
// // // // // //                           </div>
// // // // // //                         )}
// // // // // //                         <div className="flex justify-between items-center mt-1">
// // // // // //                           <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{formatDate(msg.timestamp)}</span>
// // // // // //                           {msg.emotion !== 'neutral' && (
// // // // // //                             <span className={`text-xs px-2 py-0.5 ${darkMode ? 'bg-slate-700 bg-opacity-70 text-sky-400' : 'bg-white bg-opacity-70 text-sky-700'} rounded-full`}>
// // // // // //                               {msg.emotion}
// // // // // //                             </span>
// // // // // //                           )}
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   ) : loading ? (
// // // // // //                     <div className="flex justify-start">
// // // // // //                       <div className={`${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-sky-50 border-sky-100'} rounded-2xl rounded-tl-none py-3 px-4 max-w-md border`}>
// // // // // //                         <div className="flex space-x-1">
// // // // // //                           <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce`}></div>
// // // // // //                           <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce delay-100`}></div>
// // // // // //                           <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce delay-200`}></div>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   ) : null}
// // // // // //                 </div>
// // // // // //               ))
// // // // // //             )}
// // // // // //             <div ref={messagesEndRef} />
// // // // // //           </div>

// // // // // //           {/* Input area */}
// // // // // //           <div className={`border-t ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-sky-100 bg-white'} p-4`}>
// // // // // //             <form onSubmit={handleSendMessage} className="flex space-x-2">
// // // // // //               <input
// // // // // //                 type="text"
// // // // // //                 value={input}
// // // // // //                 onChange={(e) => setInput(e.target.value)}
// // // // // //                 placeholder="Type your message..."
// // // // // //                 className={`flex-1 border rounded-full px-4 py-3 focus:outline-none focus:ring-2 ${
// // // // // //                   darkMode 
// // // // // //                     ? 'bg-slate-700 border-slate-600 text-white focus:ring-sky-500' 
// // // // // //                     : 'bg-sky-50 border-sky-200 focus:ring-sky-300'
// // // // // //                 }`}
// // // // // //                 disabled={loading}
// // // // // //               />
              
// // // // // //               {/* Voice input button */}
// // // // // //               {speechSupported && (
// // // // // //                 <button 
// // // // // //                   type="button"
// // // // // //                   onClick={toggleListening}
// // // // // //                   disabled={loading}
// // // // // //                   className={`rounded-full p-2 w-12 h-12 flex items-center justify-center ${
// // // // // //                     isListening 
// // // // // //                       ? 'bg-red-500 text-white animate-pulse hover:bg-red-600' 
// // // // // //                       : darkMode
// // // // // //                         ? 'bg-slate-700 text-sky-400 hover:bg-slate-600'
// // // // // //                         : 'bg-sky-100 text-sky-600 hover:bg-sky-200'
// // // // // //                   }`}
// // // // // //                 >
// // // // // //                   <Mic size={20} />
// // // // // //                 </button>
// // // // // //               )}
              
// // // // // //               {/* Send button */}
// // // // // //               <button
// // // // // //                 type="submit"
// // // // // //                 disabled={loading || !input.trim()}
// // // // // //                 className={`rounded-full p-2 w-12 h-12 flex items-center justify-center ${
// // // // // //                   darkMode
// // // // // //                     ? 'bg-sky-600 text-white hover:bg-sky-700' 
// // // // // //                     : 'bg-sky-500 text-white hover:bg-sky-600'
// // // // // //                 } disabled:opacity-50 shadow-sm`}
// // // // // //               >
// // // // // //                 <Send size={20} />
// // // // // //               </button>
// // // // // //             </form>
            
// // // // // //             {/* Speech recognition status indicator */}
// // // // // //             {isListening && (
// // // // // //               <div className="text-center mt-2 text-sm text-red-500">
// // // // // //                 <div className="inline-flex items-center">
// // // // // //                   <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
// // // // // //                   Listening... Speak now
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             )}
            
// // // // // //             <div className="flex justify-center mt-3 space-x-3 text-sm">
// // // // // //               <button
// // // // // //                 onClick={handleQuickResponse}
// // // // // //                 disabled={loading || !input.trim()}
// // // // // //                 className={`${darkMode ? 'text-sky-400' : 'text-sky-600'} hover:underline disabled:opacity-50 px-2 py-1 rounded ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-sky-50'}`}
// // // // // //               >
// // // // // //                 Quick Response (No Save)
// // // // // //               </button>
// // // // // //               <span className={darkMode ? 'text-slate-600' : 'text-sky-200'}>|</span>
// // // // // //               <button
// // // // // //                 onClick={analyzeEmotionOnly}
// // // // // //                 disabled={loading || !input.trim()}
// // // // // //                 className={`${darkMode ? 'text-sky-400' : 'text-sky-600'} hover:underline disabled:opacity-50 px-2 py-1 rounded ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-sky-50'}`}
// // // // // //               >
// // // // // //                 Analyze Emotion Only
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Emotion Insights Sidebar - Hidden on mobile */}
// // // // // //         {emotionalInsight && (
// // // // // //           <div className="hidden lg:block w-64 ml-4 flex-shrink-0">
// // // // // //             <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-sky-100'} rounded-xl shadow-md p-4 border`}>
// // // // // //               <h3 className={`font-semibold ${darkMode ? 'text-sky-400' : 'text-sky-700'} mb-3 flex items-center`}>
// // // // // //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
// // // // // //                   <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
// // // // // //                   <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
// // // // // //                 </svg>
// // // // // //                 Emotional Insights
// // // // // //               </h3>
// // // // // //               <div className={`${darkMode ? 'bg-slate-700' : 'bg-sky-50'} rounded-lg p-3`}>
// // // // // //                 <p className="text-sm mb-2">
// // // // // //                   <span className={`font-medium ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>Dominant emotion:</span> {emotionalInsight.dominantEmotion}
// // // // // //                 </p>
// // // // // //                 <p className="text-sm mb-3">
// // // // // //                   <span className={`font-medium ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>Emotional state:</span> {emotionalInsight.emotionalState}
// // // // // //                 </p>
                
// // // // // //                 <h4 className={`text-xs font-medium ${darkMode ? 'text-sky-400' : 'text-sky-600'} mb-2`}>Emotion Frequency</h4>
// // // // // //                 {Object.entries(emotionalInsight.emotionFrequency).map(([emotion, count]) => (
// // // // // //                   <div key={emotion} className="mb-2">
// // // // // //                     <div className="flex justify-between text-xs mb-1">
// // // // // //                       <span className="capitalize">{emotion}</span>
// // // // // //                       <span>{count}</span>
// // // // // //                     </div>
// // // // // //                     <div className={`w-full ${darkMode ? 'bg-slate-600' : 'bg-sky-100'} rounded-full h-2`}>
// // // // // //                       <div 
// // // // // //                         className={`h-2 rounded-full ${
// // // // // //                           emotion === 'joy' || emotion === 'hope' 
// // // // // //                             ? darkMode ? 'bg-green-400' : 'bg-green-500' 
// // // // // //                             : darkMode ? 'bg-sky-400' : 'bg-sky-500'
// // // // // //                         }`}
// // // // // //                         style={{ width: `${Math.min(count * 20, 100)}%` }}
// // // // // //                       ></div>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default ChatInterface;
// // // // // import { useState, useEffect, useRef } from 'react';
// // // // // import { Mic, Send, MessageCircle, Sun, Moon } from 'lucide-react';

// // // // // const ChatInterface = () => {
// // // // //   const [messages, setMessages] = useState([]);
// // // // //   const [input, setInput] = useState('');
// // // // //   const [userId, setUserId] = useState('');
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [emotionalInsight, setEmotionalInsight] = useState(null);
// // // // //   const messagesEndRef = useRef(null);
  
// // // // //   // Speech recognition states
// // // // //   const [isListening, setIsListening] = useState(false);
// // // // //   const [speechRecognition, setSpeechRecognition] = useState(null);
// // // // //   const [speechSupported, setSpeechSupported] = useState(false);
  
// // // // //   // Dark mode state (synced with header)
// // // // //   const [darkMode, setDarkMode] = useState(false);

// // // // //   // API URLs
// // // // //   const API_URL = {
// // // // //     CHAT: 'http://localhost:6585/api/chatbot/analyze',
// // // // //     HISTORY: 'http://localhost:6585/api/chatbot/history',
// // // // //     QUICK_RESPONSE: 'http://localhost:6585/api/chatbot/quick-response',
// // // // //     EMOTION: 'http://localhost:6585/api/chatbot/emotion'
// // // // //   };

// // // // //   // Emotion colors for visual cues
// // // // //   const emotionColors = {
// // // // //     anxiety: darkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-100 border-blue-300',
// // // // //     sadness: darkMode ? 'bg-indigo-900 border-indigo-700' : 'bg-indigo-100 border-indigo-300',
// // // // //     anger: darkMode ? 'bg-red-900 border-red-700' : 'bg-red-100 border-red-300',
// // // // //     joy: darkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-100 border-yellow-300',
// // // // //     overwhelm: darkMode ? 'bg-purple-900 border-purple-700' : 'bg-purple-100 border-purple-300',
// // // // //     loneliness: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300',
// // // // //     hope: darkMode ? 'bg-green-900 border-green-700' : 'bg-green-100 border-green-300',
// // // // //     neutral: darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
// // // // //   };

// // // // //   // Initialize speech recognition
// // // // //   useEffect(() => {
// // // // //     // Check if browser supports speech recognition
// // // // //     if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
// // // // //       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// // // // //       const recognition = new SpeechRecognition();
      
// // // // //       recognition.continuous = false;
// // // // //       recognition.interimResults = true;
// // // // //       recognition.lang = 'en-US';
      
// // // // //       recognition.onresult = (event) => {
// // // // //         const transcript = Array.from(event.results)
// // // // //           .map(result => result[0])
// // // // //           .map(result => result.transcript)
// // // // //           .join('');
          
// // // // //         setInput(transcript);
// // // // //       };
      
// // // // //       recognition.onend = () => {
// // // // //         setIsListening(false);
// // // // //       };
      
// // // // //       recognition.onerror = (event) => {
// // // // //         console.error('Speech recognition error', event.error);
// // // // //         setIsListening(false);
// // // // //       };
      
// // // // //       setSpeechRecognition(recognition);
// // // // //       setSpeechSupported(true);
// // // // //     } else {
// // // // //       console.log('Speech recognition not supported');
// // // // //       setSpeechSupported(false);
// // // // //     }
// // // // //   }, []);

// // // // //   // Handle toggling speech recognition
// // // // //   const toggleListening = () => {
// // // // //     if (isListening) {
// // // // //       speechRecognition.stop();
// // // // //       setIsListening(false);
// // // // //     } else {
// // // // //       setInput('');
// // // // //       speechRecognition.start();
// // // // //       setIsListening(true);
// // // // //     }
// // // // //   };

// // // // //   // Load chat history when userId changes
// // // // //   useEffect(() => {
// // // // //     if (userId) {
// // // // //       fetchChatHistory();
// // // // //     }
// // // // //   }, [userId]);

// // // // //   // Auto-scroll to bottom of messages
// // // // //   useEffect(() => {
// // // // //     scrollToBottom();
// // // // //   }, [messages]);

// // // // //   const scrollToBottom = () => {
// // // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // // //   };

// // // // //   const fetchChatHistory = async () => {
// // // // //     if (!userId.trim()) return;
    
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const response = await fetch(`${API_URL.HISTORY}?userId=${encodeURIComponent(userId)}`);
      
// // // // //       if (!response.ok) {
// // // // //         throw new Error('Failed to fetch chat history');
// // // // //       }
// // // // //       const data = await response.json();
      
// // // // //       if (data.success) {
// // // // //         // Convert backend data format to frontend format
// // // // //         const convertedMessages = data.data.map(chat => ({
// // // // //           id: chat._id,
// // // // //           user: chat.userInput,
// // // // //           bot: chat.botResponse,
// // // // //           emotion: chat.emotionalData?.detectedEmotion || 'neutral',
// // // // //           copingStrategy: chat.emotionalData?.copingStrategy || null,
// // // // //           timestamp: new Date(chat.timestamp)
// // // // //         }));
        
// // // // //         setMessages(convertedMessages);
        
// // // // //         // Set emotional insight if available
// // // // //         if (data.emotionalInsight) {
// // // // //           setEmotionalInsight(data.emotionalInsight);
// // // // //         }
// // // // //       } else {
// // // // //         console.error('Error fetching chat history:', data.message);
// // // // //       }
      
// // // // //       setLoading(false);
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching chat history:', error);
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleSendMessage = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!input.trim()) return;

// // // // //     // Stop listening if active
// // // // //     if (isListening && speechRecognition) {
// // // // //       speechRecognition.stop();
// // // // //       setIsListening(false);
// // // // //     }

// // // // //     // Add user message immediately for better UX
// // // // //     const userMessage = {
// // // // //       id: Date.now(),
// // // // //       user: input,
// // // // //       bot: null,
// // // // //       emotion: 'neutral',
// // // // //       timestamp: new Date()
// // // // //     };
    
// // // // //     setMessages(prev => [...prev, userMessage]);
// // // // //     setInput('');
// // // // //     setLoading(true);

// // // // //     try {
// // // // //       // Send message to backend API
// // // // //       const response = await fetch(API_URL.CHAT, {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify({
// // // // //           userInput: userMessage.user,
// // // // //           userId: userId.trim() || null
// // // // //         })
// // // // //       });

// // // // //       if (!response.ok) {
// // // // //         throw new Error('Server responded with an error');
// // // // //       }

// // // // //       const data = await response.json();
      
// // // // //       if (data.success) {
// // // // //         // Update the message with the bot response
// // // // //         setMessages(prev => 
// // // // //           prev.map(msg => 
// // // // //             msg.id === userMessage.id 
// // // // //               ? { 
// // // // //                   ...msg, 
// // // // //                   bot: data.data.botResponse, 
// // // // //                   emotion: data.data.emotionalData?.detectedEmotion || 'neutral',
// // // // //                   copingStrategy: data.data.emotionalData?.copingStrategy || null
// // // // //                 } 
// // // // //               : msg
// // // // //           )
// // // // //         );
// // // // //       } else {
// // // // //         throw new Error(data.message || 'Failed to get response');
// // // // //       }
      
// // // // //       setLoading(false);
// // // // //     } catch (error) {
// // // // //       console.error('Error sending message:', error);
// // // // //       // Update with error message
// // // // //       setMessages(prev => 
// // // // //         prev.map(msg => 
// // // // //           msg.id === userMessage.id 
// // // // //             ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
// // // // //             : msg
// // // // //         )
// // // // //       );
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleQuickResponse = async () => {
// // // // //     if (!input.trim()) return;
    
// // // // //     // Stop listening if active
// // // // //     if (isListening && speechRecognition) {
// // // // //       speechRecognition.stop();
// // // // //       setIsListening(false);
// // // // //     }
    
// // // // //     const userMessage = {
// // // // //       id: Date.now(),
// // // // //       user: input,
// // // // //       bot: null,
// // // // //       emotion: 'neutral',
// // // // //       timestamp: new Date()
// // // // //     };
    
// // // // //     setMessages(prev => [...prev, userMessage]);
// // // // //     setInput('');
// // // // //     setLoading(true);

// // // // //     try {
// // // // //       // Use quick response endpoint
// // // // //       const response = await fetch(API_URL.QUICK_RESPONSE, {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify({
// // // // //           userInput: userMessage.user
// // // // //         })
// // // // //       });

// // // // //       if (!response.ok) {
// // // // //         throw new Error('Server responded with an error');
// // // // //       }

// // // // //       const data = await response.json();
      
// // // // //       if (data.success) {
// // // // //         setMessages(prev => 
// // // // //           prev.map(msg => 
// // // // //             msg.id === userMessage.id 
// // // // //               ? { ...msg, bot: data.data.response, emotion: 'neutral' } 
// // // // //               : msg
// // // // //           )
// // // // //         );
// // // // //       } else {
// // // // //         throw new Error(data.message || 'Failed to get quick response');
// // // // //       }
      
// // // // //       setLoading(false);
// // // // //     } catch (error) {
// // // // //       console.error('Error getting quick response:', error);
// // // // //       setMessages(prev => 
// // // // //         prev.map(msg => 
// // // // //           msg.id === userMessage.id 
// // // // //             ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
// // // // //             : msg
// // // // //         )
// // // // //       );
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const analyzeEmotionOnly = async () => {
// // // // //     if (!input.trim()) return;
    
// // // // //     // Stop listening if active
// // // // //     if (isListening && speechRecognition) {
// // // // //       speechRecognition.stop();
// // // // //       setIsListening(false);
// // // // //     }
    
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       // Use emotion-only endpoint
// // // // //       const response = await fetch(API_URL.EMOTION, {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify({
// // // // //           userInput: input
// // // // //         })
// // // // //       });

// // // // //       if (!response.ok) {
// // // // //         throw new Error('Server responded with an error');
// // // // //       }

// // // // //       const data = await response.json();
      
// // // // //       if (data.success) {
// // // // //         // Use browser alert to show emotion analysis
// // // // //         const emotionalState = data.data.emotionalState;
// // // // //         alert(`Detected emotion: ${emotionalState.emotion || 'neutral'} (${emotionalState.intensity || 'moderate'})`);
// // // // //       } else {
// // // // //         throw new Error(data.message || 'Failed to analyze emotion');
// // // // //       }
      
// // // // //       setLoading(false);
// // // // //     } catch (error) {
// // // // //       console.error('Error analyzing emotion:', error);
// // // // //       alert('Failed to analyze emotion. Please try again.');
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const formatDate = (date) => {
// // // // //     return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // // //   };

// // // // //   // Toggle dark mode function
// // // // //   const toggleDarkMode = () => {
// // // // //     setDarkMode(!darkMode);
// // // // //   };

// // // // //   return (
// // // // //     <div className={`flex flex-col h-screen ${darkMode ? 'bg-slate-900' : 'bg-sky-50'}`}>
// // // // //       {/* Chat Header */}
// // // // //       <div className={`w-full py-4 ${darkMode ? 'bg-slate-800 text-white' : 'bg-sky-500 text-white'} shadow-md`}>
// // // // //         <div className="container mx-auto px-4 flex justify-between items-center">
// // // // //           <h1 className="text-2xl font-bold">Mental Health Chat Assistant</h1>
// // // // //           <div className="flex items-center">
// // // // //             <input
// // // // //               type="text"
// // // // //               placeholder="Enter User ID (optional)"
// // // // //               value={userId}
// // // // //               onChange={(e) => setUserId(e.target.value)}
// // // // //               className={`mr-2 px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 ${darkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800'}`}
// // // // //             />
// // // // //             <button 
// // // // //               onClick={fetchChatHistory}
// // // // //               disabled={!userId.trim()}
// // // // //               className={`${darkMode ? 'bg-slate-700 text-sky-400 hover:bg-slate-600' : 'bg-white text-sky-600 hover:bg-sky-100'} px-3 py-1 rounded text-sm disabled:opacity-50`}
// // // // //             >
// // // // //               Load History
// // // // //             </button>
            
// // // // //             {/* Dark mode toggle */}
// // // // //             <button 
// // // // //               onClick={toggleDarkMode} 
// // // // //               className="ml-3 p-1 rounded-full hover:bg-opacity-20 hover:bg-white"
// // // // //             >
// // // // //               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className={`flex flex-1 overflow-hidden p-4 ${darkMode ? 'bg-slate-900' : 'bg-sky-50'}`}>
// // // // //         {/* Centered Chat Container */}
// // // // //         <div className={`w-full max-w-4xl mx-auto ${darkMode ? 'bg-slate-800 text-white' : 'bg-white'} rounded-xl shadow-lg overflow-hidden flex flex-col`}>
// // // // //           {/* Messages */}
// // // // //           <div className={`flex-1 overflow-y-auto p-4 ${darkMode ? 'bg-gradient-to-b from-slate-800 to-slate-900' : 'bg-gradient-to-b from-sky-50 to-white'}`}>
// // // // //             {messages.length === 0 ? (
// // // // //               <div className="flex items-center justify-center h-full text-gray-500">
// // // // //                 <div className={`text-center p-8 ${darkMode ? 'bg-slate-800 bg-opacity-50 border border-slate-700 text-slate-300' : 'bg-sky-50 bg-opacity-50 rounded-xl border border-sky-100'}`}>
// // // // //                   <div className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} rounded-full flex items-center justify-center`}>
// // // // //                     <MessageCircle className={`${darkMode ? 'text-sky-400' : 'text-sky-500'}`} size={24} />
// // // // //                   </div>
// // // // //                   <h3 className={`font-medium text-lg ${darkMode ? 'text-sky-400' : 'text-sky-600'} mb-2`}>Start a conversation</h3>
// // // // //                   <p className={`mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>How are you feeling today? I'm here to listen and support you.</p>
// // // // //                   {speechSupported && (
// // // // //                     <p className={`text-sm mt-2 ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
// // // // //                       <span className="inline-flex items-center">
// // // // //                         <Mic className="h-4 w-4 mr-1" />
// // // // //                         You can use the microphone to speak
// // // // //                       </span>
// // // // //                     </p>
// // // // //                   )}
// // // // //                 </div>
// // // // //               </div>
// // // // //             ) : (
// // // // //               messages.map((msg, index) => (
// // // // //                 <div key={msg.id || index} className="mb-4">
// // // // //                   {/* User message */}
// // // // //                   <div className="flex justify-end mb-2">
// // // // //                     <div className={`${darkMode ? 'bg-sky-700' : 'bg-sky-600'} text-white rounded-2xl rounded-tr-none py-2 px-4 max-w-md shadow-sm`}>
// // // // //                       <p>{msg.user}</p>
// // // // //                       <p className={`text-xs ${darkMode ? 'text-sky-300' : 'text-sky-100'} mt-1`}>{formatDate(msg.timestamp)}</p>
// // // // //                     </div>
// // // // //                   </div>
                  
// // // // //                   {/* Bot response */}
// // // // //                   {msg.bot ? (
// // // // //                     <div className="flex justify-start">
// // // // //                       <div className={`rounded-2xl rounded-tl-none py-2 px-4 border max-w-md shadow-sm ${emotionColors[msg.emotion]}`}>
// // // // //                         <p>{msg.bot}</p>
// // // // //                         {msg.copingStrategy && (
// // // // //                           <div className={`mt-2 p-2 ${darkMode ? 'bg-slate-700 bg-opacity-70' : 'bg-white bg-opacity-70'} rounded-md`}>
// // // // //                             <p className={`text-sm font-medium ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>Coping Strategy:</p>
// // // // //                             <p className="text-sm">{msg.copingStrategy}</p>
// // // // //                           </div>
// // // // //                         )}
// // // // //                         <div className="flex justify-between items-center mt-1">
// // // // //                           <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{formatDate(msg.timestamp)}</span>
// // // // //                           {msg.emotion !== 'neutral' && (
// // // // //                             <span className={`text-xs px-2 py-0.5 ${darkMode ? 'bg-slate-700 bg-opacity-70 text-sky-400' : 'bg-white bg-opacity-70 text-sky-700'} rounded-full`}>
// // // // //                               {msg.emotion}
// // // // //                             </span>
// // // // //                           )}
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ) : loading ? (
// // // // //                     <div className="flex justify-start">
// // // // //                       <div className={`${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-sky-50 border-sky-100'} rounded-2xl rounded-tl-none py-3 px-4 max-w-md border`}>
// // // // //                         <div className="flex space-x-1">
// // // // //                           <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce`}></div>
// // // // //                           <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce delay-100`}></div>
// // // // //                           <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce delay-200`}></div>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ) : null}
// // // // //                 </div>
// // // // //               ))
// // // // //             )}
// // // // //             <div ref={messagesEndRef} />
// // // // //           </div>

// // // // //           {/* Input area */}
// // // // //           <div className={`border-t ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-sky-100 bg-white'} p-4`}>
// // // // //             <form onSubmit={handleSendMessage} className="flex space-x-2">
// // // // //               <input
// // // // //                 type="text"
// // // // //                 value={input}
// // // // //                 onChange={(e) => setInput(e.target.value)}
// // // // //                 placeholder="Type your message..."
// // // // //                 className={`flex-1 border rounded-full px-4 py-3 focus:outline-none focus:ring-2 ${
// // // // //                   darkMode 
// // // // //                     ? 'bg-slate-700 border-slate-600 text-white focus:ring-sky-500' 
// // // // //                     : 'bg-sky-50 border-sky-200 focus:ring-sky-300'
// // // // //                 }`}
// // // // //                 disabled={loading}
// // // // //               />
              
// // // // //               {/* Voice input button */}
// // // // //               {speechSupported && (
// // // // //                 <button 
// // // // //                   type="button"
// // // // //                   onClick={toggleListening}
// // // // //                   disabled={loading}
// // // // //                   className={`rounded-full p-2 w-12 h-12 flex items-center justify-center ${
// // // // //                     isListening 
// // // // //                       ? 'bg-red-500 text-white animate-pulse hover:bg-red-600' 
// // // // //                       : darkMode
// // // // //                         ? 'bg-slate-700 text-sky-400 hover:bg-slate-600'
// // // // //                         : 'bg-sky-100 text-sky-600 hover:bg-sky-200'
// // // // //                   }`}
// // // // //                 >
// // // // //                   <Mic size={20} />
// // // // //                 </button>
// // // // //               )}
              
// // // // //               {/* Send button */}
// // // // //               <button
// // // // //                 type="submit"
// // // // //                 disabled={loading || !input.trim()}
// // // // //                 className={`rounded-full p-2 w-12 h-12 flex items-center justify-center ${
// // // // //                   darkMode
// // // // //                     ? 'bg-sky-600 text-white hover:bg-sky-700' 
// // // // //                     : 'bg-sky-500 text-white hover:bg-sky-600'
// // // // //                 } disabled:opacity-50 shadow-sm`}
// // // // //               >
// // // // //                 <Send size={20} />
// // // // //               </button>
// // // // //             </form>
            
// // // // //             {/* Speech recognition status indicator */}
// // // // //             {isListening && (
// // // // //               <div className="text-center mt-2 text-sm text-red-500">
// // // // //                 <div className="inline-flex items-center">
// // // // //                   <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
// // // // //                   Listening... Speak now
// // // // //                 </div>
// // // // //               </div>
// // // // //             )}
            
// // // // //             <div className="flex justify-center mt-3 space-x-3 text-sm">
// // // // //               <button
// // // // //                 onClick={handleQuickResponse}
// // // // //                 disabled={loading || !input.trim()}
// // // // //                 className={`${darkMode ? 'text-sky-400' : 'text-sky-600'} hover:underline disabled:opacity-50 px-2 py-1 rounded ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-sky-50'}`}
// // // // //               >
// // // // //                 Quick Response (No Save)
// // // // //               </button>
// // // // //               <span className={darkMode ? 'text-slate-600' : 'text-sky-200'}>|</span>
// // // // //               <button
// // // // //                 onClick={analyzeEmotionOnly}
// // // // //                 disabled={loading || !input.trim()}
// // // // //                 className={`${darkMode ? 'text-sky-400' : 'text-sky-600'} hover:underline disabled:opacity-50 px-2 py-1 rounded ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-sky-50'}`}
// // // // //               >
// // // // //                 Analyze Emotion Only
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Emotion Insights Sidebar - Hidden on mobile */}
// // // // //         {emotionalInsight && (
// // // // //           <div className="hidden lg:block w-64 ml-4 flex-shrink-0">
// // // // //             <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-sky-100'} rounded-xl shadow-md p-4 border`}>
// // // // //               <h3 className={`font-semibold ${darkMode ? 'text-sky-400' : 'text-sky-700'} mb-3 flex items-center`}>
// // // // //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
// // // // //                   <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
// // // // //                   <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
// // // // //                 </svg>
// // // // //                 Emotional Insights
// // // // //               </h3>
// // // // //               <div className={`${darkMode ? 'bg-slate-700' : 'bg-sky-50'} rounded-lg p-3`}>
// // // // //                 <p className="text-sm mb-2">
// // // // //                   <span className={`font-medium ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>Dominant emotion:</span> {emotionalInsight.dominantEmotion}
// // // // //                 </p>
// // // // //                 <p className="text-sm mb-3">
// // // // //                   <span className={`font-medium ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>Emotional state:</span> {emotionalInsight.emotionalState}
// // // // //                 </p>
                
// // // // //                 <h4 className={`text-xs font-medium ${darkMode ? 'text-sky-400' : 'text-sky-600'} mb-2`}>Emotion Frequency</h4>
// // // // //                 {Object.entries(emotionalInsight.emotionFrequency).map(([emotion, count]) => (
// // // // //                   <div key={emotion} className="mb-2">
// // // // //                     <div className="flex justify-between text-xs mb-1">
// // // // //                       <span className="capitalize">{emotion}</span>
// // // // //                       <span>{count}</span>
// // // // //                     </div>
// // // // //                     <div className={`w-full ${darkMode ? 'bg-slate-600' : 'bg-sky-100'} rounded-full h-2`}>
// // // // //                       <div 
// // // // //                         className={`h-2 rounded-full ${
// // // // //                           emotion === 'joy' || emotion === 'hope' 
// // // // //                             ? darkMode ? 'bg-green-400' : 'bg-green-500' 
// // // // //                             : darkMode ? 'bg-sky-400' : 'bg-sky-500'
// // // // //                         }`}
// // // // //                         style={{ width: `${Math.min(count * 20, 100)}%` }}
// // // // //                       ></div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ChatInterface;
// // // // import { useState, useEffect, useRef } from 'react';
// // // // import { Mic, Send, MessageCircle, Sun, Moon } from 'lucide-react';

// // // // const ChatInterface = () => {
// // // //   const [messages, setMessages] = useState([]);
// // // //   const [input, setInput] = useState('');
// // // //   const [userId, setUserId] = useState('');
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [emotionalInsight, setEmotionalInsight] = useState(null);
// // // //   const messagesEndRef = useRef(null);
  
// // // //   // Speech recognition states
// // // //   const [isListening, setIsListening] = useState(false);
// // // //   const [speechRecognition, setSpeechRecognition] = useState(null);
// // // //   const [speechSupported, setSpeechSupported] = useState(false);
  
// // // //   // Dark mode state (synced with header)
// // // //   const [darkMode, setDarkMode] = useState(false);

// // // //   // API URLs - Fixed to properly use Vite environment variables
// // // //   const API_URL = {
// // // //     CHAT: `${import.meta.env.VITE_API_URL}/api/chatbot/analyze`,
// // // //     HISTORY: `${import.meta.env.VITE_API_URL}/api/chatbot/history`,
// // // //     QUICK_RESPONSE: `${import.meta.env.VITE_API_URL}/api/chatbot/quick-response`,
// // // //     EMOTION: `${import.meta.env.VITE_API_URL}/api/chatbot/emotion`
// // // //   };

// // // //   // Emotion colors for visual cues
// // // //   const emotionColors = {
// // // //     anxiety: darkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-100 border-blue-300',
// // // //     sadness: darkMode ? 'bg-indigo-900 border-indigo-700' : 'bg-indigo-100 border-indigo-300',
// // // //     anger: darkMode ? 'bg-red-900 border-red-700' : 'bg-red-100 border-red-300',
// // // //     joy: darkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-100 border-yellow-300',
// // // //     overwhelm: darkMode ? 'bg-purple-900 border-purple-700' : 'bg-purple-100 border-purple-300',
// // // //     loneliness: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300',
// // // //     hope: darkMode ? 'bg-green-900 border-green-700' : 'bg-green-100 border-green-300',
// // // //     neutral: darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
// // // //   };

// // // //   // Initialize speech recognition
// // // //   useEffect(() => {
// // // //     // Check if browser supports speech recognition and if it's enabled in env
// // // //     if ((import.meta.env.VITE_ENABLE_SPEECH_RECOGNITION === 'true') && 
// // // //         ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
// // // //       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// // // //       const recognition = new SpeechRecognition();
      
// // // //       recognition.continuous = false;
// // // //       recognition.interimResults = true;
// // // //       recognition.lang = 'en-US';
      
// // // //       recognition.onresult = (event) => {
// // // //         const transcript = Array.from(event.results)
// // // //           .map(result => result[0])
// // // //           .map(result => result.transcript)
// // // //           .join('');
          
// // // //         setInput(transcript);
// // // //       };
      
// // // //       recognition.onend = () => {
// // // //         setIsListening(false);
// // // //       };
      
// // // //       recognition.onerror = (event) => {
// // // //         console.error('Speech recognition error', event.error);
// // // //         setIsListening(false);
// // // //       };
      
// // // //       setSpeechRecognition(recognition);
// // // //       setSpeechSupported(true);
// // // //     } else {
// // // //       console.log('Speech recognition not supported or disabled');
// // // //       setSpeechSupported(false);
// // // //     }
// // // //   }, []);

// // // //   // Handle toggling speech recognition
// // // //   const toggleListening = () => {
// // // //     if (isListening) {
// // // //       speechRecognition.stop();
// // // //       setIsListening(false);
// // // //     } else {
// // // //       setInput('');
// // // //       speechRecognition.start();
// // // //       setIsListening(true);
// // // //     }
// // // //   };

// // // //   // Load chat history when userId changes
// // // //   useEffect(() => {
// // // //     if (userId) {
// // // //       fetchChatHistory();
// // // //     }
// // // //   }, [userId]);

// // // //   // Auto-scroll to bottom of messages
// // // //   useEffect(() => {
// // // //     scrollToBottom();
// // // //   }, [messages]);

// // // //   const scrollToBottom = () => {
// // // //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // // //   };

// // // //   const fetchChatHistory = async () => {
// // // //     if (!userId.trim()) return;
    
// // // //     try {
// // // //       setLoading(true);
// // // //       const response = await fetch(`${API_URL.HISTORY}?userId=${encodeURIComponent(userId)}`);
      
// // // //       if (!response.ok) {
// // // //         throw new Error('Failed to fetch chat history');
// // // //       }
// // // //       const data = await response.json();
      
// // // //       if (data.success) {
// // // //         // Convert backend data format to frontend format
// // // //         const convertedMessages = data.data.map(chat => ({
// // // //           id: chat._id,
// // // //           user: chat.userInput,
// // // //           bot: chat.botResponse,
// // // //           emotion: chat.emotionalData?.detectedEmotion || 'neutral',
// // // //           copingStrategy: chat.emotionalData?.copingStrategy || null,
// // // //           timestamp: new Date(chat.timestamp)
// // // //         }));
        
// // // //         setMessages(convertedMessages);
        
// // // //         // Set emotional insight if available
// // // //         if (data.emotionalInsight) {
// // // //           setEmotionalInsight(data.emotionalInsight);
// // // //         }
// // // //       } else {
// // // //         console.error('Error fetching chat history:', data.message);
// // // //       }
      
// // // //       setLoading(false);
// // // //     } catch (error) {
// // // //       console.error('Error fetching chat history:', error);
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleSendMessage = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!input.trim()) return;

// // // //     // Stop listening if active
// // // //     if (isListening && speechRecognition) {
// // // //       speechRecognition.stop();
// // // //       setIsListening(false);
// // // //     }

// // // //     // Add user message immediately for better UX
// // // //     const userMessage = {
// // // //       id: Date.now(),
// // // //       user: input,
// // // //       bot: null,
// // // //       emotion: 'neutral',
// // // //       timestamp: new Date()
// // // //     };
    
// // // //     setMessages(prev => [...prev, userMessage]);
// // // //     setInput('');
// // // //     setLoading(true);

// // // //     try {
// // // //       // Send message to backend API
// // // //       const response = await fetch(API_URL.CHAT, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //           'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` // Added API key for authentication
// // // //         },
// // // //         body: JSON.stringify({
// // // //           userInput: userMessage.user,
// // // //           userId: userId.trim() || null
// // // //         })
// // // //       });

// // // //       if (!response.ok) {
// // // //         throw new Error('Server responded with an error');
// // // //       }

// // // //       const data = await response.json();
      
// // // //       if (data.success) {
// // // //         // Update the message with the bot response
// // // //         setMessages(prev => 
// // // //           prev.map(msg => 
// // // //             msg.id === userMessage.id 
// // // //               ? { 
// // // //                   ...msg, 
// // // //                   bot: data.data.botResponse, 
// // // //                   emotion: data.data.emotionalData?.detectedEmotion || 'neutral',
// // // //                   copingStrategy: data.data.emotionalData?.copingStrategy || null
// // // //                 } 
// // // //               : msg
// // // //           )
// // // //         );
// // // //       } else {
// // // //         throw new Error(data.message || 'Failed to get response');
// // // //       }
      
// // // //       setLoading(false);
// // // //     } catch (error) {
// // // //       console.error('Error sending message:', error);
// // // //       // Update with error message
// // // //       setMessages(prev => 
// // // //         prev.map(msg => 
// // // //           msg.id === userMessage.id 
// // // //             ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
// // // //             : msg
// // // //         )
// // // //       );
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleQuickResponse = async () => {
// // // //     if (!input.trim()) return;
    
// // // //     // Stop listening if active
// // // //     if (isListening && speechRecognition) {
// // // //       speechRecognition.stop();
// // // //       setIsListening(false);
// // // //     }
    
// // // //     const userMessage = {
// // // //       id: Date.now(),
// // // //       user: input,
// // // //       bot: null,
// // // //       emotion: 'neutral',
// // // //       timestamp: new Date()
// // // //     };
    
// // // //     setMessages(prev => [...prev, userMessage]);
// // // //     setInput('');
// // // //     setLoading(true);

// // // //     try {
// // // //       // Use quick response endpoint
// // // //       const response = await fetch(API_URL.QUICK_RESPONSE, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //           'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` // Added API key for authentication
// // // //         },
// // // //         body: JSON.stringify({
// // // //           userInput: userMessage.user
// // // //         })
// // // //       });

// // // //       if (!response.ok) {
// // // //         throw new Error('Server responded with an error');
// // // //       }

// // // //       const data = await response.json();
      
// // // //       if (data.success) {
// // // //         setMessages(prev => 
// // // //           prev.map(msg => 
// // // //             msg.id === userMessage.id 
// // // //               ? { ...msg, bot: data.data.response, emotion: 'neutral' } 
// // // //               : msg
// // // //           )
// // // //         );
// // // //       } else {
// // // //         throw new Error(data.message || 'Failed to get quick response');
// // // //       }
      
// // // //       setLoading(false);
// // // //     } catch (error) {
// // // //       console.error('Error getting quick response:', error);
// // // //       setMessages(prev => 
// // // //         prev.map(msg => 
// // // //           msg.id === userMessage.id 
// // // //             ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
// // // //             : msg
// // // //         )
// // // //       );
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const analyzeEmotionOnly = async () => {
// // // //     // Check if emotion analytics is enabled in environment
// // // //     if (import.meta.env.VITE_ENABLE_EMOTION_ANALYTICS !== 'true') {
// // // //       alert('Emotion analytics is disabled.');
// // // //       return;
// // // //     }

// // // //     if (!input.trim()) return;
    
// // // //     // Stop listening if active
// // // //     if (isListening && speechRecognition) {
// // // //       speechRecognition.stop();
// // // //       setIsListening(false);
// // // //     }
    
// // // //     setLoading(true);
// // // //     try {
// // // //       // Use emotion-only endpoint
// // // //       const response = await fetch(API_URL.EMOTION, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //           'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` // Added API key for authentication
// // // //         },
// // // //         body: JSON.stringify({
// // // //           userInput: input
// // // //         })
// // // //       });

// // // //       if (!response.ok) {
// // // //         throw new Error('Server responded with an error');
// // // //       }

// // // //       const data = await response.json();
      
// // // //       if (data.success) {
// // // //         // Use browser alert to show emotion analysis
// // // //         const emotionalState = data.data.emotionalState;
// // // //         alert(`Detected emotion: ${emotionalState.emotion || 'neutral'} (${emotionalState.intensity || 'moderate'})`);
// // // //       } else {
// // // //         throw new Error(data.message || 'Failed to analyze emotion');
// // // //       }
      
// // // //       setLoading(false);
// // // //     } catch (error) {
// // // //       console.error('Error analyzing emotion:', error);
// // // //       alert('Failed to analyze emotion. Please try again.');
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const formatDate = (date) => {
// // // //     return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// // // //   };

// // // //   // Toggle dark mode function
// // // //   const toggleDarkMode = () => {
// // // //     setDarkMode(!darkMode);
// // // //   };

// // // //   return (
// // // //     <div className={`flex flex-col h-screen ${darkMode ? 'bg-slate-900' : 'bg-sky-50'}`}>
// // // //       {/* Chat Header */}
// // // //       <div className={`w-full py-4 ${darkMode ? 'bg-slate-800 text-white' : 'bg-sky-500 text-white'} shadow-md`}>
// // // //         <div className="container mx-auto px-4 flex justify-between items-center">
// // // //           <h1 className="text-2xl font-bold">Mental Health Chat Assistant</h1>
// // // //           <div className="flex items-center">
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Enter User ID (optional)"
// // // //               value={userId}
// // // //               onChange={(e) => setUserId(e.target.value)}
// // // //               className={`mr-2 px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 ${darkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800'}`}
// // // //             />
// // // //             <button 
// // // //               onClick={fetchChatHistory}
// // // //               disabled={!userId.trim()}
// // // //               className={`${darkMode ? 'bg-slate-700 text-sky-400 hover:bg-slate-600' : 'bg-white text-sky-600 hover:bg-sky-100'} px-3 py-1 rounded text-sm disabled:opacity-50`}
// // // //             >
// // // //               Load History
// // // //             </button>
            
// // // //             {/* Dark mode toggle */}
// // // //             <button 
// // // //               onClick={toggleDarkMode} 
// // // //               className="ml-3 p-1 rounded-full hover:bg-opacity-20 hover:bg-white"
// // // //             >
// // // //               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className={`flex flex-1 overflow-hidden p-4 ${darkMode ? 'bg-slate-900' : 'bg-sky-50'}`}>
// // // //         {/* Centered Chat Container */}
// // // //         <div className={`w-full max-w-4xl mx-auto ${darkMode ? 'bg-slate-800 text-white' : 'bg-white'} rounded-xl shadow-lg overflow-hidden flex flex-col`}>
// // // //           {/* Messages */}
// // // //           <div className={`flex-1 overflow-y-auto p-4 ${darkMode ? 'bg-gradient-to-b from-slate-800 to-slate-900' : 'bg-gradient-to-b from-sky-50 to-white'}`}>
// // // //             {messages.length === 0 ? (
// // // //               <div className="flex items-center justify-center h-full text-gray-500">
// // // //                 <div className={`text-center p-8 ${darkMode ? 'bg-slate-800 bg-opacity-50 border border-slate-700 text-slate-300' : 'bg-sky-50 bg-opacity-50 rounded-xl border border-sky-100'}`}>
// // // //                   <div className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} rounded-full flex items-center justify-center`}>
// // // //                     <MessageCircle className={`${darkMode ? 'text-sky-400' : 'text-sky-500'}`} size={24} />
// // // //                   </div>
// // // //                   <h3 className={`font-medium text-lg ${darkMode ? 'text-sky-400' : 'text-sky-600'} mb-2`}>Start a conversation</h3>
// // // //                   <p className={`mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>How are you feeling today? I'm here to listen and support you.</p>
// // // //                   {speechSupported && (
// // // //                     <p className={`text-sm mt-2 ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
// // // //                       <span className="inline-flex items-center">
// // // //                         <Mic className="h-4 w-4 mr-1" />
// // // //                         You can use the microphone to speak
// // // //                       </span>
// // // //                     </p>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             ) : (
// // // //               messages.map((msg, index) => (
// // // //                 <div key={msg.id || index} className="mb-4">
// // // //                   {/* User message */}
// // // //                   <div className="flex justify-end mb-2">
// // // //                     <div className={`${darkMode ? 'bg-sky-700' : 'bg-sky-600'} text-white rounded-2xl rounded-tr-none py-2 px-4 max-w-md shadow-sm`}>
// // // //                       <p>{msg.user}</p>
// // // //                       <p className={`text-xs ${darkMode ? 'text-sky-300' : 'text-sky-100'} mt-1`}>{formatDate(msg.timestamp)}</p>
// // // //                     </div>
// // // //                   </div>
                  
// // // //                   {/* Bot response */}
// // // //                   {msg.bot ? (
// // // //                     <div className="flex justify-start">
// // // //                       <div className={`rounded-2xl rounded-tl-none py-2 px-4 border max-w-md shadow-sm ${emotionColors[msg.emotion]}`}>
// // // //                         <p>{msg.bot}</p>
// // // //                         {msg.copingStrategy && (
// // // //                           <div className={`mt-2 p-2 ${darkMode ? 'bg-slate-700 bg-opacity-70' : 'bg-white bg-opacity-70'} rounded-md`}>
// // // //                             <p className={`text-sm font-medium ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>Coping Strategy:</p>
// // // //                             <p className="text-sm">{msg.copingStrategy}</p>
// // // //                           </div>
// // // //                         )}
// // // //                         <div className="flex justify-between items-center mt-1">
// // // //                           <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{formatDate(msg.timestamp)}</span>
// // // //                           {msg.emotion !== 'neutral' && (
// // // //                             <span className={`text-xs px-2 py-0.5 ${darkMode ? 'bg-slate-700 bg-opacity-70 text-sky-400' : 'bg-white bg-opacity-70 text-sky-700'} rounded-full`}>
// // // //                               {msg.emotion}
// // // //                             </span>
// // // //                           )}
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   ) : loading ? (
// // // //                     <div className="flex justify-start">
// // // //                       <div className={`${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-sky-50 border-sky-100'} rounded-2xl rounded-tl-none py-3 px-4 max-w-md border`}>
// // // //                         <div className="flex space-x-1">
// // // //                           <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce`}></div>
// // // //                           <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce delay-100`}></div>
// // // //                           <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce delay-200`}></div>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   ) : null}
// // // //                 </div>
// // // //               ))
// // // //             )}
// // // //             <div ref={messagesEndRef} />
// // // //           </div>

// // // //           {/* Input area */}
// // // //           <div className={`border-t ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-sky-100 bg-white'} p-4`}>
// // // //             <form onSubmit={handleSendMessage} className="flex space-x-2">
// // // //               <input
// // // //                 type="text"
// // // //                 value={input}
// // // //                 onChange={(e) => setInput(e.target.value)}
// // // //                 placeholder="Type your message..."
// // // //                 className={`flex-1 border rounded-full px-4 py-3 focus:outline-none focus:ring-2 ${
// // // //                   darkMode 
// // // //                     ? 'bg-slate-700 border-slate-600 text-white focus:ring-sky-500' 
// // // //                     : 'bg-sky-50 border-sky-200 focus:ring-sky-300'
// // // //                 }`}
// // // //                 disabled={loading}
// // // //               />
              
// // // //               {/* Voice input button */}
// // // //               {speechSupported && (
// // // //                 <button 
// // // //                   type="button"
// // // //                   onClick={toggleListening}
// // // //                   disabled={loading}
// // // //                   className={`rounded-full p-2 w-12 h-12 flex items-center justify-center ${
// // // //                     isListening 
// // // //                       ? 'bg-red-500 text-white animate-pulse hover:bg-red-600' 
// // // //                       : darkMode
// // // //                         ? 'bg-slate-700 text-sky-400 hover:bg-slate-600'
// // // //                         : 'bg-sky-100 text-sky-600 hover:bg-sky-200'
// // // //                   }`}
// // // //                 >
// // // //                   <Mic size={20} />
// // // //                 </button>
// // // //               )}
              
// // // //               {/* Send button */}
// // // //               <button
// // // //                 type="submit"
// // // //                 disabled={loading || !input.trim()}
// // // //                 className={`rounded-full p-2 w-12 h-12 flex items-center justify-center ${
// // // //                   darkMode
// // // //                     ? 'bg-sky-600 text-white hover:bg-sky-700' 
// // // //                     : 'bg-sky-500 text-white hover:bg-sky-600'
// // // //                 } disabled:opacity-50 shadow-sm`}
// // // //               >
// // // //                 <Send size={20} />
// // // //               </button>
// // // //             </form>
            
// // // //             {/* Speech recognition status indicator */}
// // // //             {isListening && (
// // // //               <div className="text-center mt-2 text-sm text-red-500">
// // // //                 <div className="inline-flex items-center">
// // // //                   <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
// // // //                   Listening... Speak now
// // // //                 </div>
// // // //               </div>
// // // //             )}
            
// // // //             <div className="flex justify-center mt-3 space-x-3 text-sm">
// // // //               <button
// // // //                 onClick={handleQuickResponse}
// // // //                 disabled={loading || !input.trim()}
// // // //                 className={`${darkMode ? 'text-sky-400' : 'text-sky-600'} hover:underline disabled:opacity-50 px-2 py-1 rounded ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-sky-50'}`}
// // // //               >
// // // //                 Quick Response (No Save)
// // // //               </button>
// // // //               <span className={darkMode ? 'text-slate-600' : 'text-sky-200'}>|</span>
// // // //               <button
// // // //                 onClick={analyzeEmotionOnly}
// // // //                 disabled={loading || !input.trim()}
// // // //                 className={`${darkMode ? 'text-sky-400' : 'text-sky-600'} hover:underline disabled:opacity-50 px-2 py-1 rounded ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-sky-50'}`}
// // // //               >
// // // //                 Analyze Emotion Only
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Emotion Insights Sidebar - Hidden on mobile */}
// // // //         {emotionalInsight && (
// // // //           <div className="hidden lg:block w-64 ml-4 flex-shrink-0">
// // // //             <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-sky-100'} rounded-xl shadow-md p-4 border`}>
// // // //               <h3 className={`font-semibold ${darkMode ? 'text-sky-400' : 'text-sky-700'} mb-3 flex items-center`}>
// // // //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
// // // //                   <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
// // // //                   <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
// // // //                 </svg>
// // // //                 Emotional Insights
// // // //               </h3>
// // // //               <div className={`${darkMode ? 'bg-slate-700' : 'bg-sky-50'} rounded-lg p-3`}>
// // // //                 <p className="text-sm mb-2">
// // // //                   <span className={`font-medium ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>Dominant emotion:</span> {emotionalInsight.dominantEmotion}
// // // //                 </p>
// // // //                 <p className="text-sm mb-3">
// // // //                   <span className={`font-medium ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>Emotional state:</span> {emotionalInsight.emotionalState}
// // // //                 </p>
                
// // // //                 <h4 className={`text-xs font-medium ${darkMode ? 'text-sky-400' : 'text-sky-600'} mb-2`}>Emotion Frequency</h4>
// // // //                 {Object.entries(emotionalInsight.emotionFrequency).map(([emotion, count]) => (
// // // //                   <div key={emotion} className="mb-2">
// // // //                     <div className="flex justify-between text-xs mb-1">
// // // //                       <span className="capitalize">{emotion}</span>
// // // //                       <span>{count}</span>
// // // //                     </div>
// // // //                     <div className={`w-full ${darkMode ? 'bg-slate-600' : 'bg-sky-100'} rounded-full h-2`}>
// // // //                       <div 
// // // //                         className={`h-2 rounded-full ${
// // // //                           emotion === 'joy' || emotion === 'hope' 
// // // //                             ? darkMode ? 'bg-green-400' : 'bg-green-500' 
// // // //                             : darkMode ? 'bg-sky-400' : 'bg-sky-500'
// // // //                         }`}
// // // //                         style={{ width: `${Math.min(count * 20, 100)}%` }}
// // // //                       ></div>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ChatInterface;
// import { useState, useEffect, useRef } from 'react';
// import { Mic, Send, MessageCircle, Sun, Moon, Calendar, Search, X } from 'lucide-react';

// const ChatInterface = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [userId, setUserId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [emotionalInsight, setEmotionalInsight] = useState(null);
//   const messagesEndRef = useRef(null);
  
//   // Speech recognition states
//   const [isListening, setIsListening] = useState(false);
//   const [speechRecognition, setSpeechRecognition] = useState(null);
//   const [speechSupported, setSpeechSupported] = useState(false);
  
//   // Dark mode state (synced with header)
//   const [darkMode, setDarkMode] = useState(false);
  
//   // Therapist recommendation states
//   const [showTherapistModal, setShowTherapistModal] = useState(false);
//   const [therapists, setTherapists] = useState([]);
//   const [filteredTherapists, setFilteredTherapists] = useState([]);
//   const [specialties, setSpecialties] = useState([]);
//   const [selectedSpecialty, setSelectedSpecialty] = useState('');
//   const [selectedTherapist, setSelectedTherapist] = useState(null);
//   const [therapistAvailability, setTherapistAvailability] = useState([]);
//   const [appointmentDate, setAppointmentDate] = useState('');
//   const [appointmentTime, setAppointmentTime] = useState('');
//   const [appointmentNotes, setAppointmentNotes] = useState('');
//   const [bookingStatus, setBookingStatus] = useState({
//     status: '',
//     message: ''
//   });
//   const [showBookingForm, setShowBookingForm] = useState(false);

//   // API URLs - Fixed to properly use Vite environment variables
//   const API_URL = {
//     CHAT: `${import.meta.env.VITE_API_URL}/api/chatbot/analyze`,
//     HISTORY: `${import.meta.env.VITE_API_URL}/api/chatbot/history`,
//     QUICK_RESPONSE: `${import.meta.env.VITE_API_URL}/api/chatbot/quick-response`,
//     EMOTION: `${import.meta.env.VITE_API_URL}/api/chatbot/emotion`,
//     THERAPISTS: `${import.meta.env.VITE_API_URL}/api/therapists`,
//     SPECIALTIES: `${import.meta.env.VITE_API_URL}/api/therapists/specialties`,
//     THERAPIST_AVAILABILITY: (id) => `${import.meta.env.VITE_API_URL}/api/therapists/${id}/availability`,
//     BOOK_APPOINTMENT: (id) => `${import.meta.env.VITE_API_URL}/api/therapists/${id}/book`
//   };

//   // Emotion colors for visual cues
//   const emotionColors = {
//     anxiety: darkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-100 border-blue-300',
//     sadness: darkMode ? 'bg-indigo-900 border-indigo-700' : 'bg-indigo-100 border-indigo-300',
//     anger: darkMode ? 'bg-red-900 border-red-700' : 'bg-red-100 border-red-300',
//     joy: darkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-100 border-yellow-300',
//     overwhelm: darkMode ? 'bg-purple-900 border-purple-700' : 'bg-purple-100 border-purple-300',
//     loneliness: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300',
//     hope: darkMode ? 'bg-green-900 border-green-700' : 'bg-green-100 border-green-300',
//     neutral: darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
//   };

//   // Initialize speech recognition
//   useEffect(() => {
//     // Check if browser supports speech recognition and if it's enabled in env
//     if ((import.meta.env.VITE_ENABLE_SPEECH_RECOGNITION === 'true') && 
//         ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       const recognition = new SpeechRecognition();
      
//       recognition.continuous = false;
//       recognition.interimResults = true;
//       recognition.lang = 'en-US';
      
//       recognition.onresult = (event) => {
//         const transcript = Array.from(event.results)
//           .map(result => result[0])
//           .map(result => result.transcript)
//           .join('');
          
//         setInput(transcript);
//       };
      
//       recognition.onend = () => {
//         setIsListening(false);
//       };
      
//       recognition.onerror = (event) => {
//         console.error('Speech recognition error', event.error);
//         setIsListening(false);
//       };
      
//       setSpeechRecognition(recognition);
//       setSpeechSupported(true);
//     } else {
//       console.log('Speech recognition not supported or disabled');
//       setSpeechSupported(false);
//     }
//   }, []);

//   // Load specialties when component mounts
//   useEffect(() => {
//     fetchSpecialties();
//   }, []);

//   // Load therapists for filtering
//   useEffect(() => {
//     fetchTherapists();
//   }, [selectedSpecialty]);

//   // Handle toggling speech recognition
//   const toggleListening = () => {
//     if (isListening) {
//       speechRecognition.stop();
//       setIsListening(false);
//     } else {
//       setInput('');
//       speechRecognition.start();
//       setIsListening(true);
//     }
//   };

//   // Load chat history when userId changes
//   useEffect(() => {
//     if (userId) {
//       fetchChatHistory();
//     }
//   }, [userId]);

//   // Auto-scroll to bottom of messages
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   // Check if user needs therapist recommendation based on emotions
//   const checkForTherapistRecommendation = (emotionData) => {
//     // Logic to determine if user needs therapist recommendation
//     // Here we're checking if they have intense negative emotions
//     if (!emotionData) return false;
    
//     const negativeEmotions = ['anxiety', 'sadness', 'anger', 'overwhelm', 'loneliness'];
//     const detectedEmotion = emotionData.detectedEmotion;
    
//     // If no emotional insight yet, start tracking negative messages
//     if (!emotionalInsight && negativeEmotions.includes(detectedEmotion)) {
//       return true;
//     }
    
//     // If we have emotional insight and there's a pattern of negative emotions
//     if (emotionalInsight) {
//       const negativeCount = negativeEmotions.reduce((count, emotion) => {
//         return count + (emotionalInsight.emotionFrequency[emotion] || 0);
//       }, 0);
      
//       const totalCount = Object.values(emotionalInsight.emotionFrequency).reduce((sum, count) => sum + count, 0);
      
//       // If more than 60% of messages show negative emotions, suggest a therapist
//       if (negativeCount / totalCount > 0.6) {
//         return true;
//       }
//     }
    
//     return false;
//   };

//   const fetchChatHistory = async () => {
//     if (!userId.trim()) return;
    
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_URL.HISTORY}?userId=${encodeURIComponent(userId)}`);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch chat history');
//       }
//       const data = await response.json();
      
//       if (data.success) {
//         // Convert backend data format to frontend format
//         const convertedMessages = data.data.map(chat => ({
//           id: chat._id,
//           user: chat.userInput,
//           bot: chat.botResponse,
//           emotion: chat.emotionalData?.detectedEmotion || 'neutral',
//           copingStrategy: chat.emotionalData?.copingStrategy || null,
//           timestamp: new Date(chat.timestamp)
//         }));
        
//         setMessages(convertedMessages);
        
//         // Set emotional insight if available
//         if (data.emotionalInsight) {
//           setEmotionalInsight(data.emotionalInsight);
//         }
//       } else {
//         console.error('Error fetching chat history:', data.message);
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching chat history:', error);
//       setLoading(false);
//     }
//   };

//   const fetchTherapists = async () => {
//     try {
//       let url = API_URL.THERAPISTS;
//       if (selectedSpecialty) {
//         url += `?specialty=${encodeURIComponent(selectedSpecialty)}`;
//       }
      
//       const response = await fetch(url);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch therapists');
//       }
      
//       const data = await response.json();
      
//       if (data.success) {
//         setTherapists(data.data);
//         setFilteredTherapists(data.data);
//       } else {
//         console.error('Error fetching therapists:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching therapists:', error);
//     }
//   };

//   const fetchSpecialties = async () => {
//     try {
//       const response = await fetch(API_URL.SPECIALTIES);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch specialties');
//       }
      
//       const data = await response.json();
      
//       if (data.success) {
//         setSpecialties(data.data);
//       } else {
//         console.error('Error fetching specialties:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching specialties:', error);
//     }
//   };

//   const fetchTherapistAvailability = async (therapistId) => {
//     try {
//       const response = await fetch(API_URL.THERAPIST_AVAILABILITY(therapistId));
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch therapist availability');
//       }
      
//       const data = await response.json();
      
//       if (data.success) {
//         setTherapistAvailability(data.data);
//       } else {
//         console.error('Error fetching therapist availability:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching therapist availability:', error);
//     }
//   };

//   const bookAppointment = async () => {
//     if (!appointmentDate || !appointmentTime || !userId || !selectedTherapist) {
//       setBookingStatus({
//         status: 'error',
//         message: 'Please fill out all required fields'
//       });
//       return;
//     }
    
//     try {
//       setLoading(true);
//       const response = await fetch(API_URL.BOOK_APPOINTMENT(selectedTherapist._id), {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
//         },
//         body: JSON.stringify({
//           date: appointmentDate,
//           time: appointmentTime,
//           userId,
//           notes: appointmentNotes
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to book appointment');
//       }
      
//       const data = await response.json();
      
//       if (data.success) {
//         setBookingStatus({
//           status: 'success',
//           message: 'Appointment booked successfully!'
//         });
        
//         // Add confirmation message to chat
//         const botMessage = {
//           id: Date.now(),
//           user: null,
//           bot: `I've booked an appointment with ${selectedTherapist.name} on ${appointmentDate} at ${appointmentTime}. You will receive a confirmation email with further details.`,
//           emotion: 'hope',
//           timestamp: new Date()
//         };
        
//         setMessages(prev => [...prev, botMessage]);
        
//         // Close modal after successful booking
//         setTimeout(() => {
//           setShowTherapistModal(false);
//           setShowBookingForm(false);
//           setBookingStatus({ status: '', message: '' });
//         }, 3000);
//       } else {
//         throw new Error(data.message || 'Failed to book appointment');
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error booking appointment:', error);
//       setBookingStatus({
//         status: 'error',
//         message: error.message || 'Failed to book appointment. Please try again.'
//       });
//       setLoading(false);
//     }
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     // Stop listening if active
//     if (isListening && speechRecognition) {
//       speechRecognition.stop();
//       setIsListening(false);
//     }

//     // Add user message immediately for better UX
//     const userMessage = {
//       id: Date.now(),
//       user: input,
//       bot: null,
//       emotion: 'neutral',
//       timestamp: new Date()
//     };
    
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       // Send message to backend API
//       const response = await fetch(API_URL.CHAT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
//         },
//         body: JSON.stringify({
//           userInput: userMessage.user,
//           userId: userId.trim() || null
//         })
//       });

//       if (!response.ok) {
//         throw new Error('Server responded with an error');
//       }

//       const data = await response.json();
      
//       if (data.success) {
//         // Update the message with the bot response
//         setMessages(prev => 
//           prev.map(msg => 
//             msg.id === userMessage.id 
//               ? { 
//                   ...msg, 
//                   bot: data.data.botResponse, 
//                   emotion: data.data.emotionalData?.detectedEmotion || 'neutral',
//                   copingStrategy: data.data.emotionalData?.copingStrategy || null
//                 } 
//               : msg
//           )
//         );
        
//         // Check if we should recommend a therapist based on emotional analysis
//         if (data.data.emotionalData && checkForTherapistRecommendation(data.data.emotionalData)) {
//           // Wait a moment before showing the therapist recommendation
//           setTimeout(() => {
//             const recommendationMessage = {
//               id: Date.now() + 1,
//               user: null,
//               bot: "I notice you've been experiencing some difficult emotions. Would you like me to connect you with a professional therapist who can provide additional support?",
//               emotion: 'hope',
//               isRecommendation: true,
//               timestamp: new Date()
//             };
            
//             setMessages(prev => [...prev, recommendationMessage]);
//           }, 2000);
//         }
//       } else {
//         throw new Error(data.message || 'Failed to get response');
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       // Update with error message
//       setMessages(prev => 
//         prev.map(msg => 
//           msg.id === userMessage.id 
//             ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
//             : msg
//         )
//       );
//       setLoading(false);
//     }
//   };

//   const handleTherapistSelection = (therapist) => {
//     setSelectedTherapist(therapist);
//     fetchTherapistAvailability(therapist._id);
//     setShowBookingForm(true);
//   };

//   const handleQuickResponse = async () => {
//     if (!input.trim()) return;
    
//     // Stop listening if active
//     if (isListening && speechRecognition) {
//       speechRecognition.stop();
//       setIsListening(false);
//     }
    
//     const userMessage = {
//       id: Date.now(),
//       user: input,
//       bot: null,
//       emotion: 'neutral',
//       timestamp: new Date()
//     };
    
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       // Use quick response endpoint
//       const response = await fetch(API_URL.QUICK_RESPONSE, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
//         },
//         body: JSON.stringify({
//           userInput: userMessage.user
//         })
//       });

//       if (!response.ok) {
//         throw new Error('Server responded with an error');
//       }

//       const data = await response.json();
      
//       if (data.success) {
//         setMessages(prev => 
//           prev.map(msg => 
//             msg.id === userMessage.id 
//               ? { ...msg, bot: data.data.response, emotion: 'neutral' } 
//               : msg
//           )
//         );
//       } else {
//         throw new Error(data.message || 'Failed to get quick response');
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error getting quick response:', error);
//       setMessages(prev => 
//         prev.map(msg => 
//           msg.id === userMessage.id 
//             ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
//             : msg
//         )
//       );
//       setLoading(false);
//     }
//   };

//   const analyzeEmotionOnly = async () => {
//     // Check if emotion analytics is enabled in environment
//     if (import.meta.env.VITE_ENABLE_EMOTION_ANALYTICS !== 'true') {
//       alert('Emotion analytics is disabled.');
//       return;
//     }

//     if (!input.trim()) return;
    
//     // Stop listening if active
//     if (isListening && speechRecognition) {
//       speechRecognition.stop();
//       setIsListening(false);
//     }
    
//     setLoading(true);
//     try {
//       // Use emotion-only endpoint
//       const response = await fetch(API_URL.EMOTION, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
//         },
//         body: JSON.stringify({
//           userInput: input
//         })
//       });

//       if (!response.ok) {
//         throw new Error('Server responded with an error');
//       }

//       const data = await response.json();
      
//       if (data.success) {
//         // Use browser alert to show emotion analysis
//         const emotionalState = data.data.emotionalState;
//         alert(`Detected emotion: ${emotionalState.emotion || 'neutral'} (${emotionalState.intensity || 'moderate'})`);
//       } else {
//         throw new Error(data.message || 'Failed to analyze emotion');
//       }
      
//       setLoading(false);
//     } catch (error) {
//       console.error('Error analyzing emotion:', error);
//       alert('Failed to analyze emotion. Please try again.');
//       setLoading(false);
//     }
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   // Toggle dark mode function
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const handleTherapistRecommendation = () => {
//     setShowTherapistModal(true);
//     fetchTherapists();
//   };

//   return (
//     <div className={`flex flex-col h-screen ${darkMode ? 'bg-slate-900' : 'bg-sky-50'}`}>
//       {/* Chat Header */}
//       <div className={`w-full py-4 ${darkMode ? 'bg-slate-800 text-white' : 'bg-sky-500 text-white'} shadow-md`}>
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Mental Health Chat Assistant</h1>
//           <div className="flex items-center">
//             <input
//               type="text"
//               placeholder="Enter User ID (optional)"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//               className={`mr-2 px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 ${darkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800'}`}
//             />
//             <button 
//               onClick={fetchChatHistory}
//               disabled={!userId.trim()}
//               className={`${darkMode ? 'bg-slate-700 text-sky-400 hover:bg-slate-600' : 'bg-white text-sky-600 hover:bg-sky-100'} px-3 py-1 rounded text-sm disabled:opacity-50`}
//             >
//               Load History
//             </button>
            
//             {/* Dark mode toggle */}
//             <button 
//               onClick={toggleDarkMode} 
//               className="ml-3 p-1 rounded-full hover:bg-opacity-20 hover:bg-white"
//             >
//               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className={`flex flex-1 overflow-hidden p-4 ${darkMode ? 'bg-slate-900' : 'bg-sky-50'}`}>
//         {/* Centered Chat Container */}
//         <div className={`w-full max-w-4xl mx-auto ${darkMode ? 'bg-slate-800 text-white' : 'bg-white'} rounded-xl shadow-lg overflow-hidden flex flex-col`}>
//           {/* Messages */}
//           <div className={`flex-1 overflow-y-auto p-4 ${darkMode ? 'bg-gradient-to-b from-slate-800 to-slate-900' : 'bg-gradient-to-b from-sky-50 to-white'}`}>
//             {messages.length === 0 ? (
//               <div className="flex items-center justify-center h-full text-gray-500">
//                 <div className={`text-center p-8 ${darkMode ? 'bg-slate-800 bg-opacity-50 border border-slate-700 text-slate-300' : 'bg-sky-50 bg-opacity-50 rounded-xl border border-sky-100'}`}>
//                   <div className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} rounded-full flex items-center justify-center`}>
//                     <MessageCircle className={`${darkMode ? 'text-sky-400' : 'text-sky-500'}`} size={24} />
//                   </div>
//                   <h3 className={`font-medium text-lg ${darkMode ? 'text-sky-400' : 'text-sky-600'} mb-2`}>Start a conversation</h3>
//                   <p className={`mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>How are you feeling today? I'm here to listen and support you.</p>
//                   {speechSupported && (
//                     <p className={`text-sm mt-2 ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
//                       <span className="inline-flex items-center">
//                         <Mic className="h-4 w-4 mr-1" />
//                         You can use the microphone to speak
//                       </span>
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               messages.map((msg, index) => (
//                 <div key={msg.id || index} className="mb-4">
//                   {/* User message */}
//                   {msg.user && (
//                     <div className="flex justify-end mb-2">
//                       <div className={`${darkMode ? 'bg-sky-700' : 'bg-sky-600'} text-white rounded-2xl rounded-tr-none py-2 px-4 max-w-md shadow-sm`}>
//                         <p>{msg.user}</p>
//                         <p className={`text-xs ${darkMode ? 'text-sky-300' : 'text-sky-100'} mt-1`}>{formatDate(msg.timestamp)}</p>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* Bot response */}
//                   {msg.bot ? (
//                     <div className="flex justify-start">
//                       <div className={`rounded-2xl rounded-tl-none py-2 px-4 border max-w-md shadow-sm ${emotionColors[msg.emotion]}`}>
//                         <p>{msg.bot}</p>
//                         {msg.copingStrategy && (
//                           <div className={`mt-2 p-2 ${darkMode ? 'bg-slate-700 bg-opacity-70' : 'bg-white bg-opacity-70'} rounded-md`}>
//                             <p className={`text-sm font-medium ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>Coping Strategy:</p>
//                             <p className="text-sm">{msg.copingStrategy}</p>
//                           </div>
//                         )}
                        
//                         {msg.isRecommendation && (
//                           <div className="mt-3">
//                             <button
//                               onClick={handleTherapistRecommendation}
//                               className={`${darkMode ? 'bg-sky-600 hover:bg-sky-700' : 'bg-sky-500 hover:bg-sky-600'} text-white rounded-lg py-1 px-3 text-sm flex items-center`}
//                             >
//                               <Calendar className="h-4 w-4 mr-1" />
//                               Find a Therapist
//                             </button>
//                           </div>
//                         )}
                        
//                         <div className="flex justify-between items-center mt-1">
//                           <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{formatDate(msg.timestamp)}</span>
//                           {msg.emotion !== 'neutral' && (
//                             <span className={`text-xs px-2 py-0.5 ${darkMode ? 'bg-slate-700 bg-opacity-70 text-sky-400' : 'bg-white bg-opacity-70 text-sky-700'} rounded-full`}>
//                               {msg.emotion}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ) : loading ? (
//                     <div className="flex justify-start">
//                       <div className={`${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-sky-50 border-sky-100'} rounded-2xl rounded-tl-none py-3 px-4 max-w-md border`}>
//                         <div className="flex space-x-1">
//                           <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce`}></div>
//                           <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce delay-100`}></div>
//                           <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce delay-200`}></div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : null}
//                 </div>
//               ))
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input area */}
//           <div className={`border-t ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-sky-100 bg-white'} p-4`}>
//             <form onSubmit={handleSendMessage} className="flex space-x-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type your message..."
//                 className={`flex-1 border rounded-full px-4 py-3 focus:outline-none focus:ring-2 ${
//                   darkMode 
//                     ? 'bg-slate-700 border-slate-600 text-white focus:ring-sky-500' 
//                     : 'bg-sky-50 border-sky-200 focus:ring-sky-300'
//                 }`}
//                 disabled={loading}
//               />
              
//               {/* Voice input button */}
//               {speechSupported && (
//                 <button 
//                   type="button"
//                   onClick={toggleListening}
//                   disabled={loading}
//                   className={`rounded-full p-2 w-12 h-12 flex items-center justify-center ${
//                     isListening 
//                       ? 'bg-red-500 text-white animate-pulse hover:bg-red-600' 
//                       : darkMode
//                         ? 'bg-slate-700 text-sky-400 hover:bg-slate-600'
//                         : 'bg-sky-100 text-sky-600 hover:bg-sky-200'
//                   }`}
//                 >
//                   <Mic size={20} />
//                 </button>
//               )}
              
//               {/* Send button */}
//               <button
//                 type="submit"
//                 disabled={loading || !input.trim()}
//                 className={`rounded-full p-2 w-12 h-12 flex items-center justify-center ${
//                   darkMode
//                     ? 'bg-sky-600 text-white hover:bg-sky-700' 
//                     : 'bg-sky-500 text-white hover:bg-sky-600'
//                 } disabled:opacity-50 shadow-sm`}
//               >
//                 <Send size={20} />
//               </button>
//             </form>
            
//             {/* Speech recognition status indicator */}
//             {isListening && (
//              <div className="text-center mt-2">
//                 <span className={`text-sm ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
//                   Listening... Speak now
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Therapist Recommendation Modal */}
//       {showTherapistModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-white'} rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl`}>
//             {/* Modal Header */}
//             <div className={`p-4 border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'} flex justify-between items-center sticky top-0 ${darkMode ? 'bg-slate-800' : 'bg-white'} z-10`}>
//               <h2 className="text-xl font-semibold">Find a Therapist</h2>
//               <button 
//                 onClick={() => {
//                   setShowTherapistModal(false);
//                   setShowBookingForm(false);
//                   setSelectedTherapist(null);
//                 }} 
//                 className="p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-200"
//               >
//                 <X size={24} />
//               </button>
//             </div>
            
//             {showBookingForm ? (
//               /* Booking Form */
//               <div className="p-6">
//                 <div className="flex items-start mb-6">
//                   <div className={`w-20 h-20 rounded-full overflow-hidden mr-4 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} flex items-center justify-center`}>
//                     {selectedTherapist?.avatar ? (
//                       <img src={selectedTherapist.avatar} alt={selectedTherapist.name} className="w-full h-full object-cover" />
//                     ) : (
//                       <div className={`text-xl font-bold ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
//                         {selectedTherapist?.name?.charAt(0) || 'T'}
//                       </div>
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold">{selectedTherapist?.name}</h3>
//                     <p className={`${darkMode ? 'text-slate-300' : 'text-gray-600'} mb-1`}>{selectedTherapist?.title}</p>
//                     <div className="flex flex-wrap">
//                       {selectedTherapist?.specialties?.map((specialty, idx) => (
//                         <span 
//                           key={idx} 
//                           className={`text-xs mr-2 mb-1 px-2 py-1 rounded-full ${darkMode ? 'bg-slate-700 text-sky-400' : 'bg-sky-100 text-sky-700'}`}
//                         >
//                           {specialty}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className={`p-4 mb-6 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-sky-50'}`}>
//                   <h4 className="font-medium mb-2">Available times</h4>
//                   {therapistAvailability.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className={`block mb-2 text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
//                           Select Date
//                         </label>
//                         <select 
//                           value={appointmentDate} 
//                           onChange={(e) => setAppointmentDate(e.target.value)}
//                           className={`w-full p-2 rounded border ${
//                             darkMode 
//                               ? 'bg-slate-800 border-slate-600 text-white' 
//                               : 'bg-white border-gray-300'
//                           }`}
//                         >
//                           <option value="">Select a date</option>
//                           {[...new Set(therapistAvailability.map(slot => slot.date))].map(date => (
//                             <option key={date} value={date}>{date}</option>
//                           ))}
//                         </select>
//                       </div>
                      
//                       <div>
//                         <label className={`block mb-2 text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
//                           Select Time
//                         </label>
//                         <select 
//                           value={appointmentTime} 
//                           onChange={(e) => setAppointmentTime(e.target.value)}
//                           disabled={!appointmentDate}
//                           className={`w-full p-2 rounded border ${
//                             darkMode 
//                               ? 'bg-slate-800 border-slate-600 text-white' 
//                               : 'bg-white border-gray-300'
//                           } disabled:opacity-50`}
//                         >
//                           <option value="">Select a time</option>
//                           {therapistAvailability
//                             .filter(slot => slot.date === appointmentDate)
//                             .map(slot => (
//                               <option key={slot.time} value={slot.time}>{slot.time}</option>
//                             ))}
//                         </select>
//                       </div>
//                     </div>
//                   ) : (
//                     <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
//                       Loading availability...
//                     </p>
//                   )}
//                 </div>
                
//                 <div className="mb-6">
//                   <label className={`block mb-2 text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
//                     Notes (optional)
//                   </label>
//                   <textarea 
//                     value={appointmentNotes}
//                     onChange={(e) => setAppointmentNotes(e.target.value)}
//                     placeholder="Add any notes or questions for the therapist..."
//                     rows={3}
//                     className={`w-full p-3 rounded border ${
//                       darkMode 
//                         ? 'bg-slate-800 border-slate-600 text-white placeholder:text-slate-400' 
//                         : 'bg-white border-gray-300 placeholder:text-gray-400'
//                     }`}
//                   ></textarea>
//                 </div>
                
//                 {bookingStatus.message && (
//                   <div className={`p-3 mb-4 rounded-lg ${
//                     bookingStatus.status === 'success'
//                       ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
//                       : darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
//                   }`}>
//                     {bookingStatus.message}
//                   </div>
//                 )}
                
//                 <div className="flex gap-3 justify-end">
//                   <button
//                     onClick={() => {
//                       setShowBookingForm(false);
//                       setSelectedTherapist(null);
//                     }}
//                     className={`px-4 py-2 rounded-lg ${
//                       darkMode
//                         ? 'bg-slate-700 text-white hover:bg-slate-600'
//                         : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
//                     }`}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={bookAppointment}
//                     disabled={!appointmentDate || !appointmentTime || loading}
//                     className={`px-4 py-2 rounded-lg ${
//                       darkMode
//                         ? 'bg-sky-600 text-white hover:bg-sky-700'
//                         : 'bg-sky-500 text-white hover:bg-sky-600'
//                     } disabled:opacity-50`}
//                   >
//                     {loading ? 'Booking...' : 'Book Appointment'}
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               /* Therapist List */
//               <div className="p-6">
//                 <div className="mb-6">
//                   <div className="flex items-center mb-4">
//                     <Search className={`w-5 h-5 mr-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`} />
//                     <h3 className="text-lg font-medium">Filter therapists</h3>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className={`block mb-2 text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
//                         Specialty
//                       </label>
//                       <select 
//                         value={selectedSpecialty} 
//                         onChange={(e) => setSelectedSpecialty(e.target.value)}
//                         className={`w-full p-2 rounded border ${
//                           darkMode 
//                             ? 'bg-slate-800 border-slate-600 text-white' 
//                             : 'bg-white border-gray-300'
//                         }`}
//                       >
//                         <option value="">All Specialties</option>
//                         {specialties.map(specialty => (
//                           <option key={specialty} value={specialty}>{specialty}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
                
//                 {filteredTherapists.length > 0 ? (
//                   <div className="space-y-4">
//                     {filteredTherapists.map(therapist => (
//                       <div 
//                         key={therapist._id}
//                         className={`border ${darkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-gray-200 hover:bg-sky-50'} rounded-lg p-4 cursor-pointer transition-colors`}
//                         onClick={() => handleTherapistSelection(therapist)}
//                       >
//                         <div className="flex items-start">
//                           <div className={`w-16 h-16 rounded-full overflow-hidden mr-4 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} flex items-center justify-center`}>
//                             {therapist.avatar ? (
//                               <img src={therapist.avatar} alt={therapist.name} className="w-full h-full object-cover" />
//                             ) : (
//                               <div className={`text-xl font-bold ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
//                                 {therapist.name.charAt(0)}
//                               </div>
//                             )}
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex justify-between">
//                               <h3 className="font-semibold">{therapist.name}</h3>
//                               <span className={`${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>
//                                 {therapist.rate}
//                               </span>
//                             </div>
//                             <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'} mb-2`}>
//                               {therapist.title}
//                             </p>
//                             <div className="flex flex-wrap">
//                               {therapist.specialties.map((specialty, idx) => (
//                                 <span 
//                                   key={idx} 
//                                   className={`text-xs mr-2 mb-1 px-2 py-0.5 rounded-full ${
//                                     darkMode ? 'bg-slate-700 text-sky-400' : 'bg-sky-100 text-sky-700'
//                                   }`}
//                                 >
//                                   {specialty}
//                                 </span>
//                               ))}
//                             </div>
//                             <p className={`text-sm mt-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
//                               {therapist.bio?.substring(0, 120)}
//                               {therapist.bio?.length > 120 ? '...' : ''}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
//                     <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-opacity-20">
//                       <Search className={`w-8 h-8 ${darkMode ? 'text-slate-500' : 'text-gray-400'}`} />
//                     </div>
//                     <p className="font-medium">No therapists found</p>
//                     <p className="text-sm mt-1">Try adjusting your filters</p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatInterface;
// // import { useState, useEffect, useRef } from 'react';
// // import { Mic, Send, MessageCircle, Sun, Moon, History, User, ChevronLeft, ChevronRight, Calendar, Search, X } from 'lucide-react';

// // const ChatInterface = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [userId, setUserId] = useState('');
// //   const [userName, setUserName] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [emotionalInsight, setEmotionalInsight] = useState(null);
// //   const messagesEndRef = useRef(null);
// //   const [showHistory, setShowHistory] = useState(false);
// //   const [historyData, setHistoryData] = useState([]);
// //   const [historyLoading, setHistoryLoading] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [selectedConversation, setSelectedConversation] = useState(null);
  
// //   // Speech recognition states
// //   const [isListening, setIsListening] = useState(false);
// //   const [speechRecognition, setSpeechRecognition] = useState(null);
// //   const [speechSupported, setSpeechSupported] = useState(false);
  
// //   // Dark mode state (synced with header)
// //   const [darkMode, setDarkMode] = useState(false);

// //   // API URLs - Fixed to properly use Vite environment variables
// //   const API_URL = {
// //     CHAT: `${import.meta.env.VITE_API_URL}/api/chatbot/analyze`,
// //     HISTORY: `${import.meta.env.VITE_API_URL}/api/chatbot/history`,
// //     QUICK_RESPONSE: `${import.meta.env.VITE_API_URL}/api/chatbot/quick-response`,
// //     EMOTION: `${import.meta.env.VITE_API_URL}/api/chatbot/emotion`,
// //     USER_DATA: `${import.meta.env.VITE_API_URL}/api/user/data`
// //   };

// //   // Emotion colors for visual cues
// //   const emotionColors = {
// //     anxiety: darkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-100 border-blue-300',
// //     sadness: darkMode ? 'bg-indigo-900 border-indigo-700' : 'bg-indigo-100 border-indigo-300',
// //     anger: darkMode ? 'bg-red-900 border-red-700' : 'bg-red-100 border-red-300',
// //     joy: darkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-100 border-yellow-300',
// //     overwhelm: darkMode ? 'bg-purple-900 border-purple-700' : 'bg-purple-100 border-purple-300',
// //     loneliness: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300',
// //     hope: darkMode ? 'bg-green-900 border-green-700' : 'bg-green-100 border-green-300',
// //     neutral: darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
// //   };

// //   // Initialize speech recognition
// //   useEffect(() => {
// //     // Check if browser supports speech recognition and if it's enabled in env
// //     if ((import.meta.env.VITE_ENABLE_SPEECH_RECOGNITION === 'true') && 
// //         ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
// //       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// //       const recognition = new SpeechRecognition();
      
// //       recognition.continuous = false;
// //       recognition.interimResults = true;
// //       recognition.lang = 'en-US';
      
// //       recognition.onresult = (event) => {
// //         const transcript = Array.from(event.results)
// //           .map(result => result[0])
// //           .map(result => result.transcript)
// //           .join('');
          
// //         setInput(transcript);
// //       };
      
// //       recognition.onend = () => {
// //         setIsListening(false);
// //       };
      
// //       recognition.onerror = (event) => {
// //         console.error('Speech recognition error', event.error);
// //         setIsListening(false);
// //       };
      
// //       setSpeechRecognition(recognition);
// //       setSpeechSupported(true);
// //     } else {
// //       console.log('Speech recognition not supported or disabled');
// //       setSpeechSupported(false);
// //     }
// //   }, []);

// //   // Check for user data in localStorage on component mount
// //   useEffect(() => {
// //     const storedUserId = localStorage.getItem('userId');
// //     if (storedUserId) {
// //       setUserId(storedUserId);
// //       fetchUserData(storedUserId);
// //     }
// //   }, []);

// //   // Handle toggling speech recognition
// //   const toggleListening = () => {
// //     if (isListening) {
// //       speechRecognition.stop();
// //       setIsListening(false);
// //     } else {
// //       setInput('');
// //       speechRecognition.start();
// //       setIsListening(true);
// //     }
// //   };

// //   // Load chat history when userId changes
// //   useEffect(() => {
// //     if (userId) {
// //       localStorage.setItem('userId', userId);
// //       fetchChatHistory();
// //       fetchUserData(userId);
// //     }
// //   }, [userId]);

// //   // Auto-scroll to bottom of messages
// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages]);

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   const fetchUserData = async (id) => {
// //     if (!id.trim()) return;
    
// //     try {
// //       const response = await fetch(API_URL.USER_DATA, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
// //         },
// //         body: JSON.stringify({ userId: id })
// //       });
      
// //       if (!response.ok) {
// //         throw new Error('Failed to fetch user data');
// //       }
      
// //       const data = await response.json();
      
// //       if (data.success && data.userData) {
// //         setUserName(data.userData.name);
// //       } else {
// //         console.error('Error fetching user data:', data.message);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching user data:', error);
// //     }
// //   };

// //   const fetchChatHistory = async () => {
// //     if (!userId.trim()) return;
    
// //     try {
// //       setLoading(true);
// //       setHistoryLoading(true);
// //       const response = await fetch(`${API_URL.HISTORY}?userId=${encodeURIComponent(userId)}`);
      
// //       if (!response.ok) {
// //         throw new Error('Failed to fetch chat history');
// //       }
// //       const data = await response.json();
      
// //       if (data.success) {
// //         // Convert backend data format to frontend format
// //         const convertedMessages = data.data.map(chat => ({
// //           id: chat._id,
// //           user: chat.userInput,
// //           bot: chat.botResponse,
// //           emotion: chat.emotionalData?.detectedEmotion || 'neutral',
// //           copingStrategy: chat.emotionalData?.copingStrategy || null,
// //           timestamp: new Date(chat.timestamp)
// //         }));
        
// //         setMessages(convertedMessages);
        
// //         // Group chat messages by date for history panel
// //         const groupedByDate = groupMessagesByDate(convertedMessages);
// //         setHistoryData(groupedByDate);
        
// //         // Set emotional insight if available
// //         if (data.emotionalInsight) {
// //           setEmotionalInsight(data.emotionalInsight);
// //         }
// //       } else {
// //         console.error('Error fetching chat history:', data.message);
// //       }
      
// //       setLoading(false);
// //       setHistoryLoading(false);
// //     } catch (error) {
// //       console.error('Error fetching chat history:', error);
// //       setLoading(false);
// //       setHistoryLoading(false);
// //     }
// //   };

// //   // Function to group messages by date
// //   const groupMessagesByDate = (msgs) => {
// //     const grouped = {};
    
// //     msgs.forEach(msg => {
// //       const date = new Date(msg.timestamp).toLocaleDateString();
      
// //       if (!grouped[date]) {
// //         grouped[date] = [];
// //       }
      
// //       grouped[date].push(msg);
// //     });
    
// //     // Convert the object to array and sort by date (newest first)
// //     return Object.entries(grouped)
// //       .map(([date, messages]) => ({ 
// //         date, 
// //         messages,
// //         preview: messages[0].user.substring(0, 50) + (messages[0].user.length > 50 ? '...' : '')
// //       }))
// //       .sort((a, b) => new Date(b.date) - new Date(a.date));
// //   };

// //   const handleSendMessage = async (e) => {
// //     e.preventDefault();
// //     if (!input.trim()) return;

// //     // Stop listening if active
// //     if (isListening && speechRecognition) {
// //       speechRecognition.stop();
// //       setIsListening(false);
// //     }

// //     // Add user message immediately for better UX
// //     const userMessage = {
// //       id: Date.now(),
// //       user: input,
// //       bot: null,
// //       emotion: 'neutral',
// //       timestamp: new Date()
// //     };
    
// //     setMessages(prev => [...prev, userMessage]);
// //     setInput('');
// //     setLoading(true);

// //     try {
// //       // Send message to backend API
// //       const response = await fetch(API_URL.CHAT, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` // Added API key for authentication
// //         },
// //         body: JSON.stringify({
// //           userInput: userMessage.user,
// //           userId: userId.trim() || null
// //         })
// //       });

// //       if (!response.ok) {
// //         throw new Error('Server responded with an error');
// //       }

// //       const data = await response.json();
      
// //       if (data.success) {
// //         // Update the message with the bot response
// //         setMessages(prev => 
// //           prev.map(msg => 
// //             msg.id === userMessage.id 
// //               ? { 
// //                   ...msg, 
// //                   bot: data.data.botResponse, 
// //                   emotion: data.data.emotionalData?.detectedEmotion || 'neutral',
// //                   copingStrategy: data.data.emotionalData?.copingStrategy || null
// //                 } 
// //               : msg
// //           )
// //         );
        
// //         // Update history data
// //         if (userId) {
// //           fetchChatHistory();
// //         }
// //       } else {
// //         throw new Error(data.message || 'Failed to get response');
// //       }
      
// //       setLoading(false);
// //     } catch (error) {
// //       console.error('Error sending message:', error);
// //       // Update with error message
// //       setMessages(prev => 
// //         prev.map(msg => 
// //           msg.id === userMessage.id 
// //             ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
// //             : msg
// //         )
// //       );
// //       setLoading(false);
// //     }
// //   };

// //   const handleQuickResponse = async () => {
// //     if (!input.trim()) return;
    
// //     // Stop listening if active
// //     if (isListening && speechRecognition) {
// //       speechRecognition.stop();
// //       setIsListening(false);
// //     }
    
// //     const userMessage = {
// //       id: Date.now(),
// //       user: input,
// //       bot: null,
// //       emotion: 'neutral',
// //       timestamp: new Date()
// //     };
    
// //     setMessages(prev => [...prev, userMessage]);
// //     setInput('');
// //     setLoading(true);

// //     try {
// //       // Use quick response endpoint
// //       const response = await fetch(API_URL.QUICK_RESPONSE, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` // Added API key for authentication
// //         },
// //         body: JSON.stringify({
// //           userInput: userMessage.user
// //         })
// //       });

// //       if (!response.ok) {
// //         throw new Error('Server responded with an error');
// //       }

// //       const data = await response.json();
      
// //       if (data.success) {
// //         setMessages(prev => 
// //           prev.map(msg => 
// //             msg.id === userMessage.id 
// //               ? { ...msg, bot: data.data.response, emotion: 'neutral' } 
// //               : msg
// //           )
// //         );
// //       } else {
// //         throw new Error(data.message || 'Failed to get quick response');
// //       }
      
// //       setLoading(false);
// //     } catch (error) {
// //       console.error('Error getting quick response:', error);
// //       setMessages(prev => 
// //         prev.map(msg => 
// //           msg.id === userMessage.id 
// //             ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
// //             : msg
// //         )
// //       );
// //       setLoading(false);
// //     }
// //   };

// //   const analyzeEmotionOnly = async () => {
// //     // Check if emotion analytics is enabled in environment
// //     if (import.meta.env.VITE_ENABLE_EMOTION_ANALYTICS !== 'true') {
// //       alert('Emotion analytics is disabled.');
// //       return;
// //     }

// //     if (!input.trim()) return;
    
// //     // Stop listening if active
// //     if (isListening && speechRecognition) {
// //       speechRecognition.stop();
// //       setIsListening(false);
// //     }
    
// //     setLoading(true);
// //     try {
// //       // Use emotion-only endpoint
// //       const response = await fetch(API_URL.EMOTION, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}` // Added API key for authentication
// //         },
// //         body: JSON.stringify({
// //           userInput: input
// //         })
// //       });

// //       if (!response.ok) {
// //         throw new Error('Server responded with an error');
// //       }

// //       const data = await response.json();
      
// //       if (data.success) {
// //         // Use browser alert to show emotion analysis
// //         const emotionalState = data.data.emotionalState;
// //         alert(`Detected emotion: ${emotionalState.emotion || 'neutral'} (${emotionalState.intensity || 'moderate'})`);
// //       } else {
// //         throw new Error(data.message || 'Failed to analyze emotion');
// //       }
      
// //       setLoading(false);
// //     } catch (error) {
// //       console.error('Error analyzing emotion:', error);
// //       alert('Failed to analyze emotion. Please try again.');
// //       setLoading(false);
// //     }
// //   };

// //   const formatDate = (date) => {
// //     return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// //   };
  
// //   const formatFullDate = (dateString) => {
// //     const date = new Date(dateString);
// //     const today = new Date();
// //     const yesterday = new Date();
// //     yesterday.setDate(yesterday.getDate() - 1);
    
// //     if (date.toDateString() === today.toDateString()) {
// //       return 'Today';
// //     } else if (date.toDateString() === yesterday.toDateString()) {
// //       return 'Yesterday';
// //     } else {
// //       return date.toLocaleDateString(undefined, { 
// //         weekday: 'short', 
// //         month: 'short', 
// //         day: 'numeric'
// //       });
// //     }
// //   };

// //   // Toggle history panel
// //   const toggleHistory = () => {
// //     setShowHistory(prev => !prev);
// //     setSelectedConversation(null);
// //   };

// //   // Load a specific conversation
// //   const loadConversation = (date) => {
// //     const conversationData = historyData.find(item => item.date === date);
// //     if (conversationData) {
// //       setSelectedConversation(conversationData);
// //       setMessages(conversationData.messages);
// //     }
// //   };

// //   // Filter history by search query
// //   const filteredHistory = searchQuery.trim() === '' 
// //     ? historyData 
// //     : historyData.filter(item => 
// //         item.messages.some(msg => 
// //           msg.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
// //           (msg.bot && msg.bot.toLowerCase().includes(searchQuery.toLowerCase()))
// //         )
// //       );

// //   // Clear selected conversation
// //   const clearSelection = () => {
// //     setSelectedConversation(null);
// //     fetchChatHistory();
// //   };

// //   // Toggle dark mode function
// //   const toggleDarkMode = () => {
// //     setDarkMode(!darkMode);
// //   };

// //   return (
// //     <div className={`flex flex-col h-screen ${darkMode ? 'bg-slate-900' : 'bg-sky-50'}`}>
// //       {/* Chat Header */}
// //       <div className={`w-full py-4 ${darkMode ? 'bg-slate-800 text-white' : 'bg-sky-500 text-white'} shadow-md`}>
// //         <div className="container mx-auto px-4 flex justify-between items-center">
// //           <div className="flex items-center">
// //             <h1 className="text-2xl font-bold">Mental Health Chat Assistant</h1>
// //             {userName && (
// //               <span className="ml-2 px-2 py-1 bg-opacity-20 bg-white rounded-md text-sm flex items-center">
// //                 <User size={14} className="mr-1" />
// //                 {userName}
// //               </span>
// //             )}
// //           </div>
// //           <div className="flex items-center">
// //             <input
// //               type="text"
// //               placeholder="Enter User ID"
// //               value={userId}
// //               onChange={(e) => setUserId(e.target.value)}
// //               className={`mr-2 px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 ${darkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800'}`}
// //             />
// //             <button 
// //               onClick={fetchChatHistory}
// //               disabled={!userId.trim()}
// //               className={`${darkMode ? 'bg-slate-700 text-sky-400 hover:bg-slate-600' : 'bg-white text-sky-600 hover:bg-sky-100'} px-3 py-1 rounded text-sm disabled:opacity-50`}
// //             >
// //               Load History
// //             </button>
            
// //             <button 
// //               onClick={toggleHistory}
// //               className={`ml-2 p-1 rounded-full ${showHistory ? (darkMode ? 'bg-sky-700' : 'bg-sky-600') : ''} ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-sky-600 hover:bg-opacity-20'}`}
// //               title="Chat History"
// //             >
// //               <History size={20} />
// //             </button>
            
// //             {/* Dark mode toggle */}
// //             <button 
// //               onClick={toggleDarkMode} 
// //               className="ml-2 p-1 rounded-full hover:bg-opacity-20 hover:bg-white"
// //               title={darkMode ? "Light Mode" : "Dark Mode"}
// //             >
// //               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className={`flex flex-1 overflow-hidden p-4 ${darkMode ? 'bg-slate-900' : 'bg-sky-50'} relative`}>
// //         {/* History Panel - Slides in from left */}
// //         <div 
// //           className={`absolute md:relative top-0 left-0 h-full transform transition-transform duration-300 ${
// //             showHistory ? 'translate-x-0' : '-translate-x-full md:-translate-x-0 md:w-0'
// //           } z-10 md:z-0 ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg md:shadow-none overflow-hidden`}
// //           style={{ width: showHistory ? '300px' : '0' }}
// //         >
// //           <div className="h-full flex flex-col">
// //             <div className={`p-4 border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'} flex justify-between items-center`}>
// //               <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Chat History</h2>
// //               <button 
// //                 onClick={toggleHistory}
// //                 className={`md:hidden p-1 rounded-full ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}
// //               >
// //                 <ChevronLeft size={20} />
// //               </button>
// //             </div>
            
// //             {/* Search box */}
// //             <div className={`p-3 border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
// //               <div className={`flex items-center ${darkMode ? 'bg-slate-700' : 'bg-gray-100'} rounded-lg px-3 py-2`}>
// //                 <Search size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
// //                 <input
// //                   type="text"
// //                   placeholder="Search conversations..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   className={`ml-2 bg-transparent border-none w-full focus:outline-none text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}
// //                 />
// //                 {searchQuery && (
// //                   <button 
// //                     onClick={() => setSearchQuery('')}
// //                     className={`p-1 rounded-full ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
// //                   >
// //                     <X size={14} />
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
            
// //             {/* Selected conversation header */}
// //             {selectedConversation && (
// //               <div className={`p-3 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} flex justify-between items-center`}>
// //                 <div>
// //                   <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-sky-800'}`}>
// //                     {formatFullDate(selectedConversation.date)}
// //                   </h3>
// //                   <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
// //                     {selectedConversation.messages.length} message{selectedConversation.messages.length !== 1 ? 's' : ''}
// //                   </p>
// //                 </div>
// //                 <button 
// //                   onClick={clearSelection}
// //                   className={`p-1 rounded-full ${darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-white hover:bg-gray-200'}`}
// //                 >
// //                   <X size={16} />
// //                 </button>
// //               </div>
// //             )}
            
// //             {/* Conversation list */}
// //             <div className="flex-1 overflow-y-auto">
// //               {historyLoading ? (
// //                 <div className={`flex justify-center items-center h-32 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
// //                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-t-2 border-sky-500"></div>
// //                 </div>
// //               ) : filteredHistory.length === 0 ? (
// //                 <div className={`p-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
// //                   {searchQuery ? 'No matching conversations found' : 'No chat history available'}
// //                 </div>
// //               ) : (
// //                 <div>
// //                   {filteredHistory.map((item, i) => (
// //                     <div 
// //                       key={item.date}
// //                       onClick={() => loadConversation(item.date)}
// //                       className={`p-3 border-b ${darkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-gray-100 hover:bg-gray-50'} cursor-pointer ${
// //                         selectedConversation?.date === item.date 
// //                           ? darkMode ? 'bg-slate-700' : 'bg-sky-50'
// //                           : ''
// //                       }`}
// //                     >
// //                       <div className="flex items-center justify-between">
// //                         <div className={`px-2 py-1 rounded-md text-xs ${darkMode ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-700'} flex items-center`}>
// //                           <Calendar size={12} className="mr-1" />
// //                           {formatFullDate(item.date)}
// //                         </div>
// //                         <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
// //                           {item.messages.length} msg{item.messages.length !== 1 ? 's' : ''}
// //                         </span>
// //                       </div>
// //                       <p className={`mt-2 text-sm truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
// //                         {item.preview}
// //                       </p>
// //                       <div className="mt-1 flex">
// //                         {['joy', 'sadness', 'anxiety', 'anger'].filter(emotion => 
// //                           item.messages.some(msg => msg.emotion === emotion)
// //                         ).slice(0, 3).map(emotion => (
// //                           <span 
// //                             key={emotion}
// //                             className={`mr-1 px-2 py-0.5 rounded-full text-xs ${
// //                               darkMode 
// //                                 ? 'bg-slate-600 text-gray-300'
// //                                 : 'bg-gray-100 text-gray-700'
// //                             }`}
// //                           >
// //                             {emotion}
// //                           </span>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Main Chat Container */}
// //         <div className={`flex-1 flex flex-col ${showHistory ? 'md:ml-4' : ''}`}>
// //           {/* Centered Chat Container */}
// //           <div className={`w-full max-w-4xl mx-auto ${darkMode ? 'bg-slate-800 text-white' : 'bg-white'} rounded-xl shadow-lg overflow-hidden flex flex-col flex-1`}>
// //             {/* Messages */}
// //             <div className={`flex-1 overflow-y-auto p-4 ${darkMode ? 'bg-gradient-to-b from-slate-800 to-slate-900' : 'bg-gradient-to-b from-sky-50 to-white'}`}>
// //               {messages.length === 0 ? (
// //                 <div className="flex items-center justify-center h-full text-gray-500">
// //                   <div className={`text-center p-8 ${darkMode ? 'bg-slate-800 bg-opacity-50 border border-slate-700 text-slate-300' : 'bg-sky-50 bg-opacity-50 rounded-xl border border-sky-100'}`}>
// //                     <div className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} rounded-full flex items-center justify-center`}>
// //                       <MessageCircle className={`${darkMode ? 'text-sky-400' : 'text-sky-500'}`} size={24} />
// //                     </div>
// //                     <h3 className={`font-medium text-lg ${darkMode ? 'text-sky-400' : 'text-sky-600'} mb-2`}>Start a conversation</h3>
// //                     <p className={`mb-2 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>How are you feeling today? I'm here to listen and support you.</p>
// //                     {speechSupported && (
// //                       <p className={`text-sm mt-2 ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
// //                         <span className="inline-flex items-center">
// //                           <Mic className="h-4 w-4 mr-1" />
// //                           You can use the microphone to speak
// //                         </span>
// //                       </p>
// //                     )}
// //                     {!showHistory && historyData.length > 0 && (
// //                       <p className={`text-sm mt-4 ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
// //                         <button 
// //                           onClick={toggleHistory}
// //                           className="inline-flex items-center hover:underline"
// //                         >
// //                           <History className="h-4 w-4 mr-1" />
// //                           View previous conversations
// //                         </button>
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>
// //               ) : (
// //                 messages.map((msg, index) => (
// //                   <div key={msg.id || index} className="mb-4">
// //                     {/* User message */}
// //                     <div className="flex justify-end mb-2">
// //                       <div className={`${darkMode ? 'bg-sky-700' : 'bg-sky-600'} text-white rounded-2xl rounded-tr-none py-2 px-4 max-w-md shadow-sm`}>
// //                         <p>{msg.user}</p>
// //                         <p className={`text-xs ${darkMode ? 'text-sky-300' : 'text-sky-100'} mt-1`}>{formatDate(msg.timestamp)}</p>
// //                       </div>
// //                     </div>
                    
// //                     {/* Bot response */}
// // {msg.bot ? (
// //   <div className="flex justify-start">
// //     <div className={`rounded-2xl rounded-tl-none py-2 px-4 border max-w-md shadow-sm ${emotionColors[msg.emotion]}`}>
// //       <p>{msg.bot}</p>
// //       {msg.copingStrategy && (
// //         <div className={`mt-2 p-2 ${darkMode ? 'bg-slate-700 bg-opacity-70' : 'bg-white bg-opacity-70'} rounded-md`}>
// //           <p className={`text-sm font-medium ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>Coping Strategy:</p>
// //           <p className="text-sm">{msg.copingStrategy}</p>
// //         </div>
// //       )}
// //       <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'} mt-1`}>{formatDate(msg.timestamp)}</div>
// //     </div>
// //   </div>
// // ) : loading && index === messages.length - 1 ? (
// //   <div className="flex justify-start">
// //     <div className={`rounded-2xl rounded-tl-none py-3 px-4 ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-200'} border shadow-sm`}>
// //       <div className="flex items-center space-x-1">
// //         <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
// //         <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse delay-150"></div>
// //         <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse delay-300"></div>
// //       </div>
// //     </div>
// //   </div>
// // ) : null}
// //                   </div>
// //                 ))
// //               )}
// //               <div ref={messagesEndRef} />
// //             </div>
            
// //             {/* Input Area */}
// //             <form onSubmit={handleSendMessage} className={`p-3 border-t ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'}`}>
// //               <div className="flex items-center">
// //                 {/* Speech recognition button - only show if supported */}
// //                 {speechSupported && (
// //                   <button 
// //                     type="button" 
// //                     onClick={toggleListening} 
// //                     disabled={loading}
// //                     className={`p-2 rounded-full mr-2 ${
// //                       isListening 
// //                         ? 'bg-red-500 text-white' 
// //                         : darkMode 
// //                           ? 'text-gray-400 hover:bg-slate-700' 
// //                           : 'text-gray-500 hover:bg-gray-100'
// //                     }`}
// //                   >
// //                     <Mic size={20} />
// //                   </button>
// //                 )}
                
// //                 <div className="flex-1 relative">
// //                   <input
// //                     type="text"
// //                     value={input}
// //                     onChange={(e) => setInput(e.target.value)}
// //                     placeholder={isListening ? "Listening..." : "Type a message..."}
// //                     className={`w-full border rounded-full py-2 px-4 pr-20 ${
// //                       darkMode 
// //                         ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-sky-500' 
// //                         : 'bg-gray-100 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-sky-400'
// //                     } focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-30`}
// //                     disabled={isListening || loading}
// //                   />
                  
// //                   {/* Input options: Analyze-only, Quick response */}
// //                   {input.trim() && (
// //                     <div className="absolute right-2 top-1.5 flex">
// //                       {import.meta.env.VITE_ENABLE_EMOTION_ANALYTICS === 'true' && (
// //                         <button 
// //                           type="button" 
// //                           onClick={analyzeEmotionOnly}
// //                           disabled={loading}
// //                           title="Analyze Emotion Only"
// //                           className={`p-1.5 rounded-full mx-0.5 text-xs ${
// //                             darkMode
// //                               ? 'text-sky-400 hover:bg-slate-600'
// //                               : 'text-sky-500 hover:bg-gray-200'
// //                           }`}
// //                         >
// //                           📊
// //                         </button>
// //                       )}
                      
// //                       <button 
// //                         type="button" 
// //                         onClick={handleQuickResponse}
// //                         disabled={loading}
// //                         title="Send Quick Response (No Emotion Analysis)"
// //                         className={`p-1.5 rounded-full mx-0.5 text-xs ${
// //                           darkMode
// //                             ? 'text-sky-400 hover:bg-slate-600'
// //                             : 'text-sky-500 hover:bg-gray-200'
// //                         }`}
// //                       >
// //                         ⚡
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>
                
// //                 <button 
// //                   type="submit" 
// //                   disabled={!input.trim() || loading}
// //                   className={`p-2 ml-2 rounded-full ${
// //                     input.trim() && !loading
// //                       ? `${darkMode ? 'bg-sky-600 hover:bg-sky-700' : 'bg-sky-500 hover:bg-sky-600'} text-white`
// //                       : `${darkMode ? 'bg-slate-700 text-slate-500' : 'bg-gray-100 text-gray-400'}`
// //                   }`}
// //                 >
// //                   <Send size={20} />
// //                 </button>
// //               </div>
              
// //               {/* Quick tips (optional) */}
// //               {messages.length === 0 && (
// //                 <div className={`mt-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
// //                   <p>Quick tips: Try typing <span className="font-medium">"I'm feeling anxious"</span> or <span className="font-medium">"I'm having a tough day"</span></p>
// //                 </div>
// //               )}
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatInterface;
import { useState, useEffect, useRef } from 'react';
import { Mic, Send, MessageCircle, Sun, Moon, Calendar, Search, X } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [emotionalInsight, setEmotionalInsight] = useState(null);
  const messagesEndRef = useRef(null);
  
  // Speech recognition states
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  
  // Dark mode state (synced with header)
  const [darkMode, setDarkMode] = useState(false);
  
  // Therapist recommendation states
  const [showTherapistModal, setShowTherapistModal] = useState(false);
  const [therapists, setTherapists] = useState([]);
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [therapistAvailability, setTherapistAvailability] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [bookingStatus, setBookingStatus] = useState({
    status: '',
    message: ''
  });
  const [showBookingForm, setShowBookingForm] = useState(false);

  // API URLs - Fixed to properly use Vite environment variables
  const API_URL = {
    CHAT: `${import.meta.env.VITE_API_URL}/api/chatbot/analyze`,
    HISTORY: `${import.meta.env.VITE_API_URL}/api/chatbot/history`,
    QUICK_RESPONSE: `${import.meta.env.VITE_API_URL}/api/chatbot/quick-response`,
    EMOTION: `${import.meta.env.VITE_API_URL}/api/chatbot/emotion`,
    THERAPISTS: `${import.meta.env.VITE_API_URL}/api/therapists`,
    SPECIALTIES: `${import.meta.env.VITE_API_URL}/api/therapists/specialties`,
    THERAPIST_AVAILABILITY: (id) => `${import.meta.env.VITE_API_URL}/api/therapists/${id}/availability`,
    BOOK_APPOINTMENT: (id) => `${import.meta.env.VITE_API_URL}/api/therapists/${id}/book`
  };

  // Emotion colors for visual cues
  const emotionColors = {
    anxiety: darkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-100 border-blue-300',
    sadness: darkMode ? 'bg-indigo-900 border-indigo-700' : 'bg-indigo-100 border-indigo-300',
    anger: darkMode ? 'bg-red-900 border-red-700' : 'bg-red-100 border-red-300',
    joy: darkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-100 border-yellow-300',
    overwhelm: darkMode ? 'bg-purple-900 border-purple-700' : 'bg-purple-100 border-purple-300',
    loneliness: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300',
    hope: darkMode ? 'bg-green-900 border-green-700' : 'bg-green-100 border-green-300',
    neutral: darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
  };

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition and if it's enabled in env
    if ((import.meta.env.VITE_ENABLE_SPEECH_RECOGNITION === 'true') && 
        ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
          
        setInput(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      setSpeechRecognition(recognition);
      setSpeechSupported(true);
    } else {
      console.log('Speech recognition not supported or disabled');
      setSpeechSupported(false);
    }
  }, []);

  // Load specialties when component mounts
  useEffect(() => {
    fetchSpecialties();
  }, []);

  // Load therapists for filtering
  useEffect(() => {
    fetchTherapists();
  }, [selectedSpecialty]);

  // Handle toggling speech recognition
  const toggleListening = () => {
    if (isListening) {
      speechRecognition.stop();
      setIsListening(false);
    } else {
      setInput('');
      speechRecognition.start();
      setIsListening(true);
    }
  };

  // Load chat history when userId changes
  useEffect(() => {
    if (userId) {
      fetchChatHistory();
    }
  }, [userId]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Check if user needs therapist recommendation based on emotions
  const checkForTherapistRecommendation = (emotionData) => {
    // Logic to determine if user needs therapist recommendation
    // Here we're checking if they have intense negative emotions
    if (!emotionData) return false;
    
    const negativeEmotions = ['anxiety', 'sadness', 'anger', 'overwhelm', 'loneliness'];
    const detectedEmotion = emotionData.detectedEmotion;
    
    // If no emotional insight yet, start tracking negative messages
    if (!emotionalInsight && negativeEmotions.includes(detectedEmotion)) {
      return true;
    }
    
    // If we have emotional insight and there's a pattern of negative emotions
    if (emotionalInsight) {
      const negativeCount = negativeEmotions.reduce((count, emotion) => {
        return count + (emotionalInsight.emotionFrequency[emotion] || 0);
      }, 0);
      
      const totalCount = Object.values(emotionalInsight.emotionFrequency).reduce((sum, count) => sum + count, 0);
      
      // If more than 60% of messages show negative emotions, suggest a therapist
      if (negativeCount / totalCount > 0.6) {
        return true;
      }
    }
    
    return false;
  };

  const fetchChatHistory = async () => {
    if (!userId.trim()) return;
    
    try {
      setLoading(true);
      const response = await fetch(`${API_URL.HISTORY}?userId=${encodeURIComponent(userId)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }
      const data = await response.json();
      
      if (data.success) {
        // Convert backend data format to frontend format
        const convertedMessages = data.data.map(chat => ({
          id: chat._id,
          user: chat.userInput,
          bot: chat.botResponse,
          emotion: chat.emotionalData?.detectedEmotion || 'neutral',
          copingStrategy: chat.emotionalData?.copingStrategy || null,
          timestamp: new Date(chat.timestamp)
        }));
        
        setMessages(convertedMessages);
        
        // Set emotional insight if available
        if (data.emotionalInsight) {
          setEmotionalInsight(data.emotionalInsight);
        }
      } else {
        console.error('Error fetching chat history:', data.message);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setLoading(false);
    }
  };

  const fetchTherapists = async () => {
    try {
      let url = API_URL.THERAPISTS;
      if (selectedSpecialty) {
        url += `?specialty=${encodeURIComponent(selectedSpecialty)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch therapists');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setTherapists(data.data);
        setFilteredTherapists(data.data);
      } else {
        console.error('Error fetching therapists:', data.message);
      }
    } catch (error) {
      console.error('Error fetching therapists:', error);
    }
  };

  const fetchSpecialties = async () => {
    try {
      const response = await fetch(API_URL.SPECIALTIES);
      
      if (!response.ok) {
        throw new Error('Failed to fetch specialties');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setSpecialties(data.data);
      } else {
        console.error('Error fetching specialties:', data.message);
      }
    } catch (error) {
      console.error('Error fetching specialties:', error);
    }
  };

  const fetchTherapistAvailability = async (therapistId) => {
    try {
      const response = await fetch(API_URL.THERAPIST_AVAILABILITY(therapistId));
      
      if (!response.ok) {
        throw new Error('Failed to fetch therapist availability');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setTherapistAvailability(data.data);
      } else {
        console.error('Error fetching therapist availability:', data.message);
      }
    } catch (error) {
      console.error('Error fetching therapist availability:', error);
    }
  };

  const bookAppointment = async () => {
    if (!appointmentDate || !appointmentTime || !userId || !selectedTherapist) {
      setBookingStatus({
        status: 'error',
        message: 'Please fill out all required fields'
      });
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(API_URL.BOOK_APPOINTMENT(selectedTherapist._id), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
        },
        body: JSON.stringify({
          date: appointmentDate,
          time: appointmentTime,
          userId,
          notes: appointmentNotes
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setBookingStatus({
          status: 'success',
          message: 'Appointment booked successfully!'
        });
        
        // Add confirmation message to chat
        const botMessage = {
          id: Date.now(),
          user: null,
          bot: `I've booked an appointment with ${selectedTherapist.name} on ${appointmentDate} at ${appointmentTime}. You will receive a confirmation email with further details.`,
          emotion: 'hope',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Close modal after successful booking
        setTimeout(() => {
          setShowTherapistModal(false);
          setShowBookingForm(false);
          setBookingStatus({ status: '', message: '' });
        }, 3000);
      } else {
        throw new Error(data.message || 'Failed to book appointment');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setBookingStatus({
        status: 'error',
        message: error.message || 'Failed to book appointment. Please try again.'
      });
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Stop listening if active
    if (isListening && speechRecognition) {
      speechRecognition.stop();
      setIsListening(false);
    }

    // Add user message immediately for better UX
    const userMessage = {
      id: Date.now(),
      user: input,
      bot: null,
      emotion: 'neutral',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Send message to backend API
      const response = await fetch(API_URL.CHAT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
        },
        body: JSON.stringify({
          userInput: userMessage.user,
          userId: userId.trim() || null
        })
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const data = await response.json();
      
      if (data.success) {
        // Update the message with the bot response
        setMessages(prev => 
          prev.map(msg => 
            msg.id === userMessage.id 
              ? { 
                  ...msg, 
                  bot: data.data.botResponse, 
                  emotion: data.data.emotionalData?.detectedEmotion || 'neutral',
                  copingStrategy: data.data.emotionalData?.copingStrategy || null
                } 
              : msg
          )
        );
        
        // Check if we should recommend a therapist based on emotional analysis
        if (data.data.emotionalData && checkForTherapistRecommendation(data.data.emotionalData)) {
          // Wait a moment before showing the therapist recommendation
          setTimeout(() => {
            const recommendationMessage = {
              id: Date.now() + 1,
              user: null,
              bot: "I notice you've been experiencing some difficult emotions. Would you like me to connect you with a professional therapist who can provide additional support?",
              emotion: 'hope',
              isRecommendation: true,
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, recommendationMessage]);
          }, 2000);
        }
      } else {
        throw new Error(data.message || 'Failed to get response');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      // Update with error message
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
            : msg
        )
      );
      setLoading(false);
    }
  };

  const handleTherapistSelection = (therapist) => {
    setSelectedTherapist(therapist);
    fetchTherapistAvailability(therapist._id);
    setShowBookingForm(true);
  };

  const handleQuickResponse = async () => {
    if (!input.trim()) return;
    
    // Stop listening if active
    if (isListening && speechRecognition) {
      speechRecognition.stop();
      setIsListening(false);
    }
    
    const userMessage = {
      id: Date.now(),
      user: input,
      bot: null,
      emotion: 'neutral',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Use quick response endpoint
      const response = await fetch(API_URL.QUICK_RESPONSE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
        },
        body: JSON.stringify({
          userInput: userMessage.user
        })
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === userMessage.id 
              ? { ...msg, bot: data.data.response, emotion: 'neutral' } 
              : msg
          )
        );
      } else {
        throw new Error(data.message || 'Failed to get quick response');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error getting quick response:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, bot: "Sorry, I couldn't process your message. Please try again." } 
            : msg
        )
      );
      setLoading(false);
    }
  };

  const analyzeEmotionOnly = async () => {
    // Check if emotion analytics is enabled in environment
    if (import.meta.env.VITE_ENABLE_EMOTION_ANALYTICS !== 'true') {
      alert('Emotion analytics is disabled.');
      return;
    }

    if (!input.trim()) return;
    
    // Stop listening if active
    if (isListening && speechRecognition) {
      speechRecognition.stop();
      setIsListening(false);
    }
    
    setLoading(true);
    try {
      // Use emotion-only endpoint
      const response = await fetch(API_URL.EMOTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
        },
        body: JSON.stringify({
          userInput: input
        })
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const data = await response.json();
      
      if (data.success) {
        // Use browser alert to show emotion analysis
        const emotionalState = data.data.emotionalState;
        alert(`Detected emotion: ${emotionalState.emotion || 'neutral'} (${emotionalState.intensity || 'moderate'})`);
      } else {
        throw new Error(data.message || 'Failed to analyze emotion');
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error analyzing emotion:', error);
      alert('Failed to analyze emotion. Please try again.');
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleTherapistRecommendation = () => {
    setShowTherapistModal(true);
    fetchTherapists();
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-slate-900' : 'bg-sky-50'}`}>
      {/* Chat Header */}
      <div className={`w-full py-3 md:py-4 ${darkMode ? 'bg-slate-800 text-white' : 'bg-sky-500 text-white'} shadow-md`}>
        <div className="container mx-auto px-2 md:px-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
          <h1 className="text-xl md:text-2xl font-bold truncate">Mental Health Chat Assistant</h1>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className={`flex-1 min-w-0 md:flex-none md:min-w-[160px] mr-1 px-2 py-1 text-xs md:text-sm rounded focus:outline-none focus:ring-2 focus:ring-sky-300 ${darkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-gray-800'}`}
            />
            <button 
              onClick={fetchChatHistory}
              disabled={!userId.trim()}
              className={`${darkMode ? 'bg-slate-700 text-sky-400 hover:bg-slate-600' : 'bg-white text-sky-600 hover:bg-sky-100'} px-2 md:px-3 py-1 rounded text-xs md:text-sm disabled:opacity-50`}
            >
              Load History
            </button>
            
            {/* Dark mode toggle */}
            <button 
              onClick={toggleDarkMode} 
              className="ml-1 p-1 rounded-full hover:bg-opacity-20 hover:bg-white"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`flex flex-1 overflow-hidden p-2 md:p-4 ${darkMode ? 'bg-slate-900' : 'bg-sky-50'}`}>
        {/* Centered Chat Container */}
        <div className={`w-full max-w-4xl mx-auto ${darkMode ? 'bg-slate-800 text-white' : 'bg-white'} rounded-xl shadow-lg overflow-hidden flex flex-col`}>
          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-3 md:p-4 ${darkMode ? 'bg-gradient-to-b from-slate-800 to-slate-900' : 'bg-gradient-to-b from-sky-50 to-white'}`}>
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className={`text-center p-4 md:p-8 ${darkMode ? 'bg-slate-800 bg-opacity-50 border border-slate-700 text-slate-300' : 'bg-sky-50 bg-opacity-50 rounded-xl border border-sky-100'}`}>
                  <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} rounded-full flex items-center justify-center`}>
                    <MessageCircle className={`${darkMode ? 'text-sky-400' : 'text-sky-500'}`} size={20} />
                  </div>
                  <h3 className={`font-medium text-base md:text-lg ${darkMode ? 'text-sky-400' : 'text-sky-600'} mb-1 md:mb-2`}>Start a conversation</h3>
                  <p className={`mb-2 text-sm md:text-base ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>How are you feeling today? I'm here to listen and support you.</p>
                  {speechSupported && (
                    <p className={`text-xs md:text-sm mt-2 ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
                      <span className="inline-flex items-center">
                        <Mic className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                        You can use the microphone to speak
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={msg.id || index} className="mb-3 md:mb-4">
                  {/* User message */}
                  {msg.user && (
                    <div className="flex justify-end mb-1 md:mb-2">
                      <div className={`${darkMode ? 'bg-sky-700' : 'bg-sky-600'} text-white rounded-2xl rounded-tr-none py-2 px-3 max-w-[85%] md:max-w-md shadow-sm text-sm md:text-base`}>
                        <p className="break-words">{msg.user}</p>
                        <p className={`text-xs ${darkMode ? 'text-sky-300' : 'text-sky-100'} mt-1`}>{formatDate(msg.timestamp)}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Bot response */}
                  {msg.bot ? (
                    <div className="flex justify-start">
                      <div className={`rounded-2xl rounded-tl-none py-2 px-3 border max-w-[85%] md:max-w-md shadow-sm text-sm md:text-base ${emotionColors[msg.emotion]}`}>
                        <p className="break-words">{msg.bot}</p>
                        {msg.copingStrategy && (
                          <div className={`mt-2 p-2 ${darkMode ? 'bg-slate-700 bg-opacity-70' : 'bg-white bg-opacity-70'} rounded-md`}>
                            <p className={`text-xs md:text-sm font-medium ${darkMode ? 'text-sky-400' : 'text-sky-700'}`}>Coping Strategy:</p>
                            <p className="text-xs md:text-sm">{msg.copingStrategy}</p>
                          </div>
                        )}
                        
                        {msg.isRecommendation && (
                          <div className="mt-3">
                            <button
                              onClick={handleTherapistRecommendation}
                              className={`${darkMode ? 'bg-sky-600 hover:bg-sky-700' : 'bg-sky-500 hover:bg-sky-600'} text-white rounded-lg py-1 px-2 md:px-3 text-xs md:text-sm flex items-center`}
                            >
                              <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                              Find a Therapist
                            </button>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center mt-1">
                          <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{formatDate(msg.timestamp)}</span>
                          {msg.emotion !== 'neutral' && (
                            <span className={`text-xs px-1.5 py-0.5 ${darkMode ? 'bg-slate-700 bg-opacity-70 text-sky-400' : 'bg-white bg-opacity-70 text-sky-700'} rounded-full`}>
                              {msg.emotion}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : loading ? (
                    <div className="flex justify-start">
                      <div className={`${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-sky-50 border-sky-100'} rounded-2xl rounded-tl-none py-2 px-3 max-w-[85%] md:max-w-md border`}>
                        <div className="flex space-x-1">
                          <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce`}></div>
                          <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce delay-100`}></div>
                          <div className={`w-2 h-2 ${darkMode ? 'bg-sky-400' : 'bg-sky-400'} rounded-full animate-bounce delay-200`}></div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className={`border-t ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-sky-100 bg-white'} p-2 md:p-4`}>
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={`flex-1 border rounded-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 ${
                  darkMode 
                    ? 'bg-slate-700 border-slate-600 text-white focus:ring-sky-500' 
                    : 'bg-sky-50 border-sky-200 focus:ring-sky-300'
                }`}
                disabled={loading}
              />
              
              {/* Voice input button */}
              {speechSupported && (
                <button 
                  type="button"
                  onClick={toggleListening}
                  disabled={loading}
                  className={`rounded-full p-2 w-12 h-12 flex items-center justify-center ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse hover:bg-red-600' 
                      : darkMode
                        ? 'bg-slate-700 text-sky-400 hover:bg-slate-600'
                        : 'bg-sky-100 text-sky-600 hover:bg-sky-200'
                  }`}
                >
                  <Mic size={20} />
                </button>
              )}
              
              {/* Send button */}
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`rounded-full p-2 w-12 h-12 flex items-center justify-center ${
                  darkMode
                    ? 'bg-sky-600 text-white hover:bg-sky-700' 
                    : 'bg-sky-500 text-white hover:bg-sky-600'
                } disabled:opacity-50 shadow-sm`}
              >
                <Send size={20} />
              </button>
            </form>
            
            {/* Speech recognition status indicator */}
            {isListening && (
             <div className="text-center mt-2">
                <span className={`text-sm ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
                  Listening... Speak now
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Therapist Recommendation Modal */}
      {showTherapistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-white'} rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl`}>
            {/* Modal Header */}
            <div className={`p-4 border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'} flex justify-between items-center sticky top-0 ${darkMode ? 'bg-slate-800' : 'bg-white'} z-10`}>
              <h2 className="text-xl font-semibold">Find a Therapist</h2>
              <button 
                onClick={() => {
                  setShowTherapistModal(false);
                  setShowBookingForm(false);
                  setSelectedTherapist(null);
                }} 
                className="p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-200"
              >
                <X size={24} />
              </button>
            </div>
            
            {showBookingForm ? (
              /* Booking Form */
              <div className="p-6">
                <div className="flex items-start mb-6">
                  <div className={`w-20 h-20 rounded-full overflow-hidden mr-4 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} flex items-center justify-center`}>
                    {selectedTherapist?.avatar ? (
                      <img src={selectedTherapist.avatar} alt={selectedTherapist.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`text-xl font-bold ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
                        {selectedTherapist?.name?.charAt(0) || 'T'}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedTherapist?.name}</h3>
                    <p className={`${darkMode ? 'text-slate-300' : 'text-gray-600'} mb-1`}>{selectedTherapist?.title}</p>
                    <div className="flex flex-wrap">
                      {selectedTherapist?.specialties?.map((specialty, idx) => (
                        <span 
                          key={idx} 
                          className={`text-xs mr-2 mb-1 px-2 py-1 rounded-full ${darkMode ? 'bg-slate-700 text-sky-400' : 'bg-sky-100 text-sky-700'}`}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 mb-6 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-sky-50'}`}>
                  <h4 className="font-medium mb-2">Available times</h4>
                  {therapistAvailability.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block mb-2 text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                          Select Date
                        </label>
                        <select 
                          value={appointmentDate} 
                          onChange={(e) => setAppointmentDate(e.target.value)}
                          className={`w-full p-2 rounded border ${
                            darkMode 
                              ? 'bg-slate-800 border-slate-600 text-white' 
                              : 'bg-white border-gray-300'
                          }`}
                        >
                          <option value="">Select a date</option>
                          {[...new Set(therapistAvailability.map(slot => slot.date))].map(date => (
                            <option key={date} value={date}>{date}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className={`block mb-2 text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                          Select Time
                        </label>
                        <select 
                          value={appointmentTime} 
                          onChange={(e) => setAppointmentTime(e.target.value)}
                          disabled={!appointmentDate}
                          className={`w-full p-2 rounded border ${
                            darkMode 
                              ? 'bg-slate-800 border-slate-600 text-white' 
                              : 'bg-white border-gray-300'
                          } disabled:opacity-50`}
                        >
                          <option value="">Select a time</option>
                          {therapistAvailability
                            .filter(slot => slot.date === appointmentDate)
                            .map(slot => (
                              <option key={slot.time} value={slot.time}>{slot.time}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                      Loading availability...
                    </p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className={`block mb-2 text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                    Notes (optional)
                  </label>
                  <textarea 
                    value={appointmentNotes}
                    onChange={(e) => setAppointmentNotes(e.target.value)}
                    placeholder="Add any notes or questions for the therapist..."
                    rows={3}
                    className={`w-full p-3 rounded border ${
                      darkMode 
                        ? 'bg-slate-800 border-slate-600 text-white placeholder:text-slate-400' 
                        : 'bg-white border-gray-300 placeholder:text-gray-400'
                    }`}
                  ></textarea>
                </div>
                
                {bookingStatus.message && (
                  <div className={`p-3 mb-4 rounded-lg ${
                    bookingStatus.status === 'success'
                      ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                      : darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                  }`}>
                    {bookingStatus.message}
                  </div>
                )}
                
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => {
                      setShowBookingForm(false);
                      setSelectedTherapist(null);
                    }}
                    className={`px-4 py-2 rounded-lg ${
                      darkMode
                        ? 'bg-slate-700 text-white hover:bg-slate-600'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={bookAppointment}
                    disabled={!appointmentDate || !appointmentTime || loading}
                    className={`px-4 py-2 rounded-lg ${
                      darkMode
                        ? 'bg-sky-600 text-white hover:bg-sky-700'
                        : 'bg-sky-500 text-white hover:bg-sky-600'
                    } disabled:opacity-50`}
                  >
                    {loading ? 'Booking...' : 'Book Appointment'}
                  </button>
                </div>
              </div>
            ) : (
              /* Therapist List */
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <Search className={`w-5 h-5 mr-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`} />
                    <h3 className="text-lg font-medium">Filter therapists</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block mb-2 text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                        Specialty
                      </label>
                      <select 
                        value={selectedSpecialty} 
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className={`w-full p-2 rounded border ${
                          darkMode 
                            ? 'bg-slate-800 border-slate-600 text-white' 
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        <option value="">All Specialties</option>
                        {specialties.map(specialty => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                {filteredTherapists.length > 0 ? (
                  <div className="space-y-4">
                    {filteredTherapists.map(therapist => (
                      <div 
                        key={therapist._id}
                        className={`border ${darkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-gray-200 hover:bg-sky-50'} rounded-lg p-4 cursor-pointer transition-colors`}
                        onClick={() => handleTherapistSelection(therapist)}
                      >
                        <div className="flex items-start">
                          <div className={`w-16 h-16 rounded-full overflow-hidden mr-4 ${darkMode ? 'bg-slate-700' : 'bg-sky-100'} flex items-center justify-center`}>
                            {therapist.avatar ? (
                              <img src={therapist.avatar} alt={therapist.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className={`text-xl font-bold ${darkMode ? 'text-sky-400' : 'text-sky-500'}`}>
                                {therapist.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-semibold">{therapist.name}</h3>
                              <span className={`${darkMode ? 'text-sky-400' : 'text-sky-600'}`}>
                                {therapist.rate}
                              </span>
                            </div>
                            <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-gray-600'} mb-2`}>
                              {therapist.title}
                            </p>
                            <div className="flex flex-wrap">
                              {therapist.specialties.map((specialty, idx) => (
                                <span 
                                  key={idx} 
                                  className={`text-xs mr-2 mb-1 px-2 py-0.5 rounded-full ${
                                    darkMode ? 'bg-slate-700 text-sky-400' : 'bg-sky-100 text-sky-700'
                                  }`}
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                            <p className={`text-sm mt-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                              {therapist.bio?.substring(0, 120)}
                              {therapist.bio?.length > 120 ? '...' : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-opacity-20">
                      <Search className={`w-8 h-8 ${darkMode ? 'text-slate-500' : 'text-gray-400'}`} />
                    </div>
                    <p className="font-medium">No therapists found</p>
                    <p className="text-sm mt-1">Try adjusting your filters</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;