import { useState } from 'react';

import useChatStore from './useChatStore.ts';

const useChatsMultiSelect = () => {
  const { deleteChatHandler } = useChatStore();

  const [selectedChatIds, setSelectedChatIds] = useState<string[]>([]);

  const toggleSelectChat = (id: string) => {
    setSelectedChatIds(prev => (prev.includes(id) ? prev.filter(chatId => chatId !== id) : [...prev, id]));
  };

  const resetSelectedIds = () => setSelectedChatIds([]);

  const deleteHandler = async () => {
    await deleteChatHandler(selectedChatIds);
    resetSelectedIds();
  };

  return {
    toggleSelectChat,
    resetSelectedIds,
    selectedChatIds,
    isSelectedMode: !!selectedChatIds.length,
    deleteHandler,
  };
};

export default useChatsMultiSelect;
