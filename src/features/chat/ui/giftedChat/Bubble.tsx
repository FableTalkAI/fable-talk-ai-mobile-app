import { StyleSheet } from 'react-native';
import { Bubble as GiftedChatBubble, BubbleProps, IMessage } from 'react-native-gifted-chat';

import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';

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
      color: colors.textPrimary,
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
