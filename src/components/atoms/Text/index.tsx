import { TextProps } from '@/components/atoms/Text/types.ts';
import { Text as TextBase } from 'react-native';
import { TEXT_STYLES } from '@/components/atoms/Text/constants.ts';
import { useMemo } from 'react';

const Text = ({ text, mode = 'base', style, numberOfLines = 1 }: TextProps) => {
  const textStyle = useMemo(() => TEXT_STYLES[mode], [mode]);

  return (
    <TextBase style={[textStyle, style]} numberOfLines={numberOfLines}>
      {text}
    </TextBase>
  );
};

export default Text;
