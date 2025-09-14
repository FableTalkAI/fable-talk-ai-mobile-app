import { forwardRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { ArrowForwardIcon, FilterIcon, SearchIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import { SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { SearchInputProps } from './types.ts';

const SearchInput = forwardRef<TextInput, SearchInputProps>(
  ({ placeholder, withFilter, value, onChangeText, navigation }, ref) => {
    const { colors } = useTheme();

    return (
      <View style={styles.wrapper}>
        {navigation && (
          <PressableCustom hitSlop={10} onPress={navigation?.goBack} style={styles.backIcon}>
            <ArrowForwardIcon fill={colors.iconPrimary} />
          </PressableCustom>
        )}

        <TextInputCustom
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
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
