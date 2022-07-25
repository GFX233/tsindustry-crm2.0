import { auth } from "./firebase"

// Initialize Firebase

export const signIn = async (email: string, password: string) => {
  try {
    let user = await auth.signInWithEmailAndPassword(email, password)
    return user
  } catch (error) {
    return error
  }
}

export const signOut = async () => {
  await auth.signOut()
}