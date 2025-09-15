import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ArrowForwardIcon, FilterIcon, SearchIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import { SPACING } from '@/core/constants/sizes.ts';
import { useDebounce } from '@/hooks/useDebounce';

import { SearchInputProps } from './types.ts';

const SearchInput = ({ placeholder, withFilter, navigation, onStop }: SearchInputProps) => {
  const [value, setValue] = useState('');
  const debouncedSearch = useDebounce({ value });

  const computedStyles = StyleSheet.create({
    wrapper: {
      gap: SPACING.m,
    },
  });

  useEffect(() => {
    if (debouncedSearch) {
      onStop(debouncedSearch);
    }
  }, [debouncedSearch, onStop]);

  return (
    <View style={[styles.wrapper, computedStyles.wrapper]}>
      {navigation && (
        <PressableCustom onPress={navigation?.goBack} style={styles.backIcon}>
          <ArrowForwardIcon />
        </PressableCustom>
      )}

      <TextInputCustom
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        leftIcon={<SearchIcon />}
        wrapperStyle={styles.textInputWrapper}
      />

      {withFilter && (
        <PressableCustom>
          <FilterIcon />
        </PressableCustom>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1,
  },
  textInputWrapper: {
    flex: 1,
  },
  backIcon: {
    transform: [{ rotate: '180deg' }],
  },
});

export default SearchInput;
