import Therapist from '../model/therapistModel.js';

// Get all therapists with optional filtering
export const getTherapists = async (req, res) => {
  try {
    const { 
      search, 
      specialty, 
      availability, 
      distance, 
      lat, 
      lng 
    } = req.query;
    
    // Start with base query
    let query = {};
    
    // Add search filter if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialty: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Add specialty filter if provided and not "All Specialties"
    if (specialty && specialty !== 'All Specialties') {
      query.specialty = specialty;
    }
    
    // Add availability filter if provided and not "Any Time"
    if (availability && availability !== 'Any Time') {
      if (availability === 'Today') {
        query.availability = 'Today';
      } else if (availability === 'Tomorrow') {
        query.availability = { $in: ['Today', 'Tomorrow'] };
      } else if (availability === 'This Week') {
        query.availability = { $in: ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] };
      }
    }
    
    // If location coordinates provided, we can calculate distance
    // This uses MongoDB's geospatial queries - assumes therapist documents have a "location" field with GeoJSON point
    let distanceQuery = {};
    if (lat && lng && distance && distance !== 'Any Distance') {
      let maxDistance;
      
      if (distance === 'Under 1 mile') {
        maxDistance = 1609; // 1 mile in meters
      } else if (distance === '1-5 miles') {
        maxDistance = 8045; // 5 miles in meters
      } else if (distance === '5-10 miles') {
        maxDistance = 16090; // 10 miles in meters
      } else if (distance === '10+ miles') {
        // No max distance needed for this filter
      }
      
      // Only add the geo query if we have a max distance
      if (maxDistance) {
        distanceQuery = {
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)]
              },
              $maxDistance: maxDistance
            }
          }
        };
        
        // Merge the distance query with our existing query
        query = { ...query, ...distanceQuery };
      }
    }
    
    // Fetch the therapists with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const therapists = await Therapist.find(query)
      .sort({ rating: -1 }) // Sort by rating (highest first)
      .skip(skip)
      .limit(limit);
    
    // Count total matching documents for pagination info
    const total = await Therapist.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: therapists.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: therapists
    });
  } catch (error) {
    console.error('Error fetching therapists:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching therapists',
      error: error.message
    });
  }
};

// Get single therapist by ID
export const getTherapistById = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);
    
    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: 'Therapist not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: therapist
    });
  } catch (error) {
    console.error('Error fetching therapist:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching therapist',
      error: error.message
    });
  }
};

// Get therapist availability slots
export const getTherapistAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query; // Optional date parameter
    
    const therapist = await Therapist.findById(id);
    
    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: 'Therapist not found'
      });
    }
    
    // In a real application, you would fetch availability from a separate collection
    // or calculate it based on the therapist's schedule and booked appointments
    // For this example, we'll return mock data
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Generate some mock availability slots
    const availabilitySlots = [
      {
        date: today.toISOString().split('T')[0],
        slots: ['09:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM']
      },
      {
        date: tomorrow.toISOString().split('T')[0],
        slots: ['10:00 AM', '12:30 PM', '03:00 PM', '04:30 PM']
      }
    ];
    
    // Filter by date if provided
    let slots = availabilitySlots;
    if (date) {
      slots = availabilitySlots.filter(slot => slot.date === date);
    }
    
    res.status(200).json({
      success: true,
      data: slots
    });
  } catch (error) {
    console.error('Error fetching therapist availability:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching therapist availability',
      error: error.message
    });
  }
};

// Get available specialties (for filter dropdown)
export const getSpecialties = async (req, res) => {
  try {
    // Use MongoDB aggregation to get distinct specialties
    const specialties = await Therapist.distinct('specialty');
    
    res.status(200).json({
      success: true,
      data: ['All Specialties', ...specialties]
    });
  } catch (error) {
    console.error('Error fetching specialties:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching specialties',
      error: error.message
    });
  }
};

// Book appointment with therapist
export const bookAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, userId, notes } = req.body;
    
    if (!date || !time || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide date, time and userId'
      });
    }
    
    const therapist = await Therapist.findById(id);
    
    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: 'Therapist not found'
      });
    }
    
    // In a real application, you would:
    // 1. Check if the slot is available
    // 2. Create an appointment record
    // 3. Update therapist's availability
    // 4. Send notifications
    
    // For this example, we'll just return a success response
    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: {
        appointmentId: 'mock-appointment-id-' + Date.now(),
        therapistId: id,
        therapistName: therapist.name,
        date,
        time,
        userId,
        notes
      }
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error booking appointment',
      error: error.message
    });
  }
};

// Send message to therapist
export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, message } = req.body;
    
    if (!userId || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide userId and message'
      });
    }
    
    const therapist = await Therapist.findById(id);
    
    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: 'Therapist not found'
      });
    }
    
    // In a real application, you would:
    // 1. Create a message record in your database
    // 2. Associate it with a conversation between user and therapist
    // 3. Potentially trigger notifications
    
    // For this example, we'll just return a success response
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        messageId: 'mock-message-id-' + Date.now(),
        therapistId: id,
        therapistName: therapist.name,
        userId,
        message,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
};