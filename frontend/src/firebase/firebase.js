import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD5_d5AEUiqtmNH8mX87C0LxgC8tNbI-Ew",
    authDomain: "mchacks2025-ifem-e3c38.firebaseapp.com",
    projectId: "mchacks2025-ifem-e3c38",
    storageBucket: "mchacks2025-ifem-e3c38.firebasestorage.app",
    messagingSenderId: "201801706689",
    appId: "1:201801706689:web:46a57c85379e6b134e7840",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
