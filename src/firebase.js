import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyD3i2B810gYumJSo7U5IIVLvNDRxd6LNfo",
  authDomain: "backendsales-f7c31.firebaseapp.com",
  databaseURL:
    "https://backendsales-f7c31-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "backendsales-f7c31",
  storageBucket: "backendsales-f7c31.appspot.com",
  messagingSenderId: "782975148788",
  appId: "1:782975148788:web:6f1c29171c3a6e0bedb4a1",
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(db);
export default firebaseDb;
