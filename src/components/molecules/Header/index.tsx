import { StyleSheet, View } from 'react-native';

import { ArrowForwardIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { SPACING } from '@/core/constants/sizes.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';
import useTheme from '@/hooks/useTheme.ts';

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
