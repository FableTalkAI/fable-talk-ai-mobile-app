import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { ChatGPTLogo } from '@/assets/images';
import PressableCustom from '@/components/atoms/PressableCustom';
import AgentBar from '@/components/molecules/AgentBar';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import SearchInput from '@/components/molecules/SearchInput';
import { SPACING } from '@/core/constants/sizes.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';
// import useTheme from '@/hooks/useTheme.ts';
// import Agents from '@/store/agents';

const HomeScreen = () => {
  const { t } = useTranslation();
  // const { colors } = useTheme();

  const { navigation } = useNavigationRoutes();

  // TODO: waiting for searchFilter merge for agents initial state
  const agents = [
    {
      name: 'Jonh7',
      description: 'Jonh devs ass dd ss sda ss sadas s',
      tags: ['Home', 'Test', 'Home1', 'Test1'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh6',
      description: 'Jonh \n ',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh5',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh4',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh3',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh2',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh1',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh55',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh44',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh33',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh22',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
    {
      name: 'Jonh11',
      description: 'Jonh',
      tags: ['Home', 'Test'],
      avatarSource: ChatGPTLogo,
    },
  ];

  return (
    <SafeAreaViewCustom withGradientBackground>
      <PressableCustom onPress={() => navigation.navigate('SearchScreen')}>
        <SearchInput placeholder={t('home.searchInput')} withFilter isDisabled />
      </PressableCustom>
      <FlatList
        style={styles.flatListContainer}
        data={agents}
        numColumns={2}
        columnWrapperStyle={styles.flatListContentContainer}
        contentContainerStyle={styles.flatListContentContainer}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <AgentBar
            name={item.name}
            description={item.description}
            tags={item.tags}
            avatarSource={item.avatarSource}
            //TODO: onPress navigate to ChatScreen
          />
        )}
      />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    marginTop: SPACING.xl,
  },
  flatListContentContainer: {
    gap: SPACING.lg,
  },
});

export default HomeScreen;
