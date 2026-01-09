import { StyleSheet, View } from 'react-native';

import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import Avatar from '@/features/profile/ui/Avatar';
import { ImagePlusIcon } from '@/shared/assets/icons';
import { useImagePick } from '@/shared/hooks/useImagePick.ts';
import { WINDOW_WIDTH } from '@/shared/model/device.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';

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
