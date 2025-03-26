// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7u6xgG43lhX8IWRomNXADxCxMHDtqjfE",
  authDomain: "mprep-a77bc.firebaseapp.com",
  projectId: "mprep-a77bc",
  storageBucket: "mprep-a77bc.firebasestorage.app",
  messagingSenderId: "75483458609",
  appId: "1:75483458609:web:a5388748d7f7dbd485f910",
  measurementId: "G-P1DV53WFXR"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

