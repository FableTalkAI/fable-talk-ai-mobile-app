import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import useCustomizationStore from '@/features/customization/hooks/useCustomizationStore.ts';
import AvatarSelectorItem from '@/features/customization/ui/AvatarSelectorItem';
import useBottomWindow from '@/features/overlay/hooks/useBottomWindow.ts';
import UserAvatar from '@/features/profile/ui/UserAvatar';
import Button from '@/shared/ui/Button';
import Header from '@/shared/ui/Header';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';

const CustomizationScreen = () => {
  const { t } = useTranslation();

  const { avatarFrames, setUserAvatarFrameHandler, getAvatarFramesHandler } = useCustomizationStore();

  const openAvatarFrameBottomWindow = () => {
    getAvatarFramesHandler().catch(console.error);
  };

  const onApply = (uri: string) => () => {
    setUserAvatarFrameHandler(uri);
  };

  return (
    <SafeAreaViewCustom withHorizontalPadding={false}>
      <Header title={t('common.customization')} />
      <View style={styles.wrapper}>
        <UserAvatar style={styles.avatar} isChangeable={false} />

        <FlatList
          data={avatarFrames?.uris || []}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <AvatarSelectorItem item={item} onPress={onApply(item)} />}
        />
        <Button title="few" onPress={openAvatarFrameBottomWindow} />
      </View>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  avatar: {
    alignSelf: 'center',
  },
});

export default CustomizationScreen;
