import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { EditAvatarIcon, UserIcon } from '@/assets/icons';
import AutoImage from '@/components/atoms/AutoImage';
import PressableCustom from '@/components/atoms/PressableCustom';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import { ShadowCustomModes } from '@/components/atoms/ShadowCustom/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { usePermissions } from '@/hooks/usePermissions.ts';
import useTheme from '@/hooks/useTheme.ts';

const Avatar = () => {
  const { colors } = useTheme();
  const { handleAccessGallery } = usePermissions();

  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const pickImage = async () => {
    const hasPermission = await handleAccessGallery();
    if (!hasPermission) {
      console.warn('Permission to access gallery denied');
      return;
    }

    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      if (response.didCancel) return;
      if (response.errorCode) {
        console.warn('ImagePicker Error: ', response.errorMessage);
        return;
      }

      const uri = response.assets?.[0]?.uri;
      if (uri) {
        setAvatarUri(uri);
      }
    } catch (error) {
      console.warn('ImagePicker failed: ', error);
    }
  };

  const computedStyles = StyleSheet.create({
    container: {
      borderRadius: RADIUS.circle,
      backgroundColor: colors.grayDisabled,
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

      <ShadowCustom containerStyle={[computedStyles.editContainer, styles.editContainer]} mode={ShadowCustomModes.Alt}>
        <PressableCustom hitSlop={10} onPress={pickImage}>
          <EditAvatarIcon />
        </PressableCustom>
      </ShadowCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 144,
    height: 144,
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
