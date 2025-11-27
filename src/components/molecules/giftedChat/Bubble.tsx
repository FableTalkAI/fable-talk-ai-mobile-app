import { StyleSheet } from 'react-native';
import { Bubble as GiftedChatBubble, BubbleProps, IMessage } from 'react-native-gifted-chat';

import { SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

const Bubble = (props: BubbleProps<IMessage>) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    leftBubbleWrapper: {
      backgroundColor: colors.agentBubble,
    },
    rightBubbleWrapper: {
      backgroundColor: colors.userBubble,
    },
    bubbleText: {
      color: colors.textLight,
    },
  });

  return (
    <GiftedChatBubble
      {...props}
      wrapperStyle={{
        left: computedStyles.leftBubbleWrapper,
        right: [styles.rightBubbleWrapper, computedStyles.rightBubbleWrapper],
      }}
      textStyle={{
        left: computedStyles.bubbleText,
        right: computedStyles.bubbleText,
      }}
    />
  );
};

const styles = StyleSheet.create({
  rightBubbleWrapper: {
    marginBottom: SPACING.xs,
  },
});

export default Bubble;
