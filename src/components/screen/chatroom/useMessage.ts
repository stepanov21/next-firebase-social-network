import React, { useEffect, useState } from 'react'

const useMessage = () => {

  const [myMessage, setMyMessage] = useState(false)

  useEffect(() => {
    if(item.id === friend.uid) {
      setMyMessage(false)
    } else {
      setMyMessage(true)
    }
  }, [])

  return [myMessage]
}

export default useMessage