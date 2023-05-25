import React, {
  createContext,
  FC,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import {Firestore, getFirestore} from "firebase/firestore"
import {FirebaseStorage, getStorage} from "firebase/storage"
import { useRouter } from "next/router";

export interface IContext {
  currentUser: ICurrentUser | undefined;
  ga: Auth;
  db: Firestore;
  storage: FirebaseStorage;
}

export const AuthContext = createContext<IContext>(
  {} as IContext
);

const AuthProvider: FC<any> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser>();

  const router = useRouter();
  const ga = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const unListen = onAuthStateChanged(ga, (user) => {
      if (user) {
        const id = user.uid;
        const name = user.displayName || '';
        const avatar = user.photoURL || '';
        setCurrentUser({ name, id, avatar });
      } else {
        router.push("/auth");
      }
    });
    return () => unListen();
  }, []);

  useEffect(() => {
    if (currentUser && ga.currentUser?.displayName && ga.currentUser.photoURL) {
      router.push("/");
    }
  }, [currentUser])

  const value: IContext = useMemo(() => ({
    setCurrentUser,
    currentUser,
    ga,
    db,
    storage
  }), [currentUser, ga, db, storage, setCurrentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
