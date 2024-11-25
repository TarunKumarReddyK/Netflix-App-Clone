import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  signInWithEmailAndPassword, // Corrected import
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Initialize Firebase App
const firebaseConfig = {
  apiKey: "AIzaSyCdr5IwiT82YabPx34PT3uWx1ncbpXceQ0",
  authDomain: "netflix---clone-2958c.firebaseapp.com",
  projectId: "netflix---clone-2958c",
  storageBucket: "netflix---clone-2958c.appspot.com",
  messagingSenderId: "1036692583217",
  appId: "1:1036692583217:web:416550d0188c65219b7610",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Signup Function
const signup = async (name, email, password) => {
  try {
    // Create user with email and password
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Add user data to Firestore (Note: Fixed usage of collection and addDoc)
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
    // alert(error.message); // Improved error handling
  }
};

// Login Function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))

    // alert(error.message); // Improved error handling
  }
};

// Logout Function
const logout = () => {
  signOut(auth);
};

// Exporting the functions and Firebase instance
export { auth, db, login, signup, logout };