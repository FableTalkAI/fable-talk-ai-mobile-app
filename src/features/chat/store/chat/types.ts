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
  isLoadingMore: boolean;
  isSending: boolean;
  error: string | null;
  nextCursor: string | null;
  hasMore: boolean;
};

export type GetChatByIdRequest = {
  agentId: string;
  chatId?: string;
  cursor?: string | null;
  limit?: number;
};

export type GetChatByIdResponse = {
  chat: Chat;
  messageHistory: Message[];
  nextCursor: string;
  hasMore: boolean;
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

export type UpdateChatListLastMessage = {
  message: Message;
  agentId: string;
};
