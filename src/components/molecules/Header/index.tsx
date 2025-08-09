import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import { ArrowForwardIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { HeaderProps } from '@/components/molecules/Header/types.ts';
import { SPACING } from '@/core/constants/sizes.ts';

const Header = ({ title }: HeaderProps) => {
  const navigation = useNavigation();

  const computedStyles = StyleSheet.create({
    container: {
      paddingBottom: SPACING.lg,
    },
  });

  return (
    <View style={[styles.container, computedStyles.container]}>
      <PressableCustom containerStyle={styles.side} onPress={navigation.goBack} hitSlop={10}>
        <ArrowForwardIcon />
      </PressableCustom>

      <View style={styles.center}>
        <TextCustom text={title} mode="title" />
      </View>

      <View style={styles.side} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
