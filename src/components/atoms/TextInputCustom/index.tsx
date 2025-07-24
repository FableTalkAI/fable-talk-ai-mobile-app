import { cloneElement, useMemo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import ShadowCustom from '@/components/atoms/ShadowCustom';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { TextInputCustomProps } from './types.ts';

const TextInputCustom = ({
  placeholder,
  placeholderTextColor,
  shadowMode,
  leftIcon,
  wrapperStyle,
  style,
  value,
  onChangeText,
  numberOfLines = 1,
}: TextInputCustomProps) => {
  const { colors } = useTheme();

  const resizeLeftIcon = useMemo(
    () => (leftIcon ? <View style={styles.iconContainer}>{cloneElement(leftIcon, { width: 24 })}</View> : null),
    [leftIcon],
  );

  const computedStyles = StyleSheet.create({
    wrapper: {
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
    <ShadowCustom mode={shadowMode} style={[computedStyles.wrapper, styles.wrapper, wrapperStyle]}>
      {resizeLeftIcon}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor ?? colors.gray40}
        style={[computedStyles.textInput, styles.textInput, style]}
        numberOfLines={numberOfLines}
      />
    </ShadowCustom>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 16,
    minHeight: 24,
  },
});

export default TextInputCustom;
