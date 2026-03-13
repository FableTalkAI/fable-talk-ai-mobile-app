import { UserLimits } from '@/features/profile/store/profile/types.ts';

export type ChatState = {
  chats: Required<Chat>[];
  chatsEntities: Record<string, ChatDetails>;
  selectedChatId: string | null;
  loading: {
    chats: boolean;
    deleteChat: boolean;
  };
};

export type ChatDetails = {
  messageHistory: Message[];
  chat?: Chat;
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
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
    description: string;
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

export type SendMessageResponse = {
  limits?: UserLimits;
} & Message;

export type SendMessageRequest = {
  message: string;
  agentId: string;
};
