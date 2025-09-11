import { StyleSheet, View } from 'react-native';

import Button from '@/components/atoms/Button';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { SPACING } from '@/core/constants/sizes.ts';

import { AlertProps } from './types.ts';

const Alert = ({ title, subtitle, firstButtonProps, secondButtonProps }: AlertProps) => {
  const computedStyles = StyleSheet.create({
    textContainer: {
      gap: SPACING.s,
    },
    button: {
      width: secondButtonProps ? '49%' : '100%',
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={[styles.textContainer, computedStyles.textContainer]}>
        <TextCustom mode={TextModes.Subtitle} text={title} />
        <TextCustom mode={TextModes.Secondary} text={subtitle} />
      </View>

      <View style={styles.container}>
        <Button {...firstButtonProps} containerStyle={computedStyles.button} />
        {secondButtonProps && <Button {...secondButtonProps} containerStyle={computedStyles.button} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Alert;
