import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ComposerProps } from 'react-native-gifted-chat';

import useTheme from '@/shared/hooks/useTheme';
import { UseThemeParams } from '@/shared/hooks/useTheme/types.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import TextInputCustom from '@/shared/ui/TextInputCustom';
import { TextInputCustomProps } from '@/shared/ui/TextInputCustom/types.ts';

const Composer = ({
  text,
  textInputProps,
  style,
  wrapperStyle,
  themeMode,
  ...props
}: ComposerProps & TextInputCustomProps & UseThemeParams) => {
  const { colors } = useTheme({ themeMode });
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    composer: {
      backgroundColor: colors.backgroundSecondary,
      paddingRight: SPACING.lg * 2,
    },
  });

  return (
    <TextInputCustom
      {...props}
      value={text}
      onChangeText={textInputProps?.onChangeText}
      style={[computedStyles.composer, styles.composer, style]}
      wrapperStyle={[styles.wrapper, wrapperStyle]}
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
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    width: '100%',
  },
});

export default Composer;
