import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from "firebase/compat/app";
import Login from "../pages/login"
import { auth } from "../utils/firebase/firebase"



interface LayoutProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<LayoutProps> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      console.log(firebaseUser)
      setUser(firebaseUser);
    });
    console.log(user)
    return unsubscribe;
  }, []);


  return <AuthContext.Provider value={user}>{user !== null ? children : <Login />}</AuthContext.Provider>;
};