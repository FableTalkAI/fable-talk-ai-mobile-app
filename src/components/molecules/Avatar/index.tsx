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

  const { pickImage } = useImagePick({ setAvatarUri });

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

  return (
    <View style={[computedStyles.container, styles.container, style]}>
      {avatarUri ? <AutoImage source={{ uri: avatarUri }} resizeMode="cover" style={styles.image} /> : <UserIcon />}

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
