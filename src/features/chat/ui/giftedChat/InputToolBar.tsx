import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import { InputToolbar as GiftedChatInputToolBar } from 'react-native-gifted-chat';
import Animated, { FadeIn } from 'react-native-reanimated';

import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import AutoImage from '@/shared/ui/AutoImage';

import { InputToolbarProps } from './types.ts';

const InputToolbar = ({ messageLoading, ...props }: InputToolbarProps) => {
  const { colors } = useTheme();
  const { selectedChat } = useChatStore();

  const computedStyles = StyleSheet.create({
    loadingContainer: {
      backgroundColor: colors.agentBubble,
    },
  });

  const avatarSource = useMemo(() => selectedChat && selectedChat.chat.agentInfo.avatarUrl, [selectedChat]);

  return (
    <View>
      {messageLoading && (
        <Animated.View entering={FadeIn} style={styles.loadingWrapper}>
          {avatarSource && <AutoImage source={avatarSource} style={styles.agentAvatar} resizeMode="cover" />}

          <View style={[styles.loadingContainer, computedStyles.loadingContainer]}>
            <Flow size={36} color={colors.textLight} />
          </View>
        </Animated.View>
      )}

      <GiftedChatInputToolBar {...props} containerStyle={styles.inputToolbar} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputToolbar: {
    borderTopWidth: 0,
  },
  loadingWrapper: {
    flexDirection: 'row',
    marginLeft: SPACING.xs,
    gap: SPACING.xs,
  },
  loadingContainer: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: RADIUS.small,
    width: 68,
  },
  agentAvatar: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.circle,
  },
});

export default InputToolbar;
