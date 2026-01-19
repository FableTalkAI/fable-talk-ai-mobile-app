import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { openSettings } from 'react-native-permissions';

import { logoutUser } from '@/features/auth/services/logoutUser.ts';
import useBottomWindowStore from '@/features/bottomWindow/hooks/useBottomWindowStore.ts';
import { bottomWindowRef } from '@/features/bottomWindow/services/bottomWindowRef.ts';
import BottomWindowBase from '@/features/bottomWindow/ui/BottomWindowBase';
import Alert from '@/features/bottomWindow/ui/templates/Alert';
import SearchFilter from '@/features/bottomWindow/ui/templates/SearchFilter';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { ButtonModes } from '@/shared/ui/Button/types.ts';

import { BottomWindowModes } from './types.ts';

const useBottomWindow = (mode?: BottomWindowModes) => {
  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();

  const { bottomWindowMode, setBottomWindowModeHandler } = useBottomWindowStore();
  const { deleteUserProfileHandler, isLoading } = useProfileStore();

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
              mode: ButtonModes.Ghost,
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
              mode: ButtonModes.Ghost,
              onPress: close,
            }}
            secondButtonProps={{
              title: t('actions.delete'),
              mode: ButtonModes.Reject,
              onPress: deleteUserProfileHandler,
            }}
          />
        );
      case BottomWindowModes.Logout:
        return (
          <Alert
            title={t('bottomWindows.logout.title')}
            subtitle={t('bottomWindows.logout.subtitle')}
            firstButtonProps={{
              title: t('actions.cancel'),
              mode: ButtonModes.Ghost,
              onPress: close,
            }}
            secondButtonProps={{
              title: t('actions.logout'),
              mode: ButtonModes.Link,
              onPress: async () => await logoutUser(navigation),
            }}
          />
        );
      case BottomWindowModes.SearchFilter:
        return <SearchFilter close={close} />;
      default:
        return null;
    }
  }, [navigation, bottomWindowMode, close, deleteUserProfileHandler, t]);

  const enableClose = useMemo(() => !isLoading.deleteUserProfile, [isLoading.deleteUserProfile]);

  const BottomWindow = () => (
    <BottomWindowBase ref={bottomWindowRef} enableClose={enableClose}>
      {templateComponent}
    </BottomWindowBase>
  );

  return {
    BottomWindow,
    open,
    close,
  };
};

export default useBottomWindow;
