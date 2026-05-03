import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { EditAvatarIcon, ImagePlusIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import AutoImage from '@/shared/ui/AutoImage';
import ComponentLoader from '@/shared/ui/ComponentLoader';
import PressableCustom from '@/shared/ui/PressableCustom';

import { AvatarProps } from './types.ts';

const Avatar = ({
  size = 144,
  isChangeable = true,
  frameUri,
  style,
  isLoading,
  uri,
  onPickImage,
  withEnteringAnimation = true,
}: AvatarProps) => {
  const { colors } = useTheme();

  const frameScale = 1.2;
  const frameSize = size * frameScale;

  const frameOffset = ((frameSize - size) / 2) * -1;

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundSecondary,
      width: size,
      height: size,
    },
    editContainer: {
      backgroundColor: colors.backgroundBase,
    },
  });

  return (
    <PressableCustom
      withEnteringAnimation={withEnteringAnimation}
      disabled={!!uri}
      onPress={onPickImage}
      style={[computedStyles.container, styles.container, style]}
    >
      <View style={styles.imageContainer}>
        {uri ? (
          <AutoImage source={{ uri }} resizeMode="cover" style={styles.image} />
        ) : (
          <ImagePlusIcon width={80} height={80} color={colors.gray50} />
        )}

        <ComponentLoader isVisible={isLoading} />
      </View>

      {frameUri && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          key={frameUri}
          style={[styles.frameImage, { top: frameOffset, left: frameOffset }]}
        >
          <AutoImage
            source={frameUri}
            style={{
              width: frameSize,
              height: frameSize,
            }}
            pointerEvents="none"
          />
        </Animated.View>
      )}

      {isChangeable && uri && (
        <PressableCustom
          containerStyle={[computedStyles.editContainer, styles.editContainer]}
          hitSlop={10}
          onPress={onPickImage}
        >
          <EditAvatarIcon fill={colors.iconPrimary} />
        </PressableCustom>
      )}
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.circle,
    marginTop: SPACING.lg,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: RADIUS.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameImage: {
    position: 'absolute',
    zIndex: 4,
    resizeMode: 'contain',
  },
  editContainer: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 0,
    right: 10,
    zIndex: 5,
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
