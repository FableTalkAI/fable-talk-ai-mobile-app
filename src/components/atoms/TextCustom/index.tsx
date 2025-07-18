import { TextCustomProps } from '@/components/atoms/TextCustom/types.ts';
import { Text } from 'react-native';
import { TEXT_STYLES } from '@/components/atoms/TextCustom/constants.ts';
import { useMemo } from 'react';

const TextCustom = ({ text, mode = 'base', style, numberOfLines = 1 }: TextCustomProps) => {
  const textStyle = useMemo(() => TEXT_STYLES[mode], [mode]);

  return (
    <Text style={[textStyle, style]} numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};

export default TextCustom;
