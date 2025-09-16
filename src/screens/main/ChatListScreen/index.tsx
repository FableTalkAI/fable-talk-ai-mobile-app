import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ChatListBar from '@/components/molecules/ChatListBar';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import SearchInput from '@/components/molecules/SearchInput';
import { SPACING } from '@/core/constants/sizes.ts';
import useUserStore from '@/hooks/useUserStore.ts';

const ChatListScreen = () => {
  const { t } = useTranslation();
  const { chats } = useUserStore();

  const [filteredChats, setFilteredChats] = useState(chats);

  const onStopHandler = (value: string) => {
    setFilteredChats(chats.filter(chat => chat.agentName.toLowerCase().includes(value)));
  };

  return (
    <SafeAreaViewCustom withGradientBackground>
      <SearchInput placeholder={t('searchInput.placeholder')} onStop={onStopHandler} />
      <FlatList
        data={filteredChats}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => (
          <ChatListBar avatarSource={item.agentAvatar} agentName={item.agentName} lastMessage={item.lastMessage} />
        )}
      />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: SPACING.lg,
    paddingTop: SPACING.lg,
  },
});

export default ChatListScreen;
