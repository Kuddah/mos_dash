// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAKbZURRXqIs20ZpStbQ14Wgw_nua7knkU",
    authDomain: "mosdb-84cb5.firebaseapp.com",
    projectId: "mosdb-84cb5",
    storageBucket: "mosdb-84cb5.appspot.com",
    messagingSenderId: "485795603850",
    appId: "1:485795603850:web:b9778183e77606f1edd473",
    measurementId: "G-Q3BW7J1LPH"
  };

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;