import mongoose from 'mongoose';

const therapistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide therapist name'],
    trim: true
  },
  specialty: {
    type: String,
    required: [true, 'Please provide specialty'],
    trim: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
    trim: true
  },
  // GeoJSON point for location-based queries
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  distance: {
    type: String,
    trim: true
  },
  availability: {
    type: String,
    enum: ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    default: 'Today'
  },
  imgUrl: {
    type: String,
    default: '/api/placeholder/400/400'
  },
  next: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  price: {
    type: String,
    required: [true, 'Please provide session price'],
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  credentials: {
    type: String,
    trim: true
  },
  education: [
    {
      school: String,
      degree: String,
      field: String,
      year: Number
    }
  ],
  specializations: [String],
  languages: [String],
  insuranceAccepted: [String],
  telehealth: {
    type: Boolean,
    default: true
  },
  inPerson: {
    type: Boolean,
    default: true
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create index for location-based queries
therapistSchema.index({ coordinates: '2dsphere' });

// Create index for text search
therapistSchema.index({ 
  name: 'text', 
  specialty: 'text', 
  location: 'text',
  bio: 'text'
});

const Therapist = mongoose.model('Therapist', therapistSchema);

export default Therapist;