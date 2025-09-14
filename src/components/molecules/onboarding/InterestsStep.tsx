import { StyleSheet, View } from 'react-native';

import Tag from '@/components/molecules/Tag';
import { SPACING } from '@/core/constants/sizes.ts';
import useUserStore from '@/hooks/useUserStore.ts';

const testDefaultTags = [
  'tag1',
  'tag2',
  'tag3',
  'tag4',
  'tag5',
  'tag6',
  'tag7',
  'tag8',
  'tag9',
  'tag10',
  'tag11',
  'tag12',
  'tag8fev',
  'tag9fe',
  'tag1fwe few fwe0',
  'tag11',
  'tag12',
  'tag8',
  'tag9',
  'tag10',
  'tag11',
  'tag12',
  'tag8fev',
  'tag9fe',
  'tag1fwe few fwe0',
  'tag11',
  'tag12',
  'tag8',
  'tag9',
  'tag10',
];

const InterestsStep = () => {
  const { tags, setTagsHandler } = useUserStore();

  const onTagPressHandler = (tag: string) => {
    if (tags.includes(tag)) {
      setTagsHandler(tags.filter(t => t !== tag));
    } else {
      setTagsHandler([...tags.slice(tags.length === 2 ? 1 : 0), tag]);
    }
  };

  return (
    <View style={styles.container}>
      {testDefaultTags.map((tag, index) => (
        <Tag key={index} title={tag} isSelected={tags.includes(tag)} onToggle={onTagPressHandler} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: SPACING.xs,
  },
});

export default InterestsStep;
