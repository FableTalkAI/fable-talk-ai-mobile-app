import { StyleSheet, View } from 'react-native';

import useTheme from '@/shared/hooks/useTheme';
import { SPACING } from '@/shared/model/sizes.ts';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

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
