import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, StyleSheet, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useAgentsStore from '@/features/home/hooks/useAgentsStore.ts';
import SearchBar from '@/features/home/ui/SearchBar';
import SearchInput from '@/features/home/ui/SearchInput';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { RobotIcon } from '@/shared/assets/icons';
import { SPACING } from '@/shared/model/sizes.ts';
import EmptyStub from '@/shared/ui/EmptyStub';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import SearchResultsSkeleton from '@/shared/ui/Skeleton/templates/SearchResultsSkeleton.tsx';

const SearchScreen = () => {
  const inputRef = useRef<TextInput>(null);

  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();
  const { getSearchResultsHandler, searchResults, clearSearchResultsHandler, isLoading } = useAgentsStore();

  const [searchValueLength, setSearchValueLength] = useState(0);

  const onStopHandler = useCallback(
    async (value: string) => {
      setSearchValueLength(value.length);
      await getSearchResultsHandler(value);
    },
    [getSearchResultsHandler],
  );

  useEffect(() => {
    return () => {
      Keyboard.dismiss();
      clearSearchResultsHandler();
    };
  }, [clearSearchResultsHandler]);

  const content = useMemo(() => {
    if (isLoading.searchResults) {
      return <SearchResultsSkeleton />;
    }

    if (!searchValueLength) return null;

    if (searchResults.length) {
      return (
        <FlatList
          data={searchResults}
          bounces={false}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => <SearchBar title={item.name} onPress={() => {}} />}
        />
      );
    }

    return (
      <EmptyStub icon={<RobotIcon />} title={t('empty.agentSearch.title')} subtitle={t('empty.agentSearch.subtitle')} />
    );
  }, [isLoading.searchResults, searchResults, searchValueLength, t]);

  return (
    <SafeAreaViewCustom>
      <SearchInput autoFocus ref={inputRef} navigation={navigation} onStop={onStopHandler} />

      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        key={+isLoading.searchResults}
        style={styles.animatedViewContainer}
      >
        {content}
      </Animated.View>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  animatedViewContainer: {
    flex: 1,
  },
  flatList: {
    marginTop: SPACING.m,
  },
  flatListContainer: {
    gap: SPACING.m,
  },
});

export default SearchScreen;
