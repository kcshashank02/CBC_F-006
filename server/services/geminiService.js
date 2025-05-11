import axios from 'axios';
import dotenv from 'dotenv';
import ChatMessage from '../model/ChatMessage.js'; // Import the model to access history

dotenv.config();

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Emotional state tracking - helps maintain context between messages
const emotionalStateCache = new Map();

/**
 * Analyzes the emotional content of text using contextual clues
 * @param {string} text - User input to analyze
 * @returns {Object} Detected emotion and intensity
 */
const detectEmotionFromText = (text) => {
  // Basic emotion detection patterns 
  const emotionPatterns = {
    anxiety: /(anxious|worried|nervous|panic|stress|afraid|scared|terrified|fear)/i,
    sadness: /(sad|depressed|down|unhappy|miserable|hopeless|grief|despair|loss)/i,
    anger: /(angry|mad|frustrated|irritated|annoyed|furious|rage|resent)/i,
    joy: /(happy|joy|excited|great|wonderful|pleased|delighted|proud|accomplish)/i,
    overwhelm: /(overwhelm|too much|cannot handle|can't cope|exhausted|burned out)/i,
    loneliness: /(alone|lonely|isolated|no one|nobody|abandoned)/i,
    hope: /(hope|better|improve|progress|forward|future|optimistic)/i
  };

  // Intensity markers
  const intensityMarkers = {
    high: /(extremely|very|so|really|completely|utterly|absolutely|totally)/i,
    moderate: /(quite|rather|somewhat|pretty|fairly)/i,
    low: /(slightly|a bit|a little|kind of|sort of)/i
  };

  // Default emotional state
  let emotion = 'neutral';
  let intensity = 'moderate';
  
  // Detect primary emotion
  for (const [emotionName, pattern] of Object.entries(emotionPatterns)) {
    if (pattern.test(text)) {
      emotion = emotionName;
      break;
    }
  }
  
  // Detect intensity if emotion found
  if (emotion !== 'neutral') {
    for (const [intensityLevel, pattern] of Object.entries(intensityMarkers)) {
      if (pattern.test(text)) {
        intensity = intensityLevel;
        break;
      }
    }
  }

  // Crisis detection for safety
  const crisisSignals = /(suicide|kill myself|end it all|harm myself|self harm|hurt myself|don't want to live|not worth living)/i;
  const isCrisis = crisisSignals.test(text);

  return { emotion, intensity, isCrisis };
};

/**
 * Retrieves conversation history for a user
 * @param {string} userId - The user's ID
 * @param {number} limit - Maximum number of previous exchanges to retrieve
 * @returns {Array} Previous conversations
 */
const getConversationHistory = async (userId, limit = 5) => {
  try {
    if (!userId) return [];
    
    const history = await ChatMessage.find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit);
    
    return history.reverse();
  } catch (error) {
    console.error('Error fetching conversation history:', error);
    return [];
  }
};

/**
 * Builds a prompt that incorporates emotional intelligence guidelines
 * @param {string} userInput - The user's current message
 * @param {Object} emotionalState - Detected emotional state
 * @param {Array} history - Previous conversation exchanges
 * @returns {string} The crafted prompt for Gemini API
 */
const buildEmotionallyIntelligentPrompt = (userInput, emotionalState, history = []) => {
  // Format conversation history for context
  const formattedHistory = history.map(entry => 
    `User: "${entry.userInput}"\nAssistant: "${entry.botResponse}"`
  ).join('\n\n');
  
  // Select emotional response guidance based on detected emotion
  let emotionalGuidance = '';
  
  if (emotionalState.isCrisis) {
    emotionalGuidance = `
IMPORTANT: The user may be expressing thoughts of self-harm or suicide. Respond with utmost compassion while prioritizing their safety. 
Acknowledge their pain without judgment, express genuine concern, offer hope that things can improve, and strongly 
encourage them to reach out to professional help like a crisis hotline (988 in the US), emergency services (911), 
or to speak with a trusted person immediately. Do not minimize their feelings or offer simplistic solutions.`;
  } else {
    switch (emotionalState.emotion) {
      case 'anxiety':
        emotionalGuidance = `
The user appears to be experiencing anxiety at a ${emotionalState.intensity} level. Respond with a calm, reassuring tone. 
First validate their feelings, then offer grounding techniques or perspective. Use measured language with a steady pace. 
Avoid phrases that might increase urgency. Focus on present-moment awareness.`;
        break;
      case 'sadness':
        emotionalGuidance = `
The user appears to be experiencing sadness at a ${emotionalState.intensity} level. Respond with warm compassion. 
First validate their feelings without trying to immediately "fix" them. Use gentle, supportive language that acknowledges 
the difficulty of their experience. Offer perspective when appropriate, but prioritize emotional validation.`;
        break;
      case 'anger':
        emotionalGuidance = `
The user appears to be experiencing frustration or anger at a ${emotionalState.intensity} level. Respond with calm acknowledgment. 
Validate their feelings without escalating the emotion. Use neutral, measured language that shows you understand their perspective. 
Help them explore the underlying needs or concerns beneath the anger when appropriate.`;
        break;
      case 'overwhelm':
        emotionalGuidance = `
The user appears to be feeling overwhelmed at a ${emotionalState.intensity} level. Respond with steady calmness and structure. 
Acknowledge the weight of what they're carrying. Use simple, clear language. Offer to help break down concerns into smaller parts.
Focus on one thing at a time and avoid adding complexity to your response.`;
        break;
      case 'loneliness':
        emotionalGuidance = `
The user appears to be experiencing loneliness at a ${emotionalState.intensity} level. Respond with warm presence and connection. 
Acknowledge their feelings of isolation without minimizing them. Use language that conveys genuine interest in their experience.
Focus on both validation and gentle exploration of possible connections.`;
        break;
      case 'joy':
        emotionalGuidance = `
The user appears to be expressing joy or accomplishment at a ${emotionalState.intensity} level. Match their positive energy 
appropriately. Celebrate their success or happiness with genuine enthusiasm. Ask questions that help them savor the positive 
experience. Affirm their strengths that contributed to positive outcomes.`;
        break;
      case 'hope':
        emotionalGuidance = `
The user appears to be expressing hope at a ${emotionalState.intensity} level. Nurture this with thoughtful encouragement. 
Acknowledge their optimism while being grounded and realistic. Use language that reinforces their agency and capabilities.
Help them explore concrete next steps that align with their hopeful outlook.`;
        break;
      default:
        emotionalGuidance = `
Respond with balanced emotional attunement. First understand and validate the user's emotional state, then offer perspective 
or suggestions if appropriate. Use natural, conversational language with genuine care. Avoid clinical or robotic phrasing.
Prioritize empathy and validation over immediate problem-solving.`;
    }
  }

  // Construct the full prompt with history and emotional guidance
  return `You are a compassionate mental health assistant with advanced emotional intelligence. Your primary goal is to provide supportive, 
empathetic responses that validate the user's feelings while offering helpful perspective and coping strategies.

${history.length > 0 ? `CONVERSATION HISTORY:\n${formattedHistory}\n\n` : ''}

${emotionalGuidance}

IMPORTANT GUIDELINES:
- Always validate feelings before offering suggestions
- Use warm, natural language (avoid clinical or robotic phrasing)
- Match your emotional tone to the user's needs
- Be authentic and vary your expressions (avoid formulaic responses)
- Focus on supportive presence rather than trying to "fix" emotions
- Recognize accomplishments and strengths
- Avoid making any diagnosis
- Suggest professional help when appropriate
- Use thoughtful questions to explore deeper when helpful

Please respond to the user's current message:
User: "${userInput}"`;
};

/**
 * Process the user input with emotional intelligence and return an appropriate response
 * @param {string} userInput - The user's message
 * @param {string} userId - The user's ID for context tracking (optional)
 * @returns {string} The emotionally intelligent response
 */
export const analyzeMentalHealth = async (userInput, userId = null) => {
  try {
    // Step 1: Analyze emotional content
    const emotionalState = detectEmotionFromText(userInput);
    
    // Step 2: Get conversation history for context if userId provided
    const conversationHistory = userId ? await getConversationHistory(userId) : [];
    
    // Step 3: Check emotional state cache for this user to track emotional trends
    if (userId) {
      const previousState = emotionalStateCache.get(userId);
      if (previousState) {
        // Track emotional shifts for context
        emotionalState.shifted = previousState.emotion !== emotionalState.emotion;
        emotionalState.intensified = previousState.emotion === emotionalState.emotion && 
          previousState.intensity !== emotionalState.intensity;
      }
      // Update the cache with current state
      emotionalStateCache.set(userId, emotionalState);
    }
    
    // Step 4: Build emotionally intelligent prompt
    const prompt = buildEmotionallyIntelligentPrompt(userInput, emotionalState, conversationHistory);
    
    // Step 5: Call Gemini API with the emotionally enhanced prompt
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ]
      }
    );
    
    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 
      'I\'m having trouble understanding right now, but I\'m here to listen if you want to share more.';
    
    return text;
  } catch (error) {
    console.error('Error in mental health analysis:', error);
    return 'I\'m sorry, I encountered an issue while processing your message. How else might I support you today?';
  }
};

/**
 * Additional function to provide emotional support with specific coping techniques
 * @param {string} emotion - The detected emotion to address
 * @returns {string} A coping suggestion for the specific emotion
 */
/**
 * Enhanced function to provide concise, effective coping strategies
 * @param {string} emotion - The detected emotion to address
 * @returns {Object} A targeted coping package with quick remedy and rationale
 */
