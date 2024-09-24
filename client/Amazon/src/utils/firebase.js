// Import necessary Firebase services
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCPVEKIgfJyhfVSkmz3NaNkqXkGUFX1Mqc',
  authDomain: 'amazzon-imran.firebaseapp.com',
  projectId: 'amazzon-imran',
  storageBucket: 'amazzon-imran.appspot.com',
  messagingSenderId: '95804818156',
  appId: '1:95804818156:web:c68b17e5e8ff4790fc1bc9',
  measurementId: 'G-WV2NPP7DN6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);
