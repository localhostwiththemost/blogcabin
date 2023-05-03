// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8Ok1Cmfq6-Ojra9kP_ckEnN8Wt2P9_D8",
  authDomain: "blogcabin-c95bf.firebaseapp.com",
  projectId: "blogcabin-c95bf",
  storageBucket: "blogcabin-c95bf.appspot.com",
  messagingSenderId: "184825646453",
  appId: "1:184825646453:web:304bd4babc1a611f92973c",
  measurementId: "G-G58YYNTRHY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const googleProvider = new GoogleAuthProvider();

//const analytics = getAnalytics(app);

export { auth, db, googleProvider };
