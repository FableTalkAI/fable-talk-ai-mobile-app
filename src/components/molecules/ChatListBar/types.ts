import { Message } from '@/store/chat/types.ts';

export type ChatListBarProps = {
  agentName: string;
  lastMessage: Message;
  avatarSource: string;
  onPress?: () => void;
};
