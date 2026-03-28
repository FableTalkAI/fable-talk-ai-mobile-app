import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';

import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { ArrowForwardIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { HeaderProps } from './types.ts';

const Header = ({ title, onPress, style, rightIcon }: HeaderProps) => {
  const { navigation } = useNavigationRoutes();
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      width: SCREEN_WIDTH - SPACING.lg * 2,
    },
  });

  return (
    <View style={[styles.container, computedStyles.container, style]}>
      <PressableCustom containerStyle={styles.side} onPress={onPress ?? navigation.goBack} hitSlop={10}>
        <ArrowForwardIcon style={styles.arrow} fill={colors.iconPrimary} />
      </PressableCustom>

      <View style={styles.center}>{title && <TextCustom numberOfLines={1} text={title} mode={TextModes.Title} />}</View>

      <View style={styles.side}>{rightIcon}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: SPACING.lg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  side: {
    minWidth: 12,
    justifyContent: 'center',
  },
  arrow: {
    transform: [{ rotate: '180deg' }],
  },
});

export default Header;
