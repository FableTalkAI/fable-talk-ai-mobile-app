import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ComposerProps } from 'react-native-gifted-chat';
import LinearGradient from 'react-native-linear-gradient';

import useTheme from '@/shared/hooks/useTheme';
import { UseThemeParams } from '@/shared/hooks/useTheme/types.ts';
import { IS_ANDROID } from '@/shared/model/device.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
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
  const { colors, setColorOpacity } = useTheme({ themeMode });
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    composer: {
      backgroundColor: colors.backgroundSecondary,
      paddingRight: SPACING.lg * 2,
    },
  });

  return (
    <View>
      <LinearGradient
        colors={[colors.backgroundTertiary, setColorOpacity(colors.backgroundTertiary, 0)]}
        locations={IS_ANDROID ? [0, 0.55] : [0.55, 0]}
        style={styles.gradient}
      />

      <TextInputCustom
        {...props}
        value={text}
        onChangeText={textInputProps?.onChangeText}
        style={[computedStyles.composer, styles.composer, style]}
        wrapperStyle={[styles.wrapper, wrapperStyle]}
        placeholder={t('chat.placeholder')}
        multiline
      />
    </View>
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
    zIndex: 1,
    boxShadow: BOX_SHADOW.medium,
  },
  wrapper: {
    borderRadius: 0,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    width: '100%',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    transform: [{ rotateX: '180deg' }],
    height: 100,
    bottom: 0,
  },
});

export default Composer;
