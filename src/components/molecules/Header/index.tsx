import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import { ArrowBackIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { HeaderProps } from '@/components/molecules/Header/types.ts';
import { SPACING } from '@/core/constants/sizes.ts';

const Header = ({ header = '' }: HeaderProps) => {
  const navigation = useNavigation();

  const computedStyles = StyleSheet.create({
    container: {
      paddingBottom: SPACING.lg,
    },
  });

  return (
    <View style={[styles.container, computedStyles.container]}>
      <PressableCustom containerStyle={styles.side} onPress={navigation.goBack} hitSlop={10}>
        <ArrowBackIcon />
      </PressableCustom>

      <View style={styles.center}>
        <TextCustom text={header} mode="title" />
      </View>

      <View style={styles.side} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  center: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  side: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default Header;
