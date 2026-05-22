import { AgentAccessLevel } from '@/features/agents/store/agents/types.ts';
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
  suggestions: DialogueSuggestions | null;
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
    accessLevel: AgentAccessLevel;
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

export type DialogueSuggestions = string[];

export type SendMessageResponse = {
  message: Message;
  suggestions: DialogueSuggestions | null;
  limits?: UserLimits;
};

export type SendMessageRequest = {
  message: string;
  agentId: string;
  isPremium: boolean;
};

export type UpdateChatListLastMessage = {
  message: Message;
  agentId: string;
};
