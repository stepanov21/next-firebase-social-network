import { useAuth } from "@/providers/useAuth";
import { uuidv4 } from "@firebase/util";
import {
  serverTimestamp,
  collection,
  addDoc
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

import React, { FC, useEffect, useRef, useState } from "react";

const Main: FC = () => {
  const [value, setValue] = useState("");
  const [image, setImage] = useState<File>();
  const refFile = useRef<HTMLInputElement>(null);
  const [prevImg, setPrevImg] = useState("");

  const { currentUser, db, storage } = useAuth();

  useEffect(() => {
    if (!image) return;
    // create the preview
    const objectUrl = URL.createObjectURL(image);
    setPrevImg(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const addPost: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    const storageRef = ref(storage, uuidv4());
    const uploadTask = image && uploadBytesResumable(storageRef, image);
    e.preventDefault();
    try {
      if (uploadTask) {
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await addDoc(collection(db, 'posts'), {
                  author: {
                    id: currentUser?.id,
                    name: currentUser?.name,
                    avatar: currentUser?.avatar,
                  },
                  image: downloadURL,
                  content: value,
                  createdAt: serverTimestamp(),
                });
                console.log("File available at", downloadURL);
              }
            );
          }
        );
      } else {
        await addDoc(collection(db, 'posts'), {
          author: {
            id: currentUser?.id,
            name: currentUser?.name,
            avatar: currentUser?.avatar,
          },
          image: null,
          content: value,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      alert(error);
    }
    setValue("");
    setPrevImg("");
  };

  const addImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.files && setImage(e.target.files[0]);
  };

  const handleClick = () => {
    refFile?.current?.click();
  };

  return (
    <div className="">
      <form action="" className="relative">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Text something..."
          className="w-full h-[54px] py-2 px-4 pr-32 rounded-lg border-2 border-accentColor bg-transparent placeholder:text-accentColor outline-none"
        />
        <button
          onClick={(e) => addPost(e)}
          type="submit"
          className="h-[54px] absolute bottom-0 top-0 right-0 bg-accentColor px-6 rounded-lg cursor-pointer"
        >
          Send
        </button>
        <svg
          onClick={handleClick}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-image absolute bottom-0 top-[14px] right-24 cursor-pointer"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <input
          ref={refFile}
          onChange={(e) => addImage(e)}
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
        />
      </form>
      {prevImg && <img src={prevImg} alt="" className="w-36 mt-4 rounded-xl" />}
    </div>
  );
};

export default Main;
function uuid(): any {
  throw new Error("Function not implemented.");
}

