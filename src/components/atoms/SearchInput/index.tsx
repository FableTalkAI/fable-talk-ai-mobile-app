import { StyleSheet, TextInput, View } from 'react-native';

import { ArrowForwardIcon, FilterIcon, SearchIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import { SearchInputProps } from '@/components/atoms/SearchInput/types.ts';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes.ts';
import useTheme from '@/hooks/useTheme.ts';

const SearchInput = ({
  placeholder,
  placeholderTextColor,
  shadowMode,
  withBackArrow,
  withFilter,
  shadowStyle,
  style,
  value,
  onChangeText,
}: SearchInputProps) => {
  const { colors } = useTheme();

  const { rootNavigation } = useNavigationRoutes();

  const computedStyles = StyleSheet.create({
    wrapper: {
      gap: SPACING.m,
    },
    container: {
      borderRadius: RADIUS.large,
      paddingHorizontal: SPACING.m,
      backgroundColor: colors.backgroundAlt,
      gap: SPACING.xs,
      paddingVertical: SPACING.s,
    },
    textInput: {
      color: colors.textPrimary,
    },
  });

  return (
    <View style={[styles.wrapper, computedStyles.wrapper]}>
      {withBackArrow && (
        <PressableCustom onPress={rootNavigation.goBack} style={styles.backIcon}>
          <ArrowForwardIcon />
        </PressableCustom>
      )}

      <ShadowCustom
        mode={shadowMode}
        style={[computedStyles.container, styles.container, shadowStyle]}
        containerStyle={styles.shadowContainer}
      >
        <SearchIcon />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor ?? colors.gray50}
          style={[computedStyles.textInput, styles.textInput, style]}
          numberOfLines={1}
        />
      </ShadowCustom>
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
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadowContainer: {
    flex: 1,
  },
  backIcon: {
    transform: [{ rotate: '180deg' }],
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 16,
    minHeight: 24,
  },
});

export default SearchInput;
