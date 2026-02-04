import { useCallback } from 'react';

import { clearChatSelection, toggleChatSelection } from '@/features/chat/store/chat';
import { multiSelectionsChatIdsSelector } from '@/features/chat/store/chat/selectors.ts';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

import useChatStore from './useChatStore.ts';

const useChatMultiSelection = () => {
  const dispatch = useAppDispatch();
  const { navigation } = useNavigationRoutes();

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

  const deleteHandler = useCallback(async () => {
    await deleteChatHandler(multiSelectionsChatIds);
    clear();

    const state = navigation.getState();
    const currentRoute = state.routes[state.index];

    if (currentRoute.name === 'ChatScreen') {
      navigation.goBack();
    }
  }, [clear, deleteChatHandler, multiSelectionsChatIds, navigation]);

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
