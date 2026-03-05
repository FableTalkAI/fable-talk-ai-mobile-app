import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import DeleteChatBottomWindow from '@/features/chat/ui/DeleteChatBottomWindow';
import EmptyChatStub from '@/features/chat/ui/EmptyChatStub';
import { Bubble, Composer, InputToolbar, Message, Send } from '@/features/chat/ui/giftedChat';
import ChatAvatar from '@/features/chat/ui/giftedChat/ChatAvatar.tsx';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useBottomWindow from '@/features/overlay/hooks/useBottomWindow';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { TrashBinIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import Header from '@/shared/ui/Header';
import PressableCustom from '@/shared/ui/PressableCustom';

dayjs.extend(calendar);

const ChatScreen = () => {
  const chatWasUsed = useRef(false);
  const activeSendPromise = useRef<Promise<void> | null>(null);

  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { navigation } = useNavigationRoutes();
  const insets = useSafeAreaInsets();

  const { selectedChat, sendMessageHandler, isLoading, getAllChatsHandler } = useChatStore();
  const { profile } = useProfileStore();

  const { open } = useBottomWindow();

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

  const deleteChatButtonHandler = useCallback(
    async (selectedChatId?: string) => {
      if (!selectedChatId) return;

      open(close => (
        <DeleteChatBottomWindow close={close} multiSelectionsChatIds={[selectedChatId]} onDelete={navigation.goBack} />
      ));
    },
    [navigation.goBack, open],
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

  const trashBin = useMemo(() => {
    if (!selectedChat || !selectedChat.chat.chatId) return null;

    return (
      <PressableCustom onPress={() => deleteChatButtonHandler(selectedChat.chat.chatId)}>
        <TrashBinIcon width={20} height={20} />
      </PressableCustom>
    );
  }, [deleteChatButtonHandler, selectedChat]);

  if (!selectedChat || !profile) return null;

  return (
    <SafeAreaView style={[computedStyles.container, styles.container]}>
      <Header title={selectedChat.chat.agentInfo.name} rightIcon={trashBin} />
      <GiftedChat
        messages={messageHistory}
        onSend={chatMessages => onSend(chatMessages)}
        renderAvatar={props => <ChatAvatar {...props} />}
        //@ts-ignore
        locale={i18n.resolvedLanguage}
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
        renderBubble={props => <Bubble {...props} />}
        renderMessage={props => <Message {...props} />}
        renderInputToolbar={props => <InputToolbar messageLoading={isLoading.sendMessage} {...props} />}
        renderComposer={props => <Composer {...props} />}
        renderSend={props => <Send messageLoading={isLoading.sendMessage} {...props} />}
        renderChatEmpty={() => (
          <EmptyChatStub
            description={selectedChat.chat.agentInfo.description}
            avatarUrl={selectedChat.chat.agentInfo.avatarUrl}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
