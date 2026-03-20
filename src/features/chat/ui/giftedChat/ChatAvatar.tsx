import { memo } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { AvatarProps, IMessage } from 'react-native-gifted-chat';

import { getChatAvatarUri } from '@/features/chat/services/getChatAvatarUri';

const ChatAvatar = memo(({ currentMessage }: AvatarProps<IMessage>) => {
  const uri = getChatAvatarUri(currentMessage);

  if (!uri) return null;

  return (
    <FastImage
      source={{
        uri,
        cache: FastImage.cacheControl.immutable,
        priority: FastImage.priority.normal,
      }}
      style={styles.avatar}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
});

const styles = StyleSheet.create({
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
  },
});

export default ChatAvatar;
