import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { setUserAvatarFrame } from '@/features/profile/store/profile/index.ts';
import { XMarkIcon } from '@/shared/assets/icons/index.ts';
import AutoImage from '@/shared/ui/AutoImage/index.tsx';
import Button from '@/shared/ui/Button/index.tsx';
import { ButtonModes } from '@/shared/ui/Button/types.ts';
import PressableCustom from '@/shared/ui/PressableCustom/index.tsx';
import ResizeIcon from '@/shared/ui/ResizeIcon/index.tsx';

import { AvatarFrameSelectorBottomWindowProps } from './types.ts';

const AvatarFrameSelectorBottomWindow = ({ close }: AvatarFrameSelectorBottomWindowProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, avatarFrames } = useProfileStore();

  const [avatarFrame, setAvatarFrame] = useState<string | undefined>('');

  const onApply = () => {
    dispatch(setUserAvatarFrame(avatarFrame));
    close();
  };

  const data = ['none', ...(avatarFrames?.uris || [])];

  const removeFrameIconSize = {
    width: 40,
    height: 40,
  };

  return (
    <View style={styles.wrapper}>
      {isLoading.avatarFrames ? (
        <ActivityIndicator size="large" style={styles.activityIndicator} />
      ) : (
        <>
          {/*TODO:Flatlist, set null, */}
          <FlashList
            numColumns={3}
            renderItem={({ item }) => {
              const isNone = item === 'none';
              const isSelected = isNone ? avatarFrame === undefined : avatarFrame === item;
              return (
                <PressableCustom
                  onPress={() => setAvatarFrame(isNone ? undefined : item)}
                  containerStyle={[styles.itemContainer, isSelected && styles.selectedItem]}
                >
                  {isNone ? (
                    <View style={styles.removeFrameIconContainer}>
                      <ResizeIcon icon={<XMarkIcon />} cloneElementProps={removeFrameIconSize} />
                    </View>
                  ) : (
                    <AutoImage source={item} style={styles.frameSize} />
                  )}
                </PressableCustom>
              );
            }}
            data={data}
          />
          <Button title={t('actions.apply')} mode={ButtonModes.Success} onPress={onApply} />
        </>
      )}
    </View>
  );
};

export default AvatarFrameSelectorBottomWindow;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  activityIndicator: {
    flex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedItem: {
    backgroundColor: 'red',
  },
  removeFrameIconContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  frameSize: {
    width: 100,
    height: 100,
  },
});
