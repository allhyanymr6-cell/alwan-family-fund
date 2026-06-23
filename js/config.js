// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "alwan-family-fund.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "alwan-family-fund",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "alwan-family-fund.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Initialize Firebase
if (!window.firebase) {
  console.error('Firebase SDK not loaded');
} else {
  firebase.initializeApp(firebaseConfig);
}

// Get Firebase instances
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// App Configuration
const APP_CONFIG = {
  appName: 'صندوق عائلة علوان',
  appNameEn: 'Alwan Family Fund',
  colors: {
    primary: '#0F172A',
    accent: '#D4AF37',
    white: '#FFFFFF',
    light: '#F5F5F5',
    dark: '#1A1A1A'
  },
  currency: 'SR',
  language: 'ar',
  dateFormat: 'DD/MM/YYYY'
};

// User Roles
const USER_ROLES = {
  ADMIN: 'admin',
  TREASURER: 'treasurer',
  MEMBER: 'member'
};

// Member Status
const MEMBER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended'
};

// Loan Status
const LOAN_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed'
};