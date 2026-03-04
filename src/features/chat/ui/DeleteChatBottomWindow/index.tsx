import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import useBottomWindowStore from '@/features/overlay/hooks/useBottomWindowStore.ts';
import Alert from '@/features/overlay/ui/bottomWindowTemplates/Alert';
import { ButtonModes } from '@/shared/ui/Button/types.ts';

import { DeleteChatBottomWindowProps } from './types.ts';

const DeleteChatBottomWindow = ({ clear, close, multiSelectionsChatIds, onDelete }: DeleteChatBottomWindowProps) => {
  const { t } = useTranslation();

  const { setIsLockedHandler } = useBottomWindowStore();
  const { deleteChatHandler, isLoading } = useChatStore();

  const multiSelectionsChatIdsCount = multiSelectionsChatIds?.length;

  const deleteHandler = useCallback(async () => {
    await deleteChatHandler(multiSelectionsChatIds);
    clear?.();
    onDelete?.();
  }, [clear, deleteChatHandler, multiSelectionsChatIds, onDelete]);

  useEffect(() => {
    setIsLockedHandler(isLoading.deleteChat);
  }, [isLoading, setIsLockedHandler]);

  return (
    <Alert
      title={t('bottomWindows.deleteChat.title', { count: multiSelectionsChatIdsCount })}
      subtitle={t('bottomWindows.deleteChat.subtitle', { count: multiSelectionsChatIdsCount })}
      firstButtonProps={{
        title: t('actions.cancel'),
        mode: ButtonModes.Ghost,
        disabled: isLoading.deleteChat,
        onPress: () => close(),
      }}
      secondButtonProps={{
        title: t('actions.delete'),
        mode: ButtonModes.Reject,
        isLoading: isLoading.deleteChat,
        onPress: async () => {
          await deleteHandler();
          close();
        },
      }}
    />
  );
};

export default DeleteChatBottomWindow;
