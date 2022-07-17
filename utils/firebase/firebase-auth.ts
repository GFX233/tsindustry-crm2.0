import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { ErrorProps } from "next/error";
const apiKey = process.env.FIREBASE_PRIVATE_KEY

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "tsi-crm-c3502.firebaseapp.com",
    projectId: "tsi-crm-c3502",
    storageBucket: "tsi-crm-c3502.appspot.com",
    messagingSenderId: "135743100693",
    appId: "1:135743100693:web:1cabbf515629ce9c503b1c",
    measurementId: "G-LLYDXNS7VB"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

export const signIn = async (email: string, password: string) => {
  try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log(user)
  } catch (error) {
      console.log((error as Error).message)
  }
}

export const signOut = async () => {
  await auth.signOut()
}