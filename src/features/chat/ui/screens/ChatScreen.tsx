import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AgentAccessLevel } from '@/features/agents/store/agents/types.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import { loadMoreMessages } from '@/features/chat/store/chat/thunks.ts';
import DeleteChatBottomWindow from '@/features/chat/ui/DeleteChatBottomWindow';
import EmptyChatStub from '@/features/chat/ui/EmptyChatStub';
import { Bubble, Composer, InputToolbar, Message, Send } from '@/features/chat/ui/giftedChat';
import ChatAvatar from '@/features/chat/ui/giftedChat/ChatAvatar.tsx';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useBottomWindow from '@/features/overlay/hooks/useBottomWindow';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import useSubscription from '@/features/subscriptions/hooks/useSubscription';
import { TrashBinIcon } from '@/shared/assets/icons';
import { useAppDispatch } from '@/shared/hooks/reduxHooks.ts';
import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import Header from '@/shared/ui/Header';
import PressableCustom from '@/shared/ui/PressableCustom';
import ScreenLoader from '@/shared/ui/ScreenLoader';

dayjs.extend(calendar);

const ChatScreen = () => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { navigation } = useNavigationRoutes();
  const { top, bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const { selectedChat, sendMessageHandler } = useChatStore();
  const { profile, chatsLimitExceeded, chatsLimitNeedUpdate } = useProfileStore();
  const { checkPremiumHandler } = useSubscription();

  const { open } = useBottomWindow();

  const dateFormatCalendar = useMemo(
    () => ({
      sameDay: t('chat.sameDay'),
      nextDay: t('chat.nextDay'),
      nextWeek: 'dddd',
      lastDay: t('chat.lastDay'),
      lastWeek: 'dddd',
      sameElse: 'dddd',
    }),
    [t],
  );

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundTertiary,
      paddingTop: top > SPACING.m ? 0 : SPACING.m,
      paddingBottom: bottom > SPACING.m ? 0 : SPACING.m,
    },
  });

  const onSend = useCallback(
    async (m: IMessage[] = []) =>
      checkPremiumHandler({
        skipCheck:
          (!chatsLimitExceeded || chatsLimitNeedUpdate) &&
          selectedChat?.chat?.agentInfo.accessLevel === AgentAccessLevel.Free,
        modalTitleKey: chatsLimitExceeded ? 'limitExceeded' : 'messagePremiumAgent',
        func: async () => {
          if (selectedChat && selectedChat.chat && profile) {
            await sendMessageHandler({
              message: m[0].text,
              agentId: selectedChat.chat.agentInfo.id,
              ...profile,
            });
          }
        },
      }),
    [checkPremiumHandler, chatsLimitExceeded, chatsLimitNeedUpdate, selectedChat, profile, sendMessageHandler],
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

  const trashBin = useMemo(() => {
    if (!selectedChat || !selectedChat.chat?.chatId) return null;

    return (
      <PressableCustom onPress={() => deleteChatButtonHandler(selectedChat.chat?.chatId)}>
        <TrashBinIcon width={20} height={20} />
      </PressableCustom>
    );
  }, [deleteChatButtonHandler, selectedChat]);

  if (!selectedChat || selectedChat.chat === null || !profile) return null;

  return (
    <SafeAreaView style={[computedStyles.container, styles.container]}>
      {selectedChat.isLoading && !selectedChat?.chat?.chatId && !selectedChat?.chat?.agentInfo.id ? (
        <ScreenLoader isLoading />
      ) : (
        <>
          <Header title={selectedChat.chat?.agentInfo.name} rightIcon={trashBin} />
          <GiftedChat
            loadEarlierMessagesProps={{
              isAvailable: !!selectedChat?.hasMore,
              isLoading: !!selectedChat?.isLoadingMore,
              onPress: () => {
                if (!selectedChat?.chat?.agentInfo.id) return;
                dispatch(loadMoreMessages(selectedChat.chat.agentInfo.id));
              },
              isInfiniteScrollEnabled: true,
            }}
            keyboardAvoidingViewProps={{ keyboardVerticalOffset: 78 + bottom }}
            messages={selectedChat.messageHistory as IMessage[]}
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
            renderInputToolbar={props => <InputToolbar {...props} />}
            renderComposer={props => <Composer {...props} />}
            renderSend={props => <Send {...props} />}
            renderChatEmpty={() => (
              <EmptyChatStub
                description={selectedChat.chat?.agentInfo.description || ''}
                avatarUrl={selectedChat.chat?.agentInfo.avatarUrl || ''}
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
