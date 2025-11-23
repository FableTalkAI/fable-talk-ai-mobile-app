export type ChatState = {
  chats: Chat[];
  selectedChat: GetChatByIdResponse | null;
  loading: {
    chats: boolean;
    selectedChat: boolean;
    sendMessage: boolean;
  };
};

export type GetChatByIdRequest = {
  agentId: string;
  chatId?: string;
};

export type GetChatByIdResponse = {
  chat: Chat;
  messageHistory: Message[];
};

export type Chat = {
  agentInfo: {
    id: string;
    avatarUrl: string;
    name: string;
    accessLevel: string;
    ageRestriction: string;
  };
  lastMessage: Message;
  isPinned: boolean;
  chatId?: string;
};

export type Message = {
  _id: string;
  text: string;
  createdAt: number;
  user: {
    _id: string;
  };
};
