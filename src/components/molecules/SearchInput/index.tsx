import { forwardRef, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { ArrowForwardIcon, FilterIcon, SearchIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import { SPACING } from '@/core/constants/sizes.ts';
import { useDebounce } from '@/hooks/useDebounce';

import { SearchInputProps } from './types.ts';

const SearchInput = forwardRef<TextInput, SearchInputProps>(({ placeholder, withFilter, navigation, onStop }, ref) => {
  const [value, setValue] = useState('');
  const debouncedSearch = useDebounce({ value });

  useEffect(() => {
    if (debouncedSearch) {
      onStop(debouncedSearch);
    }
  }, [debouncedSearch, onStop]);

  return (
    <View style={styles.wrapper}>
      {navigation && (
        <PressableCustom onPress={navigation?.goBack} style={styles.backIcon}>
          <ArrowForwardIcon />
        </PressableCustom>
      )}

      <TextInputCustom
        ref={ref}
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
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1,
    gap: SPACING.m,
  },
  textInputWrapper: {
    flex: 1,
  },
  backIcon: {
    transform: [{ rotate: '180deg' }],
  },
});

export default SearchInput;