export const getCopingStrategies = async (emotion) => {
    const strategies = {
    anxiety: [
      {
        remedy: "Breathe: 4 counts in, hold 2, 6 counts out. Repeat 5 times.",
        rationale: "Activates parasympathetic nervous system, reducing physical anxiety symptoms immediately.",
        context: { intensity: ['moderate', 'high', 'extreme'] }
      },
      {
        remedy: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
        rationale: "Grounding technique that interrupts anxiety spiral by engaging your senses in the present moment.",
        context: { intensity: ['high', 'extreme'] }
      },
      {
        remedy: "Put your hand on your chest and say 'This feeling is temporary and I am safe right now.'",
        rationale: "Combines physical touch with positive affirmation to reset emotional response.",
        context: { intensity: ['moderate', 'high'] }
      },
      {
        remedy: "Tense every muscle in your body for 5 seconds, then release completely with an exhale.",
        rationale: "Progressive muscle relaxation interrupts the physical tension cycle that maintains anxiety.",
        context: { intensity: ['moderate', 'high'] }
      },
      {
        remedy: "Focus your complete attention on a small object near you. Examine every detail for 30 seconds.",
        rationale: "Mindful attention exercise that breaks rumination by anchoring to physical reality.",
        context: { intensity: ['low', 'moderate'] }
      }
    ],
    sadness: [
      {
        remedy: "Text someone you trust: 'Having a rough moment, could use a kind word.'",
        rationale: "Activates social connection, proven to release oxytocin which counteracts sadness.",
        context: { hasSelfBlame: false }
      },
      {
        remedy: "Step outside and feel the air on your skin for 2 minutes.",
        rationale: "Nature and physical sensation can interrupt depressive thought patterns.",
        context: { intensity: ['low', 'moderate', 'high'] }
      },
      {
        remedy: "Drink water and eat something nutritious, even if small.",
        rationale: "Physical depletion intensifies emotional pain; basic self-care provides immediate relief.",
        context: { intensity: ['high', 'extreme'] }
      },
      {
        remedy: "List 3 tiny achievements from today, even as simple as 'I got out of bed' or 'I reached out for help'.",
        rationale: "Counters negative bias by creating evidence of capability and progress.",
        context: { hasSelfBlame: true }
      },
      {
        remedy: "Put on music that matches your mood for 5 minutes, then gradually shift to something more uplifting.",
        rationale: "Emotional attunement before shifting prevents feeling invalidated and creates natural transition.",
        context: { temporality: 'recent' }
      }
    ],
    anger: [
      {
        remedy: "Clench your fists tightly for 5 seconds, then release completely. Repeat 3 times.",
        rationale: "Physical tension-release exercise that metabolizes stress hormones fueling anger.",
        context: { intensity: ['high', 'extreme'] }
      },
      {
        remedy: "Write exactly what you're angry about, then what need isn't being met.",
        rationale: "Transforms reactive anger into specific, addressable issues.",
        context: { intensity: ['low', 'moderate'] }
      },
      {
        remedy: "Count to 10 before responding, or say 'I need a moment to think clearly.'",
        rationale: "Creates space between trigger and response, allowing rational brain to engage.",
        context: { intensity: ['moderate', 'high'] }
      },
      {
        remedy: "Splash cold water on your face or place ice on your wrists.",
        rationale: "Temperature reduction triggers parasympathetic response that physically calms anger.",
        context: { intensity: ['high', 'extreme'] }
      },
      {
        remedy: "Express the anger physically in a safe way: tear paper, squeeze a stress ball, or do push-ups.",
        rationale: "Provides physical outlet for the adrenaline surge that accompanies intense anger.",
        context: { intensity: ['high', 'extreme'] }
      }
    ],
    overwhelm: [
      {
        remedy: "Write down everything on your mind, then circle only ONE thing to focus on right now.",
        rationale: "Externalizes mental load and restores sense of control through prioritization.",
        context: { intensity: ['moderate', 'high'] }
      },
      {
        remedy: "Set timer for 10 minutes of focused work, then 2 minutes of complete rest.",
        rationale: "Makes progress manageable while preventing burnout through deliberate pauses.",
        context: { temporality: 'recent' }
      },
      {
        remedy: "Close all unnecessary tabs, put phone away, and clear physical space around you.",
        rationale: "Reduces cognitive load by eliminating environmental stimuli demanding attention.",
        context: { intensity: ['moderate', 'high'] }
      },
      {
        remedy: "Say out loud: 'I can only do one thing at a time, and that's enough.'",
        rationale: "Challenges perfectionism and provides permission to work at sustainable pace.",
        context: { hasSelfBlame: true }
      },
      {
        remedy: "Take a 2-minute break to do nothing but breathe. Don't skip this - it's productive time.",
        rationale: "Micro-recovery prevents cognitive depletion and actually improves overall productivity.",
        context: { temporality: 'chronic' }
      }
    ],
    loneliness: [
      {
        remedy: "Join a public online conversation about something that interests you and post one comment.",
        rationale: "Low-pressure social engagement that creates belonging without vulnerability.",
        context: { intensity: ['low', 'moderate'] }
      },
      {
        remedy: "Do something kind for someone else, even sending an encouraging message.",
        rationale: "Helping others activates reward centers in the brain that counter isolation feelings.",
        context: { intensity: ['moderate', 'high'] }
      },
      {
        remedy: "Touch something soft and comforting while listening to voices (podcast, show) in background.",
        rationale: "Simulates physical and social connection, triggering comfort responses.",
        context: { intensity: ['high', 'extreme'] }
      },
      {
        remedy: "Write a message to someone you trust saying exactly how you feel. Send it if comfortable.",
        rationale: "Emotional disclosure, even without response, reduces loneliness biochemically.",
        context: { intensity: ['high', 'extreme'] }
      },
      {
        remedy: "Find an online group related to something you enjoy and just observe conversations for 10 minutes.",
        rationale: "Creates sense of community with minimal social risk, bridging toward deeper connection.",
        context: { intensity: ['low', 'moderate'] }
      }
    ],
    joy: [
      {
        remedy: "Take 3 slow breaths while focusing entirely on this positive feeling.",
        rationale: "Mindful savoring extends positive emotions and builds neural pathways for happiness.",
        context: { intensity: ['moderate', 'high'] }
      },
      {
        remedy: "Send a quick message sharing your good news with someone who'll appreciate it.",
        rationale: "Sharing positive experiences magnifies their emotional impact.",
        context: { intensity: ['high', 'extreme'] }
      },
      {
        remedy: "Take a photo or write one sentence about this moment to revisit later.",
        rationale: "Creates tangible anchor for positive emotions that can be accessed during harder times.",
        context: { intensity: ['moderate', 'high'] }
      },
      {
        remedy: "Express gratitude for one thing that contributed to this positive feeling.",
        rationale: "Gratitude practice strengthens positive emotional circuits and prolongs mood benefits.",
        context: { intensity: ['low', 'moderate'] }
      },
      {
        remedy: "Move your body in a way that expresses this joy - dance, jump, or just smile fully.",
        rationale: "Physical expression reinforces emotional states through embodied cognition.",
        context: { intensity: ['high', 'extreme'] }
      }
    ],
    hope: [
      {
        remedy: "Write down one small action you can take today toward what you're hoping for.",
        rationale: "Converts abstract hope into concrete progress through immediate action.",
        context: { intensity: ['low', 'moderate', 'high'] }
      },
      {
        remedy: "Visualize in detail what success looks like for 60 seconds, engaging all senses.",
        rationale: "Mental rehearsal strengthens motivation and primes brain for opportunity recognition.",
        context: { intensity: ['moderate', 'high'] }
      },
      {
        remedy: "Tell someone specific about your hope and ask for their support.",
        rationale: "Social accountability increases follow-through and creates supportive alliance.",
        context: { intensity: ['moderate', 'high'] }
      },
      {
        remedy: "Create a visual reminder of your goal and place it where you'll see it daily.",
        rationale: "Environmental cues maintain focus and motivation during inevitable challenges.",
        context: { temporality: 'chronic' }
      },
      {
        remedy: "Recall a previous time when something worked out despite uncertainty.",
        rationale: "Accessing past resilience creates evidence-based confidence for current situation.",
        context: { hasSelfBlame: true }
      }
    ],
    shame: [
      {
        remedy: "Place your hand on your heart and say: 'I'm human and imperfect, just like everyone else.'",
        rationale: "Self-compassion reduces shame biochemically and breaks isolation of believing you're uniquely flawed.",
        context: { intensity: ['moderate', 'high'] }
      },
      {
        remedy: "Write down what happened, then what you learned, then how you'll grow from it.",
        rationale: "Reframes shame narrative from identity threat to growth opportunity through structured reflection.",
        context: { intensity: ['low', 'moderate'] }
      },
      {
        remedy: "Share what you're ashamed of with someone you trust, or write it as if you were telling them.",
        rationale: "Shame requires secrecy to survive; even imagined disclosure reduces its power.",
        context: { intensity: ['high', 'extreme'] }
      },
      {
        remedy: "List three ways your mistake or perceived flaw makes you more human and relatable.",
        rationale: "Converts shame trigger into connection opportunity through perspective shift.",
        context: { hasSelfBlame: true }
      },
      {
        remedy: "Identify one specific action you can take to address the situation, no matter how small.",
        rationale: "Shame paralyzes; action restores agency and shifts focus from identity to behavior.",
        context: { intensity: ['moderate', 'high'] }
      }
    ],
    confusion: [
      {
        remedy: "Write down exactly what you're unsure about in the form of specific questions.",
        rationale: "Transforms vague uncertainty into defined knowledge gaps that can be addressed systematically.",
        context: { intensity: ['low', 'moderate'] }
      },
      {
        remedy: "Say out loud: 'It's okay not to know yet. Confusion is part of learning.'",
        rationale: "Normalizes confusion as productive rather than threatening, reducing anxiety that blocks clarity.",
        context: { hasSelfBlame: true }
      },
      {
        remedy: "Simplify your focus: identify just ONE aspect to clarify first before moving on.",
        rationale: "Incremental understanding builds confidence and prevents cognitive overwhelm.",
        context: { intensity: ['moderate', 'high'] }
      },
      {
        remedy: "Take a 5-minute break from the confusion-causing situation, then return with fresh eyes.",
        rationale: "Cognitive reset allows subconscious processing and new perspective on returning.",
        context: { intensity: ['high', 'extreme'] }
      },
      {
        remedy: "Explain what you do understand about the situation, either to someone else or in writing.",
        rationale: "Articulating current knowledge consolidates understanding and reveals specific gaps.",
        context: { intensity: ['moderate', 'high'] }
      }
    ],
    neutral: [
      {
        remedy: "Take 5 deep breaths while asking 'What matters most to me right now?'",
        rationale: "Creates intentional direction when emotions aren't providing clear guidance.",
        context: { intensity: ['low'] }
      },
      {
        remedy: "Drink a full glass of water and stretch for 60 seconds.",
        rationale: "Basic physical needs affect mood; hydration and movement create positive shift.",
        context: { intensity: ['low'] }
      },
      {
        remedy: "Set a small, achievable goal for the next hour and accomplish it.",
        rationale: "Builds momentum and confidence through immediate success experience.",
        context: { intensity: ['low', 'moderate'] }
      },
      {
        remedy: "Reflect on what you're grateful for in this present moment.",
        rationale: "Gratitude practice activates positive neural pathways even in neutral states.",
        context: { intensity: ['low'] }
      },
      {
        remedy: "Check in with your body - notice any tension, hunger, thirst, or fatigue signals.",
        rationale: "Physical needs often register before emotional awareness, addressing them prevents decline.",
        context: { intensity: ['low'] }
      }
    ],
    crisis: [
      {
        remedy: "Text HOME to 741741 (Crisis Text Line) or call 988 (Suicide Prevention Lifeline) right now.",
        rationale: "Immediate connection to trained crisis counselors who can help navigate intense emotions safely.",
        context: { intensity: ['extreme'] }
      },
      {
        remedy: "Tell someone nearby that you need help, or call a trusted person if you're alone.",
        rationale: "Creates immediate safety connection when self-regulation isn't possible.",
        context: { intensity: ['extreme'] }
      },
      {
        remedy: "Focus only on breathing slowly while holding something cold (ice, cold water) to disrupt crisis state.",
        rationale: "Cold sensation triggers parasympathetic response that can interrupt crisis neurochemistry.",
        context: { intensity: ['high', 'extreme'] }
      },
      {
        remedy: "Repeat: 'This feeling will pass. I've survived difficult moments before.'",
        rationale: "Creates temporal perspective when crisis thinking causes tunnel vision about pain.",
        context: { intensity: ['high', 'extreme'] }
      },
      {
        remedy: "Move to a different physical location immediately, even if just another room.",
        rationale: "Environmental change can interrupt crisis thought patterns and create mental reset.",
        context: { intensity: ['high', 'extreme'] }
      }
    ]
  };
  
    const emotionKey = strategies[emotion] ? emotion : 'neutral';
    const strategyList = strategies[emotionKey];
    
    // Select a strategy based on the emotion
    const randomIndex = Math.floor(Math.random() * strategyList.length);
    const selected = strategyList[randomIndex];
    
    return {
      shortRemedy: selected.remedy,
      why: selected.rationale
    };
  };
  
  /**
   * Formats the coping strategy response for display
   * @param {Object} strategyResponse - The response from getCopingStrategies
   * @returns {string} Formatted strategy response
   */
  export const formatCopingStrategy = (strategyResponse) => {
    return `TRY THIS: ${strategyResponse.shortRemedy}`;
  };
  
  /**
   * Enhanced function that provides emotional support with concise, effective remedies
   * @param {string} userInput - The user's message
   * @param {string} userId - The user's ID for context tracking (optional)
   * @returns {Object} Response with emotional analysis and appropriate response
   */
  export const provideEmotionalSupport = async (userInput, userId = null) => {
    // Detect emotion and crisis signals
    const emotionalState = detectEmotionFromText(userInput);
    
    // Use crisis protocols if crisis is detected
    const emotionForStrategy = emotionalState.isCrisis ? 'crisis' : emotionalState.emotion;
    
    // Get the main response
    const mainResponse = await analyzeMentalHealth(userInput, userId);
    
    // Get concise coping strategy
    const copingStrategy = await getCopingStrategies(emotionForStrategy);
    
    // Format the full response
    return {
      response: mainResponse,
      detectedEmotion: emotionalState.emotion,
      intensity: emotionalState.intensity,
      isCrisis: emotionalState.isCrisis,
      copingStrategy: formatCopingStrategy(copingStrategy),
      fullStrategy: copingStrategy
    };
  };
// // import axios from 'axios';
// // import dotenv from 'dotenv';
// // import ChatMessage from '../model/ChatMessage.js'; // Import the model to access history

// // dotenv.config();

// // const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// // // Emotional state tracking - helps maintain context between messages
// // const emotionalStateCache = new Map();

// // /**
// //  * Analyzes the emotional content of text using contextual clues
// //  * @param {string} text - User input to analyze
// //  * @returns {Object} Detected emotion and intensity
// //  */
// // const detectEmotionFromText = (text) => {
// //   // Basic emotion detection patterns 
// //   const emotionPatterns = {
// //     anxiety: /(anxious|worried|nervous|panic|stress|afraid|scared|terrified|fear)/i,
// //     sadness: /(sad|depressed|down|unhappy|miserable|hopeless|grief|despair|loss)/i,
// //     anger: /(angry|mad|frustrated|irritated|annoyed|furious|rage|resent)/i,
// //     joy: /(happy|joy|excited|great|wonderful|pleased|delighted|proud|accomplish)/i,
// //     overwhelm: /(overwhelm|too much|cannot handle|can't cope|exhausted|burned out)/i,
// //     loneliness: /(alone|lonely|isolated|no one|nobody|abandoned)/i,
// //     hope: /(hope|better|improve|progress|forward|future|optimistic)/i
// //   };

// //   // Intensity markers
// //   const intensityMarkers = {
// //     high: /(extremely|very|so|really|completely|utterly|absolutely|totally)/i,
// //     moderate: /(quite|rather|somewhat|pretty|fairly)/i,
// //     low: /(slightly|a bit|a little|kind of|sort of)/i
// //   };

// //   // Default emotional state
// //   let emotion = 'neutral';
// //   let intensity = 'moderate';
  
// //   // Detect primary emotion
// //   for (const [emotionName, pattern] of Object.entries(emotionPatterns)) {
// //     if (pattern.test(text)) {
// //       emotion = emotionName;
// //       break;
// //     }
// //   }
  
// //   // Detect intensity if emotion found
// //   if (emotion !== 'neutral') {
// //     for (const [intensityLevel, pattern] of Object.entries(intensityMarkers)) {
// //       if (pattern.test(text)) {
// //         intensity = intensityLevel;
// //         break;
// //       }
// //     }
// //   }

// //   // Crisis detection for safety
// //   const crisisSignals = /(suicide|kill myself|end it all|harm myself|self harm|hurt myself|don't want to live|not worth living)/i;
// //   const isCrisis = crisisSignals.test(text);

// //   return { emotion, intensity, isCrisis };
// // };

// // /**
// //  * Retrieves conversation history for a user
// //  * @param {string} userId - The user's ID
// //  * @param {number} limit - Maximum number of previous exchanges to retrieve
// //  * @returns {Array} Previous conversations
// //  */
// // const getConversationHistory = async (userId, limit = 3) => { // Reduced from 5 to 3 for conciseness
// //   try {
// //     if (!userId) return [];
    
// //     const history = await ChatMessage.find({ userId })
// //       .sort({ timestamp: -1 })
// //       .limit(limit);
    
// //     return history.reverse();
// //   } catch (error) {
// //     console.error('Error fetching conversation history:', error);
// //     return [];
// //   }
// // };

// // /**
// //  * Generates a follow-up question based on the emotional state
// //  * @param {Object} emotionalState - The detected emotional state
// //  * @returns {string} A follow-up question to keep conversation flowing
// //  */
// // const generateFollowUpQuestion = (emotionalState) => {
// //   if (emotionalState.isCrisis) {
// //     return "Have you reached out to anyone for help today?";
// //   }
  
