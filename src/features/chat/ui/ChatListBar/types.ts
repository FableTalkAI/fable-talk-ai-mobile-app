import { Message } from '@/features/chat/store/chat/types.ts';

export type ChatListBarProps = {
  chatId: string;
  agentName: string;
  lastMessage: Message;
  avatarSource: string;
  isSelected?: boolean;
  onLongPress?: (chatId: string) => void;
  onPress?: () => void;
  isSelectMode?: boolean;
};
