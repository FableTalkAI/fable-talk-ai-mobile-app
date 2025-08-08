import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ArrowForwardIcon, FilterIcon, SearchIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import { SearchInputProps } from '@/components/atoms/SearchInput/types.ts';
import TextInputCustom from '@/components/atoms/TextInputCustom';
import { SPACING } from '@/core/constants/sizes.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes.ts';

const SearchInput = ({ placeholder, withBackArrow, withFilter }: SearchInputProps) => {
  const { rootNavigation } = useNavigationRoutes();

  const [text, setText] = useState<string>('');

  const computedStyles = StyleSheet.create({
    wrapper: {
      gap: SPACING.m,
    },
  });

  return (
    <View style={[styles.wrapper, computedStyles.wrapper]}>
      {withBackArrow && (
        <PressableCustom onPress={rootNavigation.goBack} style={styles.backIcon}>
          <ArrowForwardIcon />
        </PressableCustom>
      )}

      <TextInputCustom
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
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
  },
  textInputWrapper: {
    flex: 1,
  },
  backIcon: {
    transform: [{ rotate: '180deg' }],
  },
});

export default SearchInput;
