import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCvvr9NCdmXDXVpbOYMROQlK2zlXcMwBS4",
  authDomain: "assigment9-11929.firebaseapp.com",
  projectId: "assigment9-11929",
  storageBucket: "assigment9-11929.firebasestorage.app",
  messagingSenderId: "76393024621",
  appId: "1:76393024621:web:1fd186e6c769014c26c364",
  measurementId: "G-NSKZRBMJ9E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;