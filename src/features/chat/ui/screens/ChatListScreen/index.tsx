import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { LinearTransition } from 'react-native-reanimated';

import useChatsMultiSelect from '@/features/chat/hooks/useChatsMultiSelect.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import ChatListBar from '@/features/chat/ui/ChatListBar';
import MultiSelectHeader from '@/features/chat/ui/MultiSelectHeader';
import SearchInput from '@/features/home/ui/SearchInput';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useUserStore from '@/features/profile/hooks/useUserStore.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import ScreenLoader from '@/shared/ui/ScreenLoader';
import TextCustom from '@/shared/ui/TextCustom';

const ChatListScreen = () => {
  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();

  const { chats, getChatByIdHandler, isLoading } = useChatStore();
  const { pinnedChatIds } = useUserStore();

  const [filteredChats, setFilteredChats] = useState(chats);
  const [sortedChats, setSortedChats] = useState(chats);
  const { selectedChatIds, toggleSelectChat, resetSelectedIds, isSelectedMode, deleteHandler } = useChatsMultiSelect();

  const onStopHandler = (value: string) => {
    const lower = value.toLowerCase();
    setFilteredChats(sortedChats.filter(chat => chat.agentInfo.name.toLowerCase().includes(lower)));
  };

  const onChatOpenHandler = (agentId: string, chatId?: string) => async () => {
    if (isSelectedMode) {
      chatId && toggleSelectChat(chatId);
      return;
    }

    await getChatByIdHandler(agentId, chatId);
    navigation.navigate('ChatScreen');
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

  return (
    <>
      <SafeAreaViewCustom withGradientBackground>
        <SearchInput placeholder={t('searchInput.placeholder')} onStop={onStopHandler} />
        <MultiSelectHeader onCrossPress={resetSelectedIds} onBinPress={deleteHandler} isVisible={isSelectedMode} />

        {filteredChats.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <TextCustom text={t('common.noResults')} />
          </View>
        ) : (
          <FlatList
            keyExtractor={item => item.chatId}
            data={filteredChats}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({ item }) => (
              <Animated.View layout={LinearTransition}>
                <ChatListBar
                  avatarSource={item.agentInfo.avatarUrl}
                  agentName={item.agentInfo.name}
                  lastMessage={item.lastMessage}
                  onPress={onChatOpenHandler(item.agentInfo.id, item.chatId)}
                  chatId={item.chatId}
                  isSelected={selectedChatIds.includes(item.chatId)}
                  onLongPress={toggleSelectChat}
                  isSelectMode={isSelectedMode}
                />
              </Animated.View>
            )}
          />
        )}
      </SafeAreaViewCustom>

      <ScreenLoader isLoading={isLoading.selectedChat} />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedModeContainer: {
    width: '100%',
    position: 'absolute',
    height: 48,
    borderRadius: RADIUS.large,
    left: SPACING.xl,
  },
});

export default ChatListScreen;
