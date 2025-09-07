import { StyleSheet, View } from 'react-native';

import { ArrowForwardIcon, SearchIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import { SPACING } from '@/core/constants/sizes.ts';

import { SearchInputProps } from './types.ts';

const SearchInput = ({ placeholder, withBackArrow, value, onChangeText, navigation, isDisabled }: SearchInputProps) => {
  return (
    <View style={styles.wrapper} pointerEvents={isDisabled ? 'none' : 'auto'}>
      {withBackArrow && navigation && (
        <PressableCustom onPress={navigation?.goBack} style={styles.backIcon}>
          <ArrowForwardIcon />
        </PressableCustom>
      )}

      <TextInputCustom
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        leftIcon={<SearchIcon />}
        wrapperStyle={styles.textInputWrapper}
        numberOfLines={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
