import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbrc7lZ9X8FbBAmyHBq4GyyBqH9ih0LoY",
  authDomain: "bridalmirror-debc3.firebaseapp.com",
  projectId: "bridalmirror-debc3",
  storageBucket: "bridalmirror-debc3.firebasestorage.app",
  messagingSenderId: "587589096325",
  appId: "1:587589096325:web:550b872c914bfcb63b2aec"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);