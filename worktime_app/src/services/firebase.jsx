// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGv114gJ0LgyumOUA7nxSwjd-c_5nJGX4",
  authDomain: "worktime-app-merito.firebaseapp.com",
  projectId: "worktime-app-merito",
  storageBucket: "worktime-app-merito.appspot.com",
  messagingSenderId: "350282776214",
  appId: "1:350282776214:web:be10edfe258a418a980cb7",
  measurementId: "G-SP7BTWVC9L"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const secondaryApp = initializeApp(firebaseConfig, "Secondary");
//const analytics = getAnalytics(app);
//  const auth = getAuth(app);
// const db = getFirestore(app);

// export {app,
//   //  auth,
//   //   db
// };

export const db = getFirestore(app);
export const auth = getAuth(app);
export const secondaryAuth = getAuth(secondaryApp);