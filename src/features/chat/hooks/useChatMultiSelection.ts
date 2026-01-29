import { useCallback } from 'react';

import { clearChatSelection, toggleChatSelection } from '@/features/chat/store/chat';
import { multiSelectionsChatIdsSelector } from '@/features/chat/store/chat/selectors.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

import useChatStore from './useChatStore.ts';

const useChatMultiSelection = () => {
  const dispatch = useAppDispatch();

  const { deleteChatHandler, isLoading } = useChatStore();

  const multiSelectionsChatIds = useAppSelector(multiSelectionsChatIdsSelector);

  const toggleSelectChat = useCallback(
    (id: string) => {
      dispatch(toggleChatSelection(id));
    },
    [dispatch],
  );

  const clear = useCallback(() => {
    dispatch(clearChatSelection());
  }, [dispatch]);

  const deleteHandler = async () => {
    await deleteChatHandler(multiSelectionsChatIds);
    clear();
  };

  return {
    toggleSelectChat,
    clear,
    multiSelectionsChatIds,
    multiSelectionsChatIdsCount: multiSelectionsChatIds.length,
    isSelectedMode: !!multiSelectionsChatIds.length,
    deleteHandler,
    isChatDeleting: isLoading.deleteChat,
  };
};

export default useChatMultiSelection;
