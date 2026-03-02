import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import { Tag as TagType } from '@/features/agents/store/agents/types.ts';
import SearchInput from '@/features/home/ui/SearchInput';
import Tag from '@/features/onboarding/ui/Tag';
import { TagSelectedIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import Button from '@/shared/ui/Button';
import { ButtonModes } from '@/shared/ui/Button/types.ts';
import EmptyStub from '@/shared/ui/EmptyStub';
import { EmptyStubSizes } from '@/shared/ui/EmptyStub/types.tsx';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { TagsSelectorBottomWindowProps } from './types.ts';

const TagsSelectorBottomWindow = ({ setTags, previousSelectedTags, close }: TagsSelectorBottomWindowProps) => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();

  const { tags } = useAgentsStore();

  const [selectedTags, setSelectedTags] = useState(previousSelectedTags);
  const [filteredTags, setFilteredTags] = useState(tags);

  const computedStyles = StyleSheet.create({
    sectionBackground: {
      backgroundColor: colors.backgroundSecondary,
    },
  });

  const onStopHandler = useCallback(
    (value: string) => {
      setFilteredTags(tags.filter(tag => tag.locale[i18n.language].includes(value)));
    },
    [i18n.language, tags],
  );

  const onToggle = (tag: TagType) => {
    if (selectedTags.find(i => i.id === tag.id)) {
      setSelectedTags(selectedTags.filter(selectedTag => selectedTag.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const onApply = () => {
    setTags(selectedTags);
    close();
  };

  const onClear = () => {
    setTags([]);
    close();
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
        <View style={styles.selectedTextContainer}>
          <TagSelectedIcon />
          <TextCustom text={t('bottomWindows.tagsSelector.selectedTags')} />
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

      <View style={styles.buttonWrapper}>
        <Button
          title={t('actions.clear')}
          mode={ButtonModes.Ghost}
          containerStyle={styles.buttonContainer}
          onPress={onClear}
        />
        <Button
          title={t('actions.apply')}
          mode={ButtonModes.Success}
          containerStyle={styles.buttonContainer}
          onPress={onApply}
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
    height: 180,
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
  selectedTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xxs,
    paddingLeft: SPACING.xs,
    paddingTop: SPACING.xs,
  },
  sectionBackground: {
    boxShadow: BOX_SHADOW.medium,
    borderRadius: RADIUS.small,
  },
  tagsFlatListContainer: {
    padding: SPACING.xs,
  },
  tagsFlatList: {
    height: 180,
  },
  tagsFlatListWrapper: {
    paddingVertical: SPACING.xxs,
    gap: SPACING.xxs,
  },
  selectedTagsContainer: {
    paddingTop: SPACING.xxs,
    paddingHorizontal: SPACING.xs,
    gap: SPACING.xxs,
    paddingBottom: SPACING.xs,
    height: 40,
  },
  buttonWrapper: {
    flexDirection: 'row',
    flex: 1,
    gap: SPACING.xs,
  },
  buttonContainer: {
    paddingTop: SPACING.lg,
    flex: 1,
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    marginBottom: SPACING.xs,
  },
});

export default TagsSelectorBottomWindow;
