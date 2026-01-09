import { StyleSheet, View } from 'react-native';

import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { ArrowForwardIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { HeaderProps } from './types.ts';

const Header = ({ title, onPress, style }: HeaderProps) => {
  const { navigation } = useNavigationRoutes();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <PressableCustom containerStyle={styles.side} onPress={onPress ?? navigation.goBack} hitSlop={10}>
        <ArrowForwardIcon fill={colors.iconPrimary} />
      </PressableCustom>

      <View style={styles.center}>{title && <TextCustom text={title} mode={TextModes.Title} />}</View>

      <View style={styles.side} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SPACING.lg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  side: {
    width: 12,
    justifyContent: 'center',
    transform: [{ rotate: '180deg' }],
  },
});

export default Header;
