import { StyleSheet, View } from 'react-native';

import { EditAvatarIcon, UserIcon } from '@/assets/icons';
import AutoImage from '@/components/atoms/AutoImage';
import PressableCustom from '@/components/atoms/PressableCustom';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import { ShadowCustomModes } from '@/components/atoms/ShadowCustom/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { useImagePick } from '@/hooks/useImagePick';
import useTheme from '@/hooks/useTheme.ts';

import { AvatarProps } from './types.ts';

const Avatar = ({ size, isChangeable = true, avatarUri, setAvatarUri }: AvatarProps) => {
  const { colors } = useTheme();

  const { pickImage } = useImagePick({ setAvatarUri });

  const computedStyles = StyleSheet.create({
    container: {
      borderRadius: RADIUS.circle,
      backgroundColor: colors.grayDisabled,
      width: size ?? 144,
      height: size ?? 144,
    },
    editContainer: {
      borderRadius: RADIUS.circle,
      backgroundColor: colors.backgroundBase,
      paddingVertical: SPACING.xs,
      paddingLeft: SPACING.xs,
    },
    image: {
      borderRadius: RADIUS.circle,
    },
  });

  return (
    <View style={[computedStyles.container, styles.container]}>
      {avatarUri ? (
        <AutoImage source={{ uri: avatarUri }} resizeMode="cover" style={[computedStyles.image, styles.image]} />
      ) : (
        <UserIcon />
      )}

      {isChangeable && (
        <ShadowCustom
          containerStyle={[computedStyles.editContainer, styles.editContainer]}
          mode={ShadowCustomModes.Alt}
        >
          <PressableCustom hitSlop={10} onPress={pickImage}>
            <EditAvatarIcon />
          </PressableCustom>
        </ShadowCustom>
      )}
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
