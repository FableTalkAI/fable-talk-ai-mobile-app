import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { ChatGPTLogo } from '@/assets/images';
import ChatListBar from '@/components/molecules/ChatListBar';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import SearchInput from '@/components/molecules/SearchInput';
import { SPACING } from '@/core/constants/sizes.ts';
// import useNavigationRoutes from '@/hooks/useNavigationRoutes';

const chats = [
  {
    agentName: 'ChatGPT',
    agentAvatar: ChatGPTLogo,
    lastMessage: 'Chat sada sadasd asdsad asdas da sada sadas sada sada s ad sadsad asdsad',
    isPinned: true,
  },
];

const ChatListScreen = () => {
  const { t } = useTranslation();
  // const { navigation } = useNavigationRoutes();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = useMemo(
    () => chats.filter(chat => chat.agentName.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery],
  );

  const computedStyles = StyleSheet.create({
    wrapper: {
      gap: SPACING.xl,
    },
  });

  return (
    <SafeAreaViewCustom withGradientBackground>
      <View style={computedStyles.wrapper}>
        <SearchInput placeholder={t('chatList.searchInput')} value={searchQuery} onChangeText={setSearchQuery} />
        <FlatList
          data={filteredChats}
          renderItem={({ item }) => (
            <ChatListBar avatarSource={item.agentAvatar} agentName={item.agentName} lastMessage={item.lastMessage} />
          )}
        />
      </View>
    </SafeAreaViewCustom>
  );
};

export default ChatListScreen;
