import { useCallback } from 'react';

import { ModalCustomContent } from '@/features/overlay/store/overlay/types.ts';

import useModalStore from './useModalStore.ts';

const useModal = () => {
  const { setCustomContentHandler, customContent } = useModalStore();

  const open = useCallback(
    (content: ModalCustomContent) => {
      setCustomContentHandler(content);
    },
    [setCustomContentHandler],
  );

  const close = useCallback(() => {
    setCustomContentHandler(null);
  }, [setCustomContentHandler]);

  return {
    modalContent: customContent,
    openModal: open,
    closeModal: close,
  };
};

export default useModal;
