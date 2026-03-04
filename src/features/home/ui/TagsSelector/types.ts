import { Dispatch, SetStateAction } from 'react';

import { Tag as TagType } from '@/features/agents/store/agents/types.ts';

export type TagsSelectorProps = {
  selectedTags: TagType[];
  setSelectedTags: Dispatch<SetStateAction<TagType[]>>;
};
