import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { SortAscendingIcon, SortDescendingIcon, TagSelectedIcon } from '@/assets/icons';
import Button from '@/components/atoms/Button';
import { ButtonModes } from '@/components/atoms/Button/types.ts';
import PressableCustom from '@/components/atoms/PressableCustom';
import Select from '@/components/atoms/Select';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import SearchInput from '@/components/molecules/SearchInput';
import Tag from '@/components/molecules/Tag';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { BOX_SHADOW } from '@/core/constants/styles.ts';
import useAgentsStore from '@/hooks/useAgentsStore.ts';
import useTheme from '@/hooks/useTheme.ts';
import { OrderFilter, SortFilter } from '@/store/agents/types.ts';

const SearchFilter = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { filter, setFilterOrderHandler, setFilterSortHandler, tags, setFilterTagsHandler, setFilteredAgents, agents } =
    useAgentsStore();

  const [filteredTags, setFilteredTags] = useState(tags);

  const selectOptions = useMemo(
    () =>
      (Object.keys(SortFilter) as Array<keyof typeof SortFilter>).map(option => ({
        value: SortFilter[option],
        title: t(`common.${option.toLowerCase()}`),
      })),
    [t],
  );

  const computedStyles = StyleSheet.create({
    sectionBackground: {
      backgroundColor: colors.backgroundSecondary,
    },
    noResults: {
      color: colors.gray50,
    },
  });

  const onStopHandler = useCallback(
    (value: string) => {
      setFilteredTags(tags.filter(tag => tag.toLowerCase().includes(value.toLowerCase())));
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

  const filterAgentsByTags = () => {
    if (filteredTags.length === 0) return agents;
    return agents.filter(agent => agent.tags.some(tag => filteredTags.includes(tag)));
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <TextCustom text={t('bottomWindows.searchFilter.sort')} mode={TextModes.Subtitle} />

        <View style={styles.sortContainer}>
          <Select
            options={selectOptions}
            width={SCREEN_WIDTH - SPACING.lg - 20 - SPACING.xl}
            defaultValue={filter.sort}
            onChange={setFilterSortHandler}
          />

          <PressableCustom
            onPress={() => setFilterOrderHandler(filter.order === OrderFilter.ASC ? OrderFilter.DESC : OrderFilter.ASC)}
            hitSlop={5}
          >
            <Animated.View exiting={FadeOut} entering={FadeIn} key={`sort-ascending-${filter.order}`}>
              {filter.order === OrderFilter.ASC ? (
                <SortAscendingIcon fill={colors.iconPrimary} />
              ) : (
                <SortDescendingIcon fill={colors.iconPrimary} />
              )}
            </Animated.View>
          </PressableCustom>
        </View>
      </View>
      <View>
        <TextCustom text={t('bottomWindows.searchFilter.filter')} mode={TextModes.Subtitle} />

        <View style={[computedStyles.sectionBackground, styles.sectionBackground]}>
          <View style={styles.searchAndTagsNumberContainer}>
            <SearchInput placeholder={t('bottomWindows.searchFilter.tags')} onStop={onStopHandler} />
            <TextCustom text={String(filteredTags.length)} />
          </View>

          {filteredTags.length ? (
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
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <TextCustom style={computedStyles.noResults} mode={TextModes.Secondary} text={t('common.noResults')} />
            </View>
          )}
        </View>
      </View>

      <View style={[computedStyles.sectionBackground, styles.sectionBackground]}>
        <View style={styles.selectedTextContainer}>
          <TagSelectedIcon />
          <TextCustom text={t('bottomWindows.searchFilter.tags')} />
        </View>

        <FlatList
          data={filter.tags}
          contentContainerStyle={styles.selectedTagsContainer}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          //TODO: tags into translation
          renderItem={({ item }) => <Tag title={item} forceActive onToggle={onToggle} />}
        />
      </View>

      <Button
        title={t('actions.apply')}
        mode={ButtonModes.Success}
        containerStyle={styles.buttonContainer}
        //TODO: Server agents handling
        onPress={() => {
          const filtered = filterAgentsByTags();
          setFilteredAgents(filtered);
        }}
      />
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: SPACING.m,
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
  },
  buttonContainer: {
    paddingTop: SPACING.lg,
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
  },
});
