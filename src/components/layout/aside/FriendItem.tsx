
import Link from "next/link";
import React, { FC } from "react";

type TFriendItem = {
  chatId: string;
  userInfo: {
    photoURL: string;
    displayName: string;
    uid: string;
  };
}

const FriendItem: FC<TFriendItem> = ({chatId, userInfo}) => {

  return (
    <Link href={`/chatroom/${chatId}`}>
      <div className="mt-4 py-4 px-4 bg-second rounded-xl flex border-r-4 border-r-green-600">
        <div className="overflow-hidden w-[48px] h-[48px] rounded-full">
          <img
            className="h-full w-full object-cover"
            src={userInfo.photoURL}
            alt=""
          />
        </div>
        <div className="ml-4">
          <div className="text-lg">{userInfo.displayName}</div>
          <div className="text-sm opacity-25">Last massege...</div>
        </div>
      </div>
    </Link>
  );
};

export default FriendItem;
