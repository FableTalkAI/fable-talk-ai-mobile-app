import { StyleSheet } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';

import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import Avatar from '@/shared/ui/Avatar';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { EmptyChatStubProps } from './types.ts';

const EmptyChatStub = ({ description, avatarUrl }: EmptyChatStubProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    text: {
      backgroundColor: colors.backgroundSecondary,
    },
  });

  return (
    <Animated.View exiting={FadeOut} style={styles.container}>
      <Avatar withEnteringAnimation={false} size={80} uri={avatarUrl} isChangeable={false} />
      <TextCustom mode={TextModes.Secondary} text={description} style={[styles.text, computedStyles.text]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{ rotateX: '180deg' }],
    alignItems: 'center',
    paddingBottom: '60%',
    padding: SPACING.lg,
    gap: SPACING.xs,
  },
  text: {
    padding: SPACING.s,
    borderRadius: RADIUS.medium,
  },
});

export default EmptyChatStub;
