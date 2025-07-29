import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import AutoImage from '@/components/atoms/AutoImage';
import PressableCustom from '@/components/atoms/PressableCustom';
import ShadowCustom from '@/components/atoms/ShadowCustom';
import TextCustom from '@/components/atoms/TextCustom';
import { AgentBarProps } from '@/components/molecules/AgentBar/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

const AgentBar = ({ agentName, agentDescription, tags, avatarSource, style }: AgentBarProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    shadowStyle: {
      backgroundColor: colors.backgroundBase,
      borderRadius: RADIUS.medium,
      paddingVertical: SPACING.m,
      gap: SPACING.xs,
      width: 150,
    },
    avatar: {
      borderRadius: RADIUS.circle,
    },
    agentName: {
      color: colors.textPrimary,
    },
    agentDescription: {
      color: colors.textSecondary,
      paddingHorizontal: SPACING.s,
    },
    flatList: {
      paddingVertical: SPACING.xxs,
    },
    tagsContainer: {
      paddingHorizontal: SPACING.m,
      gap: SPACING.xxs,
    },
    tags: {
      borderColor: colors.primary40,
      borderRadius: RADIUS.medium,
      paddingVertical: SPACING.xxs,
      paddingHorizontal: SPACING.xs,
    },
    tagsText: {
      color: colors.primary40,
    },
  });

  return (
    <ShadowCustom style={[computedStyles.shadowStyle, styles.shadowStyle, style]} mode="medium">
      <AutoImage source={avatarSource} style={[styles.avatar, computedStyles.avatar]} />

      <TextCustom text={agentName} mode="secondary" style={computedStyles.agentName} />
      <TextCustom
        text={agentDescription}
        mode="extra-small"
        style={computedStyles.agentDescription}
        numberOfLines={2}
      />

      <FlatList
        horizontal
        data={tags}
        style={computedStyles.flatList}
        contentContainerStyle={computedStyles.tagsContainer}
        renderItem={({ item }) => (
          <PressableCustom style={[styles.tags, computedStyles.tags]}>
            <TextCustom text={item} mode="tag" style={computedStyles.tagsText} />
          </PressableCustom>
        )}
      />
    </ShadowCustom>
  );
};

const styles = StyleSheet.create({
  shadowStyle: {
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
  },
  tags: {
    borderWidth: 2,
  },
});

export default AgentBar;
