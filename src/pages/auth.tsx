import React, { FC, useEffect, useRef, useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "@/providers/useAuth";
import { uuidv4 } from "@firebase/util";

const auth: FC = () => {
  const [isRegUser, setIsRegUser] = useState(false);
  const [avatar, setAvatar] = useState<File>();
  const [dataUser, setDataUser] = useState<IDataUser>({
    name: "",
    email: "",
    password: "",
  } as IDataUser);
  const avatarRef = useRef<HTMLInputElement>(null);

  const auth = getAuth();
  const { db, storage, setCurrentUser} = useAuth();

  const route = useRouter();

  const [user, setUser] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     route.push("/");
  //   }
  // }, [user]);

  // Registration or Auth
  const userRegOrReg: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, uuidv4());
    const uploadTask = avatar && uploadBytesResumable(storageRef, avatar);

    if (isRegUser) {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          dataUser.email,
          dataUser.password
        );
        await updateProfile(res.user, {
          displayName: dataUser.name,
        });
        if (uploadTask) {
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {},
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  await updateProfile(res.user, {
                    photoURL: downloadURL,
                  });
                  console.log("Avatar done!");
                  const { uid, displayName, email, photoURL } = res.user;
                  setCurrentUser({name: displayName, id: uid, avatar: photoURL})
                  await setDoc(doc(db, "users", res.user.uid), {
                    uid,
                    displayName,
                    email,
                    photoURL,
                  });
                }
              );
            }
          );
        }
        route.push("/");
        setUser(true);
      } catch (error: any) {
        alert(error?.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(
          auth,
          dataUser.email,
          dataUser.password
        );
        setUser(true);
      } catch (error: any) {
        alert(error?.message);
      }
    }
  };
  const addAvatar: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.files && setAvatar(e.target.files[0]);
  };
  const addAvatarRef = () => {
    avatarRef?.current?.click();
  };

  return (
    <div className="flex h-[100vh] items-center justify-center">
      <form
        onSubmit={userRegOrReg}
        className="bg-secondColor p-6 rounded-xl w-[450px]"
        action=""
      >
        <h2 className="text-center text-2xl">Sign In</h2>
        <input
          className="block text-gray-800 w-full mt-4 rounded-md py-2 px-3
          placeholder:text-xs placeholder:text-opacity-25"
          placeholder="Your name"
          type="text"
          value={dataUser.name}
          onChange={(e) => setDataUser({ ...dataUser, name: e.target.value })}
        />
        <input
          className="block text-gray-800 w-full mt-4 rounded-md py-2 px-3
          placeholder:text-xs placeholder:text-opacity-25"
          placeholder="Your email"
          type="email"
          value={dataUser.email}
          onChange={(e) => setDataUser({ ...dataUser, email: e.target.value })}
        />
        <input
          className="block text-gray-800 w-full mt-4 rounded-md py-2 px-3 placeholder:text-xs placeholder:text-opacity-25"
          placeholder="Your password"
          type="text"
          value={dataUser.password}
          onChange={(e) =>
            setDataUser({ ...dataUser, password: e.target.value })
          }
        />
        <div className="flex justify-between items-center mt-4">
          <input
            onChange={(e) => addAvatar(e)}
            ref={avatarRef}
            className="hidden"
            type="file"
          />
          <span
            onClick={addAvatarRef}
            className="border text-base px-8 py-2 border-accentColor inline-block cursor-pointer"
          >
            Choose Avatar image
          </span>
          <span className="">{"Image will be < 2Mb"}</span>
        </div>
        <button
          className="block mt-4 bg-accentColor w-full p-3 rounded-md cursor-pointer"
          type="submit"
          onClick={() => setIsRegUser((prev) => false)}
        >
          Sign In
        </button>
        <button
          className="block mt-4 w-full underline text-accentColor cursor-pointer"
          type="submit"
          onClick={() => setIsRegUser((prev) => true)}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default auth;
