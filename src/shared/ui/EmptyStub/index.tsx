import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useTheme from '@/shared/hooks/useTheme';
import { WINDOW_WIDTH } from '@/shared/model/device.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import ResizeIcon from '@/shared/ui/ResizeIcon';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { EmptyStubProps, EmptyStubSizes } from './types.tsx';

const EmptyStubModes: Record<EmptyStubSizes, { size: number; titleMode: TextModes; subtitleMode: TextModes }> = {
  [EmptyStubSizes.Default]: {
    size: 90,
    titleMode: TextModes.Title,
    subtitleMode: TextModes.Base,
  },
  [EmptyStubSizes.Small]: {
    size: 40,
    titleMode: TextModes.Secondary,
    subtitleMode: TextModes.Caption,
  },
};

const EmptyStub = ({
  icon,
  style,
  subtitle,
  title,
  cloneElementProps,
  size = EmptyStubSizes.Default,
}: EmptyStubProps) => {
  const { colors } = useTheme();

  const { size: optionSize, titleMode, subtitleMode } = EmptyStubModes[size];

  const computedStyles = StyleSheet.create({
    textContainer: {
      maxWidth: WINDOW_WIDTH - SPACING.xl * 2,
    },
  });

  const iconOptions = {
    width: optionSize,
    height: optionSize,
    fill: colors.gray40,
    ...cloneElementProps,
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={[styles.container, style]}>
      <ResizeIcon cloneElementProps={iconOptions} icon={icon} />

      <View style={[styles.textContainer, computedStyles.textContainer]}>
        <TextCustom style={styles.text} text={title} mode={titleMode} />
        <TextCustom style={styles.text} text={subtitle} mode={subtitleMode} textColor={colors.textSecondary} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginTop: SPACING.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default EmptyStub;
