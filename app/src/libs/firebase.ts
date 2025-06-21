import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.GATSBY_FB_API_KEY,
    authDomain: process.env.GATSBY_FB_AUTH_DOMAIN,
    projectId: process.env.GATSBY_FB_PROJECT_ID,
    storageBucket: process.env.GATSBY_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_FB_MESSAGING_SENDER_ID,
    appId: process.env.GATSBY_FB_APP_ID,
    measurementId: process.env.GATSBY_FB_MEASUREMENT_ID
  };

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };