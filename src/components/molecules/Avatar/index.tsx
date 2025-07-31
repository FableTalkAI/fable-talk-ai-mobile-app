import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import { EditAvatarIcon, UserIcon } from '@/assets/icons';
import AutoImage from '@/components/atoms/AutoImage';
import PressableCustom from '@/components/atoms/PressableCustom';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import { IS_ANDROID, IS_IOS } from '@/core/constants/device.ts';
import { RADIUS } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

const Avatar = () => {
  const { colors } = useTheme();

  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const requestGalleryPermission = async (): Promise<boolean> => {
    if (IS_ANDROID) {
      const permission =
        Number(Platform.Version) >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

      const result = await request(permission);
      return result === RESULTS.GRANTED;
    }

    if (IS_IOS) {
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
    }

    return false;
  };

  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      console.warn('Permission to access gallery denied');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.warn('ImagePicker Error: ', response.errorMessage);
          return;
        }

        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setAvatarUri(uri);
        }
      },
    );
  };

  const computedStyles = StyleSheet.create({
    container: {
      borderRadius: RADIUS.circle,
      backgroundColor: colors.grayDisabled,
    },
    editContainer: {
      borderRadius: RADIUS.circle,
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

      <ShadowCustom containerStyle={[computedStyles.editContainer, styles.editContainer]} mode="alt">
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
    width: 32,
    height: 32,
    position: 'absolute',
    backgroundColor: 'white',
    paddingVertical: 9,
    paddingLeft: 9,
    bottom: 0,
    right: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Avatar;
