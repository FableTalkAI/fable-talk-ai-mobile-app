import { Tag } from '@/features/agents/store/agents/types.ts';

export type TagsSelectorFieldProps = {
  tags: Tag[];
  onPress: () => void;
};
