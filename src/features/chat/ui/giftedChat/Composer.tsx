import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ComposerProps } from 'react-native-gifted-chat';

import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import TextInputCustom from '@/shared/ui/TextInputCustom';

const Composer = ({ text, textInputProps, ...props }: ComposerProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    composer: {
      backgroundColor: colors.backgroundSecondary,
      paddingRight: SPACING.lg * 2,
    },
    wrapper: {
      backgroundColor: colors.backgroundTertiary,
    },
  });

  return (
    <TextInputCustom
      {...props}
      value={text}
      onChangeText={textInputProps?.onChangeText}
      style={[computedStyles.composer, styles.composer]}
      wrapperStyle={[computedStyles.wrapper, styles.wrapper]}
      placeholder={t('chat.placeholder')}
      multiline
    />
  );
};

const styles = StyleSheet.create({
  composer: {
    minHeight: 54,
    maxHeight: 160,
    borderRadius: RADIUS.large,
    paddingTop: SPACING.m,
    paddingLeft: SPACING.m,
    paddingBottom: SPACING.m,
  },
  wrapper: {
    borderRadius: 0,
  },
});

export default Composer;
