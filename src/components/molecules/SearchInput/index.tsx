import { forwardRef, useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { ArrowForwardIcon, SearchIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import { SPACING } from '@/core/constants/sizes.ts';
import { useDebounce } from '@/hooks/useDebounce';
import useTheme from '@/hooks/useTheme.ts';

import { SearchInputProps } from './types.ts';

const SearchInput = forwardRef<TextInput, SearchInputProps>(({ placeholder, navigation, onStop, isDisabled }, ref) => {
  const { colors } = useTheme();

  const [value, setValue] = useState('');
  const debouncedSearch = useDebounce({ value });

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    onStop?.(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <View style={styles.wrapper} pointerEvents={isDisabled ? 'none' : 'auto'}>
      {navigation && (
        <PressableCustom onPress={navigation?.goBack} style={styles.backIcon}>
          <ArrowForwardIcon fill={colors.iconPrimary} />
        </PressableCustom>
      )}

      <TextInputCustom
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        leftIcon={<SearchIcon />}
        wrapperStyle={styles.textInputWrapper}
        numberOfLines={1}
      />
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
