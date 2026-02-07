import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';

import useUserStore from '@/features/profile/hooks/useUserStore.ts';
import { CheckmarkRoundedIcon, PinIcon, PinIconPinned } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import AutoImage from '@/shared/ui/AutoImage';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { ChatListBarProps } from './types.ts';

const ChatListBar = ({
  agentName,
  lastMessage,
  avatarSource,
  onPress,
  chatId,
  onLongPress,
  isSelected,
  isSelectMode,
}: ChatListBarProps) => {
  const { colors } = useTheme();
  const { pinnedChatIds, updatePinnedChatIdsHandler } = useUserStore();

  const isPinned = pinnedChatIds.includes(chatId);

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
      onLongPress={() => onLongPress?.(chatId)}
      onPress={onPress}
    >
      <View>
        <AutoImage source={avatarSource} style={styles.avatar} resizeMode="cover" />

        {isSelected && (
          <Animated.View entering={ZoomIn} exiting={ZoomOut} style={styles.checkMark}>
            <CheckmarkRoundedIcon width={20} height={20} />
          </Animated.View>
        )}
      </View>

      <View style={styles.messageContainer}>
        <View style={styles.nameAndPinContainer}>
          <TextCustom text={agentName} style={computedStyles.agentName} />

          <PressableCustom disabled={isSelectMode} onPress={() => updatePinnedChatIdsHandler(chatId)} hitSlop={10}>
            <Animated.View exiting={FadeOut} entering={FadeIn} key={`pin-icon-${isPinned}`}>
              {isPinned ? <PinIconPinned fill={colors.iconPrimary} /> : <PinIcon fill={colors.textPrimary} />}
            </Animated.View>
          </PressableCustom>
        </View>

        <TextCustom
          text={lastMessage.text}
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
    width: 45,
    height: 45,
    borderRadius: RADIUS.circle,
  },
  messageContainer: {
    flex: 1,
    marginLeft: SPACING.s,
  },
  nameAndPinContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  checkMark: {
    position: 'absolute',
    bottom: -5,
    right: -5,
  },
});

export default ChatListBar;
