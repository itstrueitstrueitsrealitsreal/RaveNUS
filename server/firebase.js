// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9F_BV8O3KeFmosSHPyVLjd-55hJupp2I",
  authDomain: "login-development-2d9b5.firebaseapp.com",
  projectId: "login-development-2d9b5",
  storageBucket: "login-development-2d9b5.appspot.com",
  messagingSenderId: "868091133838",
  appId: "1:868091133838:web:4326e9f342200db5ff6edf",
  measurementId: "G-DYQL36DY3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);