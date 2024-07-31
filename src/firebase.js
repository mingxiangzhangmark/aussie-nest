// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1fJnZ68dIrizujywZeS1ISDVZOkV5ZHk",
  authDomain: "aussie-nest.firebaseapp.com",
  projectId: "aussie-nest",
  storageBucket: "aussie-nest.appspot.com",
  messagingSenderId: "937670815980",
  appId: "1:937670815980:web:3b71fe15eb99d4b05575c9"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();