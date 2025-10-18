import { StyleSheet, View } from 'react-native';

import { ImagePlusIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import Avatar from '@/components/molecules/Avatar';
import { WINDOW_WIDTH } from '@/core/constants/device.ts';
import { SPACING } from '@/core/constants/sizes.ts';
import { useImagePick } from '@/hooks/useImagePick.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';

const AvatarStep = () => {
  const { profile } = useProfileStore();

  const { pickImage } = useImagePick();

  return (
    <View style={styles.container}>
      {profile?.avatarUrl ? (
        <Avatar size={WINDOW_WIDTH * 0.7} isChangeable={false} />
      ) : (
        <PressableCustom onPress={pickImage}>
          <ImagePlusIcon width={WINDOW_WIDTH} height={WINDOW_WIDTH * 0.7} />
        </PressableCustom>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
});

export default AvatarStep;
