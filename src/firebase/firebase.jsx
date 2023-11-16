import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDn4xGOKq0gwJv-43Ug7B8e_zDxij0Wlnw",
    authDomain: "quanlyhoso-89410.firebaseapp.com",
    databaseURL: "https://quanlyhoso-89410-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "quanlyhoso-89410",
    storageBucket: "quanlyhoso-89410.appspot.com",
    messagingSenderId: "255748457464",
    appId: "1:255748457464:web:18b5d415072412e897cc0d",
    measurementId: "G-GMFZR2M0WT"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
export const db = getFirestore(app);