// //   const followUps = {
// //     anxiety: [
// //       "What's one small step that might help right now?", 
// //       "What has helped you manage similar feelings before?",
// //       "On a scale of 1-10, how intense is this feeling?"
// //     ],
// //     sadness: [
// //       "What's one small thing that might bring some comfort today?", 
// //       "Have you noticed any patterns to when you feel this way?",
// //       "What would be a tiny win for you today?"
// //     ],
// //     anger: [
// //       "What's at the core of this frustration?", 
// //       "What would help you feel more in control right now?",
// //       "How would you like things to be different?"
// //     ],
// //     overwhelm: [
// //       "What's your top priority right now?", 
// //       "What's one task you could remove from your plate?",
// //       "What helps you feel grounded when things are too much?"
// //     ],
// //     loneliness: [
// //       "Is there someone you'd like to connect with?", 
// //       "What activity helps you feel more connected?",
// //       "What kind of connection would be most helpful right now?"
// //     ],
// //     joy: [
// //       "What contributed to this positive feeling?", 
// //       "How might you build on this good moment?",
// //       "Who might you share this positive experience with?"
// //     ],
// //     hope: [
// //       "What's one small step toward what you're hoping for?", 
// //       "What would progress look like for you?",
// //       "What strengths will help you move forward?"
// //     ],
// //     neutral: [
// //       "What's on your mind today?", 
// //       "What would be helpful to focus on right now?",
// //       "What matters most to you this week?"
// //     ]
// //   };
  
// //   const options = followUps[emotionalState.emotion] || followUps.neutral;
// //   return options[Math.floor(Math.random() * options.length)];
// // };

// // /**
// //  * Builds a prompt that incorporates concise messaging guidelines
// //  * @param {string} userInput - The user's current message
// //  * @param {Object} emotionalState - Detected emotional state
// //  * @param {Array} history - Previous conversation exchanges
// //  * @returns {string} The crafted prompt for Gemini API
// //  */
// // const buildConciseResponsePrompt = (userInput, emotionalState, history = []) => {
// //   // Format conversation history for context
// //   const formattedHistory = history.map(entry => 
// //     `User: "${entry.userInput}"\nAssistant: "${entry.botResponse}"`
// //   ).join('\n\n');
  
// //   // Select emotional response guidance based on detected emotion
// //   let emotionalGuidance = '';
  
// //   if (emotionalState.isCrisis) {
// //     emotionalGuidance = `
// // CRISIS RESPONSE: The user may be expressing thoughts of self-harm or suicide. Respond with brief, clear compassion. 
// // Prioritize safety, express concern, and directly encourage professional help (988 Lifeline, emergency services).
// // Keep your response under 4 sentences total.`;
// //   } else {
// //     switch (emotionalState.emotion) {
// //       case 'anxiety':
// //         emotionalGuidance = `
// // The user appears anxious (${emotionalState.intensity} level). Respond with 3-4 short, calming sentences. 
// // Include one practical grounding technique they can try immediately.`;
// //         break;
// //       case 'sadness':
// //         emotionalGuidance = `
// // The user appears sad (${emotionalState.intensity} level). Respond with 3-4 gentle, validating sentences. 
// // Acknowledge their feelings first, then offer one small, specific suggestion.`;
// //         break;
// //       case 'anger':
// //         emotionalGuidance = `
// // The user appears frustrated/angry (${emotionalState.intensity} level). Respond with 3-4 calm, validating sentences.
// // Acknowledge their perspective and offer one focused suggestion for managing the emotion.`;
// //         break;
// //       case 'overwhelm':
// //         emotionalGuidance = `
// // The user appears overwhelmed (${emotionalState.intensity} level). Respond with 3-4 very simple, clear sentences.
// // Offer one specific prioritization or simplification technique.`;
// //         break;
// //       case 'loneliness':
// //         emotionalGuidance = `
// // The user appears lonely (${emotionalState.intensity} level). Respond with 3-4 warm, connecting sentences.
// // Offer one practical suggestion for meaningful connection.`;
// //         break;
// //       case 'joy':
// //         emotionalGuidance = `
// // The user appears happy/joyful (${emotionalState.intensity} level). Respond with 3-4 celebratory sentences.
// // Include one suggestion for savoring or building on this positive feeling.`;
// //         break;
// //       case 'hope':
// //         emotionalGuidance = `
// // The user appears hopeful (${emotionalState.intensity} level). Respond with 3-4 encouraging sentences.
// // Offer one specific action step to maintain momentum.`;
// //         break;
// //       default:
// //         emotionalGuidance = `
// // Respond with 3-4 attentive, warm sentences. Include one helpful suggestion or observation.`;
// //     }
// //   }

// //   // Construct the full prompt with history and brevity guidelines
// //   return `You are a concise mental health assistant. Your responses must be brief, clear, and actionable.

// // ${history.length > 0 ? `CONVERSATION HISTORY:\n${formattedHistory}\n\n` : ''}

// // ${emotionalGuidance}

// // RESPONSE GUIDELINES:
// // - Use maximum 3-4 short sentences total
// // - Use bullet points for any list of suggestions
// // - Start with brief validation of their feelings
// // - Include ONE clear, specific recommendation
// // - Use warm, natural language
// // - Avoid clinical terms or jargon
// // - End with an open-ended question to continue the conversation
// // - NEVER give multi-step instructions or long explanations

// // Response format:
// // 1. Brief validation (1 sentence)
// // 2. One clear suggestion (1-2 sentences or bullet points)
// // 3. One open-ended follow-up question (1 sentence)

// // User: "${userInput}"`;
// // };

// // /**
// //  * Process the user input and return a concise, point-wise response
// //  * @param {string} userInput - The user's message
// //  * @param {string} userId - The user's ID for context tracking (optional)
// //  * @returns {string} The concise, helpful response
// //  */
// // export const analyzeMentalHealth = async (userInput, userId = null) => {
// //   try {
// //     // Step 1: Analyze emotional content
// //     const emotionalState = detectEmotionFromText(userInput);
    
// //     // Step 2: Get conversation history for context if userId provided
// //     const conversationHistory = userId ? await getConversationHistory(userId) : [];
    
// //     // Step 3: Check emotional state cache for this user to track emotional trends
// //     if (userId) {
// //       const previousState = emotionalStateCache.get(userId);
// //       if (previousState) {
// //         // Track emotional shifts for context
// //         emotionalState.shifted = previousState.emotion !== emotionalState.emotion;
// //         emotionalState.intensified = previousState.emotion === emotionalState.emotion && 
// //           previousState.intensity !== emotionalState.intensity;
// //       }
// //       // Update the cache with current state
// //       emotionalStateCache.set(userId, emotionalState);
// //     }
    
// //     // Step 4: Build concise prompt
// //     const prompt = buildConciseResponsePrompt(userInput, emotionalState, conversationHistory);
    
// //     // Step 5: Call Gemini API with the concise prompt
// //     const response = await axios.post(
// //       `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
// //       {
// //         contents: [
// //           {
// //             role: 'user',
// //             parts: [{ text: prompt }]
// //           }
// //         ]
// //       }
// //     );
    
// //     const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 
// //       'I hear you. How can I best support you right now?';
    
// //     // Step 6: Add a follow-up question if one isn't already included
// //     if (!text.includes('?')) {
// //       const followUp = generateFollowUpQuestion(emotionalState);
// //       return `${text}\n\n${followUp}`;
// //     }
    
// //     return text;
// //   } catch (error) {
// //     console.error('Error in mental health analysis:', error);
// //     return 'I\'m here to help. Could you tell me a bit more about what you\'re experiencing?';
// //   }
// // };

// // /**
// //  * Provides quick coping strategies based on detected emotion
// //  * @param {string} emotion - The detected emotion to address
// //  * @returns {Object} A targeted coping strategy
// //  */
// // export const getCopingStrategies = async (emotion) => {
// //   const strategies = {
// //     anxiety: [
// //       { remedy: "Breathe: 4 counts in, hold 2, 6 counts out. Repeat 5 times." },
// //       { remedy: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste." },
// //       { remedy: "Put your hand on your chest and say 'This feeling is temporary and I am safe right now.'" }
// //     ],
// //     sadness: [
// //       { remedy: "Text someone you trust: 'Having a rough moment, could use a kind word.'" },
// //       { remedy: "Step outside and feel the air on your skin for 2 minutes." },
// //       { remedy: "Drink water and eat something nutritious, even if small." }
// //     ],
// //     anger: [
// //       { remedy: "Clench your fists tightly for 5 seconds, then release completely. Repeat 3 times." },
// //       { remedy: "Write exactly what you're angry about, then what need isn't being met." },
// //       { remedy: "Count to 10 before responding, or say 'I need a moment to think clearly.'" }
// //     ],
// //     overwhelm: [
// //       { remedy: "Write down everything on your mind, then circle only ONE thing to focus on right now." },
// //       { remedy: "Set timer for 10 minutes of focused work, then 2 minutes of complete rest." },
// //       { remedy: "Close all unnecessary tabs, put phone away, and clear physical space around you." }
// //     ],
// //     loneliness: [
// //       { remedy: "Join a public online conversation about something that interests you." },
// //       { remedy: "Do something kind for someone else, even sending an encouraging message." },
// //       { remedy: "Touch something soft and comforting while listening to voices (podcast, show)." }
// //     ],
// //     joy: [
// //       { remedy: "Take 3 slow breaths while focusing entirely on this positive feeling." },
// //       { remedy: "Send a quick message sharing your good news with someone." },
// //       { remedy: "Take a photo or write one sentence about this moment to revisit later." }
// //     ],
// //     hope: [
// //       { remedy: "Write down one small action you can take today toward what you're hoping for." },
// //       { remedy: "Visualize in detail what success looks like for 60 seconds." },
// //       { remedy: "Tell someone specific about your hope and ask for their support." }
// //     ],
// //     neutral: [
// //       { remedy: "Take 5 deep breaths while asking 'What matters most to me right now?'" },
// //       { remedy: "Drink a full glass of water and stretch for 60 seconds." },
// //       { remedy: "Set a small, achievable goal for the next hour and accomplish it." }
// //     ],
// //     crisis: [
// //       { remedy: "Text HOME to 741741 (Crisis Text Line) or call 988 (Suicide Prevention Lifeline) right now." },
// //       { remedy: "Tell someone nearby that you need help, or call a trusted person if you're alone." },
// //       { remedy: "Focus only on breathing slowly while holding something cold (ice, cold water)." }
// //     ]
// //   };

// //   const emotionKey = strategies[emotion] ? emotion : 'neutral';
// //   const strategyList = strategies[emotionKey];
  
// //   // Select a strategy based on the emotion
// //   const randomIndex = Math.floor(Math.random() * strategyList.length);
// //   const selected = strategyList[randomIndex];
  
// //   return {
// //     shortRemedy: selected.remedy
// //   };
// // };

// // /**
// //  * Formats the coping strategy response for display
// //  * @param {Object} strategyResponse - The response from getCopingStrategies
// //  * @returns {string} Formatted strategy response
// //  */
// // export const formatCopingStrategy = (strategyResponse) => {
// //   return `TRY THIS: ${strategyResponse.shortRemedy}`;
// // };

// // /**
// //  * Generates targeted recommendations based on emotion
// //  * @param {string} emotion - The detected emotion
// //  * @returns {string} A specific recommendation
// //  */
// // export const getRecommendation = (emotion) => {
// //   const recommendations = {
// //     anxiety: [
// //       "📱 Try the Calm or Headspace app for guided breathing",
// //       "📚 Consider 'The Anxiety and Phobia Workbook' by Edmund Bourne",
// //       "🧘‍♂️ Look into mindfulness-based stress reduction (MBSR)"
// //     ],
// //     sadness: [
// //       "🏃‍♀️ Even 5 minutes of movement can boost mood",
// //       "📝 Start a simple gratitude practice - just 3 things daily",
// //       "🎧 Create a playlist of songs that energize you"
// //     ],
// //     anger: [
// //       "📱 Try the 'Calm Harm' app for managing intense emotions",
// //       "🥊 Physical exercise like running or boxing can release tension",
// //       "📝 Try writing a letter you don't send to express feelings safely"
// //     ],
// //     overwhelm: [
// //       "📝 Try the Eisenhower Box method for prioritizing tasks",
// //       "⏰ Set a timer for 25 minutes of focused work, then break for 5",
// //       "🧹 Declutter one small space to reduce visual stress"
// //     ],
// //     loneliness: [
// //       "🤝 Consider volunteering - even virtually - to connect with others",
// //       "🐕 If possible, spending time with animals can reduce loneliness",
// //       "📱 Try the Meetup app to find groups with similar interests"
// //     ],
// //     joy: [
// //       "📝 Start a 'joy journal' to document positive moments",
// //       "📸 Create a digital album of happy memories to revisit",
// //       "🎁 Consider how to share this joy with someone else"
// //     ],
// //     hope: [
// //       "📝 Create a visual board of what you're working toward",
// //       "🎯 Break your goal into 3 small, achievable steps",
// //       "📚 Read success stories of others who've achieved similar goals"
// //     ],
// //     neutral: [
// //       "📚 Consider 'Atomic Habits' by James Clear for building positive routines",
// //       "🧠 Try a daily mindfulness practice like the 'Waking Up' app",
// //       "🌱 Explore 'values exercises' to clarify what matters most to you"
// //     ],
// //     crisis: [
// //       "📱 The 988 Lifeline has 24/7 trained counselors",
// //       "🏥 Your local emergency room can provide immediate help",
// //       "📞 The Crisis Text Line (text HOME to 741741) offers text-based support"
// //     ]
// //   };

// //   const emotionKey = recommendations[emotion] ? emotion : 'neutral';
// //   const options = recommendations[emotionKey];
// //   return options[Math.floor(Math.random() * options.length)];
// // };

// // /**
// //  * Enhanced function that provides concise emotional support with follow-up questions
// //  * @param {string} userInput - The user's message
// //  * @param {string} userId - The user's ID for context tracking (optional)
// //  * @returns {Object} Response with emotional analysis and appropriate response
// //  */
// // export const provideEmotionalSupport = async (userInput, userId = null) => {
// //   // Detect emotion and crisis signals
// //   const emotionalState = detectEmotionFromText(userInput);
  
// //   // Use crisis protocols if crisis is detected
// //   const emotionForStrategy = emotionalState.isCrisis ? 'crisis' : emotionalState.emotion;
  
