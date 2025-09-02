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
import { SPACING } from '@/core/constants/sizes.ts';
import useAgentsStore from '@/hooks/useAgentsStore.ts';
import { OrderFilter, SortFilter } from '@/store/agents/types.ts';

const SearchFilter = () => {
  const { t } = useTranslation();

  const { filter, setFilterOrderHandler, setFilterSortHandler, tags, setFilterTagsHandler } = useAgentsStore();

  const [searchQuery, setSearchQuery] = useState('');

  const selectOptions = useMemo(() => Object.values(SortFilter).map(option => t(option)), [t]);
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

  console.log(filter.tags);

  const computedStyles = StyleSheet.create({
    searchAndTagsNumberContainer: {
      gap: SPACING.xxs,
    },
    tagsContainer: {
      paddingVertical: SPACING.s,
      paddingHorizontal: SPACING.xs,
      gap: SPACING.xxs,
    },
    selectedTextContainer: {
      gap: SPACING.xxs,
    },
    buttonContainer: {
      paddingTop: SPACING.lg,
    },
  });

  return (
    <View style={styles.wrapper}>
      <View>
        <TextCustom text="Sort" mode={TextModes.Subtitle} />

        <View style={styles.sortContainer}>
          {/*Тут width считать как-то?*/}
          <Select options={selectOptions} width={150} defaultOption={filter.sort} onChange={setFilterSortHandler} />

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
        <TextCustom text="Filter" mode={TextModes.Subtitle} />

        <View style={[computedStyles.searchAndTagsNumberContainer, styles.searchAndTagsNumberContainer]}>
          <SearchInput placeholder="Tags" value={searchQuery} onChangeText={setSearchQuery} />
          {/*Вид*/}
          <TextCustom text={String(filteredTags.length)} mode={TextModes.Title} />
        </View>

        <FlatList
          data={filteredTags}
          columnWrapperStyle={computedStyles.tagsContainer}
          numColumns={2}
          renderItem={({ item }) => (
            <Tag title={item} containerStyle={styles.tag} onToggle={onToggle} isSelected={filter.tags.includes(item)} />
          )}
        />
      </View>

      <View>
        <View style={[computedStyles.selectedTextContainer, styles.selectedTextContainer]}>
          <TagSelectedIcon />
          <TextCustom text="Selected" />
        </View>

        <FlatList
          data={filter.tags}
          contentContainerStyle={computedStyles.tagsContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Tag title={item} forceActive onToggle={onToggle} />}
        />
      </View>

      <Button
        title="Apply"
        mode={ButtonModes.SearchFilter}
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
  },
  searchAndTagsNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  tag: {
    width: '48%',
  },
  selectedTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
