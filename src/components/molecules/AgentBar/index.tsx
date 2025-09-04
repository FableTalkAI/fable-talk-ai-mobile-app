import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import AutoImage from '@/components/atoms/AutoImage';
import PressableCustom from '@/components/atoms/PressableCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import Tag from '@/components/molecules/Tag';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { BOX_SHADOW } from '@/core/constants/styles.ts';
import useTheme from '@/hooks/useTheme.ts';

import { AgentBarProps } from './types.ts';

const AgentBar = ({ name, description, tags, avatarSource, style, onPress }: AgentBarProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    wrapper: {
      boxShadow: BOX_SHADOW.medium,
    },
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
    <View style={[styles.wrapper, computedStyles.wrapper]}>
      <PressableCustom style={[computedStyles.pressableContainer, styles.pressableContainer, style]} onPress={onPress}>
        <AutoImage source={avatarSource} style={[styles.avatar, computedStyles.avatar]} />

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
          style={[computedStyles.flatList, styles.flatList]}
          contentContainerStyle={computedStyles.flatListContainer}
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
    flexBasis: '45%',
  },
  pressableContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'yellow',
    flex: 1,
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
