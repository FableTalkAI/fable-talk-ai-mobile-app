import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { PinIcon, PinIconPinned } from '@/assets/icons';
import AutoImage from '@/components/atoms/AutoImage';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { BOX_SHADOW } from '@/core/constants/styles.ts';
import useTheme from '@/hooks/useTheme.ts';

import { ChatListBarProps } from './types.ts';

const ChatListBar = ({ agentName, lastMessage, avatarSource, onPress }: ChatListBarProps) => {
  const { colors } = useTheme();
  const [isPinned, setIsPinned] = useState(false);

  const computedStyles = StyleSheet.create({
    wrapper: {
      paddingHorizontal: SPACING.m,
      paddingVertical: SPACING.m,
      borderRadius: RADIUS.medium,
      backgroundColor: colors.backgroundBase,
      boxShadow: BOX_SHADOW.medium,
    },
    avatar: {
      borderRadius: RADIUS.circle,
    },
    messageContainer: {
      paddingHorizontal: SPACING.s,
    },
    agentName: {
      color: colors.textPrimary,
    },
    lastMessage: {
      color: colors.textSecondary,
    },
  });

  return (
    <PressableCustom containerStyle={[computedStyles.wrapper]} onPress={onPress}>
      <View style={styles.contentWrapper}>
        <AutoImage source={avatarSource} style={[styles.avatar, computedStyles.avatar]} />

        <View style={[styles.messageContainer, computedStyles.messageContainer]}>
          <View style={styles.nameAndPinContainer}>
            <TextCustom text={agentName} style={computedStyles.agentName} />

            <PressableCustom onPress={() => setIsPinned(prevState => !prevState)} hitSlop={10}>
              <Animated.View exiting={FadeOut} entering={FadeIn} key={`pin-icon-${isPinned}`}>
                {isPinned ? <PinIconPinned /> : <PinIcon />}
              </Animated.View>
            </PressableCustom>
          </View>

          <TextCustom
            text={lastMessage}
            numberOfLines={2}
            mode={TextModes.Secondary}
            style={computedStyles.lastMessage}
          />
        </View>
      </View>
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: 'row',
  },
  avatar: {
    width: 30,
    height: 30,
  },
  messageContainer: {
    flex: 1,
  },
  nameAndPinContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
export default ChatListBar;
