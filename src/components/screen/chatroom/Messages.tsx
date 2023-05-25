import { useAuth } from '@/providers/useAuth';
import { doc, DocumentData, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Message from './Message';


const Messages = ({chatId} : {chatId: string}) => {
  const [messages, setMessages] = useState<IMessage[]>([] as IMessage[]);
  const [friend, setFriend] = useState<DocumentData>()

  const { db, currentUser } = useAuth()
  useEffect(() => {
    if(!chatId) return
    const unsub = onSnapshot(doc(db, 'chatRooms', chatId), (doc) => {
      const res = doc.data()
      setMessages(res?.messages)
    })
    return () => unsub()
  }, [])

  useEffect(() => {

    if(!chatId || !currentUser) return

    const friendId = chatId.replace(currentUser?.id, '')

    if(currentUser?.id === friendId) return

    const getFriend = async() => {
      const res = await getDoc(doc(db, 'users', friendId))
      setFriend(res.data())
    }
    
    getFriend()
  }, []);

  return (
    <div className=''>
      {messages && friend ? messages.map(item => {
        return <Message item={item} friend={friend}/>
      }) : null}
    </div>
  )
}

export default Messages