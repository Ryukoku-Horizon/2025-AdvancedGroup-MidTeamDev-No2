import { auth } from "../libs/firebase"
import { onAuthStateChanged, signInWithCustomToken, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";

const useFirebaseUser = () => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithCustomToken = async (token) => {
    setLoading(true);
    try {
      await signInWithCustomToken(auth, token);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, loginWithCustomToken, logout };
};

export default useFirebaseUser