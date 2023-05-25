interface IDataUser {
  name: string;
  email: string;
  password: string;
}

interface ICurrentUser {
  id: string;
  avatar: string | null;
  name: string | null;
}

interface IChatRoom {
  chatId: string;
  messages: IMessage[];
}

interface IMessage {
  id: string | undefined;
  message: string;
  createdAt: Timestamp;
}

interface IFriend {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  createChatRoom: (friendUserId: string) => Promise<void>;
}