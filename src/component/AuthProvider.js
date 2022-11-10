import { createContext, useState } from "react";
import { auth } from "./Firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("Loading");

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        errorMsg,
        setErrorMsg,
        login: async (email, password) => {
          try {
            await auth.signInWithEmailAndPassword(email, password);
            setUser(user);
          } catch (e) {
            setErrorMsg(e.toString());
          }
        },
        register: async (email, password) => {
          try {
            await auth.createUserWithEmailAndPassword(email, password);
            setUser(user);
          } catch (e) {}
        },
        logout: async () => {
          try {
            await auth.signOut();
            window.location.reload();
            setUser(null);
          } catch (e) {}
        },
        forgot: async (email) => {
          try {
            await auth.sendPasswordResetEmail(email);
          } catch (e) {}
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
