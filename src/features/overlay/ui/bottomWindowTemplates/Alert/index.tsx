import { StyleSheet, View } from 'react-native';

import { SPACING } from '@/shared/model/sizes.ts';
import Button from '@/shared/ui/Button';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { AlertProps } from './types.ts';

const Alert = ({ title, subtitle, firstButtonProps, secondButtonProps }: AlertProps) => {
  const computedStyles = StyleSheet.create({
    button: {
      width: secondButtonProps ? '49%' : '100%',
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.textContainer}>
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
    gap: SPACING.s,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Alert;