// //   // Get the main response
// //   const mainResponse = await analyzeMentalHealth(userInput, userId);
  
// //   // Get concise coping strategy
// //   const copingStrategy = await getCopingStrategies(emotionForStrategy);
  
// //   // Get a targeted recommendation
// //   const recommendation = getRecommendation(emotionForStrategy);
  
// //   // Format the full response
// //   return {
// //     response: mainResponse,
// //     detectedEmotion: emotionalState.emotion,
// //     intensity: emotionalState.intensity,
// //     isCrisis: emotionalState.isCrisis,
// //     copingStrategy: formatCopingStrategy(copingStrategy),
// //     recommendation: recommendation
// //   };
// // };
// // import axios from 'axios';
// // import dotenv from 'dotenv';
// // import ChatMessage from '../model/ChatMessage.js'; // Import the model to access history
// // import natural from 'natural'; // Adding NLP capabilities with natural
// // import { WordTokenizer, SentimentAnalyzer, PorterStemmer, TfIdf } from 'natural';
// // import stopwords from 'natural/lib/natural/util/stopwords_en'; // English stopwords

// // dotenv.config();

// // const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// // // Emotional state tracking - helps maintain context between messages
// // const emotionalStateCache = new Map();

// // // Response tracking - ensures we're providing remedies, not just questions
// // const responseTrackingCache = new Map();

// // // Initialize NLP tools
// // const tokenizer = new WordTokenizer();
// // const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
// // const tfidf = new TfIdf();

// // /**
// //  * Enhanced emotion detection using NLP sentiment analysis
// //  * @param {string} text - User input to analyze
// //  * @returns {Object} Detected emotion and intensity
// //  */
// // const detectEmotionFromText = (text) => {
// //   // Tokenize input text
// //   const tokens = tokenizer.tokenize(text);
  
// //   // Get sentiment score using AFINN (-5 to +5 scale)
// //   const sentimentScore = analyzer.getSentiment(tokens);
  
// //   // Basic emotion detection patterns
// //   const emotionPatterns = {
// //     anxiety: /(anxious|worried|nervous|panic|stress|afraid|scared|terrified|fear)/i,
// //     sadness: /(sad|depressed|down|unhappy|miserable|hopeless|grief|despair|loss)/i,
// //     anger: /(angry|mad|frustrated|irritated|annoyed|furious|rage|resent)/i,
// //     joy: /(happy|joy|excited|great|wonderful|pleased|delighted|proud|accomplish)/i,
// //     overwhelm: /(overwhelm|too much|cannot handle|can't cope|exhausted|burned out)/i,
// //     loneliness: /(alone|lonely|isolated|no one|nobody|abandoned)/i,
// //     hope: /(hope|better|improve|progress|forward|future|optimistic)/i
// //   };

// //   // Intensity markers
// //   const intensityMarkers = {
// //     high: /(extremely|very|so|really|completely|utterly|absolutely|totally)/i,
// //     moderate: /(quite|rather|somewhat|pretty|fairly)/i,
// //     low: /(slightly|a bit|a little|kind of|sort of)/i
// //   };

// //   // Default emotion based on sentiment analysis
// //   let emotion = 'neutral';
// //   if (sentimentScore <= -3) emotion = 'sadness';
// //   else if (sentimentScore < 0) emotion = 'anxiety';
// //   else if (sentimentScore > 3) emotion = 'joy';
// //   else if (sentimentScore > 0) emotion = 'hope';
  
// //   // Override with specific emotion patterns if found
// //   for (const [emotionName, pattern] of Object.entries(emotionPatterns)) {
// //     if (pattern.test(text)) {
// //       emotion = emotionName;
// //       break;
// //     }
// //   }
  
// //   // Calculate intensity based on sentiment strength and explicit markers
// //   let intensity = 'moderate';
// //   if (Math.abs(sentimentScore) >= 4) {
// //     intensity = 'high';
// //   } else if (Math.abs(sentimentScore) <= 1) {
// //     intensity = 'low';
// //   }
  
// //   // Override with explicit intensity markers if found
// //   for (const [intensityLevel, pattern] of Object.entries(intensityMarkers)) {
// //     if (pattern.test(text)) {
// //       intensity = intensityLevel;
// //       break;
// //     }
// //   }

// //   // Crisis detection for safety
// //   const crisisSignals = /(suicide|kill myself|end it all|harm myself|self harm|hurt myself|don't want to live|not worth living)/i;
// //   const isCrisis = crisisSignals.test(text);

// //   // Advanced NLP features - identify main topics
// //   const frequencyMap = {};
// //   const stopWords = ['i', 'me', 'my', 'myself', 'we', 'our', 'the', 'a', 'an', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while'];
  
// //   tokens.forEach(token => {
// //     const word = token.toLowerCase();
// //     if (!stopWords.includes(word) && word.length > 2) {
// //       frequencyMap[word] = (frequencyMap[word] || 0) + 1;
// //     }
// //   });
  
// //   // Get top 3 topics
// //   const topics = Object.entries(frequencyMap)
// //     .sort((a, b) => b[1] - a[1])
// //     .slice(0, 3)
// //     .map(entry => entry[0]);

// //   return { 
// //     emotion, 
// //     intensity, 
// //     isCrisis,
// //     sentimentScore,
// //     topics
// //   };
// // };

// // /**
// //  * Extracts key topics from text using TF-IDF
// //  * @param {string} text - Text to analyze
// //  * @param {Array} history - Previous messages for context
// //  * @returns {Array} Top topics found in the text
// //  */
// // const extractKeyTopics = (text, history = []) => {
// //   // Reset TF-IDF for new analysis
// //   const tfidfInstance = new TfIdf();
  
// //   // Add current text as the primary document
// //   tfidfInstance.addDocument(text);
  
// //   // Add historical messages as context documents if available
// //   if (history && history.length > 0) {
// //     history.forEach(entry => {
// //       if (entry.userInput) {
// //         tfidfInstance.addDocument(entry.userInput);
// //       }
// //     });
// //   }
  
// //   // Get top terms from current document (index 0)
// //   const topTerms = [];
// //   tfidfInstance.listTerms(0).forEach(term => {
// //     // Filter out very short terms and stopwords
// //     if (term.term.length > 2 && !stopwords.includes(term.term.toLowerCase())) {
// //       topTerms.push({
// //         term: term.term,
// //         tfidf: term.tfidf
// //       });
// //     }
// //   });
  
// //   // Get top 5 terms
// //   return topTerms.slice(0, 5).map(item => item.term);
// // };

// // /**
// //  * Analyzes sentence structure and discourse
// //  * @param {string} text - User input to analyze
// //  * @returns {Object} Analysis of language patterns
// //  */
// // const analyzeLanguagePatterns = (text) => {
// //   // Split into sentences
// //   const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
// //   // Check for question patterns
// //   const questionCount = sentences.filter(s => 
// //     s.trim().endsWith('?') || 
// //     /\b(who|what|when|where|why|how|can|could|would|should|is|are|do|does|did)\b/i.test(s.trim())
// //   ).length;
  
// //   // Check for negative language patterns
// //   const negativePatterns = /(never|nothing|nowhere|nobody|none|no one|neither|nor|not|can't|won't|don't|doesn't|didn't|isn't|aren't)/ig;
// //   const negativeMatches = text.match(negativePatterns) || [];
  
// //   // Analyze sentence length
// //   const wordCounts = sentences.map(s => s.trim().split(/\s+/).length);
// //   const avgSentenceLength = wordCounts.reduce((sum, count) => sum + count, 0) / sentences.length;
  
// //   return {
// //     sentenceCount: sentences.length,
// //     questionRatio: sentences.length > 0 ? questionCount / sentences.length : 0,
// //     negativeLanguageCount: negativeMatches.length,
// //     avgSentenceLength,
// //     isBreviloquent: avgSentenceLength < 8, // Check if user is using short sentences
// //     isPredominantlyQuestions: questionCount > sentences.length * 0.5
// //   };
// // };

// // /**
// //  * Retrieves conversation history for a user and analyzes for remedy content
// //  * @param {string} userId - The user's ID
// //  * @param {number} limit - Maximum number of previous exchanges to retrieve
// //  * @returns {Array} Previous conversations with remedy analysis
// //  */
// // const getConversationHistory = async (userId, limit = 5) => {
// //   try {
// //     if (!userId) return [];
    
// //     const history = await ChatMessage.find({ userId })
// //       .sort({ timestamp: -1 })
// //       .limit(limit);
    
// //     // Add analysis of remedy content to enable stalled conversation detection
// //     const historyWithAnalysis = history.map(entry => {
// //       // Check if bot responses contain remedies or just questions
// //       const hasRemedy = entry.botResponse.match(/try|practice|exercise|technique|breathe|focus|write|step|place|touch|feel|count|name|set|listen|drink|eat|stretch|text|send|take|look|notice|visualize|create/i);
// //       const isQuestion = entry.botResponse.split(/[.!]+/).some(s => s.trim().endsWith('?'));
      
// //       return {
// //         ...entry.toObject ? entry.toObject() : entry, // Handle Mongoose documents
// //         responseAnalysis: {
// //           containsRemedy: !!hasRemedy,
// //           isOnlyQuestion: isQuestion && !hasRemedy
// //         }
// //       };
// //     });
    
// //     return historyWithAnalysis.reverse();
// //   } catch (error) {
// //     console.error('Error fetching conversation history:', error);
// //     return [];
// //   }
// // };

// // /**
// //  * Analyzes conversation patterns and trends
// //  * @param {Array} history - Conversation history
// //  * @returns {Object} Patterns and trends
// //  */
// // const analyzeConversationPatterns = (history) => {
// //   if (!history || history.length === 0) return null;
  
// //   // Track emotional trajectory
// //   const emotionalTrajectory = history.map(entry => {
// //     // Try to extract emotion from bot's response if available
// //     const match = entry.botResponse.match(/appears (\w+)/);
// //     return match ? match[1] : 'neutral';
// //   });
  
// //   // Detect if user is repetitive
// //   const uniqueUserMessages = new Set(history.map(entry => entry.userInput));
// //   const repetitionFactor = uniqueUserMessages.size / history.length;
  
// //   // Detect if conversation is making progress
// //   const recentMessages = history.slice(-2);
// //   const isStalled = recentMessages.length >= 2 && 
// //     recentMessages.every(msg => msg.botResponse.includes('?')) && 
// //     !recentMessages.some(msg => msg.botResponse.includes('remedy') || msg.botResponse.includes('try'));
  
// //   return {
// //     emotionalTrajectory,
// //     isRepetitive: repetitionFactor < 0.7,
// //     isStalled,
// //     historyLength: history.length
// //   };
// // };

// // /**
// //  * Generates a contextually appropriate response with remedy
// //  * @param {Object} emotionalState - The detected emotional state
// //  * @param {Object} languagePatterns - Analyzed language patterns
// //  * @param {Object} conversationPatterns - Conversation analysis
// //  * @returns {string} A response with appropriate remedy
// //  */
// // const generateResponse = (emotionalState, languagePatterns, conversationPatterns) => {
// //   // Start with validation based on emotional state
// //   let response = '';
  
// //   // Handle crisis first
// //   if (emotionalState.isCrisis) {
// //     return `I'm concerned about what you're sharing. Please call the National Suicide Prevention Lifeline at 988 right now - they're available 24/7. If you're in immediate danger, please call emergency services (911). Would you like me to provide more crisis resources?`;
// //   }
  
// //   // Generate validation
// //   switch (emotionalState.emotion) {
// //     case 'anxiety':
// //       response = `It sounds like you're feeling anxious right now. That's completely understandable.`;
// //       break;
// //     case 'sadness':
// //       response = `I hear the sadness in what you're saying. It's okay to feel this way.`;
// //       break;
// //     case 'anger':
// //       response = `I can sense your frustration. It's natural to feel upset about this.`;
// //       break;
// //     case 'joy':
// //       response = `It's wonderful to hear you're feeling positive! That's worth celebrating.`;
// //       break;
// //     case 'overwhelm':
// //       response = `It sounds like things feel overwhelming right now. That's a lot to handle.`;
// //       break;
// //     case 'loneliness':
// //       response = `Feeling disconnected can be really difficult. I hear that in what you're sharing.`;
// //       break;
// //     case 'hope':
// //       response = `I can sense the hope in your words. That's a powerful feeling to hold onto.`;
// //       break;
// //     default:
// //       response = `Thank you for sharing what's on your mind.`;
// //   }
  
// //   // Add a specific remedy based on emotion
// //   const remedies = {
// //     anxiety: [
// //       "Try this quick breathing exercise: inhale for 4 counts, hold for 2, exhale for 6. Repeat 3 times.",
// //       "Put your hand on your chest and take 5 slow breaths, focusing only on the sensation of breathing.",
// //       "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste."
// //     ],
// //     sadness: [
// //       "Consider spending 10 minutes outside - natural light can gently lift your mood.",
// //       "Place your hand on your heart and say 'This is hard, and that's okay. I'm doing my best.'",
// //       "Try listening to a song that reminds you of a happy memory or brings you comfort."
// //     ],
// //     anger: [
// //       "Try pressing your palms together firmly for 10 seconds, then release and notice the sensation.",
// //       "Splash cold water on your face or hold an ice cube - this can reset your nervous system.",
// //       "Write down exactly what you're feeling without filtering, then tear up the paper."
// //     ],
// //     joy: [
// //       "Take a moment to savor this feeling - what sensations do you notice in your body?",
// //       "Consider capturing this moment in a quick journal entry to revisit later.",
// //       "Think of one person you could share this positive feeling with today."
// //     ],
// //     overwhelm: [
// //       "Let's break this down - what's the one smallest action you could take right now?",
// //       "Try setting a timer for just 5 minutes to focus on one specific task.",
// //       "Take a short break to step away from screens and take 3 deep breaths."
// //     ],
// //     loneliness: [
// //       "Consider reaching out to someone with a simple message - even just sharing a photo or link.",
// //       "Try an activity that connects you with others, even indirectly, like a community forum about your interests.",
// //       "Engage with content that features people talking, like a podcast or video, to create a sense of presence."
// //     ],
// //     hope: [
// //       "Write down one small step you could take toward what you're hoping for.",
// //       "Visualize yourself moving toward your goal - what does the next step look like?",
// //       "Share your hopes with someone supportive who can encourage you."
// //     ],
// //     neutral: [
// //       "Consider taking a quick movement break - even 2 minutes of stretching can refresh your mind.",
// //       "Check in with yourself - are you needing anything right now like water, food, or rest?",
// //       "Try 30 seconds of focusing entirely on one of your senses to ground yourself in the present."
// //     ]
// //   };
  
