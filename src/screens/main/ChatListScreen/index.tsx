import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ScreenLoader from '@/components/atoms/ScreenLoader';
import TextCustom from '@/components/atoms/TextCustom';
import ChatListBar from '@/components/molecules/ChatListBar';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import SearchInput from '@/components/molecules/SearchInput';
import { SPACING } from '@/core/constants/sizes.ts';
import useChatStore from '@/hooks/useChatStore.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';

const ChatListScreen = () => {
  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();

  const { chats, getChatByIdHandler, isLoading } = useChatStore();

  const [filteredChats, setFilteredChats] = useState(chats);

  const onStopHandler = (value: string) => {
    const lower = value.toLowerCase();
    setFilteredChats(chats.filter(chat => chat.agentInfo.name.toLowerCase().includes(lower)));
  };

  const onChatOpenHandler = (agentId: string, chatId?: string) => async () => {
    await getChatByIdHandler(agentId, chatId);
    navigation.navigate('ChatScreen');
  };

  useEffect(() => {
    setFilteredChats(chats);
  }, [chats]);

  return (
    <>
      <SafeAreaViewCustom withGradientBackground>
        <SearchInput placeholder={t('searchInput.placeholder')} onStop={onStopHandler} />

        {filteredChats.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <TextCustom text={t('common.noResults')} />
          </View>
        ) : (
          <FlatList
            data={filteredChats}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({ item }) => (
              <ChatListBar
                avatarSource={item.agentInfo.avatarUrl}
                agentName={item.agentInfo.name}
                lastMessage={item.lastMessage}
                onPress={onChatOpenHandler(item.agentInfo.id, item?.chatId)}
              />
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
});

export default ChatListScreen;
