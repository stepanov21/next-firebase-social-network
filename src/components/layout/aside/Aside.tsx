import { useAuth } from "@/providers/useAuth";
import {
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import FriendItem from "./FriendItem";

interface IChatsAside {
  idChat: {
    userInfo: {
      displayName: string;
      photoURL: string;
      uid: string;
    }
  }
}

const Aside = () => {
  const { db, currentUser } = useAuth();

  const [chats, setChats] = useState<IChatsAside>();

  useEffect(() => {
    if (!currentUser) return;
    const unsub = onSnapshot(doc(db, "usersChats", currentUser?.id), (doc) => {
      setChats(doc.data() as IChatsAside);
    });
    return () => unsub();
  }, [currentUser]);

  return (
    <div className="h-[90vh]">
      <div className="py-8 px-4 bg-second rounded-xl flex flex-col items-center">
        <div className="w-24 h-24 rounded-full mx-auto overflow-hidden">
          <img
            src={currentUser?.avatar}
            alt=""
            className="object-cover h-full w-full"
          />
        </div>
        <h4 className="mt-4 mb-2 text-2xl">{currentUser?.name}</h4>
        <div className="mt-2 flex flex-wrap gap-2 justify-center">
          <span className="text-xs p-2 border border-gray-500 rounded-xl bg-accentColor bg-opacity-25">
            ○ Designer
          </span>
          <span className="text-xs p-2 border border-gray-500 rounded-xl bg-accentColor bg-opacity-25">
            ○ Art
          </span>
          <span className="text-xs p-2 border border-gray-500 rounded-xl bg-accentColor bg-opacity-25">
            ○ Programming
          </span>
          <span className="text-xs p-2 border border-gray-500 rounded-xl bg-accentColor bg-opacity-25">
            ○ Sale
          </span>
        </div>
      </div>
      {chats &&
        Object.entries(chats)?.map((chat) => {
          return <FriendItem key={chat[0]} userInfo={chat[1].userInfo} chatId={chat[0]} />;
        })}
    </div>
  );
};

export default Aside;
