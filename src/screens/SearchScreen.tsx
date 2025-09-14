import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import SearchBar from '@/components/molecules/SearchBar';
import SearchInput from '@/components/molecules/SearchInput';
import { SPACING } from '@/core/constants/sizes.ts';
import { useDebounce } from '@/hooks/useDebounce';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';
import useTheme from '@/hooks/useTheme.ts';

const testData = ['12412', '1432', '5324', 'gweg', 'ewcsvr'];

const SearchScreen = () => {
  const inputRef = useRef<TextInput>(null);

  const { t } = useTranslation();
  const { colors } = useTheme();
  const { navigation } = useNavigationRoutes();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce({ value: search });

  const computedStyles = StyleSheet.create({
    noResults: {
      color: colors.gray50,
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      // TODO: make request
    }
  }, [debouncedSearch]);

  return (
    <SafeAreaViewCustom>
      <SearchInput
        ref={inputRef}
        placeholder={t('search.placeholder')}
        value={search}
        onChangeText={setSearch}
        navigation={navigation}
      />

      {testData.length ? (
        <FlatList
          data={testData}
          bounces={false}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => <SearchBar title={item} onPress={() => {}} />}
        />
      ) : (
        <TextCustom
          style={[styles.noResults, computedStyles.noResults]}
          mode={TextModes.Secondary}
          text={t('common.noResults')}
        />
      )}
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  noResults: {
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
  flatList: {
    marginTop: SPACING.m,
  },
  flatListContainer: {
    gap: SPACING.m,
  },
});

export default SearchScreen;