// //   // Select remedy based on emotion and add to response
// //   const emotionKey = remedies[emotionalState.emotion] ? emotionalState.emotion : 'neutral';
// //   const remedyOptions = remedies[emotionKey];
// //   const selectedRemedy = remedyOptions[Math.floor(Math.random() * remedyOptions.length)];
  
// //   // Force inclusion of remedy based on stalled conversation detection
// //   const includeRemedy = conversationPatterns && conversationPatterns.isStalled ? true : Math.random() > 0.2;
  
// //   if (includeRemedy) {
// //     response += ` ${selectedRemedy}`;
// //   }
  
// //   // Add a follow-up question
// //   const followUps = {
// //     anxiety: [
// //       "What tends to help when you feel this way?",
// //       "On a scale of 1-10, how intense is your anxiety right now?",
// //       "What's one small thing that might help you feel safer right now?"
// //     ],
// //     sadness: [
// //       "What would feel like a tiny win for you today?",
// //       "How have you cared for yourself during difficult times before?",
// //       "What's one small comfort you could give yourself right now?"
// //     ],
// //     anger: [
// //       "What do you think is beneath this frustration?",
// //       "What would help you feel more in control right now?",
// //       "What's one small way you could channel this energy?"
// //     ],
// //     joy: [
// //       "What contributed to this positive feeling?",
// //       "How might you extend or savor this good moment?",
// //       "What does this positive experience tell you about what matters to you?"
// //     ],
// //     overwhelm: [
// //       "What's one thing you could take off your plate right now?",
// //       "What would help you feel more grounded in this moment?",
// //       "What's the most important thing to focus on right now?"
// //     ],
// //     loneliness: [
// //       "Is there someone you've been meaning to connect with?",
// //       "What type of connection would feel most nurturing right now?",
// //       "What activity helps you feel a sense of belonging?"
// //     ],
// //     hope: [
// //       "What's one small step toward what you're hoping for?",
// //       "What strengths do you have that will help you move forward?",
// //       "What would progress look like for you?"
// //     ],
// //     neutral: [
// //       "What's been on your mind today?",
// //       "What would be most helpful to focus on right now?",
// //       "How are you feeling about things overall?"
// //     ]
// //   };
  
// //   // Select follow-up based on emotion
// //   const followUpOptions = followUps[emotionKey];
// //   const selectedFollowUp = followUpOptions[Math.floor(Math.random() * followUpOptions.length)];
  
// //   // Add follow-up question to response
// //   response += ` ${selectedFollowUp}`;
  
// //   return response;
// // };

// // /**
// //  * Builds a prompt that incorporates NLP insights for targeted response
// //  * @param {string} userInput - The user's current message
// //  * @param {Object} emotionalState - Detected emotional state
// //  * @param {Object} languagePatterns - Analyzed language patterns
// //  * @param {Object} conversationPatterns - Conversation analysis
// //  * @param {Array} history - Previous conversation exchanges
// //  * @returns {string} The crafted prompt for Gemini API
// //  */
// // const buildEnhancedPrompt = (userInput, emotionalState, languagePatterns, conversationPatterns, history = []) => {
// //   // Format conversation history for context
// //   const formattedHistory = history.map(entry => 
// //     `User: "${entry.userInput}"\nAssistant: "${entry.botResponse}"`
// //   ).join('\n\n');
  
// //   // Select emotional response guidance based on detected emotion
// //   let emotionalGuidance = '';
  
// //   if (emotionalState.isCrisis) {
// //     emotionalGuidance = `
// // CRISIS RESPONSE: The user may be expressing thoughts of self-harm or suicide. Respond with brief, clear compassion. 
// // Prioritize safety, express concern, and directly encourage professional help (988 Lifeline, emergency services).
// // Keep your response under 4 sentences total.
// // IMPORTANT: Always include crisis resources in your response.`;
// //   } else {
// //     switch (emotionalState.emotion) {
// //       case 'anxiety':
// //         emotionalGuidance = `
// // The user appears anxious (${emotionalState.intensity} level). Respond with 3-4 short, calming sentences. 
// // IMPORTANT: Always include one specific remedy or grounding technique.`;
// //         break;
// //       case 'sadness':
// //         emotionalGuidance = `
// // The user appears sad (${emotionalState.intensity} level). Respond with 3-4 gentle, validating sentences. 
// // IMPORTANT: Always include one specific comfort technique or suggestion.`;
// //         break;
// //       case 'anger':
// //         emotionalGuidance = `
// // The user appears frustrated/angry (${emotionalState.intensity} level). Respond with 3-4 calm, validating sentences.
// // IMPORTANT: Always include one specific emotional management technique.`;
// //         break;
// //       case 'overwhelm':
// //         emotionalGuidance = `
// // The user appears overwhelmed (${emotionalState.intensity} level). Respond with 3-4 very simple, clear sentences.
// // IMPORTANT: Always include one specific prioritization or simplification technique.`;
// //         break;
// //       case 'loneliness':
// //         emotionalGuidance = `
// // The user appears lonely (${emotionalState.intensity} level). Respond with 3-4 warm, connecting sentences.
// // IMPORTANT: Always include one practical suggestion for meaningful connection.`;
// //         break;
// //       case 'joy':
// //         emotionalGuidance = `
// // The user appears happy/joyful (${emotionalState.intensity} level). Respond with 3-4 celebratory sentences.
// // IMPORTANT: Always include one suggestion for savoring or building on this positive feeling.`;
// //         break;
// //       case 'hope':
// //         emotionalGuidance = `
// // The user appears hopeful (${emotionalState.intensity} level). Respond with 3-4 encouraging sentences.
// // IMPORTANT: Always include one specific action step to maintain momentum.`;
// //         break;
// //       default:
// //         emotionalGuidance = `
// // Respond with 3-4 attentive, warm sentences. 
// // IMPORTANT: Always include one helpful suggestion or observation.`;
// //     }
// //   }

// //   // Add conversation pattern insights
// //   let conversationInsights = '';
// //   if (conversationPatterns) {
// //     conversationInsights = `
// // CONVERSATION INSIGHTS:
// // - Conversation appears ${conversationPatterns.isStalled ? 'stalled' : 'progressing'}
// // - User communication is ${conversationPatterns.isRepetitive ? 'somewhat repetitive' : 'varied'}
// // - Emotional trajectory: ${conversationPatterns.emotionalTrajectory.join(' → ')}
// // ${conversationPatterns.isStalled ? 'CRITICAL: Include a specific remedy or technique in your response, not just questions.' : ''}`;
// //   }

// //   // Add language pattern insights
// //   let languageInsights = '';
// //   if (languagePatterns) {
// //     languageInsights = `
// // LANGUAGE INSIGHTS:
// // - User's communication style: ${languagePatterns.isBreviloquent ? 'brief' : 'detailed'}
// // - Question ratio: ${(languagePatterns.questionRatio * 100).toFixed(0)}% of sentences are questions
// // - Negative language count: ${languagePatterns.negativeLanguageCount}
// // ${languagePatterns.isPredominantlyQuestions ? 'User is asking many questions - provide clear, direct answers and specific techniques.' : ''}`;
// //   }

// //   // Construct the full prompt with all insights
// //   return `You are a highly empathetic mental health assistant using NLP. Your responses must be concise but include specific remedies and techniques.

// // ${history.length > 0 ? `CONVERSATION HISTORY:\n${formattedHistory}\n\n` : ''}

// // USER EMOTION ANALYSIS:
// // - Primary emotion: ${emotionalState.emotion} (${emotionalState.intensity} intensity)
// // - Sentiment score: ${emotionalState.sentimentScore}
// // - Key topics: ${emotionalState.topics.join(', ')}
// // - Crisis indicators: ${emotionalState.isCrisis ? 'PRESENT - URGENT RESPONSE NEEDED' : 'not detected'}

// // ${languageInsights}
// // ${conversationInsights}

// // ${emotionalGuidance}

// // RESPONSE REQUIREMENTS:
// // - ALWAYS include one specific technique or remedy (not just questions)
// // - Use maximum 3-4 short sentences total
// // - Start with brief validation of their feelings
// // - Use warm, natural language
// // - End with one thoughtful question
// // - NEVER give multi-step instructions or long explanations

// // Response format:
// // 1. Brief validation (1 sentence)
// // 2. One clear suggestion or remedy (1-2 sentences)
// // 3. One open-ended follow-up question (1 sentence)

// // User: "${userInput}"`;
// // };

// // /**
// //  * Process the user input and return a concise, remedy-focused response
// //  * @param {string} userInput - The user's message
// //  * @param {string} userId - The user's ID for context tracking (optional)
// //  * @returns {string} The concise, helpful response
// //  */
// // export const analyzeMentalHealth = async (userInput, userId = null) => {
// //   try {
// //     // Step 1: Apply NLP to analyze emotional content
// //     const emotionalState = detectEmotionFromText(userInput);
    
// //     // Step 2: Analyze language patterns
// //     const languagePatterns = analyzeLanguagePatterns(userInput);
    
// //     // Step 3: Get conversation history for context if userId provided
// //     const conversationHistory = userId ? await getConversationHistory(userId) : [];
    
// //     // Step 4: Extract key topics from the message and history
// //     const keyTopics = extractKeyTopics(userInput, conversationHistory);
// //     emotionalState.topics = keyTopics; // Add topics to emotional state
    
// //     // Step 5: Analyze conversation patterns
// //     const conversationPatterns = conversationHistory.length > 0 ? 
// //       analyzeConversationPatterns(conversationHistory) : null;
    
// //     // Step 5: Check emotional state cache for this user to track emotional trends
// //     if (userId) {
// //       const previousState = emotionalStateCache.get(userId);
// //       if (previousState) {
// //         // Track emotional shifts for context
// //         emotionalState.shifted = previousState.emotion !== emotionalState.emotion;
// //         emotionalState.intensified = previousState.emotion === emotionalState.emotion && 
// //           previousState.intensity !== emotionalState.intensity;
// //       }
// //       // Update the cache with current state
// //       emotionalStateCache.set(userId, emotionalState);
// //     }
    
// //     // Step 6: Build enhanced prompt with all NLP insights
// //     const prompt = buildEnhancedPrompt(
// //       userInput, 
// //       emotionalState, 
// //       languagePatterns, 
// //       conversationPatterns, 
// //       conversationHistory
// //     );
    
// //     // Step 7: Generate local response as backup
// //     const localResponse = generateResponse(emotionalState, languagePatterns, conversationPatterns);
    
// //     // Step 8: Call Gemini API with the enhanced prompt
// //     try {
// //       const response = await axios.post(
// //         `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
// //         {
// //           contents: [
// //             {
// //               role: 'user',
// //               parts: [{ text: prompt }]
// //             }
// //           ]
// //         }
// //       );
      
// //       const apiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      
// //       // Check if API response contains a remedy/technique (not just questions)
// //       const hasRemedy = apiResponse && (
// //         apiResponse.includes('try') || 
// //         apiResponse.includes('could') || 
// //         apiResponse.includes('technique') || 
// //         apiResponse.includes('practice') ||
// //         apiResponse.includes('exercise') ||
// //         apiResponse.includes('breathe')
// //       );
      
// //       // Update response tracking for this user
// //       if (userId) {
// //         const responseTracking = responseTrackingCache.get(userId) || {
// //           consecutiveQuestionsOnly: 0,
// //           lastProvidedRemedy: null
// //         };
        
// //         if (hasRemedy) {
// //           responseTracking.consecutiveQuestionsOnly = 0;
// //           responseTracking.lastProvidedRemedy = new Date();
// //         } else {
// //           responseTracking.consecutiveQuestionsOnly++;
// //         }
        
// //         responseTrackingCache.set(userId, responseTracking);
// //       }
      
// //       // Use API response if it has a remedy, otherwise use local response
// //       const finalResponse = hasRemedy ? apiResponse : localResponse;
      
// //       // If no remedy in the final response, explicitly append the local coping strategy
// //       if (!hasRemedy && userId) {
// //         const copingStrategy = await getCopingStrategies(emotionalState.emotion);
// //         return `${finalResponse}\n\n${formatCopingStrategy(copingStrategy)}`;
// //       }
      
// //       return finalResponse;
      
// //     } catch (apiError) {
// //       console.error('Error calling Gemini API:', apiError);
// //       // Fall back to local response if API fails
// //       return localResponse;
// //     }
// //   } catch (error) {
// //     console.error('Error in mental health analysis:', error);
// //     return 'I understand this is difficult. One thing that might help is taking a few deep breaths right now. What would feel most supportive at this moment?';
// //   }
// // };

