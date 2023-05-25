import { IPost } from "@/pages";
import Image from "next/image";
import React, { FC } from "react";

const Post: FC<IPost> = ({ author, image, content, createdAt }) => {
  const postDate: number = +createdAt?.seconds;
  const nowDate = new Date().getTime() / 1000;
  
  const postDateCreate = Math.floor((nowDate - postDate) / 60)

  let timeElem;
  if(postDateCreate < 1 || isNaN(postDateCreate)) {
    timeElem = 'Добавлено только что'
  } else if(postDateCreate > 1 && postDate < 60) {
    timeElem = `Добавлено ${postDateCreate} минут назад`
  } else if(postDateCreate >=60 && postDateCreate < 1440) {
    timeElem = 'Добавлено более часа назад'
  } else {
    timeElem = 'Добавлено более суток назад'
  }

  return (
    <div className="mt-4 p-4 rounded-lg border-2 border-gray-500">
      <div className="flex items-center">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={author.avatar || 'https://img.freepik.com/free-photo/dreamy-young-woman-sunglasses-looking-front_197531-16739.jpg'}
            alt="jklkj"
          />
        </div>
        <h4 className="ml-4 text-xl">{author?.name}</h4>
        <p className="ml-auto">{timeElem}</p>
      </div>
      {image && (
        <div className="h-[300px] mt-4 overflow-hidden rounded-lg flex justify-center items-center">
      <img className="object-cover h-full w-full" src={image} alt="" />
        </div>
      )}
      {content && <div className="pt-4">{content}</div>}
    </div>
  );
};

export default Post;
