// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJcOx2mj_1uw3whmJBG1YRF8bKu-59nqg",
  authDomain: "voluble-ai.firebaseapp.com",
  projectId: "voluble-ai",
  storageBucket: "voluble-ai.firebasestorage.app",
  messagingSenderId: "988298496368",
  appId: "1:988298496368:web:9aa25351ceb214a5ad27b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
