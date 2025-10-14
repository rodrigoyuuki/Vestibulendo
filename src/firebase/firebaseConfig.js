import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyARmuCulPqM202M8T6DCaUGJcdjIv973U8",
  authDomain: "vestibulendo-ccefb.firebaseapp.com",
  projectId: "vestibulendo-ccefb",
  storageBucket: "vestibulendo-ccefb.firebasestorage.app",
  messagingSenderId: "230823652862",
  appId: "1:230823652862:web:cc3b0461c0758a100aa4af",
  measurementId: "G-VWGNCGFKHS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
 
export { db, auth, app };