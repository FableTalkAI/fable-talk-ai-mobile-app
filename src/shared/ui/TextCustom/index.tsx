import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

import useTheme from '@/shared/hooks/useTheme';

import { TEXT_STYLES } from './constants.ts';
import { TextCustomProps, TextModes } from './types.ts';

const TextCustom = ({ text, mode = TextModes.Base, style, textColor, children, ...textProps }: TextCustomProps) => {
  const { colors } = useTheme();

  const textStyle = useMemo(() => TEXT_STYLES[mode], [mode]);

  const computedStyles = StyleSheet.create({
    text: {
      color: textColor ?? colors.textPrimary,
    },
  });

  return (
    <Text style={[computedStyles.text, textStyle, style]} {...textProps}>
      {children ?? text}
    </Text>
  );
};

export default TextCustom;
