import { IMessage } from 'react-native-gifted-chat';

export const getChatAvatarUri = (message?: IMessage): string | undefined => {
  const avatar = message?.user?.avatar;

  if (typeof avatar === 'string') {
    return avatar;
  }

  if (typeof message?.image === 'string') {
    return message.image;
  }

  return undefined;
};
