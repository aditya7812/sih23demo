// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth} from "firebase/auth"
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlnfYGbSYV74UuJpCVCVNdr0NWu7A60zs",
  authDomain: "sih23-b04d1.firebaseapp.com",
  projectId: "sih23-b04d1",
  storageBucket: "sih23-b04d1.appspot.com",
  messagingSenderId: "240461919934",
  appId: "1:240461919934:web:d8652485789168721b90ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app)