import { StyleSheet, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import { InputToolbar as GiftedChatInputToolBar } from 'react-native-gifted-chat';
import Animated, { FadeIn } from 'react-native-reanimated';

import AutoImage from '@/components/atoms/AutoImage';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useChatStore from '@/hooks/useChatStore.ts';
import useTheme from '@/hooks/useTheme.ts';

import { InputToolbarProps } from './types.ts';

const InputToolbar = ({ messageLoading, ...props }: InputToolbarProps) => {
  const { colors } = useTheme();
  const { selectedChat } = useChatStore();

  const computedStyles = StyleSheet.create({
    loadingContainer: {
      backgroundColor: colors.agentBubble,
    },
  });

  return (
    <View>
      {messageLoading && (
        <Animated.View entering={FadeIn} style={styles.loadingWrapper}>
          {selectedChat && <AutoImage source={selectedChat.chat.agentInfo.avatarUrl} style={styles.agentAvatar} />}

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
