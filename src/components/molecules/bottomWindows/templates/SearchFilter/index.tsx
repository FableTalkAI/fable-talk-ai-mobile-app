import { useEffect, useState } from 'react';
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

import { SearchFilterProps } from './types.ts';

const SearchFilter = ({ tags, onApply }: SearchFilterProps) => {
  const [isAscending, setIsAscending] = useState(false);
  const [numberOfTags, setNumberOfTags] = useState(String(tags.length));
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTags, setFilteredTags] = useState(tags);

  useEffect(() => {
    const newFilteredTags = tags.filter(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredTags(newFilteredTags);
    setNumberOfTags(String(newFilteredTags.length));
  }, [searchQuery, tags]);

  const onToggle = (title: string) => {
    if (selectedTags.includes(title)) {
      setSelectedTags(selectedTags.filter(tag => tag !== title));
    } else {
      setSelectedTags([...selectedTags, title]);
    }
  };

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
          <Select options={['Alphabetical', 'Popularity']} width={150} />

          <PressableCustom onPress={() => setIsAscending(prevState => !prevState)} hitSlop={5}>
            <Animated.View exiting={FadeOut} entering={FadeIn} key={`sort-ascending-${isAscending}`}>
              {isAscending ? <SortAscendingIcon /> : <SortDescendingIcon />}
            </Animated.View>
          </PressableCustom>
        </View>
      </View>
      <View>
        <TextCustom text="Filter" mode={TextModes.Subtitle} />

        <View style={[computedStyles.searchAndTagsNumberContainer, styles.searchAndTagsNumberContainer]}>
          <SearchInput
            placeholder="Tags"
            wrapperStyle={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {/*Вид*/}
          <TextCustom text={numberOfTags} mode={TextModes.Title} />
        </View>

        <FlatList
          data={filteredTags}
          columnWrapperStyle={computedStyles.tagsContainer}
          numColumns={2}
          renderItem={({ item }) => (
            <Tag
              title={item}
              containerStyle={styles.tag}
              onToggle={title => onToggle(title)}
              isSelected={selectedTags.includes(item)}
            />
          )}
        />
      </View>

      <View>
        <View style={[computedStyles.selectedTextContainer, styles.selectedTextContainer]}>
          <TagSelectedIcon />
          <TextCustom text="Selected" />
        </View>

        <FlatList
          data={selectedTags}
          contentContainerStyle={computedStyles.tagsContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Tag title={item} forceActive />}
        />
      </View>

      <Button
        title="Apply"
        mode={ButtonModes.SearchFilter}
        containerStyle={computedStyles.buttonContainer}
        onPress={onApply}
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
  searchInput: {
    flex: 1,
  },
});
