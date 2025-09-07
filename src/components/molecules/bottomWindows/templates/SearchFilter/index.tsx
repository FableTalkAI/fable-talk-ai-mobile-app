import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useMemo, useState } from 'react';
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

  const { filter, setFilterOrderHandler, setFilterSortHandler, tags, setFilterTagsHandler } = useAgentsStore();

  const [searchQuery, setSearchQuery] = useState('');

  const selectOptions = useMemo(() => Object.values(SortFilter).map(option => t(`common.${option}`)), [t]);
  const filteredTags = useMemo(
    () => tags.filter(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery, tags],
  );

  const onToggle = (tag: string) => {
    if (filter.tags.includes(tag)) {
      setFilterTagsHandler(filter.tags.filter(selectedTag => selectedTag !== tag));
    } else {
      setFilterTagsHandler([...filter.tags, tag]);
    }
  };

  const computedStyles = StyleSheet.create({
    wrapper: {
      gap: SPACING.m,
    },
    sectionBackground: {
      boxShadow: BOX_SHADOW.medium,
      backgroundColor: colors.backgroundAlt,
      borderRadius: RADIUS.small,
    },
    searchAndTagsNumberContainer: {
      gap: SPACING.xxs,
      paddingRight: SPACING.xs,
    },
    tagsContainer: {
      paddingVertical: SPACING.s,
      paddingHorizontal: SPACING.xs,
      gap: SPACING.xxs,
    },
    selectedTagsContainer: {
      paddingTop: SPACING.xxs,
      paddingHorizontal: SPACING.xs,
      gap: SPACING.xxs,
      paddingBottom: SPACING.xs,
    },
    selectedTextContainer: {
      gap: SPACING.xxs,
      paddingLeft: SPACING.xs,
      paddingTop: SPACING.xs,
    },
    buttonContainer: {
      paddingTop: SPACING.lg,
    },
  });

  return (
    <View style={[computedStyles.wrapper, styles.wrapper]}>
      <View>
        <TextCustom text={t('bottomWindows.searchFilter.sort')} mode={TextModes.Subtitle} />

        <View style={styles.sortContainer}>
          <Select
            options={selectOptions}
            width={SCREEN_WIDTH - SPACING.lg - 20 - SPACING.xl}
            defaultOption={filter.sort}
            onChange={setFilterSortHandler}
          />

          <PressableCustom
            onPress={() => setFilterOrderHandler(filter.order === OrderFilter.ASC ? OrderFilter.DESC : OrderFilter.ASC)}
            hitSlop={5}
          >
            <Animated.View exiting={FadeOut} entering={FadeIn} key={`sort-ascending-${filter.order}`}>
              {filter.order === OrderFilter.ASC ? <SortAscendingIcon /> : <SortDescendingIcon />}
            </Animated.View>
          </PressableCustom>
        </View>
      </View>
      <View>
        <TextCustom text={t('bottomWindows.searchFilter.filter')} mode={TextModes.Subtitle} />

        <View style={computedStyles.sectionBackground}>
          <View style={[computedStyles.searchAndTagsNumberContainer, styles.searchAndTagsNumberContainer]}>
            <SearchInput
              placeholder={t('bottomWindows.searchFilter.tags')}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TextCustom text={String(filteredTags.length)} mode={TextModes.Title} />
          </View>

          <FlatList
            data={filteredTags}
            columnWrapperStyle={computedStyles.tagsContainer}
            numColumns={2}
            renderItem={({ item }) => (
              <Tag
                title={item}
                containerStyle={styles.tag}
                onToggle={onToggle}
                isSelected={filter.tags.includes(item)}
              />
            )}
          />
        </View>
      </View>

      <View style={computedStyles.sectionBackground}>
        <View style={[computedStyles.selectedTextContainer, styles.selectedTextContainer]}>
          <TagSelectedIcon />
          <TextCustom text={t('bottomWindows.searchFilter.tags')} />
        </View>

        <FlatList
          data={filter.tags}
          contentContainerStyle={computedStyles.selectedTagsContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          //TODO: tags into translation
          renderItem={({ item }) => <Tag title={item} forceActive onToggle={onToggle} />}
        />
      </View>

      <Button
        title={t('bottomWindows.common.apply')}
        mode={ButtonModes.Success}
        containerStyle={computedStyles.buttonContainer}
        //TODO: Server agents handling
        onPress={() => console.log('Home')}
      />
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
  },
  tag: {
    width: '48%',
  },
  selectedTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
