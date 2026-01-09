import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useAgentsStore from '@/features/home/hooks/useAgentsStore.ts';
import SearchBar from '@/features/home/ui/SearchBar';
import SearchInput from '@/features/home/ui/SearchInput';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import SearchResultsSkeleton from '@/shared/ui/Skeleton/templates/SearchResultsSkeleton.tsx';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

const SearchScreen = () => {
  const inputRef = useRef<TextInput>(null);

  const { t } = useTranslation();
  const { colors } = useTheme();
  const { navigation } = useNavigationRoutes();
  const { getSearchResultsHandler, searchResults, clearSearchResultsHandler, isLoading } = useAgentsStore();

  const computedStyles = StyleSheet.create({
    noResults: {
      color: colors.gray50,
    },
  });

  const onStopHandler = useCallback(
    async (value: string) => {
      await getSearchResultsHandler(value);
    },
    [getSearchResultsHandler],
  );

  useEffect(() => {
    inputRef.current?.focus();

    return () => {
      Keyboard.dismiss();
      clearSearchResultsHandler();
    };
  }, [clearSearchResultsHandler]);

  return (
    <SafeAreaViewCustom>
      <SearchInput ref={inputRef} navigation={navigation} onStop={onStopHandler} />

      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        key={+isLoading.searchResults}
        style={styles.animatedViewContainer}
      >
        {isLoading.searchResults ? (
          <SearchResultsSkeleton />
        ) : searchResults.length ? (
          <FlatList
            data={searchResults}
            bounces={false}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({ item }) => <SearchBar title={item.name} onPress={() => {}} />}
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <TextCustom style={computedStyles.noResults} mode={TextModes.Secondary} text={t('common.noResults')} />
          </View>
        )}
      </Animated.View>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  animatedViewContainer: {
    flex: 1,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    marginTop: SPACING.m,
  },
  flatListContainer: {
    gap: SPACING.m,
  },
});

export default SearchScreen;
