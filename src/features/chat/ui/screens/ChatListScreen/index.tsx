import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { AgentAccessLevel } from '@/features/agents/store/agents/types.ts';
import useChatMultiSelection from '@/features/chat/hooks/useChatMultiSelection';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import ChatListBar from '@/features/chat/ui/ChatListBar';
import DeleteChatBottomWindow from '@/features/chat/ui/DeleteChatBottomWindow';
import MultiSelectHeader from '@/features/chat/ui/MultiSelectHeader';
import SearchInput from '@/features/home/ui/SearchInput';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useBottomWindow from '@/features/overlay/hooks/useBottomWindow';
import useUserStore from '@/features/profile/hooks/useUserStore.ts';
import useSubscription from '@/features/subscriptions/hooks/useSubscription';
import { ChatArrowIcon } from '@/shared/assets/icons';
import { SPACING } from '@/shared/model/sizes.ts';
import EmptyStub from '@/shared/ui/EmptyStub';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';

const ChatListScreen = () => {
  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();
  const { checkPremiumHandler } = useSubscription();

  const { chats, getChatByIdHandler } = useChatStore();
  const { pinnedChatIds } = useUserStore();
  const { open } = useBottomWindow();

  const [filteredChats, setFilteredChats] = useState(chats);
  const [sortedChats, setSortedChats] = useState(chats);
  const { multiSelectionsChatIds, toggleSelectChat, clear, isSelectedMode } = useChatMultiSelection();

  const openDeleteChatBottomWindow = () => {
    open(close => (
      <DeleteChatBottomWindow multiSelectionsChatIds={multiSelectionsChatIds} clear={clear} close={close} />
    ));
  };

  const onStopHandler = (value: string) => {
    const lower = value.toLowerCase();
    setFilteredChats(sortedChats.filter(chat => chat.agentInfo.name.toLowerCase().includes(lower)));
  };

  const onChatOpenHandler = (agentId: string, isPremiumAgent: boolean, chatId?: string) => async () => {
    if (isSelectedMode) {
      chatId && toggleSelectChat(chatId);
      return;
    }

    await checkPremiumHandler({
      skipCheck: !isPremiumAgent,
      modalTitleKey: 'openPremiumAgent',
      func: async () => {
        getChatByIdHandler(agentId, chatId).catch(console.error);
        navigation.navigate('ChatScreen');
      },
    });
  };

  useEffect(() => {
    const localSortedChats = [...chats].sort((a, b) => {
      const aPinned = pinnedChatIds.includes(a.chatId || '');
      const bPinned = pinnedChatIds.includes(b.chatId || '');

      if (aPinned === bPinned) return 0;

      return aPinned ? -1 : 1;
    });

    setSortedChats(localSortedChats);
    setFilteredChats(localSortedChats);
  }, [chats, pinnedChatIds]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', e => {
      if (e.target?.includes('ChatListScreen')) {
        clear();
      }
    });

    return unsubscribe;
  }, [clear, navigation]);

  return (
    <SafeAreaViewCustom withHorizontalPadding={false} withGradientBackground>
      <SearchInput
        style={styles.search}
        placeholder={t('searchInput.placeholder')}
        onStop={onStopHandler}
        isDisabled={isSelectedMode}
      />
      <MultiSelectHeader onCrossPress={clear} onBinPress={openDeleteChatBottomWindow} isVisible={isSelectedMode} />

      <FlatList
        ListEmptyComponent={
          <EmptyStub
            icon={<ChatArrowIcon />}
            title={t('empty.chatSearch.title')}
            subtitle={t('empty.chatSearch.subtitle')}
          />
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.chatId}
        data={filteredChats}
        style={styles.flatList}
        contentContainerStyle={[styles.contentContainerStyle]}
        renderItem={({ item }) => (
          <Animated.View layout={LinearTransition}>
            <ChatListBar
              avatarSource={item.agentInfo.avatarUrl}
              agentName={item.agentInfo.name}
              lastMessage={item.lastMessage}
              agentAccessLevel={item.agentInfo.accessLevel}
              onPress={onChatOpenHandler(
                item.agentInfo.id,
                item.agentInfo.accessLevel === AgentAccessLevel.Premium,
                item.chatId,
              )}
              chatId={item.chatId}
              isSelected={multiSelectionsChatIds.includes(item.chatId)}
              onLongPress={toggleSelectChat}
              isSelectMode={isSelectedMode}
            />
          </Animated.View>
        )}
      />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginTop: SPACING.lg,
  },
  search: {
    paddingHorizontal: SPACING.xl,
  },
  contentContainerStyle: {
    gap: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    minHeight: '90%',
  },
});

export default ChatListScreen;
