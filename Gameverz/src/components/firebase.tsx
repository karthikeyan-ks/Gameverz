import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDfE23GBS0L94u4nnwUrTemWUIZH7RbORI",
    authDomain: "gameverz.firebaseapp.com",
    projectId: "gameverz",
    storageBucket: "gameverz.firebasestorage.app",
    messagingSenderId: "64785550649",
    appId: "1:64785550649:web:df8dff508baece5b47ece8",
    measurementId: "G-67NGW058DP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
