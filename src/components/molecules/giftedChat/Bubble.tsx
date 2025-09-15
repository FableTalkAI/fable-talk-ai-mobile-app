import { StyleSheet } from 'react-native';
import { Bubble as GiftedChatBubble, BubbleProps, IMessage } from 'react-native-gifted-chat';

import useTheme from '@/hooks/useTheme.ts';

const Bubble = (props: BubbleProps<IMessage>) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    leftBubbleWrapper: {
      backgroundColor: colors.gray10,
    },
    rightBubbleWrapper: {
      backgroundColor: colors.primary10,
    },
    bubbleText: {
      color: colors.textPrimary,
    },
  });

  return (
    <GiftedChatBubble
      {...props}
      wrapperStyle={{
        left: computedStyles.leftBubbleWrapper,
        right: computedStyles.rightBubbleWrapper,
      }}
      textStyle={{
        left: computedStyles.bubbleText,
        right: computedStyles.bubbleText,
      }}
    />
  );
};

export default Bubble;
