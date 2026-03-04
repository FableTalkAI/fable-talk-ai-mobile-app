import { useCallback, useState } from 'react';

const useChatMultiSelection = () => {
  const [multiSelectionsChatIds, setMultiSelectionsChatIds] = useState<string[]>([]);

  const toggleSelectChat = useCallback((id: string) => {
    setMultiSelectionsChatIds(prevState => {
      if (prevState.includes(id)) {
        return prevState.filter(i => i !== id);
      } else {
        return [...prevState, id];
      }
    });
  }, []);

  const clear = useCallback(() => {
    setMultiSelectionsChatIds([]);
  }, []);

  return {
    toggleSelectChat,
    clear,
    multiSelectionsChatIds,
    isSelectedMode: !!multiSelectionsChatIds.length,
  };
};

export default useChatMultiSelection;
