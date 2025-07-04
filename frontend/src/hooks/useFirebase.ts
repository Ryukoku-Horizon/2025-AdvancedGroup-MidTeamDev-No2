import { auth } from "../libs/firebase"
import { onAuthStateChanged, signInWithCustomToken, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFirebaseUser = () => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const env = process.env.REACT_APP_URL ?? ""

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithCustomToken = async (token:any) => {
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
      navigate(`${env}/`)
      setLoading(false);
    }
  };

  return { user, loading, loginWithCustomToken, logout };
};

export default useFirebaseUser