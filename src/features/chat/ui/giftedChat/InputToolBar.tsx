import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import { InputToolbar as GiftedChatInputToolBar } from 'react-native-gifted-chat';
import Animated, { FadeIn } from 'react-native-reanimated';

import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import { getChatPadding } from '@/features/chat/services/getChatPadding.ts';
import useTheme from '@/shared/hooks/useTheme';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import AutoImage from '@/shared/ui/AutoImage';
import ComponentLoader from '@/shared/ui/ComponentLoader';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { CustomInputToolbarProps } from './types.ts';

const InputToolbar = ({ themeMode, withSuggestions = true, ...props }: CustomInputToolbarProps) => {
  const { colors } = useTheme({ themeMode });
  const { selectedChat } = useChatStore();

  const computedStyles = StyleSheet.create({
    loadingContainer: {
      backgroundColor: colors.agentBubble,
    },
    suggestionContainer: {
      backgroundColor: colors.userBubble,
    },
    loadingWrapper: {
      paddingBottom: getChatPadding(selectedChat?.isSending, !!selectedChat?.suggestions),
      marginTop: -getChatPadding(selectedChat?.isSending, !!selectedChat?.suggestions),
    },
  });

  const handleSuggestionPress = (text: string) => {
    props.onSend?.(
      [
        {
          text: text,
        },
      ] as any,
      true,
    );
  };

  const avatarSource = useMemo(() => selectedChat && selectedChat.chat?.agentInfo.avatarUrl, [selectedChat]);

  return (
    <View>
      {selectedChat?.isSending && (
        <Animated.View entering={FadeIn} style={[styles.loadingWrapper, computedStyles.loadingWrapper]}>
          {avatarSource && <AutoImage source={avatarSource} style={styles.agentAvatar} resizeMode="cover" />}

          <View style={[styles.loadingContainer, computedStyles.loadingContainer]}>
            <Flow size={36} color={colors.textLight} />
          </View>
        </Animated.View>
      )}

      {selectedChat?.suggestions && withSuggestions && (
        <FlatList
          data={selectedChat.suggestions}
          style={styles.suggestionsWrapper}
          contentContainerStyle={styles.suggestionsContentContainer}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <View style={styles.suggestionButtonWrapper}>
              <PressableCustom
                disabled={selectedChat?.isSending}
                containerStyle={[styles.suggestionContainer, computedStyles.suggestionContainer]}
                onPress={() => handleSuggestionPress(item)}
              >
                <TextCustom mode={TextModes.Secondary}>{item}</TextCustom>
              </PressableCustom>

              <ComponentLoader isVisible={selectedChat?.isSending} />
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
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
  suggestionsWrapper: {
    marginTop: -110,
    paddingBottom: 74,
    zIndex: 1,
  },
  suggestionsContentContainer: {
    gap: SPACING.xs,
    paddingHorizontal: SPACING.m,
  },
  suggestionButtonWrapper: {
    overflow: 'hidden',
    borderRadius: RADIUS.medium,
  },
  suggestionContainer: {
    borderRadius: RADIUS.medium,
    padding: SPACING.xs,
    boxShadow: BOX_SHADOW.base,
  },
  agentAvatar: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.circle,
  },
});

export default InputToolbar;
