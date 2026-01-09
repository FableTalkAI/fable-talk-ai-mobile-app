import { Message } from '@/features/chat/store/chat/types.ts';

export type ChatListBarProps = {
  chatId: string;
  agentName: string;
  lastMessage: Message;
  avatarSource: string;
  onPress?: () => void;
};
