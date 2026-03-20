import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import { Tag as TagType } from '@/features/agents/store/agents/types.ts';
import SearchInput from '@/features/home/ui/SearchInput';
import { Languages } from '@/features/locales/types.ts';
import Tag from '@/features/onboarding/ui/Tag';
import { TagSelectedIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import EmptyStub from '@/shared/ui/EmptyStub';
import { EmptyStubSizes } from '@/shared/ui/EmptyStub/types.tsx';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { TagsSelectorProps } from './types.ts';

const TagsSelector = ({ selectedTags, setSelectedTags }: TagsSelectorProps) => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();

  const { tags } = useAgentsStore();

  const [filteredTags, setFilteredTags] = useState(tags);

  const computedStyles = StyleSheet.create({
    sectionBackground: {
      backgroundColor: colors.backgroundSecondary,
    },
  });

  const onStopHandler = useCallback(
    (value: string) => {
      setFilteredTags(tags.filter(tag => tag.locale[i18n.resolvedLanguage as Languages].includes(value)));
    },
    [i18n.resolvedLanguage, tags],
  );

  const onToggle = (tag: TagType) => {
    if (selectedTags.find(i => i.id === tag.id)) {
      setSelectedTags(selectedTags.filter(selectedTag => selectedTag.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={[computedStyles.sectionBackground, styles.sectionBackground]}>
        <View style={styles.searchAndTagsNumberContainer}>
          <SearchInput withShadow={false} placeholder={t('bottomWindows.tagsSelector.tags')} onStop={onStopHandler} />
          <TextCustom text={String(filteredTags.length)} />
        </View>

        <FlatList
          data={filteredTags}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.tagsFlatListWrapper}
          style={styles.tagsFlatList}
          contentContainerStyle={styles.tagsFlatListContainer}
          numColumns={2}
          renderItem={({ item }) => (
            <Tag
              tag={item}
              containerStyle={styles.tagContainer}
              style={styles.tag}
              onToggle={onToggle}
              isSelected={selectedTags.some(i => i.id === item.id)}
            />
          )}
          ListEmptyComponent={
            <EmptyStub
              style={styles.empty}
              size={EmptyStubSizes.Small}
              icon={<TagSelectedIcon />}
              title={t('empty.tagSearch.title')}
              subtitle={t('empty.tagSearch.subtitle')}
            />
          }
        />
      </View>

      <View style={[computedStyles.sectionBackground, styles.sectionBackground]}>
        <View style={styles.selectedTextWrapper}>
          <View style={styles.selectedTextContainer}>
            <TagSelectedIcon />
            <TextCustom text={t('bottomWindows.tagsSelector.selectedTags')} />
          </View>

          {!!selectedTags.length && (
            <Animated.View key={selectedTags.length} exiting={FadeOut} entering={FadeIn}>
              <TextCustom text={selectedTags.length} />
            </Animated.View>
          )}
        </View>

        <FlatList
          data={selectedTags}
          contentContainerStyle={styles.selectedTagsContainer}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Tag tag={item} forceActive onToggle={onToggle} />}
          ListEmptyComponent={
            <Animated.View exiting={FadeOut} entering={FadeIn} style={styles.noResultsContainer}>
              <TextCustom mode={TextModes.Secondary} textColor={colors.gray50} text={t('empty.selectedTags.title')} />
            </Animated.View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: SPACING.m,
  },
  empty: {
    paddingHorizontal: SPACING.m,
    height: 184,
  },
  searchAndTagsNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    gap: SPACING.xxs,
    paddingRight: SPACING.xs,
  },
  tagContainer: {
    flex: 1,
    maxWidth: '50%',
  },
  tag: {
    paddingVertical: SPACING.xs,
  },
  selectedTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.xxs,
    paddingHorizontal: SPACING.xs,
    paddingTop: SPACING.xs,
  },
  selectedTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xxs,
  },
  sectionBackground: {
    boxShadow: BOX_SHADOW.medium,
    borderRadius: RADIUS.small,
  },
  tagsFlatListContainer: {
    padding: SPACING.xs,
  },
  tagsFlatList: {
    height: 184,
  },
  tagsFlatListWrapper: {
    paddingVertical: SPACING.xxs,
    gap: SPACING.xxs,
  },
  selectedTagsContainer: {
    paddingBottom: SPACING.xxs,
    paddingHorizontal: SPACING.xs,
    alignItems: 'center',
    gap: SPACING.xxs,
    minWidth: '100%',
    height: 44,
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default TagsSelector;
