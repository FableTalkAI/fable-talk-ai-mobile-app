export type ChatState = {
  chats: Required<Chat>[];
  selectedChat: GetChatByIdResponse | null;
  multiSelectionsChatIds: string[];
  loading: {
    chats: boolean;
    selectedChat: boolean;
    sendMessage: boolean;
    deleteChat: boolean;
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

export type deleteChatRequest = {
  chatIds: string[];
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
    avatar: string;
  };
};
