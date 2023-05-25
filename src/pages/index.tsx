import { Inter } from "next/font/google";
import Layout from "@/components/layout/Layout";
import Lenta from "@/components/screen/lenta/Lenta";
import Post from "@/components/screen/lenta/Post";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";

const inter = Inter({ subsets: ["latin"] });

export interface IPost {
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  image: string;
  content: string;
  createdAt: {
    seconds: string;
  };
}
export type TPost = IPost[] | null;

export interface IPosts {
  posts?: TPost;
  setPosts?: Dispatch<SetStateAction<TPost>>;
}

export default function Home() {
  const [posts, setPosts] = useState<TPost>([]);
  const data = getFirestore();

  
  useEffect(() => {
    const collRef = collection(data,"posts");
    const q = query (collRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const p: TPost = [];
        querySnapshot.forEach((doc) => {
            p.unshift(doc.data() as IPost)
          }
        )
        setPosts(p)
      }
    );

    return () => unsubscribe();
  }, []);
  return (
      <Layout>
        <Lenta/>
        {posts?.map((item) => {
          return <Post key={item.createdAt.seconds} {...item} />;
        })}
      </Layout>
  );
}
