import firebase from "firebase/compat/app";
import "firebase/compat/auth"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: "135743100693",
    appId: "1:135743100693:web:1cabbf515629ce9c503b1c",
    measurementId: "G-LLYDXNS7VB"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
