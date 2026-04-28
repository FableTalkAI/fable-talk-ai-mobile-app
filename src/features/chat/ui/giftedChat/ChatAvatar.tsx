import { memo } from 'react';
import { AvatarProps, IMessage } from 'react-native-gifted-chat';

import { getChatAvatarUri } from '@/features/chat/services/getChatAvatarUri';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import Avatar from '@/shared/ui/Avatar/index.tsx';

const ChatAvatar = memo(({ currentMessage }: AvatarProps<IMessage>) => {
  const uri = getChatAvatarUri(currentMessage);
  const { profile, userAvatarFrame } = useProfileStore();

  if (!uri) return null;

  const isMe = currentMessage?.user._id === profile?.email;
  const frameSrc = isMe ? userAvatarFrame : undefined;

  return <Avatar uri={uri} size={36} isChangeable={false} frameUri={frameSrc} />;
});

export default ChatAvatar;
