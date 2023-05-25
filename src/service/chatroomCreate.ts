import {
  collection,
  addDoc,
  Firestore
} from "firebase/firestore";

export const chatroomCreate = async (currentUserId: string, friendUserId: string, db: Firestore) => {
  let chatId = '';
  if(currentUserId && friendUserId) {
    chatId = friendUserId > currentUserId ? friendUserId + currentUserId : currentUserId + friendUserId
  }
  await addDoc(collection(db, 'chatRooms'), {
    combineId: chatId,
    messages: []
  });
  console.log('Created room')
}