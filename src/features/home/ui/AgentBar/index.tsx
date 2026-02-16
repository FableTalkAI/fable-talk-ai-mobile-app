import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Tag from '@/features/onboarding/ui/Tag';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import AutoImage from '@/shared/ui/AutoImage';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { AgentBarProps } from './types.ts';

const AgentBar = ({ name, description, tags, avatarSource, style, onPress }: AgentBarProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    wrapper: {
      width: (SCREEN_WIDTH - SPACING.xl * 2 - SPACING.lg) / 2,
    },
    pressableContainer: {
      backgroundColor: colors.backgroundBase,
    },
    name: {
      color: colors.textPrimary,
    },
    description: {
      color: colors.textSecondary,
    },
  });

  return (
    <View style={[styles.wrapper, computedStyles.wrapper]}>
      <PressableCustom style={[computedStyles.pressableContainer, styles.pressableContainer, style]} onPress={onPress}>
        <AutoImage source={avatarSource} style={styles.avatar} resizeMode="cover" />

        <TextCustom text={name} mode={TextModes.Secondary} style={computedStyles.name} />
        <TextCustom
          text={description}
          mode={TextModes.ExtraSmall}
          style={[computedStyles.description, styles.description]}
          numberOfLines={2}
        />

        <FlatList
          horizontal
          data={tags}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContainer}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          renderItem={({ item }) => <Tag title={item} forceActive />}
        />
      </PressableCustom>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    boxShadow: BOX_SHADOW.medium,
    borderRadius: RADIUS.medium,
  },
  pressableContainer: {
    alignItems: 'center',
    borderRadius: RADIUS.medium,
    paddingVertical: SPACING.m,
    gap: SPACING.xxs,
  },
  avatar: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.circle,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: SPACING.s,
    height: 24,
    textAlignVertical: 'center',
  },
  flatList: {
    maxHeight: 40,
    paddingVertical: SPACING.xxs,
  },
  flatListContainer: {
    paddingHorizontal: SPACING.m,
    gap: SPACING.xxs,
  },
});

export default AgentBar;
