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
    <View style={styles.wrapper}>
      <PressableCustom style={[computedStyles.pressableContainer, styles.pressableContainer, style]} onPress={onPress}>
        <AutoImage source={avatarSource} style={styles.avatar} />

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
    maxWidth: '50%',
    flex: 1,
    boxShadow: BOX_SHADOW.medium,
  },
  pressableContainer: {
    alignItems: 'center',
    borderRadius: RADIUS.medium,
    paddingVertical: SPACING.m,
    gap: SPACING.xxs,
  },
  avatar: {
    width: 44,
    height: 44,
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
