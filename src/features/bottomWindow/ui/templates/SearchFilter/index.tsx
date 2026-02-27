import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import SearchInput from '@/features/home/ui/SearchInput';
import Tag from '@/features/onboarding/ui/Tag';
import useUserStore from '@/features/profile/hooks/useUserStore.ts';
import { SortByFilter, SortFilter } from '@/features/profile/store/user/types.ts';
import { SortAscendingIcon, SortDescendingIcon, TagSelectedIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import Button from '@/shared/ui/Button';
import { ButtonModes } from '@/shared/ui/Button/types.ts';
import EmptyStub from '@/shared/ui/EmptyStub';
import { EmptyStubSizes } from '@/shared/ui/EmptyStub/types.tsx';
import PressableCustom from '@/shared/ui/PressableCustom';
import Select from '@/shared/ui/Select';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { SearchFilterProps } from './types.ts';

const SearchFilter = ({ close }: SearchFilterProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { tags, getAgentsHandler } = useAgentsStore();

  const { filter, setFilterSortByHandler, setFilterSortHandler, setFilterTagsHandler, clearFilterHandler } =
    useUserStore();

  const [filteredTags, setFilteredTags] = useState(tags);

  const selectOptions = useMemo(
    () =>
      (Object.keys(SortByFilter) as Array<keyof typeof SortByFilter>).map(option => ({
        value: SortByFilter[option],
        title: t(`common.${SortByFilter[option]}`),
      })),
    [t],
  );

  const computedStyles = StyleSheet.create({
    sectionBackground: {
      backgroundColor: colors.backgroundSecondary,
    },
  });

  const onStopHandler = useCallback(
    (value: string) => {
      setFilteredTags(tags.filter((tag: string) => tag.toLowerCase().includes(value.toLowerCase())));
    },
    [tags],
  );

  const onToggle = (tag: string) => {
    if (filter.tags.includes(tag)) {
      setFilterTagsHandler(filter.tags.filter(selectedTag => selectedTag !== tag));
    } else {
      setFilterTagsHandler([...filter.tags, tag]);
    }
  };

  const onApply = () => {
    getAgentsHandler().catch(console.error);
    close();
  };

  const onClear = () => {
    clearFilterHandler();
    getAgentsHandler().catch(console.error);
    close();
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <TextCustom style={styles.title} text={t('bottomWindows.searchFilter.sort')} mode={TextModes.Subtitle} />

        <View style={styles.sortContainer}>
          <Select
            options={selectOptions}
            width={SCREEN_WIDTH - SPACING.lg - 20 - SPACING.xl}
            defaultValue={filter.sortBy}
            onChange={setFilterSortByHandler}
          />

          <PressableCustom
            onPress={() => setFilterSortHandler(filter.sort === SortFilter.ASC ? SortFilter.DESC : SortFilter.ASC)}
            hitSlop={5}
          >
            <Animated.View exiting={FadeOut} entering={FadeIn} key={`sort-ascending-${filter.sort}`}>
              {filter.sort === SortFilter.ASC ? (
                <SortAscendingIcon fill={colors.iconPrimary} />
              ) : (
                <SortDescendingIcon fill={colors.iconPrimary} />
              )}
            </Animated.View>
          </PressableCustom>
        </View>
      </View>

      <View>
        <TextCustom style={styles.title} text={t('bottomWindows.searchFilter.filter')} mode={TextModes.Subtitle} />

        <View style={[computedStyles.sectionBackground, styles.sectionBackground]}>
          <View style={styles.searchAndTagsNumberContainer}>
            <SearchInput withShadow={false} placeholder={t('bottomWindows.searchFilter.tags')} onStop={onStopHandler} />
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
                title={item}
                containerStyle={styles.tagContainer}
                style={styles.tag}
                onToggle={onToggle}
                isSelected={filter.tags.includes(item)}
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
      </View>

      <View style={[computedStyles.sectionBackground, styles.sectionBackground]}>
        <View style={styles.selectedTextContainer}>
          <TagSelectedIcon />
          <TextCustom text={t('bottomWindows.searchFilter.selectedTags')} />
        </View>

        <FlatList
          data={filter.tags}
          contentContainerStyle={styles.selectedTagsContainer}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          //TODO: tags into translation
          renderItem={({ item }) => <Tag title={item} forceActive onToggle={onToggle} />}
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

export default SearchFilter;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: SPACING.m,
  },
  empty: {
    paddingHorizontal: SPACING.m,
    height: 180,
  },
  sortContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flex: 1,
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
