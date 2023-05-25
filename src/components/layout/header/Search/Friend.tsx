import { useAuth } from "@/providers/useAuth";
import { addDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { FC } from "react";

const Friend: FC<IFriend> = ({ displayName, photoURL, uid }) => {
  const router = useRouter();
  const { currentUser, db } = useAuth();

  const createChatRoom = async (friendUserId: string) => {
    if (!currentUser) return;
    let chatId = "";
    if (currentUser.id && friendUserId) {
      chatId =
        friendUserId > currentUser.id
          ? friendUserId + currentUser.id
          : currentUser.id + friendUserId;
    }
    await setDoc(doc(db, "chatRooms", chatId), {
      chatId,
      messages: [],
    } as IChatRoom);

    const userChats = await getDoc(doc(db, "usersChats", currentUser.id));
    const friendChats = await getDoc(doc(db, "usersChats", uid));

    if (userChats.exists()) {
      await updateDoc(doc(db, "usersChats", currentUser.id), {
        [chatId]: {
          userInfo: {
            uid,
            displayName,
            photoURL,
          },
        },
      });
    } else {
      await setDoc(doc(db, "usersChats", currentUser.id), {
        [chatId]: {
          userInfo: {
            uid,
            displayName,
            photoURL,
          },
        },
      });
    }
    if (friendChats.exists()) {
      await updateDoc(doc(db, "usersChats", uid), {
        [chatId]: {
          userInfo: {
            uid: currentUser.id,
            displayName: currentUser.name,
            photoURL: currentUser.avatar,
          },
        },
      });
    } else {
      await setDoc(doc(db, "usersChats", uid), {
        [chatId]: {
          userInfo: {
            uid: currentUser.id,
            displayName: currentUser.name,
            photoURL: currentUser.avatar,
          },
        },
      });
    }
    console.log("Created room");
    console.log("Chatroom was added");
    router.push(`chatroom/${chatId}`);
  };

  return (
    <div
      className="bg-white w-full p-2 rounded-lg flex items-center cursor-pointer"
      onClick={() => createChatRoom(uid)}
    >
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img className="h-full object-cover" src={photoURL || ""} alt="" />
      </div>
      <p className="text-gray-800 text-sm ml-4">{displayName}</p>
    </div>
  );
};

export default Friend;
