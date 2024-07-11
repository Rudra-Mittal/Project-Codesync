// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP5UcDauYUP05eQfWFNYTaaGhm247jBsg",
  authDomain: "codesync-ea680.firebaseapp.com",
  projectId: "codesync-ea680",
  storageBucket: "codesync-ea680.appspot.com",
  messagingSenderId: "69588047847",
  appId: "1:69588047847:web:b6a559df8e844ce04f4f42",
  measurementId: "G-VP0M73M6TC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);