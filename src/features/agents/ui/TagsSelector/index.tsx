import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Tag from '@/features/onboarding/ui/Tag';
import { PencilIcon, TagSelectedIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import PressableCustom from '@/shared/ui/PressableCustom';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { TagsSelectorProps } from './types.ts';

const TagsSelector = ({ onPress, tags }: TagsSelectorProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    sectionBackground: {
      backgroundColor: colors.backgroundSecondary,
    },
    container: {
      gap: SPACING.xxs / 2,
    },
  });

  return (
    <PressableCustom onPress={onPress} style={computedStyles.container}>
      <TextCustom mode={TextModes.Base} text={t('createAgent.tags.label')} />

      <View style={[computedStyles.sectionBackground, styles.sectionBackground]}>
        <View style={styles.subtitleContainer}>
          <View style={styles.selectedTextContainer}>
            <TagSelectedIcon />
            <TextCustom text={t('createAgent.tags.subtitle')} />
          </View>

          {!!tags.length && <PencilIcon fill={colors.textSecondary} />}
        </View>

        <FlatList
          data={tags}
          contentContainerStyle={styles.selectedTagsContainer}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Tag disabled title={item} forceActive />}
          ListEmptyComponent={
            <Animated.View exiting={FadeOut} entering={FadeIn} style={styles.noResultsContainer}>
              <TextCustom
                mode={TextModes.Secondary}
                textColor={colors.gray50}
                text={t('createAgent.tags.placeholder')}
              />
            </Animated.View>
          }
        />
      </View>
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  subtitleContainer: {
    paddingHorizontal: SPACING.xs,
    paddingTop: SPACING.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xxs,
  },
  sectionBackground: {
    boxShadow: BOX_SHADOW.base,
    borderRadius: RADIUS.medium,
  },
  selectedTagsContainer: {
    paddingTop: SPACING.xxs,
    paddingHorizontal: SPACING.xs,
    gap: SPACING.xxs,
    paddingBottom: SPACING.xs,
    height: 40,
    flex: 1,
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default TagsSelector;
