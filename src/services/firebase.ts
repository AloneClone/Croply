// Firebase config placeholder — not called at runtime for the demo.
// Replace with your real credentials when connecting to a live backend.
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "croply-app.firebaseapp.com",
  projectId: "croply-app",
  storageBucket: "croply-app.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// NOTE: Firebase is NOT initialized at startup.
// The demo runs entirely on local state.
// To connect to a real backend, uncomment below:
//
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// export const auth = getAuth(app);
