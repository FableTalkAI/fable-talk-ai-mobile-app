import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import SearchBar from '@/components/molecules/SearchBar';
import SearchInput from '@/components/molecules/SearchInput';
import { SPACING } from '@/core/constants/sizes.ts';
import { useDebounce } from '@/hooks/useDebounce';
import useTheme from '@/hooks/useTheme.ts';

const testData = ['12412', '1432', '5324', 'gweg', 'ewcsvr'];

const SearchScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce({ value: search });

  const computedStyles = StyleSheet.create({
    flatList: {
      marginTop: SPACING.m,
    },
    flatListContainer: {
      gap: SPACING.m,
    },
    noResults: {
      marginTop: SPACING.xl,
      color: colors.gray50,
    },
  });

  useEffect(() => {
    if (debouncedSearch) {
      // TODO: make request
    }
  }, [debouncedSearch]);

  return (
    <SafeAreaViewCustom>
      <SearchInput value={search} onChangeText={setSearch} withBackArrow />

      {testData.length ? (
        <FlatList
          data={testData}
          bounces={false}
          style={computedStyles.flatList}
          contentContainerStyle={computedStyles.flatListContainer}
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
  },
});

export default SearchScreen;
