import React, { createContext, useState, useEffect, useContext } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "../lib/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, initializing, signInWithGoogle, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
