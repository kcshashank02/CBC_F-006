import express from 'express';
import { 
  handleChat, 
  getChatHistory, 
  getQuickResponse,
  analyzeEmotionOnly 
} from '../controllers/chatbotController.js';

const router = express.Router();

// Main chat endpoint for emotional support responses
router.post('/analyze', handleChat);

// Get chat history with emotional analysis
router.get('/history', getChatHistory);

// Quick response endpoint without database storage
router.post('/quick-response', getQuickResponse);

// Emotion-only analysis endpoint
router.post('/emotion', analyzeEmotionOnly);

export default router;
// import express from 'express';
// import {
//   handleChat,
//   getChatHistory,
//   getQuickResponse, 
//   analyzeEmotionOnly,
//   getComprehensiveSupport,
//   getWellnessRoutine,
//   createWellnessPlan
// } from '../controllers/chatbotController.js';

// const router = express.Router();

// // Main chat endpoint for emotional support responses
// router.post('/analyze', handleChat);

// // Get chat history with emotional analysis
// router.get('/history', getChatHistory);

// // Quick response endpoint without database storage
// router.post('/quick-response', getQuickResponse);

// // Emotion-only analysis endpoint
// router.post('/emotion', analyzeEmotionOnly);

// // Enhanced comprehensive support endpoint (emotion + coping + wellness)
// router.post('/comprehensive', getComprehensiveSupport);

// // Get wellness routine recommendation based on emotion and time of day
// router.post('/wellness-routine', getWellnessRoutine);

// // Create personalized wellness plan based on user preferences
// router.post('/wellness-plan', createWellnessPlan);

// export default router;