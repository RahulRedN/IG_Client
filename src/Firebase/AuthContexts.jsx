
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

import { setData } from "../redux/jobseekerReducer";
import { setCompanyData } from "../redux/companyReducer";
import { useDispatch } from "react-redux";

import { reset } from "../redux/jobseekerReducer";
import { resetCompany } from "../redux/companyReducer";

const AuthContext = React.createContext();

export const AuthContexts = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setCurrentUser] = useState();
  const [isLoading, setLoading] = useState(true);

  const signUp = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    return signOut(auth);
  };

  const sendPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      
    });
    setLoading(false);

    return unsubscribe;
  }, []);

  const value = {
    user,
    signUp,
    signIn,
    logout,
    sendPasswordReset,
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
