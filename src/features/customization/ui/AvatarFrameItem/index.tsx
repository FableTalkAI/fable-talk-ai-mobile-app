import { StyleSheet } from 'react-native';

import { CheckmarkRoundedIcon } from '@/shared/assets/icons/index.ts';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS } from '@/shared/model/sizes.ts';
import AutoImage from '@/shared/ui/AutoImage';
import PressableCustom from '@/shared/ui/PressableCustom';

import { AvatarFrameItemProps } from './types.ts';

const AvatarFrameItem = ({ item, onPress, isSelected }: AvatarFrameItemProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    icon: {
      backgroundColor: colors.backgroundBase,
    },
  });

  return (
    <PressableCustom onPress={onPress} containerStyle={styles.itemContainer}>
      <AutoImage source={item} style={styles.frameSize} />

      {isSelected && <CheckmarkRoundedIcon width={20} height={20} style={[styles.icon, computedStyles.icon]} />}
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
  },
  frameSize: {
    width: 100,
    height: 100,
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: RADIUS.circle,
  },
});

export default AvatarFrameItem;
