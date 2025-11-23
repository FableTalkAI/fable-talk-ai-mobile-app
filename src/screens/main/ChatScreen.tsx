import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Bubble, Composer, InputToolbar, Message, Send } from '@/components/molecules/giftedChat';
import Header from '@/components/molecules/Header';
import { SPACING } from '@/core/constants/sizes.ts';
import useChatStore from '@/hooks/useChatStore.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';
import useTheme from '@/hooks/useTheme.ts';

const ChatScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { selectedChat, sendMessageHandler, isLoading } = useChatStore();
  const { profile } = useProfileStore();

  const [messageHistory, setMessageHistory] = useState<IMessage[]>(selectedChat ? selectedChat.messageHistory : []);

  const onSend = useCallback(
    async (m: IMessage[] = []) => {
      setMessageHistory(previousMessages => GiftedChat.append(previousMessages, m));
      const agentAnswer = await sendMessageHandler(m[0].text);
      setMessageHistory(previousMessages => GiftedChat.append(previousMessages, [agentAnswer]));
    },
    [sendMessageHandler],
  );

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundBase,
      paddingTop: insets.top > SPACING.m ? 0 : SPACING.m,
      paddingBottom: insets.bottom > SPACING.m ? 0 : SPACING.m,
    },
  });

  if (!selectedChat || !profile) return null;

  return (
    <SafeAreaView style={[computedStyles.container, styles.container]}>
      <Header title={selectedChat.chat.agentInfo.name} style={styles.header} />
      <GiftedChat
        messages={messageHistory}
        onSend={chatMessages => onSend(chatMessages)}
        showUserAvatar
        alwaysShowSend
        user={{
          _id: profile.email,
          avatar: profile.avatarUrl,
        }}
        renderBubble={Bubble}
        renderMessage={Message}
        renderInputToolbar={props => <InputToolbar messageLoading={isLoading.sendMessage} {...props} />}
        renderComposer={props => <Composer {...props} />}
        renderSend={props => <Send messageLoading={isLoading.sendMessage} {...props} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
  },
});

export default ChatScreen;
