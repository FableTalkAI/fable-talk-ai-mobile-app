import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { openSettings } from 'react-native-permissions';

import { ButtonModes } from '@/components/atoms/Button/types.ts';
import BottomWindowBase from '@/components/molecules/bottomWindows/BottomWindowBase';
import Alert from '@/components/molecules/bottomWindows/templates/Alert';
import SearchFilter from '@/components/molecules/bottomWindows/templates/SearchFilter';

import { BottomWindowModes, UseBottomWindowProps } from './types.ts';

const useBottomWindow = ({ mode }: UseBottomWindowProps) => {
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
            firstButtonProps={{
              title: t('common.cancel'),
              mode: ButtonModes.Disabled,
              onPress: close,
            }}
            secondButtonProps={{
              title: t('common.settings'),
              mode: ButtonModes.Link,
              onPress: () => {
                openSettings().catch(console.error);
                close();
              },
            }}
          />
        );
      case BottomWindowModes.DeleteAccount:
        return (
          <Alert
            title={t('bottomWindows.deleteAccount.title')}
            subtitle={t('bottomWindows.deleteAccount.subtitle')}
            firstButtonProps={{
              title: t('common.cancel'),
              mode: ButtonModes.Disabled,
              onPress: close,
            }}
            secondButtonProps={{
              title: t('common.delete'),
              mode: ButtonModes.Reject,
              onPress: () => {
                // TODO add delete account logic
                console.log('delete account');
                close();
              },
            }}
          />
        );
      case BottomWindowModes.SearchFilter:
        return <SearchFilter />;
      default:
        return null;
    }
  }, [close, t, mode]);

  const BottomWindow = () => <BottomWindowBase ref={bottomWindowRef}>{templateComponent}</BottomWindowBase>;

  return {
    BottomWindow,
    open,
    close,
  };
};

export default useBottomWindow;
