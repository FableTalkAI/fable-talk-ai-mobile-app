import { cloneElement, useMemo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import ShadowCustom from '@/components/atoms/ShadowCustom';
import { TEXT_STYLES } from '@/components/atoms/TextCustom/constants.ts';
import { TextInputCustomProps } from '@/components/atoms/TextInputCustom/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

const TextInputCustom = ({
  placeholder,
  placeholderTextColor,
  shadowMode,
  textMode = 'base',
  leftIcon,
  wrapperStyle,
  style,
  value,
  onChangeText,
  numberOfLines = 1,
}: TextInputCustomProps) => {
  const { colors } = useTheme();
  const localTextStyle = useMemo(() => TEXT_STYLES[textMode], [textMode]);

  const resizeLeftIcon = useMemo(
    () => (leftIcon ? <View style={styles.iconContainer}>{cloneElement(leftIcon, { width: 24 })}</View> : null),
    [leftIcon],
  );

  const computedStyles = StyleSheet.create({
    textInput: {
      color: colors.textPrimary,
    },
    wrapper: {
      borderRadius: RADIUS.large,
      paddingHorizontal: SPACING.m,
      paddingVertical: SPACING.s,
      backgroundColor: colors.backgroundAlt,
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
        style={[computedStyles.textInput, styles.textInput, localTextStyle, style]}
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
  },
});

export default TextInputCustom;
