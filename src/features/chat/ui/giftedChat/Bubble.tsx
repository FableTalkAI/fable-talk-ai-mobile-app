import { StyleSheet } from 'react-native';
import { Bubble as GiftedChatBubble, BubbleProps, IMessage } from 'react-native-gifted-chat';

import useTheme from '@/shared/hooks/useTheme';
import { UseThemeParams } from '@/shared/hooks/useTheme/types.ts';
import { SPACING } from '@/shared/model/sizes.ts';

const Bubble = ({ wrapperStyle, textStyle, themeMode, ...props }: BubbleProps<IMessage> & UseThemeParams) => {
  const { colors } = useTheme({ themeMode });

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
        left: [computedStyles.leftBubbleWrapper, wrapperStyle?.left],
        right: [styles.rightBubbleWrapper, computedStyles.rightBubbleWrapper, wrapperStyle?.right],
      }}
      textStyle={{
        left: [computedStyles.bubbleText, textStyle?.left],
        right: [computedStyles.bubbleText, textStyle?.right],
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
