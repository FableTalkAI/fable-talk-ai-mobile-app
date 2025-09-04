import { StyleSheet, View } from 'react-native';

import { EditAvatarIcon, UserIcon } from '@/assets/icons';
import AutoImage from '@/components/atoms/AutoImage';
import PressableCustom from '@/components/atoms/PressableCustom';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { BOX_SHADOW } from '@/core/constants/styles.ts';
import { useImagePick } from '@/hooks/useImagePick';
import useTheme from '@/hooks/useTheme.ts';

import { AvatarProps } from './types.ts';

const Avatar = ({ size, isChangeable = true, avatarUri, setAvatarUri, style }: AvatarProps) => {
  const { colors } = useTheme();

  const { pickImage, BottomWindowPermissionDenied } = useImagePick({ setAvatarUri });

  const computedStyles = StyleSheet.create({
    container: {
      borderRadius: RADIUS.circle,
      backgroundColor: colors.gray10,
      width: size ?? 144,
      height: size ?? 144,
    },
    editContainer: {
      borderRadius: RADIUS.circle,
      backgroundColor: colors.backgroundBase,
      paddingVertical: SPACING.xs,
      paddingLeft: SPACING.xs,
      boxShadow: BOX_SHADOW.alt,
    },
    image: {
      borderRadius: RADIUS.circle,
    },
  });

  return (
    <View style={style}>
      <View style={[computedStyles.container, styles.container]}>
        {avatarUri ? (
          <AutoImage source={{ uri: avatarUri }} resizeMode="cover" style={[computedStyles.image, styles.image]} />
        ) : (
          <UserIcon />
        )}

        {isChangeable && (
          <PressableCustom
            containerStyle={[computedStyles.editContainer, styles.editContainer]}
            hitSlop={10}
            onPress={pickImage}
          >
            <EditAvatarIcon />
          </PressableCustom>
        )}
      </View>

      <BottomWindowPermissionDenied />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editContainer: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Avatar;
