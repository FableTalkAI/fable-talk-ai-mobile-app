import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Composer as GiftedChatComposer, ComposerProps } from 'react-native-gifted-chat';

import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

const Composer = (props: ComposerProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    composer: {
      backgroundColor: colors.gray10,
      paddingRight: SPACING.lg * 2,
    },
  });

  return (
    <GiftedChatComposer
      {...props}
      textInputStyle={[computedStyles.composer, styles.composer]}
      placeholder={t('chat.placeholder')}
    />
  );
};

const styles = StyleSheet.create({
  composer: {
    flex: 1,
    borderRadius: RADIUS.large,
    padding: SPACING.m,
    fontSize: 16,
    marginLeft: SPACING.m,
    marginRight: SPACING.m,
    marginTop: SPACING.xs,
  },
});

export default Composer;
