import { forwardRef, useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { ArrowForwardIcon, SearchIcon } from '@/shared/assets/icons';
import { useDebounce } from '@/shared/hooks/useDebounce';
import useTheme from '@/shared/hooks/useTheme';
import { SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextInputCustom from '@/shared/ui/TextInputCustom';

import { SearchInputProps } from './types.ts';

const SearchInput = forwardRef<TextInput, SearchInputProps>(
  ({ style, navigation, onStop, isDisabled, ...inputProps }, ref) => {
    const { colors } = useTheme();

    const onStopRef = useRef(onStop);

    const [value, setValue] = useState('');
    const debouncedSearch = useDebounce({ value });
    onStopRef.current = onStop;

    const isFirstRun = useRef(true);

    useEffect(() => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      onStopRef.current?.(debouncedSearch);
    }, [debouncedSearch]);

    return (
      <View style={[styles.wrapper, style]} pointerEvents={isDisabled ? 'none' : 'auto'}>
        {navigation && (
          <PressableCustom hitSlop={10} onPress={navigation?.goBack} style={styles.backIcon}>
            <ArrowForwardIcon fill={colors.iconPrimary} />
          </PressableCustom>
        )}

        <TextInputCustom
          ref={ref}
          value={value}
          {...inputProps}
          onChangeText={setValue}
          leftIcon={<SearchIcon />}
          wrapperStyle={styles.textInputWrapper}
          numberOfLines={1}
        />
      </View>
    );
  },
);

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
