import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { openSettings } from 'react-native-permissions';

import BottomWindowBase from '@/components/molecules/bottomWindows/BottomWindowBase';
import Alert from '@/components/molecules/bottomWindows/templates/Alert';
import SearchFilter from '@/components/molecules/bottomWindows/templates/SearchFilter';

import { BottomWindowModes, UseBottomWindowProps } from './types.ts';

const useBottomWindow = ({ mode, tags = [''] }: UseBottomWindowProps) => {
  const bottomWindowRef = useRef<BottomSheetModalMethods>(null);

  const { t } = useTranslation();

  const open = useCallback(() => {
    bottomWindowRef.current?.present();
  }, []);

  const close = useCallback(() => {
    bottomWindowRef.current?.dismiss();
  }, []);

  const templateComponent = useMemo(() => {
    switch (mode) {
      case BottomWindowModes.PermissionDenied:
        return (
          <Alert
            title={t('bottomWindows.permissionDenied.title')}
            subtitle={t('bottomWindows.permissionDenied.subtitle')}
            onConfirmText={t('common.settings')}
            onConfirm={() => {
              openSettings().catch(console.error);
              close();
            }}
            onCancel={close}
          />
        );
      case BottomWindowModes.SearchFilter:
        return <SearchFilter tags={tags} onApply={close} />;
      default:
        return null;
    }
  }, [close, t, mode, tags]);

  const BottomWindow = () => <BottomWindowBase ref={bottomWindowRef}>{templateComponent}</BottomWindowBase>;

  return {
    BottomWindow,
    open,
    close,
  };
};

export default useBottomWindow;
