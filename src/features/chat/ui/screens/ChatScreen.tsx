import { RouteProp, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AgentAccessLevel } from '@/features/agents/store/agents/types.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import { MAX_FREE_USER_ACTIVE_CHAT_COUNT } from '@/features/chat/model/constants.ts';
import { loadMoreMessages } from '@/features/chat/store/chat/thunks.ts';
import DeleteChatBottomWindow from '@/features/chat/ui/DeleteChatBottomWindow';
import EmptyChatStub from '@/features/chat/ui/EmptyChatStub';
import { Bubble, Composer, InputToolbar, Message, Send } from '@/features/chat/ui/giftedChat';
import ChatAvatar from '@/features/chat/ui/giftedChat/ChatAvatar.tsx';
import useCustomizationStore from '@/features/customization/hooks/useCustomizationStore.ts';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { RootNavigatorParamList } from '@/features/navigation/ui/RootNavigator/types.ts';
import useBottomWindow from '@/features/overlay/hooks/useBottomWindow';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import useSubscription from '@/features/subscriptions/hooks/useSubscription';
import { TrashBinIcon } from '@/shared/assets/icons';
import { useAppDispatch } from '@/shared/hooks/reduxHooks.ts';
import useTheme from '@/shared/hooks/useTheme';
import { SPACING } from '@/shared/model/sizes.ts';
import Dropdown from '@/shared/ui/Dropdown';
import Header from '@/shared/ui/Header';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import ScreenLoader from '@/shared/ui/ScreenLoader';

dayjs.extend(calendar);

const ChatScreen = () => {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const { navigation } = useNavigationRoutes();
  const { top, bottom } = useSafeAreaInsets();

  const { params } = useRoute<RouteProp<RootNavigatorParamList, 'Chat'>>();
  const dispatch = useAppDispatch();

  const { selectedChat, sendMessageHandler, chats, getChatByIdHandler } = useChatStore();
  const { profile, chatsLimitExceeded, chatsLimitNeedUpdate } = useProfileStore();
  const { checkPremiumHandler, isPremium, showPremiumModal } = useSubscription();
  const { chatBackground } = useCustomizationStore();

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
    },
    loadMoreButtonStyle: selectedChat?.isLoadingMore ? { display: 'flex' } : { display: `none` },
    textTimeBubblesLeft: { color: colors.textPrimary },
    textTimeBubblesRight: { color: colors.textPrimary },
    imageBackground: {
      marginBottom: -bottom,
      paddingBottom: bottom,
    },
    header: {
      borderBottomColor: colors.textSecondary,
    },
  });

  const onSend = useCallback(
    async (m: IMessage[] = []) => {
      if (
        !isPremium &&
        chats.length >= MAX_FREE_USER_ACTIVE_CHAT_COUNT &&
        !chats.some(i => i.chatId === selectedChat?.chat?.chatId)
      ) {
        return showPremiumModal('activeChatsLimit');
      }

      await checkPremiumHandler({
        skipCheck:
          (!chatsLimitExceeded || chatsLimitNeedUpdate) &&
          selectedChat?.chat?.agentInfo.accessLevel === AgentAccessLevel.Free,
        modalTitleKey: chatsLimitExceeded ? 'limitExceeded' : 'messagePremiumAgent',
        func: async () => {
          if (selectedChat && selectedChat.chat && profile) {
            await sendMessageHandler({
              message: m[0].text,
              agentId: selectedChat.chat.agentInfo.id,
              isPremium,
              ...profile,
            });
          }
        },
      });
    },
    [
      isPremium,
      chats,
      checkPremiumHandler,
      chatsLimitExceeded,
      chatsLimitNeedUpdate,
      selectedChat,
      showPremiumModal,
      profile,
      sendMessageHandler,
    ],
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
      <Dropdown
        data={[
          {
            icon: <TrashBinIcon />,
            title: t('actions.delete'),
            onPress: () => deleteChatButtonHandler(selectedChat.chat?.chatId),
          },
        ]}
      />
    );
  }, [deleteChatButtonHandler, selectedChat, t]);

  useEffect(() => {
    if (params?.agentId) {
      getChatByIdHandler(params.agentId).catch(console.error);
    }
  }, [getChatByIdHandler, params?.agentId]);

  if (!selectedChat || selectedChat.chat === null || !profile) return null;

  return (
    <SafeAreaViewCustom withBottomPadding={false} withHorizontalPadding={false} style={computedStyles.container}>
      {selectedChat.isLoading && !selectedChat?.chat?.chatId && !selectedChat?.chat?.agentInfo.id ? (
        <ScreenLoader isLoading />
      ) : (
        <>
          <Header
            style={[styles.header, computedStyles.header]}
            title={selectedChat.chat?.agentInfo.name}
            rightIcon={trashBin}
          />

          <ImageBackground
            style={[styles.imageBackground, computedStyles.imageBackground]}
            source={{ uri: chatBackground }}
          >
            <GiftedChat
              loadEarlierMessagesProps={{
                isAvailable: !!selectedChat?.hasMore,
                isLoading: !!selectedChat?.isLoadingMore,
                onPress: () => {
                  if (!selectedChat?.chat?.agentInfo.id) return;
                  dispatch(loadMoreMessages(selectedChat.chat.agentInfo.id));
                },
                isInfiniteScrollEnabled: true,
                containerStyle: computedStyles.loadMoreButtonStyle,
              }}
              keyboardAvoidingViewProps={{ keyboardVerticalOffset: 56 + top }}
              messages={selectedChat.messageHistory as IMessage[]}
              onSend={chatMessages => onSend(chatMessages)}
              renderAvatar={props => <ChatAvatar {...props} />}
              messagesContainerStyle={styles.messagesContainer}
              timeTextStyle={{ left: computedStyles.textTimeBubblesLeft, right: computedStyles.textTimeBubblesRight }}
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
          </ImageBackground>
        </>
      )}
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    paddingBottom: 86,
  },
  imageBackground: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 0.5,
    width: '100%',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.m,
  },
});

export default ChatScreen;