// // /**
// //  * Provides quick coping strategies based on detected emotion
// //  * @param {string} emotion - The detected emotion to address
// //  * @returns {Object} A targeted coping strategy
// //  */
// // export const getCopingStrategies = async (emotion) => {
// //   const strategies = {
// //     anxiety: [
// //       { remedy: "Breathe: 4 counts in, hold 2, 6 counts out. Repeat 5 times." },
// //       { remedy: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste." },
// //       { remedy: "Put your hand on your chest and say 'This feeling is temporary and I am safe right now.'" }
// //     ],
// //     sadness: [
// //       { remedy: "Text someone you trust: 'Having a rough moment, could use a kind word.'" },
// //       { remedy: "Step outside and feel the air on your skin for 2 minutes." },
// //       { remedy: "Drink water and eat something nutritious, even if small." }
// //     ],
// //     anger: [
// //       { remedy: "Clench your fists tightly for 5 seconds, then release completely. Repeat 3 times." },
// //       { remedy: "Write exactly what you're angry about, then what need isn't being met." },
// //       { remedy: "Count to 10 before responding, or say 'I need a moment to think clearly.'" }
// //     ],
// //     overwhelm: [
// //       { remedy: "Write down everything on your mind, then circle only ONE thing to focus on right now." },
// //       { remedy: "Set timer for 10 minutes of focused work, then 2 minutes of complete rest." },
// //       { remedy: "Close all unnecessary tabs, put phone away, and clear physical space around you." }
// //     ],
// //     loneliness: [
// //       { remedy: "Join a public online conversation about something that interests you." },
// //       { remedy: "Do something kind for someone else, even sending an encouraging message." },
// //       { remedy: "Touch something soft and comforting while listening to voices (podcast, show)." }
// //     ],
// //     joy: [
// //       { remedy: "Take 3 slow breaths while focusing entirely on this positive feeling." },
// //       { remedy: "Send a quick message sharing your good news with someone." },
// //       { remedy: "Take a photo or write one sentence about this moment to revisit later." }
// //     ],
// //     hope: [
// //       { remedy: "Write down one small action you can take today toward what you're hoping for." },
// //       { remedy: "Visualize in detail what success looks like for 60 seconds." },
// //       { remedy: "Tell someone specific about your hope and ask for their support." }
// //     ],
// //     neutral: [
// //       { remedy: "Take 5 deep breaths while asking 'What matters most to me right now?'" },
// //       { remedy: "Drink a full glass of water and stretch for 60 seconds." },
// //       { remedy: "Set a small, achievable goal for the next hour and accomplish it." }
// //     ],
// //     crisis: [
// //       { remedy: "Text HOME to 741741 (Crisis Text Line) or call 988 (Suicide Prevention Lifeline) right now." },
// //       { remedy: "Tell someone nearby that you need help, or call a trusted person if you're alone." },
// //       { remedy: "Focus only on breathing slowly while holding something cold (ice, cold water)." }
// //     ]
// //   };

// //   const emotionKey = strategies[emotion] ? emotion : 'neutral';
// //   const strategyList = strategies[emotionKey];
  
// //   // Select a strategy based on the emotion
// //   const randomIndex = Math.floor(Math.random() * strategyList.length);
// //   const selected = strategyList[randomIndex];
  
// //   return {
// //     shortRemedy: selected.remedy
// //   };
// // };

// // /**
// //  * Formats the coping strategy response for display
// //  * @param {Object} strategyResponse - The response from getCopingStrategies
// //  * @returns {string} Formatted strategy response
// //  */
// // export const formatCopingStrategy = (strategyResponse) => {
// //   return `TRY THIS: ${strategyResponse.shortRemedy}`;
// // };

// // /**
// //  * Generates targeted recommendations based on emotion
// //  * @param {string} emotion - The detected emotion
// //  * @returns {string} A specific recommendation
// //  */
// // export const getRecommendation = (emotion) => {
// //   const recommendations = {
// //     anxiety: [
// //       "📱 Try the Calm or Headspace app for guided breathing",
// //       "📚 Consider 'The Anxiety and Phobia Workbook' by Edmund Bourne",
// //       "🧘‍♂️ Look into mindfulness-based stress reduction (MBSR)"
// //     ],
// //     sadness: [
// //       "🏃‍♀️ Even 5 minutes of movement can boost mood",
// //       "📝 Start a simple gratitude practice - just 3 things daily",
// //       "🎧 Create a playlist of songs that energize you"
// //     ],
// //     anger: [
// //       "📱 Try the 'Calm Harm' app for managing intense emotions",
// //       "🥊 Physical exercise like running or boxing can release tension",
// //       "📝 Try writing a letter you don't send to express feelings safely"
// //     ],
// //     overwhelm: [
// //       "📝 Try the Eisenhower Box method for prioritizing tasks",
// //       "⏰ Set a timer for 25 minutes of focused work, then break for 5",
// //       "🧹 Declutter one small space to reduce visual stress"
// //     ],
// //     loneliness: [
// //       "🤝 Consider volunteering - even virtually - to connect with others",
// //       "🐕 If possible, spending time with animals can reduce loneliness",
// //       "📱 Try the Meetup app to find groups with similar interests"
// //     ],
// //     joy: [
// //       "📝 Start a 'joy journal' to document positive moments",
// //       "📸 Create a digital album of happy memories to revisit",
// //       "🎁 Consider how to share this joy with someone else"
// //     ],
// //     hope: [
// //       "📝 Create a visual board of what you're working toward",
// //       "🎯 Break your goal into 3 small, achievable steps",
// //       "📚 Read success stories of others who've achieved similar goals"
// //     ],
// //     neutral: [
// //       "📚 Consider 'Atomic Habits' by James Clear for building positive routines",
// //       "🧠 Try a daily mindfulness practice like the 'Waking Up' app",
// //       "🌱 Explore 'values exercises' to clarify what matters most to you"
// //     ],
// //     crisis: [
// //       "📱 The 988 Lifeline has 24/7 trained counselors",
// //       "🏥 Your local emergency room can provide immediate help",
// //       "📞 The Crisis Text Line (text HOME to 741741) offers text-based support"
// //     ]
// //   };

// // const emotionKey = recommendations[emotion] ? emotion : 'neutral';
// //   const options = recommendations[emotionKey];
// //   return options[Math.floor(Math.random() * options.length)];
// // };

// // /**
// //  * Enhanced function that provides concise emotional support with follow-up questions
// //  * @param {string} userInput - The user's message
// //  * @param {string} userId - The user's ID for context tracking (optional)
// //  * @returns {Object} Response with emotional analysis and appropriate response
// //  */
// // export const provideEmotionalSupport = async (userInput, userId = null) => {
// //   // Detect emotion and crisis signals
// //   const emotionalState = detectEmotionFromText(userInput);
  
// //   // Use crisis protocols if crisis is detected
// //   const emotionForStrategy = emotionalState.isCrisis ? 'crisis' : emotionalState.emotion;
  
// //   // Get the main response
// //   const mainResponse = await analyzeMentalHealth(userInput, userId);
  
// //   // Get concise coping strategy
// //   const copingStrategy = await getCopingStrategies(emotionForStrategy);
  
// //   // Get a targeted recommendation
// //   const recommendation = getRecommendation(emotionForStrategy);
  
// //   // Format the full response
// //   return {
// //     response: mainResponse,
// //     detectedEmotion: emotionalState.emotion,
// //     intensity: emotionalState.intensity,
// //     isCrisis: emotionalState.isCrisis,
// //     copingStrategy: formatCopingStrategy(copingStrategy),
// //     recommendation: recommendation
// //   };
// // };
// import axios from 'axios';
// import dotenv from 'dotenv';
// import ChatMessage from '../model/ChatMessage.js'; // Import the model to access history

// dotenv.config();

// const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// // Emotional state tracking - helps maintain context between messages
// const emotionalStateCache = new Map();

// /**
//  * Analyzes the emotional content of text using more sophisticated contextual clues
//  * @param {string} text - User input to analyze
//  * @returns {Object} Detected emotion and intensity with improved accuracy
//  */
// const detectEmotionFromText = (text) => {
//   // Enhanced emotion detection patterns with more comprehensive keywords
//   const emotionPatterns = {
//     anxiety: /(anxious|worried|nervous|panic|stress|afraid|scared|terrified|fear|tense|unsettled|uneasy|apprehensive|dread|restless|jittery|on edge|freaking out|paranoid|phobia)/i,
//     sadness: /(sad|depressed|down|unhappy|miserable|hopeless|grief|despair|loss|blue|gloomy|heartbroken|devastated|discouraged|melancholy|tearful|sorrowful|mourning|dejected|disappointed)/i,
//     anger: /(angry|mad|frustrated|irritated|annoyed|furious|rage|resent|bitter|outraged|hostile|aggravated|exasperated|indignant|seething|livid|hatred|disgusted|contempt|pissed)/i,
//     joy: /(happy|joy|excited|great|wonderful|pleased|delighted|proud|accomplish|thrilled|ecstatic|content|elated|overjoyed|grateful|satisfied|cheerful|blissful|jubilant|triumphant)/i,
//     overwhelm: /(overwhelm|too much|cannot handle|can't cope|exhausted|burned out|swamped|flooded|drowning|stretched thin|at capacity|breaking point|stressed out|overloaded|snowed under|buried|can't keep up|crushing|heavy load|suffocating)/i,
//     loneliness: /(alone|lonely|isolated|no one|nobody|abandoned|disconnected|solitary|outcast|forgotten|excluded|alienated|rejected|unwanted|invisible|companionless|deserted|left out|friendless|socially deprived)/i,
//     hope: /(hope|better|improve|progress|forward|future|optimistic|promising|looking up|brighter|potential|opportunity|advancement|possibility|aspiration|anticipation|expectation|confidence|belief|prospect)/i,
//     shame: /(shame|embarrassed|humiliated|mortified|guilty|regret|self-loathing|unworthy|inadequate|failure|mistake|exposed|judged|pathetic|ridiculous|foolish|disgrace|ashamed|disgraced|remorseful)/i,
//     confusion: /(confused|unsure|uncertain|unclear|puzzled|perplexed|lost|disoriented|bewildered|ambivalent|undecided|indecisive|doubtful|questioning|second thoughts|mixed feelings|torn|conflicted|ambiguous|stuck)/i
//   };

//   // Enhanced intensity markers with contextual modifiers
//   const intensityMarkers = {
//     extreme: /(extremely|incredibly|unbearably|severely|profoundly|overwhelmingly|devastatingly|cripplingly|excruciating|worst|unimaginably|beyond|intensely|cannot stand|can't bear|unendurable|catastrophic)/i,
//     high: /(very|so|really|completely|utterly|absolutely|totally|deeply|strongly|terribly|greatly|highly|significantly|immensely|tremendously|exceptionally|extraordinarily|considerably)/i,
//     moderate: /(quite|rather|somewhat|pretty|fairly|moderately|relatively|reasonably|noticeably|distinctly|markedly|notably|partially|semi|sort of|kind of|middling)/i,
//     low: /(slightly|a bit|a little|kind of|sort of|mildly|faintly|marginally|barely|hardly|minimally|somewhat|vaguely|lightly|subtly|hardly|scarcely|trivially)/i
//   };

//   // Temporal patterns - helps detect chronic vs acute conditions
//   const temporalPatterns = {
//     chronic: /(always|constantly|forever|every day|all the time|never ending|persistent|ongoing|enduring|chronic|for years|long-term|repeatedly|continually|perpetually|habitually|consistently)/i,
//     recent: /(today|yesterday|this week|recently|lately|just now|at the moment|currently|presently|since|this morning|tonight|suddenly|now|immediate|right now|fresh|new)/i
//   };

//   // Crisis detection with more comprehensive patterns for better safety
//   const crisisSignals = /(suicide|kill myself|end it all|harm myself|self harm|hurt myself|don't want to live|not worth living|better off dead|can't go on|no reason to live|want to die|plan to end|final goodbye|giving away|putting affairs in order|no way out|escape the pain|nobody would miss me|life is too painful|rather be dead|last resort)/i;

//   // Default emotional state
//   let primaryEmotion = 'neutral';
//   let secondaryEmotion = null;
//   let intensity = 'moderate';
//   let temporality = 'recent';
  
//   // Detect primary emotion with confidence score
//   let highestConfidence = 0;
//   let secondHighestConfidence = 0;

//   for (const [emotionName, pattern] of Object.entries(emotionPatterns)) {
//     // Count matches for this emotion
//     const matches = (text.match(pattern) || []).length;
//     if (matches > highestConfidence) {
//       // Move current highest to secondary
//       secondHighestConfidence = highestConfidence;
//       secondaryEmotion = primaryEmotion;
      
//       // Set new highest
//       highestConfidence = matches;
//       primaryEmotion = emotionName;
//     } else if (matches > secondHighestConfidence && matches > 0) {
//       secondHighestConfidence = matches;
//       secondaryEmotion = emotionName;
//     }
//   }
  
//   // Only keep secondary emotion if it has sufficient confidence
//   if (secondHighestConfidence < 1) {
//     secondaryEmotion = null;
//   }
  
//   // Detect intensity with more granularity
//   if (primaryEmotion !== 'neutral') {
//     for (const [intensityLevel, pattern] of Object.entries(intensityMarkers)) {
//       if (pattern.test(text)) {
//         intensity = intensityLevel;
//         break;
//       }
//     }
//   }
  
//   // Detect temporal nature (chronic vs recent)
//   for (const [temporalType, pattern] of Object.entries(temporalPatterns)) {
//     if (pattern.test(text)) {
//       temporality = temporalType;
//       break;
//     }
//   }

//   // Enhanced crisis detection for safety
//   const isCrisis = crisisSignals.test(text);
  
//   // Determine self-blame component (important for clinical risk assessment)
//   const selfBlamePattern = /(my fault|blame myself|i'm to blame|i deserve this|punish myself|i'm wrong|bad person|worthless|useless|burden|deserve to suffer|deserve pain|failed|failure|let everyone down)/i;
//   const hasSelfBlame = selfBlamePattern.test(text);
  
//   // Look for social support references
//   const socialSupportPattern = /(no one cares|nobody understands|all alone|no support|no one to talk to|no friends|family doesn't understand|can't tell anyone|no one listens|isolated|abandoned|rejected|by myself)/i;
//   const lacksSocialSupport = socialSupportPattern.test(text);

//   // Detect expressed needs
//   const needsPatterns = {
//     validation: /(understand|listen|hear me|acknowledge|recognize|validate|see my point|agree with me|am I right|tell me it's okay|affirm|not crazy|normal to feel)/i,
//     solutions: /(how to|what should I do|advice|suggestions|guidance|steps|strategy|tactics|fix this|solve|resolve|overcome|address|approach|handle|deal with|manage|tips)/i,
//     connection: /(just want to talk|need someone|somebody to|need to share|want company|hear your thoughts|be there|support me|connect|relate|understand me)/i
//   };
  
