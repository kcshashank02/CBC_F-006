import ChatMessage from '../model/ChatMessage.js';
import { analyzeMentalHealth, provideEmotionalSupport } from '../services/geminiService.js';

/**
 * Handles chat messages and provides emotionally intelligent responses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const handleChat = async (req, res) => {
  try {
    const { userInput, userId } = req.body;

    if (!userInput) {
      return res.status(400).json({ success: false, message: 'Missing user input.' });
    }
    
    // Use the enhanced emotional support function
    const supportResponse = await provideEmotionalSupport(userInput, userId);
    const { response, detectedEmotion, copingStrategy } = supportResponse;

    // Create a more detailed chat message with emotional context
    const chat = new ChatMessage({
      userId: userId || null,
      userInput,
      botResponse: response,
      emotionalData: {
        detectedEmotion,
        copingStrategy
      }
    });

    await chat.save();

    // Return the enhanced data
    res.status(200).json({ 
      success: true, 
      data: chat 
    });
    
  } catch (err) {
    console.error('Chatbot Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/**
 * Provides direct mental health analysis without storing in database
 * For situations where chat history storage isn't desired
 */
export const getQuickResponse = async (req, res) => {
  try {
    const { userInput } = req.body;

    if (!userInput) {
      return res.status(400).json({ success: false, message: 'Missing user input.' });
    }

    // Use the simple analyzer for quick responses
    const response = await analyzeMentalHealth(userInput);

    res.status(200).json({
      success: true,
      data: { response }
    });
  } catch (err) {
    console.error('Quick Response Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/**
 * Retrieves user chat history with emotional analysis context
 */
export const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'Missing userId' });
    }

    const chats = await ChatMessage.find({ userId }).sort({ timestamp: -1 });

    // Add emotional trend analysis if there are enough messages
    let emotionalInsight = null;
    if (chats.length >= 3) {
      emotionalInsight = analyzeEmotionalTrends(chats);
    }

    res.status(200).json({ 
      success: true, 
      data: chats,
      emotionalInsight
    });
  } catch (err) {
    console.error('Fetch Chat History Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/**
 * Analyzes emotional trends across conversation history
 * @param {Array} chats - Array of chat message objects
 * @returns {Object} Insights about emotional patterns
 */
const analyzeEmotionalTrends = (chats) => {
  // Extract emotions from chat history
  const emotions = chats.map(chat => 
    chat.emotionalData?.detectedEmotion || 'neutral'
  );

  // Count emotion frequencies
  const emotionCounts = emotions.reduce((counts, emotion) => {
    counts[emotion] = (counts[emotion] || 0) + 1;
    return counts;
  }, {});

  // Find most common emotion
  let mostCommonEmotion = 'neutral';
  let highestCount = 0;
  
  for (const [emotion, count] of Object.entries(emotionCounts)) {
    if (count > highestCount) {
      mostCommonEmotion = emotion;
      highestCount = count;
    }
  }

  // Calculate if emotional state is improving
  const recentEmotions = emotions.slice(0, 3);
  const positiveEmotions = ['joy', 'hope'];
  const negativeEmotions = ['anxiety', 'sadness', 'anger', 'overwhelm', 'loneliness'];
  
  const recentPositiveCount = recentEmotions.filter(e => 
    positiveEmotions.includes(e)
  ).length;
  
  const recentNegativeCount = recentEmotions.filter(e => 
    negativeEmotions.includes(e)
  ).length;

  // Generate insight based on patterns
  return {
    dominantEmotion: mostCommonEmotion,
    emotionalState: recentPositiveCount > recentNegativeCount ? 'improving' : 
                   recentNegativeCount > recentPositiveCount ? 'challenging' : 'mixed',
    emotionFrequency: emotionCounts
  };
};

/**
 * Allows for one-time emotion analysis without storing chat
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const analyzeEmotionOnly = async (req, res) => {
  try {
    const { userInput } = req.body;

    if (!userInput) {
      return res.status(400).json({ success: false, message: 'Missing user input.' });
    }

    // Import the emotion detection function directly
    const { detectEmotionFromText } = await import('../services/geminiService.js');
    const emotionalState = detectEmotionFromText(userInput);

    res.status(200).json({
      success: true,
      data: { emotionalState }
    });
  } catch (err) {
    console.error('Emotion Analysis Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
// import ChatMessage from '../model/ChatMessage.js';
// import { 
//   analyzeMentalHealth, 
//   provideEmotionalSupport,
//   provideComprehensiveSupport,
//   recommendWellnessRoutine,
//   createPersonalizedWellnessPlan,
//   detectEmotionFromText
// } from '../services/geminiService.js';

// /**
//  * Handles chat messages and provides emotionally intelligent responses
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// export const handleChat = async (req, res) => {
//   try {
//     const { userInput, userId } = req.body;

//     if (!userInput) {
//       return res.status(400).json({ success: false, message: 'Missing user input.' });
//     }
    
//     // Use the enhanced emotional support function
//     const supportResponse = await provideEmotionalSupport(userInput, userId);
//     const { response, detectedEmotion, copingStrategy } = supportResponse;

//     // Create a more detailed chat message with emotional context
//     const chat = new ChatMessage({
//       userId: userId || null,
//       userInput,
//       botResponse: response,
//       emotionalData: {
//         detectedEmotion,
//         copingStrategy
//       }
//     });

//     await chat.save();

//     // Return the enhanced data
//     res.status(200).json({ 
//       success: true, 
//       data: chat 
//     });
    
//   } catch (err) {
//     console.error('Chatbot Error:', err.message);
//     res.status(500).json({ success: false, message: 'Server error.' });
//   }
// };

// /**
//  * Provides direct mental health analysis without storing in database
//  * For situations where chat history storage isn't desired
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// export const getQuickResponse = async (req, res) => {
//   try {
//     const { userInput } = req.body;

//     if (!userInput) {
//       return res.status(400).json({ success: false, message: 'Missing user input.' });
//     }

//     // Use the simple analyzer for quick responses
//     const response = await analyzeMentalHealth(userInput);

//     res.status(200).json({
//       success: true,
//       data: { response }
//     });
//   } catch (err) {
//     console.error('Quick Response Error:', err.message);
//     res.status(500).json({ success: false, message: 'Server error.' });
//   }
// };

// /**
//  * Retrieves user chat history with emotional analysis context
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// export const getChatHistory = async (req, res) => {
//   try {
//     const { userId } = req.query;

//     if (!userId) {
//       return res.status(400).json({ success: false, message: 'Missing userId' });
//     }

//     const chats = await ChatMessage.find({ userId }).sort({ timestamp: -1 });

//     // Add emotional trend analysis if there are enough messages
//     let emotionalInsight = null;
//     if (chats.length >= 3) {
//       emotionalInsight = analyzeEmotionalTrends(chats);
//     }

//     res.status(200).json({ 
//       success: true, 
//       data: chats,
//       emotionalInsight
//     });
//   } catch (err) {
//     console.error('Fetch Chat History Error:', err.message);
//     res.status(500).json({ success: false, message: 'Server error.' });
//   }
// };

// /**
//  * Analyzes emotional trends across conversation history
//  * @param {Array} chats - Array of chat message objects
//  * @returns {Object} Insights about emotional patterns
//  */
// const analyzeEmotionalTrends = (chats) => {
//   // Extract emotions from chat history
//   const emotions = chats.map(chat => 
//     chat.emotionalData?.detectedEmotion || 'neutral'
//   );

//   // Count emotion frequencies
//   const emotionCounts = emotions.reduce((counts, emotion) => {
//     counts[emotion] = (counts[emotion] || 0) + 1;
//     return counts;
//   }, {});

//   // Find most common emotion
//   let mostCommonEmotion = 'neutral';
//   let highestCount = 0;
  
//   for (const [emotion, count] of Object.entries(emotionCounts)) {
//     if (count > highestCount) {
//       mostCommonEmotion = emotion;
//       highestCount = count;
//     }
//   }

//   // Calculate if emotional state is improving
//   const recentEmotions = emotions.slice(0, 3);
//   const positiveEmotions = ['joy', 'hope'];
//   const negativeEmotions = ['anxiety', 'sadness', 'anger', 'overwhelm', 'loneliness'];
  
//   const recentPositiveCount = recentEmotions.filter(e => 
//     positiveEmotions.includes(e)
//   ).length;
  
//   const recentNegativeCount = recentEmotions.filter(e => 
//     negativeEmotions.includes(e)
//   ).length;

//   // Generate insight based on patterns
//   return {
//     dominantEmotion: mostCommonEmotion,
//     emotionalState: recentPositiveCount > recentNegativeCount ? 'improving' : 
//                    recentNegativeCount > recentPositiveCount ? 'challenging' : 'mixed',
//     emotionFrequency: emotionCounts
//   };
// };

// /**
//  * Allows for one-time emotion analysis without storing chat
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// export const analyzeEmotionOnly = async (req, res) => {
//   try {
//     const { userInput } = req.body;

//     if (!userInput) {
//       return res.status(400).json({ success: false, message: 'Missing user input.' });
//     }

//     const emotionalState = detectEmotionFromText(userInput);

//     res.status(200).json({
//       success: true,
//       data: { emotionalState }
//     });
//   } catch (err) {
//     console.error('Emotion Analysis Error:', err.message);
//     res.status(500).json({ success: false, message: 'Server error.' });
//   }
// };

// /**
//  * Provides comprehensive support including emotional response, coping strategies, and wellness routines
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// export const getComprehensiveSupport = async (req, res) => {
//   try {
//     const { userInput, userId } = req.body;

//     if (!userInput) {
//       return res.status(400).json({ success: false, message: 'Missing user input.' });
//     }

//     // Get comprehensive support with all available features
//     const support = await provideComprehensiveSupport(userInput, userId);
    
//     // Store the interaction in chat history if userId provided
//     if (userId) {
//       const chat = new ChatMessage({
//         userId,
//         userInput,
//         botResponse: support.response,
//         emotionalData: {
//           detectedEmotion: support.detectedEmotion,
//           emotionalIntensity: support.emotionalIntensity,
//           copingStrategy: support.copingStrategy,
//           wellnessRoutine: support.wellnessRoutine.name,
//           isCrisis: support.isCrisis
//         }
//       });

//       await chat.save();
//     }

//     res.status(200).json({
//       success: true,
//       data: support
//     });
//   } catch (err) {
//     console.error('Comprehensive Support Error:', err.message);
//     res.status(500).json({ success: false, message: 'Server error.' });
//   }
// };

// /**
//  * Provides a wellness routine recommendation based on emotion and time of day
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// export const getWellnessRoutine = async (req, res) => {
//   try {
//     const { emotion, timeOfDay } = req.body;

//     if (!emotion) {
//       return res.status(400).json({ success: false, message: 'Missing emotion parameter.' });
//     }

//     const routine = recommendWellnessRoutine(emotion, timeOfDay);

//     res.status(200).json({
//       success: true,
//       data: routine
//     });
//   } catch (err) {
//     console.error('Wellness Routine Error:', err.message);
//     res.status(500).json({ success: false, message: 'Server error.' });
//   }
// };

// /**
//  * Creates a personalized wellness plan based on user preferences
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// export const createWellnessPlan = async (req, res) => {
//   try {
//     const userPreferences = req.body;

//     const plan = createPersonalizedWellnessPlan(userPreferences);

//     res.status(200).json({
//       success: true,
//       data: plan
//     });
//   } catch (err) {
//     console.error('Wellness Plan Error:', err.message);
//     res.status(500).json({ success: false, message: 'Server error.' });
//   }
// };