import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';

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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
firebase.initializeApp(firebaseConfig);

export default firebase;