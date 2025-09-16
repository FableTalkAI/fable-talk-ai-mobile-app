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
      backgroundColor: colors.backgroundBase,
    },
    agentName: {
      color: colors.textPrimary,
    },
    lastMessage: {
      color: colors.textSecondary,
    },
  });

  return (
    <PressableCustom
      containerStyle={[styles.wrapper, computedStyles.wrapper]}
      style={styles.pressableContainer}
      onPress={onPress}
    >
      <AutoImage source={avatarSource} style={styles.avatar} />
      <View style={styles.messageContainer}>
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
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m,
    borderRadius: RADIUS.medium,
    boxShadow: BOX_SHADOW.medium,
  },
  pressableContainer: {
    flexDirection: 'row',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.circle,
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: SPACING.s,
  },
  nameAndPinContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
export default ChatListBar;
