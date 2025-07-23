import { useMemo } from 'react';
import { Text } from 'react-native';

import { TEXT_STYLES } from '@/components/atoms/TextCustom/constants.ts';
import { TextCustomProps } from '@/components/atoms/TextCustom/types.ts';

const TextCustom = ({ text, mode = 'base', style, numberOfLines = 1 }: TextCustomProps) => {
  const textStyle = useMemo(() => TEXT_STYLES[mode], [mode]);

  return (
    <Text style={[textStyle, style]} numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};

export default TextCustom;
