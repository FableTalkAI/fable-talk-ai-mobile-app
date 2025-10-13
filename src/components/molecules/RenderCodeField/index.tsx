import { StyleSheet, View } from 'react-native';

import TextCustom from '@/components/atoms/TextCustom/index.tsx';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { RenderCodeFieldProps } from './types.ts';

const RenderCodeField = ({ index, symbol, isFocused, getCellOnLayoutHandler }: RenderCodeFieldProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    cell: {
      borderBottomColor: isFocused ? colors.link : colors.textPrimary,
    },
  });

  return (
    <View onLayout={getCellOnLayoutHandler(index)} key={index} style={[styles.cell, computedStyles.cell]}>
      <TextCustom mode={TextModes.Title} text={symbol} />
    </View>
  );
};

export default RenderCodeField;

const styles = StyleSheet.create({
  cell: {
    width: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    marginLeft: SPACING.xs,
  },
});
