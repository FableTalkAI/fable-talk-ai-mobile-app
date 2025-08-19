import { StyleSheet, View } from 'react-native';

import { ImagePlusIcon } from '@/assets/icons';
import PressableCustom from '@/components/atoms/PressableCustom';
import Avatar from '@/components/molecules/Avatar';
import { WINDOW_WIDTH } from '@/core/constants/device.ts';
import { SPACING } from '@/core/constants/sizes.ts';
import { useImagePick } from '@/hooks/useImagePick';
import useUserStore from '@/hooks/useUserStore.ts';

const AvatarStep = () => {
  const { profile, setProfileHandler } = useUserStore();

  const setAvatarUri = (uri: string) => {
    setProfileHandler({ ...profile, avatarUri: uri });
  };
  const { pickImage } = useImagePick({ setAvatarUri });

  const computedStyles = StyleSheet.create({
    container: {
      marginBottom: SPACING.xl,
    },
  });

  return (
    <View style={[styles.container, computedStyles.container]}>
      {profile?.avatarUri ? (
        <Avatar size={WINDOW_WIDTH * 0.7} isChangeable={false} avatarUri={profile?.avatarUri} />
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
  },
});

export default AvatarStep;
