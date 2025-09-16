import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatGPTLogo } from '@/assets/images';
import { Bubble, Composer, InputToolbar, Message, Send } from '@/components/molecules/giftedChat';
import Header from '@/components/molecules/Header';
import { SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

const ChatScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: ChatGPTLogo,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((m: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, m));
  }, []);

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundBase,
      paddingTop: insets.top > SPACING.m ? 0 : SPACING.m,
      paddingBottom: insets.bottom > SPACING.m ? 0 : SPACING.m,
    },
  });

  return (
    <SafeAreaView style={[computedStyles.container, styles.container]}>
      <Header title="Test" style={styles.header} />
      <GiftedChat
        messages={messages}
        onSend={chatMessages => onSend(chatMessages)}
        showUserAvatar
        user={{
          _id: 1,
          avatar: ChatGPTLogo,
        }}
        renderBubble={Bubble}
        renderMessage={Message}
        renderInputToolbar={InputToolbar}
        renderComposer={Composer}
        renderSend={Send}
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
