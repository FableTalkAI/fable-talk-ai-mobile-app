import { StyleSheet, View } from 'react-native';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import { Tag as TagType } from '@/features/agents/store/agents/types.ts';
import Tag from '@/features/onboarding/ui/Tag';
import useUserStore from '@/features/profile/hooks/useUserStore.ts';
import { SPACING } from '@/shared/model/sizes.ts';

const InterestsStep = () => {
  const { tags } = useAgentsStore();
  const { setFilterTagsHandler, filter } = useUserStore();

  const filteredTags = filter.tags;

  const onTagPressHandler = (tag: TagType) => {
    if (filteredTags.find(i => i.id === tag.id)) {
      setFilterTagsHandler(filteredTags.filter(t => t.id !== tag.id));
    } else {
      setFilterTagsHandler([...filteredTags.slice(filteredTags.length === 2 ? 1 : 0), tag]);
    }
  };

  return (
    <View style={styles.container}>
      {tags.map((tag, index) => (
        <Tag key={index} tag={tag} isSelected={filteredTags.some(i => i.id === tag.id)} onToggle={onTagPressHandler} />
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
