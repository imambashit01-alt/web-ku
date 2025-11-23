// src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider 
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDoMX3c7sMLvO7so8V10ZBVOWIXxgDNJ3c",
  authDomain: "mamz-react-aad9f.firebaseapp.com",
  projectId: "mamz-react-aad9f",
  storageBucket: "mamz-react-aad9f.firebasestorage.app",
  messagingSenderId: "283402503089",
  appId: "1:283402503089:web:9904d53a5623c5d9813390",
  measurementId: "G-T8HS7Y1SLZ"
};

// 1️⃣ Initialize App
const app = initializeApp(firebaseConfig);

// 2️⃣ Export Auth
export const auth = getAuth(app);

// 3️⃣ Export Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const githubProvider = new GithubAuthProvider();

// 4️⃣ Export Firestore (PENTING)
export const db = getFirestore(app);

// 5️⃣ Export Storage
export const storage = getStorage(app);

export default app;
