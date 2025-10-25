import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import SearchBar from '@/components/molecules/SearchBar';
import SearchInput from '@/components/molecules/SearchInput';
import SearchResultsSkeleton from '@/components/molecules/Skeleton/templates/SearchResultsSkeleton.tsx';
import { SPACING } from '@/core/constants/sizes.ts';
import useAgentsStore from '@/hooks/useAgentsStore.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';
import useTheme from '@/hooks/useTheme.ts';

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
