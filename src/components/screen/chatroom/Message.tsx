import { useAuth } from "@/providers/useAuth";
import { DocumentData } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";


const Message: FC<{item: IMessage; friend: DocumentData}> = ({item, friend}) => {
  const { currentUser } = useAuth();
  const [myMessage, setMyMessage] = useState(false)

  useEffect(() => {
    if(item.id === friend.uid) {
      setMyMessage(false)
    } else {
      setMyMessage(true)
    }
  }, [])

  return (
    <>
      <div className="flex gap-4 mb-4">
        <div
          className={`w-14 h-14 rounded-full overflow-hidden ${
            myMessage ? "order-2" : ""
          }`}
        >
          <img
            className="h-full w-full object-cover"
            src={myMessage ? currentUser?.avatar : friend.photoURL}
            alt=""
          />
        </div>
        <p
          className={`text-gray-800 bg-white inline-block py-2 px-3 self-start rounded-lg border-2 border-accentColor ${
            myMessage ? "ml-auto order-1" : ""
          }`}
        >
          {item.message}
        </p>
      </div>
    </>
  );
};

export default Message;
