import { StyleSheet, TextInput } from 'react-native';
import { TextInputCustomProps } from '@/components/atoms/TextInputCustom/types.ts';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import { useMemo } from 'react';
import { TEXT_STYLES } from '@/components/atoms/TextCustom/constants.ts';
import useTheme from '@/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';

const TextInputCustom = ({
  placeholder,
  placeholderTextColor = 'grey',
  shadowMode,
  textMode = 'base',
  leftIcon,
  viewStyleExtra,
  textStyleExtra,
  value,
  onChangeText,
}: TextInputCustomProps) => {
  const { colors } = useTheme();
  const textStyle = useMemo(() => TEXT_STYLES[textMode], [textMode]);

  const computedStyles = StyleSheet.create({
    text: {
      color: colors.textPrimary,
    },
    textInputContainer: {
      borderRadius: RADIUS.medium,
      paddingHorizontal: SPACING.m,
    },
  });

  return (
    <ShadowCustom mode={shadowMode} style={[computedStyles.textInputContainer, styles.container, viewStyleExtra]}>
      {leftIcon}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={[computedStyles.text, textStyle, textStyleExtra]}
        numberOfLines={1}
      />
    </ShadowCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    height: 100,
  },
});

export default TextInputCustom;
