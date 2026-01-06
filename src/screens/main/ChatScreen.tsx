import dayjs from 'dayjs';
import uk from 'dayjs/locale/uk';
import calendar from 'dayjs/plugin/calendar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Day, GiftedChat, IMessage } from 'react-native-gifted-chat';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Bubble, Composer, InputToolbar, Message, Send } from '@/components/molecules/giftedChat';
import ChatAvatar from '@/components/molecules/giftedChat/ChatAvatar.tsx';
import Header from '@/components/molecules/Header';
import { SPACING } from '@/core/constants/sizes.ts';
import useChatStore from '@/hooks/useChatStore.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';
import useTheme from '@/hooks/useTheme.ts';

dayjs.extend(calendar);

dayjs().calendar(dayjs('2008-01-01'));

const ChatScreen = () => {
  const chatWasUsed = useRef(false);
  const activeSendPromise = useRef<Promise<void> | null>(null);

  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const { selectedChat, sendMessageHandler, isLoading, getAllChatsHandler } = useChatStore();
  const { profile } = useProfileStore();

  const [messageHistory, setMessageHistory] = useState<IMessage[]>(selectedChat ? selectedChat.messageHistory : []);

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

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundTertiary,
      paddingTop: insets.top > SPACING.m ? 0 : SPACING.m,
      paddingBottom: insets.bottom > SPACING.m ? 0 : SPACING.m,
    },
  });

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
        locale={uk}
        // isDayAnimationEnabled={true}
        // dateFormatCalendar={{
        //   sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
        //   nextDay: '[Tomorrow at] h:mm A', // The next day ( Tomorrow at 2:30 AM )
        //   nextWeek: 'dddd [at] h:mm A', // The next week ( Sunday at 2:30 AM )
        //   lastDay: '[Yesterday at] h:mm A', // The day before ( Yesterday at 2:30 AM )
        //   lastWeek: '[Last] dddd [at] h:mm A', // Last week ( Last Monday at 2:30 AM )
        //   sameElse: 'DD/MM/YYYY', // Everything else ( 17/10/2011 )
        // }}
        dateFormat="DD.MM.YYYY"
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
