import { StyleSheet } from 'react-native';
import { Send as GiftedChatSend } from 'react-native-gifted-chat';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { SendButtonIcon } from '@/assets/icons';
import { SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { SendProps } from './types.ts';

const Send = ({ messageLoading, ...props }: SendProps) => {
  const { colors } = useTheme();

  return (
    <GiftedChatSend {...props} isSendButtonAlwaysVisible={!messageLoading} containerStyle={[styles.send]}>
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <SendButtonIcon fill={colors.iconPrimary} />
      </Animated.View>
    </GiftedChatSend>
  );
};

const styles = StyleSheet.create({
  send: {
    right: SPACING.xl,
    position: 'absolute',
    bottom: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Send;
