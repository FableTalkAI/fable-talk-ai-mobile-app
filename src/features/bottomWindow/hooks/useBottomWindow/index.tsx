import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { openSettings } from 'react-native-permissions';

import useBottomWindowStore from '@/features/bottomWindow/hooks/useBottomWindowStore.ts';
import { bottomWindowRef } from '@/features/bottomWindow/services/bottomWindowRef.ts';
import BottomWindowBase from '@/features/bottomWindow/ui/BottomWindowBase';
import Alert from '@/features/bottomWindow/ui/templates/Alert';
import SearchFilter from '@/features/bottomWindow/ui/templates/SearchFilter';
import { ButtonModes } from '@/shared/ui/Button/types.ts';

import { BottomWindowModes } from './types.ts';

const useBottomWindow = (mode?: BottomWindowModes) => {
  const { t } = useTranslation();
  const { bottomWindowMode, setBottomWindowModeHandler } = useBottomWindowStore();

  const open = useCallback(() => {
    setBottomWindowModeHandler(mode);
    requestAnimationFrame(() => {
      bottomWindowRef.current?.present();
    });
  }, [mode, setBottomWindowModeHandler]);

  const close = useCallback(() => {
    bottomWindowRef.current?.dismiss();
  }, []);

  const templateComponent = useMemo(() => {
    switch (bottomWindowMode) {
      case BottomWindowModes.PermissionDenied:
        return (
          <Alert
            title={t('bottomWindows.permissionDenied.title')}
            subtitle={t('bottomWindows.permissionDenied.subtitle')}
            firstButtonProps={{
              title: t('actions.cancel'),
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
              title: t('actions.cancel'),
              mode: ButtonModes.Disabled,
              onPress: close,
            }}
            secondButtonProps={{
              title: t('actions.delete'),
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
        return <SearchFilter close={close} />;
      default:
        return null;
    }
  }, [bottomWindowMode, close, t]);

  const BottomWindow = () => <BottomWindowBase ref={bottomWindowRef}>{templateComponent}</BottomWindowBase>;

  return {
    BottomWindow,
    open,
    close,
  };
};

export default useBottomWindow;
