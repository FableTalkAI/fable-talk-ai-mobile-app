import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

import useTheme from '@/shared/hooks/useTheme.ts';

import { TEXT_STYLES } from './constants.ts';
import { TextCustomProps, TextModes } from './types.ts';

const TextCustom = ({ text, mode = TextModes.Base, style, textColor, ...textProps }: TextCustomProps) => {
  const { colors } = useTheme();

  const textStyle = useMemo(() => TEXT_STYLES[mode], [mode]);

  const computedStyles = StyleSheet.create({
    text: {
      color: textColor ?? colors.textPrimary,
    },
  });

  return (
    <Text style={[computedStyles.text, textStyle, style]} {...textProps}>
      {text}
    </Text>
  );
};

export default TextCustom;
