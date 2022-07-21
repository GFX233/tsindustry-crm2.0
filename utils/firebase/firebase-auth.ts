import "firebase/auth"
import firebaseApp from "./firebase";
import firebase from 'firebase/app'

// Initialize Firebase
export const auth = firebase.auth.getAuth(firebaseApp);

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