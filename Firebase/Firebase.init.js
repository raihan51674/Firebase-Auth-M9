// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlXNUYkSxL5YOI90rnZsN7ft1u4VxJS6I",
  authDomain: "simple-firebase-ddb4a.firebaseapp.com",
  projectId: "simple-firebase-ddb4a",
  storageBucket: "simple-firebase-ddb4a.firebasestorage.app",
  messagingSenderId: "145830864622",
  appId: "1:145830864622:web:e827606a6ab4088ba175ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export  const auth = getAuth(app);




// 1.create a project firebase console and npm i firebase
//2.bring firebase config into your project(from firebase website)
//3.by using get started.. create the auth and export
//4.in the login page : create provider new GoogleAuthProvider()
//5.use signInWithPopup and pass auth and provider
//6.user information exces (res.user) and display
//7.add signOut and pass auth using condition for button