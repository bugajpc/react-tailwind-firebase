// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtABrQ1GwJ09dlKzAEPTe7UKR6OK_eEW0",
  authDomain: "realtor-react-tailwind-guide.firebaseapp.com",
  projectId: "realtor-react-tailwind-guide",
  storageBucket: "realtor-react-tailwind-guide.appspot.com",
  messagingSenderId: "953277501492",
  appId: "1:953277501492:web:88d59ca3b5f91f4cd9ba61"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();