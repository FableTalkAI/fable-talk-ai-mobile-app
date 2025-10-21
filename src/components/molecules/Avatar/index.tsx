import { BACKEND_BASE_URL } from '@env';
import { StyleSheet, View } from 'react-native';

import { EditAvatarIcon, UserIcon } from '@/assets/icons';
import AutoImage from '@/components/atoms/AutoImage';
import PressableCustom from '@/components/atoms/PressableCustom';
import ComponentLoader from '@/components/molecules/ComponentLoader/index.tsx';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { BOX_SHADOW } from '@/core/constants/styles.ts';
import { useImagePick } from '@/hooks/useImagePick.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';
import useTheme from '@/hooks/useTheme.ts';

import { AvatarProps } from './types.ts';

const Avatar = ({ size, isChangeable = true, style }: AvatarProps) => {
  const { colors } = useTheme();
  const { profile, isLoading } = useProfileStore();

  const { pickImage } = useImagePick();

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.gray10,
      width: size ?? 144,
      height: size ?? 144,
    },
    editContainer: {
      backgroundColor: colors.backgroundBase,
    },
  });

  const getAvatarUrl = () => {
    if (!profile) return '';
    if (profile.avatarUrl.startsWith('http')) return profile.avatarUrl;
    return BACKEND_BASE_URL + profile.avatarUrl;
  };

  return (
    <View style={[computedStyles.container, styles.container, style]}>
      <View style={styles.imageContainer}>
        {profile && profile.avatarUrl ? (
          <AutoImage source={{ uri: getAvatarUrl() }} resizeMode="cover" style={styles.image} />
        ) : (
          <UserIcon />
        )}

        <ComponentLoader isVisible={isLoading.uploadAvatar} />
      </View>

      {isChangeable && (
        <PressableCustom
          containerStyle={[computedStyles.editContainer, styles.editContainer]}
          hitSlop={10}
          onPress={pickImage}
        >
          <EditAvatarIcon fill={colors.iconPrimary} />
        </PressableCustom>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.circle,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: RADIUS.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editContainer: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 0,
    right: 10,
    borderRadius: RADIUS.circle,
    paddingVertical: SPACING.xs,
    paddingLeft: SPACING.xs,
    boxShadow: BOX_SHADOW.alt,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.circle,
  },
});

export default Avatar;
