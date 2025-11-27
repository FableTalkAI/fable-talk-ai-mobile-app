import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ComposerProps } from 'react-native-gifted-chat';

import TextInputCustom from '@/components/atoms/TextInputCustom/index.tsx';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

const Composer = ({ text, onTextChanged, ...props }: ComposerProps) => {
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
      onChangeText={onTextChanged}
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
