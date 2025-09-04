import { StyleSheet, View } from 'react-native';

import { ArrowForwardIcon, FilterIcon, SearchIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import { SPACING } from '@/core/constants/sizes.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';

import { SearchInputProps } from './types.ts';

const SearchInput = ({ placeholder, withBackArrow, withFilter, value, onChangeText, isDisabled }: SearchInputProps) => {
  const { navigation } = useNavigationRoutes();

  const computedStyles = StyleSheet.create({
    wrapper: {
      gap: SPACING.m,
    },
  });

  return (
    <View style={[styles.wrapper, computedStyles.wrapper]} pointerEvents={isDisabled ? 'none' : 'auto'}>
      {withBackArrow && (
        <PressableCustom onPress={navigation.goBack} style={styles.backIcon}>
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
  },
  textInputWrapper: {
    flex: 1,
  },
  backIcon: {
    transform: [{ rotate: '180deg' }],
  },
});

export default SearchInput;
