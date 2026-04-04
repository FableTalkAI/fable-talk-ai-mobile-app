import { useCallback } from 'react';

import { setModalCustomContent } from '@/features/overlay/store/overlay';
import { modalCustomContentSelector } from '@/features/overlay/store/overlay/selectors.ts';
import { ModalCustomContent } from '@/features/overlay/store/overlay/types.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

const useModalStore = () => {
  const dispatch = useAppDispatch();

  const customContent = useAppSelector(modalCustomContentSelector);

  const setCustomContentHandler = useCallback(
    (content: ModalCustomContent) => {
      dispatch(setModalCustomContent(content));
    },
    [dispatch],
  );

  return {
    customContent,
    setCustomContentHandler,
  };
};

export default useModalStore;
