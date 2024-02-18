// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB7fXapZl4sSQECcsbSleRLRs2nMCG0efI',
  authDomain: 'pomapp-b418d.firebaseapp.com',
  projectId: 'pomapp-b418d',
  storageBucket: 'pomapp-b418d.appspot.com',
  messagingSenderId: '706544724288',
  appId: '1:706544724288:web:67a77f72860b0b752cb2a5',
  measurementId: 'G-T2VLLRRMNY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db_pom = getFirestore(app);

export {auth, db_pom};
