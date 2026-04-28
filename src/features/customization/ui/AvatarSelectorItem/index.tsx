import { StyleSheet } from 'react-native';

import AutoImage from '@/shared/ui/AutoImage';
import PressableCustom from '@/shared/ui/PressableCustom';

export type AvatarSelectorItemProps = {
  item: string;
  onPress: () => void;
};

const AvatarSelectorItem = ({ item, onPress }: AvatarSelectorItemProps) => {
  return (
    <PressableCustom onPress={onPress} containerStyle={styles.itemContainer}>
      <AutoImage source={item} style={styles.frameSize} />
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  frameSize: {
    width: 100,
    height: 100,
  },
});

export default AvatarSelectorItem;
