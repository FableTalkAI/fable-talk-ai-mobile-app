import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import Button from '@/components/atoms/Button';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { AlertProps } from './types.ts';

const Alert = ({ title, subtitle, onConfirm, onConfirmText, onCancel }: AlertProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    cancelButton: {
      backgroundColor: colors.gray40,
    },
    confirmButton: {
      backgroundColor: colors.link,
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.textContainer}>
        <TextCustom mode={TextModes.Subtitle} text={title} />
        <TextCustom mode={TextModes.Secondary} text={subtitle} />
      </View>

      <View style={styles.container}>
        <Button
          onPress={onCancel}
          style={computedStyles.cancelButton}
          containerStyle={styles.button}
          title={t('common.cancel')}
        />
        <Button
          onPress={onConfirm}
          style={computedStyles.confirmButton}
          containerStyle={styles.button}
          title={onConfirmText}
        />
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
  button: {
    width: '49%',
  },
});

export default Alert;
