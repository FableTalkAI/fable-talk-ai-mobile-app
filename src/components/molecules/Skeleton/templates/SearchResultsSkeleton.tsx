import { StyleSheet, View } from 'react-native';

import Skeleton from '@/components/molecules/Skeleton/index.tsx';
import { SPACING } from '@/core/constants/sizes.ts';
import { BOX_SHADOW } from '@/core/constants/styles.ts';

const SearchResultsSkeleton = () => {
  return (
    <View style={styles.wrapper}>
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} style={styles.skeleton} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: SPACING.m,
    marginTop: SPACING.m,
  },
  skeleton: {
    maxHeight: 22,
    flex: 1,
    boxShadow: BOX_SHADOW.medium,
  },
});

export default SearchResultsSkeleton;
