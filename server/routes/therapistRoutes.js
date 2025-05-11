import express from 'express';
import { 
  getTherapists,
  getTherapistById,
  getTherapistAvailability,
  getSpecialties,
  bookAppointment,
  sendMessage
} from '../controllers/therapistController.js';

const router = express.Router();

// Get all therapists with filtering
router.get('/', getTherapists);

// Get available specialties for filter dropdown
router.get('/specialties', getSpecialties);

// Get a single therapist by ID
router.get('/:id', getTherapistById);

// Get a therapist's availability
router.get('/:id/availability', getTherapistAvailability);

// Book an appointment with a therapist
router.post('/:id/book', bookAppointment);

// Send a message to a therapist
router.post('/:id/message', sendMessage);

export default router;