import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { openSettings } from 'react-native-permissions';

import { ButtonModes } from '@/components/atoms/Button/types.ts';
import BottomWindowBase from '@/components/molecules/bottomWindows/BottomWindowBase';
import Alert from '@/components/molecules/bottomWindows/templates/Alert';
import SearchFilter from '@/components/molecules/bottomWindows/templates/SearchFilter';
import { bottomWindowRef } from '@/core/utils/bottomWindow.ts';
import useUIStore from '@/hooks/useUIStore.ts';

import { BottomWindowModes } from './types.ts';

const useBottomWindow = (mode?: BottomWindowModes) => {
  const { t } = useTranslation();
  const { bottomWindowMode, setBottomWindowModeHandler } = useUIStore();

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
        return <SearchFilter />;
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
