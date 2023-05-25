import Layout from "@/components/layout/Layout";
import Messages from "@/components/screen/chatroom/Messages";
import { useAuth } from "@/providers/useAuth";
import {
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";


const id: FC = () => {
  const [content, setContent] = useState("");

  const router = useRouter();
  const { id } = router.query;

  const { db, currentUser } = useAuth();


  const addMessage: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if(!id) return;
    try {
      await updateDoc(doc(db, "chatRooms", id+''), {
        messages: arrayUnion({
          id: currentUser?.id,
          message: content
        })
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout>
      <div className="h-[100%] flex flex-col gap-4">
        <div className='flex-1'>
          {typeof id === 'string' ? <Messages chatId={id}/> : null}
        </div>
        <form
          className="bg-white flex h-[54px] border-2 border-accentColor rounded-xl overflow-hidden"
          onSubmit={(e) => addMessage(e)}
        >
          <input
            className="bg-white flex-1 pl-4 text-gray-800 outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder="Write your message..."
          />
          <button type="submit" className="p-2 w-[54px] rounded-lg text-lg flex justify-center items-center bg-accentColor">
            <RiSendPlaneFill className="text-white" />
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default id;