//   let expressedNeed = null;
//   for (const [needType, pattern] of Object.entries(needsPatterns)) {
//     if (pattern.test(text)) {
//       expressedNeed = needType;
//       break;
//     }
//   }

//   return { 
//     primaryEmotion, 
//     secondaryEmotion, 
//     intensity, 
//     temporality,
//     isCrisis, 
//     hasSelfBlame,
//     lacksSocialSupport,
//     expressedNeed,
//     confidence: highestConfidence
//   };
// };

// /**
//  * Retrieves conversation history for a user with improved pattern detection
//  * @param {string} userId - The user's ID
//  * @param {number} limit - Maximum number of previous exchanges to retrieve
//  * @returns {Array} Previous conversations with emotional trend analysis
//  */
// const getConversationHistory = async (userId, limit = 7) => {
//   try {
//     if (!userId) return [];
    
//     // Increased history depth for better context
//     const history = await ChatMessage.find({ userId })
//       .sort({ timestamp: -1 })
//       .limit(limit);
    
//     const formattedHistory = history.reverse();
    
//     // Analyze emotional trends across conversation history
//     if (formattedHistory.length > 1) {
//       // Track shifts in emotion over time
//       let emotionalShifts = 0;
//       let prevEmotion = null;
      
//       for (const entry of formattedHistory) {
//         const currentEmotion = detectEmotionFromText(entry.userInput).primaryEmotion;
//         if (prevEmotion && currentEmotion !== prevEmotion && currentEmotion !== 'neutral') {
//           emotionalShifts++;
//         }
//         prevEmotion = currentEmotion;
//       }
      
//       // Add trend metadata to history
//       formattedHistory.emotionalVolatility = emotionalShifts / formattedHistory.length;
//     }
    
//     return formattedHistory;
//   } catch (error) {
//     console.error('Error fetching conversation history:', error);
//     return [];
//   }
// };

// /**
//  * Builds a prompt that incorporates emotional intelligence guidelines with improved context
//  * @param {string} userInput - The user's current message
//  * @param {Object} emotionalState - Detected emotional state with enhanced attributes
//  * @param {Array} history - Previous conversation exchanges with trend analysis
//  * @returns {string} The crafted prompt for Gemini API
//  */
// const buildEmotionallyIntelligentPrompt = (userInput, emotionalState, history = []) => {
//   // Format conversation history for context with timestamps
//   const formattedHistory = history.map(entry => 
//     `User: "${entry.userInput}"\nAssistant: "${entry.botResponse}"`
//   ).join('\n\n');
  
//   // Select emotional response guidance based on detected emotion with nuance for mixed emotions
//   let emotionalGuidance = '';
  
//   if (emotionalState.isCrisis) {
//     emotionalGuidance = `
// IMPORTANT: The user may be expressing thoughts of self-harm or suicide. Respond with utmost compassion while prioritizing their safety. 
// Acknowledge their pain without judgment, express genuine concern, offer hope that things can improve, and strongly 
// encourage them to reach out to professional help like a crisis hotline (988 in the US), emergency services (911), 
// or to speak with a trusted person immediately. Do not minimize their feelings or offer simplistic solutions. 
// ${emotionalState.hasSelfBlame ? 'The user is exhibiting significant self-blame, which increases risk. Gently challenge these negative self-perceptions while maintaining validation of their emotional experience.' : ''}
// ${emotionalState.lacksSocialSupport ? 'The user appears to feel isolated or unsupported, increasing vulnerability. Acknowledge this isolation while suggesting concrete ways to connect with support resources.' : ''}`;
//   } else {
//     // Primary emotion guidance with nuance based on secondary emotion
//     const mixedEmotionContext = emotionalState.secondaryEmotion ? 
//       `Their feelings appear complex, showing both ${emotionalState.primaryEmotion} and ${emotionalState.secondaryEmotion}.` : '';

//     const temporalContext = emotionalState.temporality === 'chronic' ?
//       'This seems to be an ongoing or persistent situation for them.' : 
//       'This appears to be a recent or acute situation.';

//     const needContext = emotionalState.expressedNeed ? 
//       `They seem to be specifically seeking ${emotionalState.expressedNeed}.` : 
//       'They haven\'t explicitly stated what they need, so balance validation with gentle exploration.';

//     switch (emotionalState.primaryEmotion) {
//       case 'anxiety':
//         emotionalGuidance = `
// The user appears to be experiencing anxiety at a ${emotionalState.intensity} level. ${mixedEmotionContext} ${temporalContext} ${needContext}
// Respond with a calm, reassuring tone. First validate their feelings, then offer grounding techniques or perspective. 
// Use measured language with a steady pace. Avoid phrases that might increase urgency. Focus on present-moment awareness.
// ${emotionalState.intensity === 'extreme' || emotionalState.intensity === 'high' ? 'Their anxiety appears intense. Start with very short sentences and simple breathing guidance before any complex response.' : ''}`;
//         break;
//       case 'sadness':
//         emotionalGuidance = `
// The user appears to be experiencing sadness at a ${emotionalState.intensity} level. ${mixedEmotionContext} ${temporalContext} ${needContext}
// Respond with warm compassion. First validate their feelings without trying to immediately "fix" them. 
// Use gentle, supportive language that acknowledges the difficulty of their experience. Offer perspective when appropriate, 
// but prioritize emotional validation.
// ${emotionalState.hasSelfBlame ? 'They\'re showing signs of self-blame or guilt. Gently reframe these perceptions while validating the underlying emotions.' : ''}`;
//         break;
//       case 'anger':
//         emotionalGuidance = `
// The user appears to be experiencing frustration or anger at a ${emotionalState.intensity} level. ${mixedEmotionContext} ${temporalContext} ${needContext}
// Respond with calm acknowledgment. Validate their feelings without escalating the emotion. 
// Use neutral, measured language that shows you understand their perspective. Help them explore the underlying needs 
// or concerns beneath the anger when appropriate.
// ${emotionalState.intensity === 'extreme' || emotionalState.intensity === 'high' ? 'Their anger appears intense. Focus primarily on validation before offering any solutions or perspective.' : ''}`;
//         break;
//       case 'overwhelm':
//         emotionalGuidance = `
// The user appears to be feeling overwhelmed at a ${emotionalState.intensity} level. ${mixedEmotionContext} ${temporalContext} ${needContext}
// Respond with steady calmness and structure. Acknowledge the weight of what they're carrying. 
// Use simple, clear language. Offer to help break down concerns into smaller parts.
// Focus on one thing at a time and avoid adding complexity to your response.
// ${emotionalState.temporality === 'chronic' ? 'This appears to be an ongoing state for them. Acknowledge the cumulative impact of chronic stress while focusing on immediate relief strategies.' : ''}`;
//         break;
//       case 'loneliness':
//         emotionalGuidance = `
// The user appears to be experiencing loneliness at a ${emotionalState.intensity} level. ${mixedEmotionContext} ${temporalContext} ${needContext}
// Respond with warm presence and connection. Acknowledge their feelings of isolation without minimizing them. 
// Use language that conveys genuine interest in their experience. Focus on both validation and gentle exploration 
// of possible connections.
// ${emotionalState.lacksSocialSupport ? 'They appear to feel disconnected from support systems. Balance validation with gentle suggestions for rebuilding connections.' : ''}`;
//         break;
//       case 'joy':
//         emotionalGuidance = `
// The user appears to be expressing joy or accomplishment at a ${emotionalState.intensity} level. ${mixedEmotionContext} ${temporalContext} ${needContext}
// Match their positive energy appropriately. Celebrate their success or happiness with genuine enthusiasm. 
// Ask questions that help them savor the positive experience. Affirm their strengths that contributed to positive outcomes.`;
//         break;
//       case 'hope':
//         emotionalGuidance = `
// The user appears to be expressing hope at a ${emotionalState.intensity} level. ${mixedEmotionContext} ${temporalContext} ${needContext}
// Nurture this with thoughtful encouragement. Acknowledge their optimism while being grounded and realistic. 
// Use language that reinforces their agency and capabilities. Help them explore concrete next steps that align with 
// their hopeful outlook.`;
//         break;
//       case 'shame':
//         emotionalGuidance = `
// The user appears to be experiencing shame or embarrassment at a ${emotionalState.intensity} level. ${mixedEmotionContext} ${temporalContext} ${needContext}
// Respond with gentle acceptance and non-judgment. Validate their feelings without reinforcing negative self-perceptions.
// Use language that subtly separates their actions from their identity. Offer perspective that normalizes human mistakes 
// and vulnerabilities while honoring their emotional experience.
// ${emotionalState.hasSelfBlame ? 'They\'re showing significant self-criticism. Gently challenge these harsh self-judgments while validating the underlying emotions.' : ''}`;
//         break;
//       case 'confusion':
//         emotionalGuidance = `
// The user appears to be experiencing confusion or uncertainty at a ${emotionalState.intensity} level. ${mixedEmotionContext} ${temporalContext} ${needContext}
// Respond with clarity and patience. Validate that feeling uncertain can be uncomfortable. Use structured, clear language
// that helps organize thoughts. Avoid overwhelming with too many options or perspectives at once. Help them identify 
// the core questions or concerns that need resolution.`;
//         break;
//       default:
//         emotionalGuidance = `
// Respond with balanced emotional attunement. ${needContext} First understand and validate the user's emotional state, 
// then offer perspective or suggestions if appropriate. Use natural, conversational language with genuine care. 
// Avoid clinical or robotic phrasing. Prioritize empathy and validation over immediate problem-solving.`;
//     }
//   }

//   // Add emotional volatility guidance if detected from history
//   let volatilityGuidance = '';
//   if (history.emotionalVolatility > 0.5) {
//     volatilityGuidance = `
// NOTE: The user's emotional state has been changing frequently in this conversation. Maintain consistent, grounded 
// responses that acknowledge these shifts without drawing explicit attention to them. Focus on providing stability 
// through your communication style.`;
//   }

//   // Construct the full prompt with history and emotional guidance
//   return `You are a compassionate mental health assistant with advanced emotional intelligence. Your primary goal is to provide supportive, 
// empathetic responses that validate the user's feelings while offering helpful perspective and coping strategies.

// ${history.length > 0 ? `CONVERSATION HISTORY:\n${formattedHistory}\n\n` : ''}

// ${emotionalGuidance}

// ${volatilityGuidance}

// IMPORTANT GUIDELINES:
// - Always validate feelings before offering suggestions
// - Use warm, natural language (avoid clinical or robotic phrasing)
// - Match your emotional tone to the user's needs
// - Be authentic and vary your expressions (avoid formulaic responses)
// - Focus on supportive presence rather than trying to "fix" emotions
// - Recognize accomplishments and strengths
// - Avoid making any diagnosis
// - Suggest professional help when appropriate, especially for persistent symptoms
// - Use thoughtful questions to explore deeper when helpful
// - Balance empathy with practical coping strategies
// - Keep responses conversational, not scripted
// ${emotionalState.expressedNeed === 'validation' ? '- Focus primarily on validation, understanding, and normalization rather than solutions' : ''}
// ${emotionalState.expressedNeed === 'solutions' ? '- Provide clear, actionable steps while maintaining emotional support' : ''}
// ${emotionalState.expressedNeed === 'connection' ? '- Emphasize presence and relationship over solutions or education' : ''}

// Please respond to the user's current message:
// User: "${userInput}"`;
// };

// /**
//  * Process the user input with emotional intelligence and return an appropriate response
//  * Enhanced with more nuanced emotional detection and temporal analysis
//  * @param {string} userInput - The user's message
//  * @param {string} userId - The user's ID for context tracking (optional)
//  * @returns {string} The emotionally intelligent response
//  */
// export const analyzeMentalHealth = async (userInput, userId = null) => {
//   try {
//     // Step 1: Analyze emotional content with enhanced detection
//     const emotionalState = detectEmotionFromText(userInput);
    
//     // Step 2: Get conversation history for context if userId provided (increased depth)
//     const conversationHistory = userId ? await getConversationHistory(userId, 7) : [];
    
//     // Step 3: Check emotional state cache for this user to track emotional trends with improved tracking
//     if (userId) {
//       const previousState = emotionalStateCache.get(userId);
//       if (previousState) {
//         // Enhanced emotional shift tracking
//         emotionalState.shifted = previousState.primaryEmotion !== emotionalState.primaryEmotion;
//         emotionalState.intensified = previousState.primaryEmotion === emotionalState.primaryEmotion && 
//           previousState.intensity !== emotionalState.intensity;
          
//         // Track oscillation patterns (rapid back-and-forth between emotions)
//         if (previousState.previousEmotion && 
//             previousState.previousEmotion === emotionalState.primaryEmotion && 
//             previousState.primaryEmotion !== emotionalState.primaryEmotion) {
//           emotionalState.oscillating = true;
//         }
        
//         // Store previous emotion for oscillation detection
//         emotionalState.previousEmotion = previousState.primaryEmotion;
//       }
      
//       // Update the cache with current state and enhanced tracking
//       emotionalStateCache.set(userId, emotionalState);
//     }
    
//     // Step 4: Build emotionally intelligent prompt with enhanced context
//     const prompt = buildEmotionallyIntelligentPrompt(userInput, emotionalState, conversationHistory);
    
//     // Step 5: Call Gemini API with the emotionally enhanced prompt
//     const response = await axios.post(
//       `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: [
//           {
//             role: 'user',
//             parts: [{ text: prompt }]
//           }
//         ],
//         generationConfig: {
//           temperature: 0.7,  // Slightly increased for more natural variability
//           topP: 0.9,
//           topK: 40
//         }
//       }
//     );
    
//     const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 
//       'I\'m having trouble understanding right now, but I\'m here to listen if you want to share more.';
    
//     return text;
//   } catch (error) {
//     console.error('Error in mental health analysis:', error);
//     return 'I\'m sorry, I encountered an issue while processing your message. How else might I support you today?';
//   }
// };

