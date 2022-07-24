import { auth } from "./firebase"

// Initialize Firebase

export const signIn = async (email: string, password: string) => {
  try {
    await auth.signInWithEmailAndPassword(email, password)
  } catch (error) {
    console.error(error)
  }
}

export const signOut = async () => {
  await auth.signOut()
}