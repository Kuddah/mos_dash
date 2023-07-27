// Import the functions you need from the SDKs you need
import { initializeApp, getApps  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initFirebaseBackend } from "Components/helper/firebase_helper";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
initFirebaseBackend(firebaseConfig)