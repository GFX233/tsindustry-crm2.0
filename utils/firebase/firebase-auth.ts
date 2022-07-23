import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import firebaseApp from "./firebase";
import firebase from "firebase/app"

// Initialize Firebase
export const auth = getAuth(firebaseApp);

export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error(error)
      }
  
}

export const signOut = async () => {
  await auth.signOut()
}