import { Tag } from '@/features/agents/store/agents/types.ts';

export type TagsSelectorBottomWindowProps = {
  previousSelectedTags: Tag[];
  setTags: (tags: Tag[]) => void;
  close: () => void;
};
