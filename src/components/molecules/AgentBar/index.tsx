import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import AutoImage from '@/components/atoms/AutoImage';
import PressableCustom from '@/components/atoms/PressableCustom';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import TextCustom from '@/components/atoms/TextCustom';
import Tag from '@/components/molecules/Tag';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { AgentBarProps } from './types.ts';

const AgentBar = ({ name, description, tags, avatarSource, style, onPress }: AgentBarProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    pressableContainer: {
      backgroundColor: colors.backgroundBase,
      borderRadius: RADIUS.medium,
      paddingVertical: SPACING.m,
      gap: SPACING.xs,
    },
    avatar: {
      borderRadius: RADIUS.circle,
    },
    name: {
      color: colors.textPrimary,
    },
    description: {
      color: colors.textSecondary,
      paddingHorizontal: SPACING.s,
    },
    flatList: {
      paddingVertical: SPACING.xxs,
    },
    flatListContainer: {
      paddingHorizontal: SPACING.m,
      gap: SPACING.xxs,
    },
  });

  return (
    <ShadowCustom containerStyle={styles.shadowContainer} mode="medium">
      <PressableCustom style={[computedStyles.pressableContainer, styles.pressableContainer, style]} onPress={onPress}>
        <AutoImage source={avatarSource} style={[styles.avatar, computedStyles.avatar]} />

        <TextCustom text={name} mode="secondary" style={computedStyles.name} />
        <TextCustom
          text={description}
          mode="extra-small"
          style={[computedStyles.description, styles.description]}
          numberOfLines={2}
        />

        <FlatList
          horizontal
          data={tags}
          style={[computedStyles.flatList, styles.flatList]}
          contentContainerStyle={computedStyles.flatListContainer}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Tag title={item} forceActive />}
        />
      </PressableCustom>
    </ShadowCustom>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    flexBasis: '45%',
  },
  pressableContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
  },
  description: {
    textAlign: 'center',
  },
  flatList: {
    maxHeight: 40,
  },
});

export default AgentBar;
