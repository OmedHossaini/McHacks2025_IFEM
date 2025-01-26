import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDEFOkJJ3Fg-Cg6vGHl5OUVS03gIqIoxvM",
    authDomain: "mchacks2025-ifem.firebaseapp.com",
    projectId: "mchacks2025-ifem",
    storageBucket: "mchacks2025-ifem.firebasestorage.app",
    messagingSenderId: "457339621254",
    appId: "1:457339621254:web:2af6b2fc70513d6ef1a607",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
