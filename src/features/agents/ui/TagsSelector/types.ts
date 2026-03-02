import { Tag } from '@/features/agents/store/agents/types.ts';

export type TagsSelectorProps = {
  tags: Tag[];
  onPress: () => void;
};
