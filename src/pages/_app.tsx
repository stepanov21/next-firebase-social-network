import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AuthProvider from "@/providers/AuthProvider";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6iKcA9LdPEmCdZ1ZlQvsJHx0OoLJCQqg",
  authDomain: "social-network-nextjs.firebaseapp.com",
  projectId: "social-network-nextjs",
  storageBucket: "social-network-nextjs.appspot.com",
  messagingSenderId: "745277816881",
  appId: "1:745277816881:web:9b46aa7b3b3dc826e65510",
};

export const app = initializeApp(firebaseConfig);
getFirestore(app);
getStorage(app);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