// /**
//  * Enhanced function to provide concise, effective coping strategies with contextual relevance
//  * @param {string} emotion - The detected emotion to address
//  * @param {Object} emotionalContext - Additional context about the emotional state
//  * @returns {Object} A targeted coping package with quick remedy and rationale
//  */
// export const getCopingStrategies = async (emotion, emotionalContext = {}) => {
//   const { intensity = 'moderate', temporality = 'recent', hasSelfBlame = false } = emotionalContext;
  
//   // Enhanced strategies with more scientific backing and situational variations
//   // Enhanced strategies with contextual filtering for better targeting
  // const strategies = {
  //   anxiety: [
  //     {
  //       remedy: "Breathe: 4 counts in, hold 2, 6 counts out. Repeat 5 times.",
  //       rationale: "Activates parasympathetic nervous system, reducing physical anxiety symptoms immediately.",
  //       context: { intensity: ['moderate', 'high', 'extreme'] }
  //     },
  //     {
  //       remedy: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
  //       rationale: "Grounding technique that interrupts anxiety spiral by engaging your senses in the present moment.",
  //       context: { intensity: ['high', 'extreme'] }
  //     },
  //     {
  //       remedy: "Put your hand on your chest and say 'This feeling is temporary and I am safe right now.'",
  //       rationale: "Combines physical touch with positive affirmation to reset emotional response.",
  //       context: { intensity: ['moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Tense every muscle in your body for 5 seconds, then release completely with an exhale.",
  //       rationale: "Progressive muscle relaxation interrupts the physical tension cycle that maintains anxiety.",
  //       context: { intensity: ['moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Focus your complete attention on a small object near you. Examine every detail for 30 seconds.",
  //       rationale: "Mindful attention exercise that breaks rumination by anchoring to physical reality.",
  //       context: { intensity: ['low', 'moderate'] }
  //     }
  //   ],
  //   sadness: [
  //     {
  //       remedy: "Text someone you trust: 'Having a rough moment, could use a kind word.'",
  //       rationale: "Activates social connection, proven to release oxytocin which counteracts sadness.",
  //       context: { hasSelfBlame: false }
  //     },
  //     {
  //       remedy: "Step outside and feel the air on your skin for 2 minutes.",
  //       rationale: "Nature and physical sensation can interrupt depressive thought patterns.",
  //       context: { intensity: ['low', 'moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Drink water and eat something nutritious, even if small.",
  //       rationale: "Physical depletion intensifies emotional pain; basic self-care provides immediate relief.",
  //       context: { intensity: ['high', 'extreme'] }
  //     },
  //     {
  //       remedy: "List 3 tiny achievements from today, even as simple as 'I got out of bed' or 'I reached out for help'.",
  //       rationale: "Counters negative bias by creating evidence of capability and progress.",
  //       context: { hasSelfBlame: true }
  //     },
  //     {
  //       remedy: "Put on music that matches your mood for 5 minutes, then gradually shift to something more uplifting.",
  //       rationale: "Emotional attunement before shifting prevents feeling invalidated and creates natural transition.",
  //       context: { temporality: 'recent' }
  //     }
  //   ],
  //   anger: [
  //     {
  //       remedy: "Clench your fists tightly for 5 seconds, then release completely. Repeat 3 times.",
  //       rationale: "Physical tension-release exercise that metabolizes stress hormones fueling anger.",
  //       context: { intensity: ['high', 'extreme'] }
  //     },
  //     {
  //       remedy: "Write exactly what you're angry about, then what need isn't being met.",
  //       rationale: "Transforms reactive anger into specific, addressable issues.",
  //       context: { intensity: ['low', 'moderate'] }
  //     },
  //     {
  //       remedy: "Count to 10 before responding, or say 'I need a moment to think clearly.'",
  //       rationale: "Creates space between trigger and response, allowing rational brain to engage.",
  //       context: { intensity: ['moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Splash cold water on your face or place ice on your wrists.",
  //       rationale: "Temperature reduction triggers parasympathetic response that physically calms anger.",
  //       context: { intensity: ['high', 'extreme'] }
  //     },
  //     {
  //       remedy: "Express the anger physically in a safe way: tear paper, squeeze a stress ball, or do push-ups.",
  //       rationale: "Provides physical outlet for the adrenaline surge that accompanies intense anger.",
  //       context: { intensity: ['high', 'extreme'] }
  //     }
  //   ],
  //   overwhelm: [
  //     {
  //       remedy: "Write down everything on your mind, then circle only ONE thing to focus on right now.",
  //       rationale: "Externalizes mental load and restores sense of control through prioritization.",
  //       context: { intensity: ['moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Set timer for 10 minutes of focused work, then 2 minutes of complete rest.",
  //       rationale: "Makes progress manageable while preventing burnout through deliberate pauses.",
  //       context: { temporality: 'recent' }
  //     },
  //     {
  //       remedy: "Close all unnecessary tabs, put phone away, and clear physical space around you.",
  //       rationale: "Reduces cognitive load by eliminating environmental stimuli demanding attention.",
  //       context: { intensity: ['moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Say out loud: 'I can only do one thing at a time, and that's enough.'",
  //       rationale: "Challenges perfectionism and provides permission to work at sustainable pace.",
  //       context: { hasSelfBlame: true }
  //     },
  //     {
  //       remedy: "Take a 2-minute break to do nothing but breathe. Don't skip this - it's productive time.",
  //       rationale: "Micro-recovery prevents cognitive depletion and actually improves overall productivity.",
  //       context: { temporality: 'chronic' }
  //     }
  //   ],
  //   loneliness: [
  //     {
  //       remedy: "Join a public online conversation about something that interests you and post one comment.",
  //       rationale: "Low-pressure social engagement that creates belonging without vulnerability.",
  //       context: { intensity: ['low', 'moderate'] }
  //     },
  //     {
  //       remedy: "Do something kind for someone else, even sending an encouraging message.",
  //       rationale: "Helping others activates reward centers in the brain that counter isolation feelings.",
  //       context: { intensity: ['moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Touch something soft and comforting while listening to voices (podcast, show) in background.",
  //       rationale: "Simulates physical and social connection, triggering comfort responses.",
  //       context: { intensity: ['high', 'extreme'] }
  //     },
  //     {
  //       remedy: "Write a message to someone you trust saying exactly how you feel. Send it if comfortable.",
  //       rationale: "Emotional disclosure, even without response, reduces loneliness biochemically.",
  //       context: { intensity: ['high', 'extreme'] }
  //     },
  //     {
  //       remedy: "Find an online group related to something you enjoy and just observe conversations for 10 minutes.",
  //       rationale: "Creates sense of community with minimal social risk, bridging toward deeper connection.",
  //       context: { intensity: ['low', 'moderate'] }
  //     }
  //   ],
  //   joy: [
  //     {
  //       remedy: "Take 3 slow breaths while focusing entirely on this positive feeling.",
  //       rationale: "Mindful savoring extends positive emotions and builds neural pathways for happiness.",
  //       context: { intensity: ['moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Send a quick message sharing your good news with someone who'll appreciate it.",
  //       rationale: "Sharing positive experiences magnifies their emotional impact.",
  //       context: { intensity: ['high', 'extreme'] }
  //     },
  //     {
  //       remedy: "Take a photo or write one sentence about this moment to revisit later.",
  //       rationale: "Creates tangible anchor for positive emotions that can be accessed during harder times.",
  //       context: { intensity: ['moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Express gratitude for one thing that contributed to this positive feeling.",
  //       rationale: "Gratitude practice strengthens positive emotional circuits and prolongs mood benefits.",
  //       context: { intensity: ['low', 'moderate'] }
  //     },
  //     {
  //       remedy: "Move your body in a way that expresses this joy - dance, jump, or just smile fully.",
  //       rationale: "Physical expression reinforces emotional states through embodied cognition.",
  //       context: { intensity: ['high', 'extreme'] }
  //     }
  //   ],
  //   hope: [
  //     {
  //       remedy: "Write down one small action you can take today toward what you're hoping for.",
  //       rationale: "Converts abstract hope into concrete progress through immediate action.",
  //       context: { intensity: ['low', 'moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Visualize in detail what success looks like for 60 seconds, engaging all senses.",
  //       rationale: "Mental rehearsal strengthens motivation and primes brain for opportunity recognition.",
  //       context: { intensity: ['moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Tell someone specific about your hope and ask for their support.",
  //       rationale: "Social accountability increases follow-through and creates supportive alliance.",
  //       context: { intensity: ['moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Create a visual reminder of your goal and place it where you'll see it daily.",
  //       rationale: "Environmental cues maintain focus and motivation during inevitable challenges.",
  //       context: { temporality: 'chronic' }
  //     },
  //     {
  //       remedy: "Recall a previous time when something worked out despite uncertainty.",
  //       rationale: "Accessing past resilience creates evidence-based confidence for current situation.",
  //       context: { hasSelfBlame: true }
  //     }
  //   ],
  //   shame: [
  //     {
  //       remedy: "Place your hand on your heart and say: 'I'm human and imperfect, just like everyone else.'",
  //       rationale: "Self-compassion reduces shame biochemically and breaks isolation of believing you're uniquely flawed.",
  //       context: { intensity: ['moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Write down what happened, then what you learned, then how you'll grow from it.",
  //       rationale: "Reframes shame narrative from identity threat to growth opportunity through structured reflection.",
  //       context: { intensity: ['low', 'moderate'] }
  //     },
  //     {
  //       remedy: "Share what you're ashamed of with someone you trust, or write it as if you were telling them.",
  //       rationale: "Shame requires secrecy to survive; even imagined disclosure reduces its power.",
  //       context: { intensity: ['high', 'extreme'] }
  //     },
  //     {
  //       remedy: "List three ways your mistake or perceived flaw makes you more human and relatable.",
  //       rationale: "Converts shame trigger into connection opportunity through perspective shift.",
  //       context: { hasSelfBlame: true }
  //     },
  //     {
  //       remedy: "Identify one specific action you can take to address the situation, no matter how small.",
  //       rationale: "Shame paralyzes; action restores agency and shifts focus from identity to behavior.",
  //       context: { intensity: ['moderate', 'high'] }
  //     }
  //   ],
  //   confusion: [
  //     {
  //       remedy: "Write down exactly what you're unsure about in the form of specific questions.",
  //       rationale: "Transforms vague uncertainty into defined knowledge gaps that can be addressed systematically.",
  //       context: { intensity: ['low', 'moderate'] }
  //     },
  //     {
  //       remedy: "Say out loud: 'It's okay not to know yet. Confusion is part of learning.'",
  //       rationale: "Normalizes confusion as productive rather than threatening, reducing anxiety that blocks clarity.",
  //       context: { hasSelfBlame: true }
  //     },
  //     {
  //       remedy: "Simplify your focus: identify just ONE aspect to clarify first before moving on.",
  //       rationale: "Incremental understanding builds confidence and prevents cognitive overwhelm.",
  //       context: { intensity: ['moderate', 'high'] }
  //     },
  //     {
  //       remedy: "Take a 5-minute break from the confusion-causing situation, then return with fresh eyes.",
  //       rationale: "Cognitive reset allows subconscious processing and new perspective on returning.",
  //       context: { intensity: ['high', 'extreme'] }
  //     },
  //     {
  //       remedy: "Explain what you do understand about the situation, either to someone else or in writing.",
  //       rationale: "Articulating current knowledge consolidates understanding and reveals specific gaps.",
  //       context: { intensity: ['moderate', 'high'] }
  //     }
  //   ],
  //   neutral: [
  //     {
  //       remedy: "Take 5 deep breaths while asking 'What matters most to me right now?'",
  //       rationale: "Creates intentional direction when emotions aren't providing clear guidance.",
  //       context: { intensity: ['low'] }
  //     },
  //     {
  //       remedy: "Drink a full glass of water and stretch for 60 seconds.",
  //       rationale: "Basic physical needs affect mood; hydration and movement create positive shift.",
  //       context: { intensity: ['low'] }
  //     },
  //     {
  //       remedy: "Set a small, achievable goal for the next hour and accomplish it.",
  //       rationale: "Builds momentum and confidence through immediate success experience.",
  //       context: { intensity: ['low', 'moderate'] }
  //     },
  //     {
  //       remedy: "Reflect on what you're grateful for in this present moment.",
  //       rationale: "Gratitude practice activates positive neural pathways even in neutral states.",
  //       context: { intensity: ['low'] }
  //     },
  //     {
  //       remedy: "Check in with your body - notice any tension, hunger, thirst, or fatigue signals.",
  //       rationale: "Physical needs often register before emotional awareness, addressing them prevents decline.",
  //       context: { intensity: ['low'] }
  //     }
  //   ],
  //   crisis: [
  //     {
  //       remedy: "Text HOME to 741741 (Crisis Text Line) or call 988 (Suicide Prevention Lifeline) right now.",
  //       rationale: "Immediate connection to trained crisis counselors who can help navigate intense emotions safely.",
  //       context: { intensity: ['extreme'] }
  //     },
  //     {
  //       remedy: "Tell someone nearby that you need help, or call a trusted person if you're alone.",
  //       rationale: "Creates immediate safety connection when self-regulation isn't possible.",
  //       context: { intensity: ['extreme'] }
  //     },
  //     {
  //       remedy: "Focus only on breathing slowly while holding something cold (ice, cold water) to disrupt crisis state.",
  //       rationale: "Cold sensation triggers parasympathetic response that can interrupt crisis neurochemistry.",
  //       context: { intensity: ['high', 'extreme'] }
  //     },
  //     {
  //       remedy: "Repeat: 'This feeling will pass. I've survived difficult moments before.'",
  //       rationale: "Creates temporal perspective when crisis thinking causes tunnel vision about pain.",
  //       context: { intensity: ['high', 'extreme'] }
  //     },
  //     {
  //       remedy: "Move to a different physical location immediately, even if just another room.",
  //       rationale: "Environmental change can interrupt crisis thought patterns and create mental reset.",
  //       context: { intensity: ['high', 'extreme'] }
  //     }
  //   ]
//   }}