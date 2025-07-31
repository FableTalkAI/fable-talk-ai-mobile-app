import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { PinIcon, PinIconPinned } from '@/assets/icons';
import AutoImage from '@/components/atoms/AutoImage';
import PressableCustom from '@/components/atoms/PressableCustom';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { ChatListBarProps } from '@/components/molecules/ChatListBar/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

const ChatListBar = ({ agentName, lastMessage, avatarSource, onPress }: ChatListBarProps) => {
  const { colors } = useTheme();
  const [isPinned, setIsPinned] = useState(false);

  const computedStyles = StyleSheet.create({
    shadowStyle: {
      paddingHorizontal: SPACING.m,
      paddingVertical: SPACING.m,
      borderRadius: RADIUS.medium,
      backgroundColor: colors.backgroundBase,
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
  });

  return (
    <PressableCustom onPress={onPress}>
      <ShadowCustom mode="medium" style={[styles.shadowStyle, computedStyles.shadowStyle]}>
        <AutoImage source={avatarSource} style={[styles.avatar, computedStyles.avatar]} />

        <View style={[styles.messageContainer, computedStyles.messageContainer]}>
          <View style={styles.nameAndPinContainer}>
            <TextCustom text={agentName} style={computedStyles.agentName} />

            <PressableCustom
              style={styles.pinContainer}
              onPress={() => setIsPinned(prevState => !prevState)}
              hitSlop={10}
            >
              <Animated.View exiting={FadeOut} entering={FadeIn} key={`pin-icon-${isPinned}`}>
                {isPinned ? <PinIconPinned /> : <PinIcon />}
              </Animated.View>
            </PressableCustom>
          </View>

          <TextCustom text={lastMessage} numberOfLines={2} />
        </View>
      </ShadowCustom>
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  shadowStyle: {
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
  pinContainer: {
    width: 16,
  },
});
export default ChatListBar;
