import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { FilterIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import AgentBar from '@/components/molecules/AgentBar';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import SearchInput from '@/components/molecules/SearchInput';
import { SPACING } from '@/core/constants/sizes.ts';
import useAgentsStore from '@/hooks/useAgentsStore.ts';
import useBottomWindow from '@/hooks/useBottomWindow';
import { BottomWindowModes } from '@/hooks/useBottomWindow/types.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { agents } = useAgentsStore();
  const { open } = useBottomWindow(BottomWindowModes.SearchFilter);

  const { navigation } = useNavigationRoutes();

  return (
    <>
      <SafeAreaViewCustom withGradientBackground>
        <View style={styles.searchAndIconContainer}>
          <PressableCustom onPress={() => navigation.navigate('SearchScreen')} containerStyle={styles.search}>
            <SearchInput placeholder={t('home.searchInput')} isDisabled onStop={() => null} />
          </PressableCustom>

          <PressableCustom onPress={open}>
            <FilterIcon />
          </PressableCustom>
        </View>

        <FlatList
          style={styles.flatListContainer}
          data={agents}
          numColumns={2}
          showsVerticalScrollIndicator={false}
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
    </>
  );
};

const styles = StyleSheet.create({
  searchAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  search: {
    flex: 1,
  },
  flatListContainer: {
    marginTop: SPACING.xl,
  },
  flatListContentContainer: {
    gap: SPACING.lg,
  },
});

export default HomeScreen;
