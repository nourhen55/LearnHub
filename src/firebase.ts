import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import type { Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjGJclGuseYUTm5Je15T_cM_Eg-feyzXw",
  authDomain: "lingualearn-cbfee.firebaseapp.com",
  projectId: "lingualearn-cbfee",
  storageBucket: "lingualearn-cbfee.firebasestorage.app",
  messagingSenderId: "593327422932",
  appId: "1:593327422932:web:d08cad9b0d7c0db64e6a41",
  measurementId: "G-M69R1M9SR1"
};


const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { auth, provider };