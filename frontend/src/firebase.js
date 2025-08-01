import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCt98qnF_lFe5h3-_5VGE-YmqyWQPo51yQ",
  authDomain: "mern-estate-e6bf7.firebaseapp.com",
  projectId: "mern-estate-e6bf7",
  storageBucket: "mern-estate-e6bf7.firebasestorage.app",
  messagingSenderId: "286121333795",
  appId: "1:286121333795:web:56e74023db0d82ffaf4d96",
  measurementId: "G-PZ90V6KK1Z"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);