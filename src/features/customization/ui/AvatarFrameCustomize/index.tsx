import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import useCustomizationStore from '@/features/customization/hooks/useCustomizationStore.ts';
import AvatarFrameItem from '@/features/customization/ui/AvatarFrameItem';
import UserAvatar from '@/features/profile/ui/UserAvatar';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import Skeleton from '@/shared/ui/Skeleton';

const AvatarFrameCustomize = () => {
  const flatListRef = useRef<FlatList>(null);
  const { isLoading, avatarFrames, setUserAvatarFrameHandler, userAvatarFrame } = useCustomizationStore();

  const data = useMemo(() => avatarFrames?.uris || [], [avatarFrames?.uris]);

  const getItemLayoutHandler = (_: ArrayLike<any> | null | undefined, index: number) => ({
    length: 100 + SPACING.m,
    offset: 100 * index + SPACING.xl,
    index,
  });

  const onApply = (uri: string) => () => {
    const newUri = uri === userAvatarFrame ? null : uri;
    setUserAvatarFrameHandler(newUri);
  };

  useEffect(() => {
    if (userAvatarFrame && data.length > 0) {
      const index = data.indexOf(userAvatarFrame);

      if (index !== -1) {
        const timeout = setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
          });
        }, 100);

        return () => clearTimeout(timeout);
      }
    }
  }, [data, userAvatarFrame]);

  const listEmptyComponent = useMemo(
    () =>
      isLoading.avatarFrames ? (
        <View style={styles.skeletonContainer}>
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} style={styles.skeleton} />
          ))}
        </View>
      ) : null,
    [isLoading.avatarFrames],
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.avatarContainer}>
        <UserAvatar size={Math.min(300, SCREEN_WIDTH * 0.6)} style={styles.avatar} isChangeable={false} />
      </View>

      <View>
        <FlatList
          ref={flatListRef}
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          getItemLayout={getItemLayoutHandler}
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={listEmptyComponent}
          renderItem={({ item }) => (
            <AvatarFrameItem item={item} onPress={onApply(item)} isSelected={item === userAvatarFrame} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: SPACING.xl * 2,
  },
  avatar: {
    alignSelf: 'center',
  },

  list: {
    marginHorizontal: -SPACING.xl,
  },
  listContainer: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.m,
  },
  skeletonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  skeleton: {
    height: 100,
    width: 100,
    borderRadius: RADIUS.circle,
  },
});

export default AvatarFrameCustomize;
