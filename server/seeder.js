import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Therapist from './model/therapistModel.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });

// Sample therapist data
const therapists = [
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Anxiety & Depression',
    rating: 4.9,
    reviews: 124,
    location: 'New York, NY',
    coordinates: {
      type: 'Point',
      coordinates: [-73.9857, 40.7484] // NYC coordinates
    },
    distance: '2.3 miles',
    availability: 'Today',
    imgUrl: 'https://th.bing.com/th/id/OIP.tJvqga41u4SMjXtQus1bBgHaHa?w=180&h=182&c=7&r=0&o=7&cb=iwp2&dpr=1.3&pid=1.7&rm=3',
    next: 'Available at 3:00 PM',
    experience: '12 years',
    price: '$120/session',
    bio: 'Specializing in anxiety and depression treatment for over 12 years, Dr. Johnson employs evidence-based approaches including CBT and mindfulness techniques to help clients overcome challenges and build resilience.',
    credentials: 'Licensed Clinical Psychologist',
    education: [
      {
        school: 'Columbia University',
        degree: 'Ph.D.',
        field: 'Clinical Psychology',
        year: 2010
      }
    ],
    specializations: ['Anxiety Disorders', 'Depression', 'Stress Management', 'Work-Life Balance'],
    languages: ['English', 'Spanish'],
    insuranceAccepted: ['Blue Cross', 'Aetna', 'United Healthcare'],
    telehealth: true,
    inPerson: true
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Trauma & PTSD',
    rating: 4.8,
    reviews: 98,
    location: 'San Francisco, CA',
    coordinates: {
      type: 'Point',
      coordinates: [-122.4194, 37.7749] // SF coordinates
    },
    distance: '0.8 miles',
    availability: 'Tomorrow',
    imgUrl: 'https://th.bing.com/th/id/OIP.5t9LLLWcwkSRHOw52CLVJwHaHa?w=208&h=209&c=7&r=0&o=7&cb=iwp2&dpr=1.3&pid=1.7&rm=3',
    next: 'Available at 10:00 AM',
    experience: '8 years',
    price: '$135/session',
    bio: 'Dr. Chen specializes in trauma-informed care and PTSD treatment, helping clients process difficult experiences and develop coping strategies for healing and growth.',
    credentials: 'Licensed Clinical Psychologist',
    education: [
      {
        school: 'Stanford University',
        degree: 'Ph.D.',
        field: 'Clinical Psychology',
        year: 2015
      }
    ],
    specializations: ['Trauma', 'PTSD', 'Anxiety', 'Grief & Loss'],
    languages: ['English', 'Mandarin'],
    insuranceAccepted: ['Blue Shield', 'Kaiser', 'Cigna'],
    telehealth: true,
    inPerson: true
  },
  {
    name: 'Dr. Lisa Patel',
    specialty: 'Relationship Counseling',
    rating: 4.7,
    reviews: 156,
    location: 'Chicago, IL',
    coordinates: {
      type: 'Point',
      coordinates: [-87.6298, 41.8781] // Chicago coordinates
    },
    distance: '1.5 miles',
    availability: 'Today',
    imgUrl: 'https://th.bing.com/th/id/OIP.W_N9B3kiqMwnj5mfUG9I0wHaHa?w=157&h=180&c=7&r=0&o=7&cb=iwp2&dpr=1.3&pid=1.7&rm=3',
    next: 'Available at 5:30 PM',
    experience: '15 years',
    price: '$145/session',
    bio: 'With 15 years of experience in relationship counseling, Dr. Patel helps individuals and couples navigate relationship challenges, improve communication, and build healthy partnerships.',
    credentials: 'Licensed Marriage and Family Therapist',
    education: [
      {
        school: 'Northwestern University',
        degree: 'Ph.D.',
        field: 'Marriage and Family Therapy',
        year: 2008
      }
    ],
    specializations: ['Couples Therapy', 'Marriage Counseling', 'Family Therapy', 'Communication Skills'],
    languages: ['English', 'Hindi', 'Gujarati'],
    insuranceAccepted: ['Blue Cross', 'Humana', 'Aetna'],
    telehealth: true,
    inPerson: true
  },
  {
    name: 'Dr. James Wilson',
    specialty: 'Grief & Loss',
    rating: 4.9,
    reviews: 87,
    location: 'Boston, MA',
    coordinates: {
      type: 'Point',
      coordinates: [-71.0589, 42.3601] // Boston coordinates
    },
    distance: '3.2 miles',
    availability: 'Wednesday',
    imgUrl: 'https://th.bing.com/th/id/OIP.5t9LLLWcwkSRHOw52CLVJwHaHa?w=208&h=209&c=7&r=0&o=7&cb=iwp2&dpr=1.3&pid=1.7&rm=3',
    next: 'Available in 2 days',
    experience: '10 years',
    price: '$130/session',
    bio: 'Dr. Wilson specializes in helping individuals navigate grief, loss, and major life transitions, providing compassionate support through the healing process.',
    credentials: 'Licensed Clinical Psychologist',
    education: [
      {
        school: 'Harvard University',
        degree: 'Ph.D.',
        field: 'Clinical Psychology',
        year: 2013
      }
    ],
    specializations: ['Grief Counseling', 'Bereavement', 'Life Transitions', 'Terminal Illness Support'],
    languages: ['English'],
    insuranceAccepted: ['Blue Cross', 'Tufts', 'Medicare'],
    telehealth: true,
    inPerson: true
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialty: 'Stress Management',
    rating: 4.6,
    reviews: 110,
    location: 'Austin, TX',
    coordinates: {
      type: 'Point',
      coordinates: [-97.7431, 30.2672] // Austin coordinates
    },
    distance: '0.7 miles',
    availability: 'Today',
    imgUrl: 'https://th.bing.com/th/id/OIP.W_N9B3kiqMwnj5mfUG9I0wHaHa?w=157&h=180&c=7&r=0&o=7&cb=iwp2&dpr=1.3&pid=1.7&rm=3',
    next: 'Available at 1:15 PM',
    experience: '7 years',
    price: '$125/session',
    bio: 'Dr. Rodriguez helps clients manage stress and anxiety through practical techniques and mindfulness-based approaches, empowering them to create balanced and fulfilling lives.',
    credentials: 'Licensed Professional Counselor',
    education: [
      {
        school: 'University of Texas',
        degree: 'Ph.D.',
        field: 'Counseling Psychology',
        year: 2016
      }
    ],
    specializations: ['Stress Management', 'Anxiety', 'Mindfulness', 'Work-Life Balance'],
    languages: ['English', 'Spanish'],
    insuranceAccepted: ['United Healthcare', 'Cigna', 'Aetna'],
    telehealth: true,
    inPerson: true
  },
  {
    name: 'Dr. David Kim',
    specialty: 'Addiction Recovery',
    rating: 4.8,
    reviews: 132,
    location: 'Seattle, WA',
    coordinates: {
      type: 'Point',
      coordinates: [-122.3321, 47.6062] // Seattle coordinates
    },
    distance: '2.1 miles',
    availability: 'Thursday',
    imgUrl: 'https://th.bing.com/th/id/OIP.5t9LLLWcwkSRHOw52CLVJwHaHa?w=208&h=209&c=7&r=0&o=7&cb=iwp2&dpr=1.3&pid=1.7&rm=3',
    next: 'Available in 3 days',
    experience: '14 years',
    price: '$140/session',
    bio: 'With extensive experience in addiction treatment, Dr. Kim provides compassionate support for individuals struggling with substance use disorders and behavioral addictions.',
    credentials: 'Licensed Clinical Psychologist, Certified Addiction Professional',
    education: [
      {
        school: 'University of Washington',
        degree: 'Ph.D.',
        field: 'Clinical Psychology',
        year: 2009
      }
    ],
    specializations: ['Substance Use Disorders', 'Behavioral Addictions', 'Recovery Support', 'Dual Diagnosis'],
    languages: ['English', 'Korean'],
    insuranceAccepted: ['Premera', 'Regence', 'Cigna'],
    telehealth: true,
    inPerson: true
  }
];

// Import data to database
const importData = async () => {
  try {
    // Clear existing therapists
    await Therapist.deleteMany();
    
    // Add new therapists
    await Therapist.insertMany(therapists);
    
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data from database
const deleteData = async () => {
  try {
    await Therapist.deleteMany();
    
    console.log('Data deleted successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}

// Run with: node seeder.js
// To delete data: node seeder.js -d