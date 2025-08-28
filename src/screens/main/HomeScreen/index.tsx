import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { ChatGPTLogo } from '@/assets/images';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import AgentBar from '@/components/molecules/AgentBar';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import SearchInput from '@/components/molecules/SearchInput';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';
import useTheme from '@/hooks/useTheme.ts';
import Agents from '@/store/agents';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { navigation } = useNavigationRoutes();

  const agents = [
    {
      name: 'Jonh',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
  ];

  return (
    <>
      <SafeAreaViewCustom>
        <View>
          <SearchInput placeholder={t('home.searchInput')} withFilter />
          <FlatList
            data={agents}
            numColumns={2}
            columnWrapperStyle={{ borderWidth: 1, gap: 24 }}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <AgentBar
                name={item.name}
                description={item.description}
                tags={item.tags}
                avatarSource={item.avatarSource}
              />
            )}
          />
        </View>
      </SafeAreaViewCustom>
    </>
  );
};

const styles = StyleSheet.create({
  agentsContainer: {
    gap: 100,
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
