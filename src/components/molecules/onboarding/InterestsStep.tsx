import { StyleSheet, View } from 'react-native';

import Tag from '@/components/molecules/Tag';
import { SPACING } from '@/core/constants/sizes.ts';
import useAgentsStore from '@/hooks/useAgentsStore.ts';
import useUserStore from '@/hooks/useUserStore.ts';

const InterestsStep = () => {
  const { tags } = useAgentsStore();
  const { setFilterTagsHandler, filter } = useUserStore();

  const filteredTags = filter.tags;

  const onTagPressHandler = (tag: string) => {
    if (filteredTags.includes(tag)) {
      setFilterTagsHandler(filteredTags.filter(t => t !== tag));
    } else {
      setFilterTagsHandler([...filteredTags.slice(filteredTags.length === 2 ? 1 : 0), tag]);
    }
  };

  return (
    <View style={styles.container}>
      {tags.map((tag, index) => (
        <Tag key={index} title={tag} isSelected={filteredTags.includes(tag)} onToggle={onTagPressHandler} />
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
