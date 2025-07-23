// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9gldrfuswkhV-konZX0-shI52KCjnlXQ",
  authDomain: "ai-travel-planner-6dcdd.firebaseapp.com",
  projectId: "ai-travel-planner-6dcdd",
  storageBucket: "ai-travel-planner-6dcdd.firebasestorage.app",
  messagingSenderId: "354531935739",
  appId: "1:354531935739:web:c337cba19d41b72b7eb75e",
  measurementId: "G-ZPFRRW2YNM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);