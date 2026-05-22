import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import { InputToolbar as GiftedChatInputToolBar } from 'react-native-gifted-chat';
import Animated, { FadeIn } from 'react-native-reanimated';

import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import useTheme from '@/shared/hooks/useTheme';
import { UseThemeParams } from '@/shared/hooks/useTheme/types.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import AutoImage from '@/shared/ui/AutoImage';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { CustomInputToolbarProps } from './types.ts';

const InputToolbar = ({ themeMode, ...props }: CustomInputToolbarProps & UseThemeParams) => {
  const { colors } = useTheme({ themeMode });
  const { selectedChat } = useChatStore();

  const computedStyles = StyleSheet.create({
    loadingContainer: {
      backgroundColor: colors.agentBubble,
    },
    suggestionContainer: {
      backgroundColor: colors.userBubble,
    },
  });

  const handleSuggestionPress = (text: string) => {
    if (props.onSend) {
      props.onSend(
        [
          {
            text: text,
          },
        ] as any,
        true,
      );
    }
  };

  const avatarSource = useMemo(() => selectedChat && selectedChat.chat?.agentInfo.avatarUrl, [selectedChat]);

  return (
    <View>
      {selectedChat?.isSending && (
        <Animated.View entering={FadeIn} style={styles.loadingWrapper}>
          {avatarSource && <AutoImage source={avatarSource} style={styles.agentAvatar} resizeMode="cover" />}

          <View style={[styles.loadingContainer, computedStyles.loadingContainer]}>
            <Flow size={36} color={colors.textLight} />
          </View>
        </Animated.View>
      )}

      {selectedChat?.suggestions && !selectedChat.isSending && (
        <FlatList
          data={selectedChat.suggestions}
          style={styles.suggestionsWrapper}
          contentContainerStyle={styles.suggestionsContentContainer}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <PressableCustom
              containerStyle={[styles.suggestionContainer, computedStyles.suggestionContainer]}
              onPress={() => handleSuggestionPress(item)}
            >
              <TextCustom mode={TextModes.Secondary}>{item}</TextCustom>
            </PressableCustom>
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
    paddingBottom: 104,
    marginTop: -104,
  },
  loadingContainer: {
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: RADIUS.small,
    width: 68,
  },
  suggestionsWrapper: {
    paddingBottom: 74,
    marginTop: -104,
    paddingVertical: SPACING.s,
  },
  suggestionsContentContainer: {
    gap: SPACING.xs,
    marginLeft: SPACING.lg,
  },
  suggestionContainer: {
    borderRadius: RADIUS.medium,
    borderWidth: 1,
    padding: SPACING.xs,
  },
  agentAvatar: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.circle,
  },
});

export default InputToolbar;
