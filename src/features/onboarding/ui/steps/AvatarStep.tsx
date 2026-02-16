import { StyleSheet, View } from 'react-native';

import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { useUserAvatarPick } from '@/features/profile/hooks/useUserAvatarPick.ts';
import UserAvatar from '@/features/profile/ui/UserAvatar';
import { ImagePlusIcon } from '@/shared/assets/icons';
import { WINDOW_WIDTH } from '@/shared/model/device.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom';

const AvatarStep = () => {
  const { profile } = useProfileStore();

  const { pickImage } = useUserAvatarPick();

  return (
    <View style={styles.container}>
      {profile?.avatarUrl ? (
        <UserAvatar size={WINDOW_WIDTH * 0.7} isChangeable={false} />
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
