import { useAuth } from "@/providers/useAuth";
import { chatroomCreate } from "@/service/chatroomCreate";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Friend from "./Friend";

const SearchFriend: FC = () => {
  const [users, setUsers] = useState<IFriend[]>([]);
  const [value, setValue] = useState("");
  const { db } = useAuth();

  useEffect(() => {
    if (value == "") {
      setUsers([]);
      return;
    }
    const collRef = collection(db, "users");
    const q = query(
      collRef,
      where("displayName", ">=", value),
      where("displayName", "<=", value + "\uf8ff")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const p: IFriend[] = [];
      querySnapshot.forEach((doc) => {
        p.unshift(doc.data() as IFriend);
      });
      setUsers(p);
    });

    return () => unsubscribe();
  }, [value]);

  return (
    <>
      <div className="ml-auto mr-4 py-2 px-3 bg-white rounded-lg border-2 border-accentColor flex items-center relative">
        <input
          className="flex-1 text-gray-800 outline-none"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <FiSearch className="text-accentColor" />

        <div
          className="absolute z-10 top-12
        left-0 w-full flex flex-col gap-2"
        >
          {users &&
            users.map((user) => {
              return (
                <Friend {...user}/>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SearchFriend;
