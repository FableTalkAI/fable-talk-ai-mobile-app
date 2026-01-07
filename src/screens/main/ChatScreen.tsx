import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Bubble, Composer, InputToolbar, Message, Send } from '@/components/molecules/giftedChat';
import ChatAvatar from '@/components/molecules/giftedChat/ChatAvatar.tsx';
import Header from '@/components/molecules/Header';
import { DEVICE_LANGUAGE } from '@/core/constants/device.ts';
import { SPACING } from '@/core/constants/sizes.ts';
import useChatStore from '@/hooks/useChatStore.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';
import useTheme from '@/hooks/useTheme.ts';

dayjs.extend(calendar);

const ChatScreen = () => {
  const chatWasUsed = useRef(false);
  const activeSendPromise = useRef<Promise<void> | null>(null);

  const { colors } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const { selectedChat, sendMessageHandler, isLoading, getAllChatsHandler } = useChatStore();
  const { profile } = useProfileStore();

  const [messageHistory, setMessageHistory] = useState<IMessage[]>(selectedChat ? selectedChat.messageHistory : []);

  const dateFormatCalendar = {
    sameDay: t('chat.sameDay'),
    nextDay: t('chat.nextDay'),
    nextWeek: 'dddd',
    lastDay: t('chat.lastDay'),
    lastWeek: 'dddd',
    sameElse: 'dddd',
  };

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundTertiary,
      paddingTop: insets.top > SPACING.m ? 0 : SPACING.m,
      paddingBottom: insets.bottom > SPACING.m ? 0 : SPACING.m,
    },
  });

  const onSend = useCallback(
    async (m: IMessage[] = []) => {
      if (!chatWasUsed.current) {
        chatWasUsed.current = true;
      }

      setMessageHistory(previousMessages => GiftedChat.append(previousMessages, m));
      activeSendPromise.current = (async () => {
        const agentAnswer = await sendMessageHandler(m[0].text);
        setMessageHistory(prev => GiftedChat.append(prev, [agentAnswer]));
      })();
    },
    [sendMessageHandler],
  );

  useEffect(() => {
    return () => {
      if (!chatWasUsed.current) return;

      const waitAndFetch = async () => {
        if (activeSendPromise.current) {
          await activeSendPromise.current;
        }
        await getAllChatsHandler();
      };

      waitAndFetch().catch(console.error);
    };
  }, [getAllChatsHandler]);

  if (!selectedChat || !profile) return null;

  return (
    <SafeAreaView style={[computedStyles.container, styles.container]}>
      <Header title={selectedChat.chat.agentInfo.name} style={styles.header} />
      <GiftedChat
        messages={messageHistory}
        onSend={chatMessages => onSend(chatMessages)}
        renderAvatar={props => <ChatAvatar {...props} />}
        //@ts-ignore
        locale={DEVICE_LANGUAGE}
        isDayAnimationEnabled={false}
        dateFormatCalendar={dateFormatCalendar}
        dateFormat="D MMMM YYYY"
        timeFormat="HH:mm"
        isUserAvatarVisible
        isSendButtonAlwaysVisible
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
