import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { openSettings } from 'react-native-permissions';

import { logoutUser } from '@/features/auth/services/logoutUser.ts';
import useBottomWindowStore from '@/features/bottomWindow/hooks/useBottomWindowStore.ts';
import { bottomWindowRef } from '@/features/bottomWindow/services/bottomWindowRef.ts';
import Alert from '@/features/bottomWindow/ui/templates/Alert';
import SearchFilter from '@/features/bottomWindow/ui/templates/SearchFilter';
import useChatMultiSelection from '@/features/chat/hooks/useChatMultiSelection.ts';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { ButtonModes } from '@/shared/ui/Button/types.ts';

import { BottomWindowModes } from './types.ts';

const useBottomWindow = (mode?: BottomWindowModes) => {
  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();

  const { bottomWindowMode, setBottomWindowModeHandler } = useBottomWindowStore();
  const { deleteUserProfileHandler, isLoading } = useProfileStore();
  const { deleteHandler, multiSelectionsChatIdsCount, isChatDeleting, clear } = useChatMultiSelection();

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
              disabled: isLoading.deleteUserProfile,
              onPress: close,
            }}
            secondButtonProps={{
              title: t('actions.delete'),
              mode: ButtonModes.Reject,
              isLoading: isLoading.deleteUserProfile,
              onPress: async () => {
                await deleteUserProfileHandler();
                close();
              },
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
              onPress: async () => {
                await logoutUser(navigation);
                close();
              },
            }}
          />
        );
      case BottomWindowModes.DeleteChat:
        return (
          <Alert
            title={t('bottomWindows.deleteChat.title', { count: multiSelectionsChatIdsCount })}
            subtitle={t('bottomWindows.deleteChat.subtitle', { count: multiSelectionsChatIdsCount })}
            firstButtonProps={{
              title: t('actions.cancel'),
              mode: ButtonModes.Ghost,
              disabled: isChatDeleting,
              onPress: () => {
                const state = navigation.getState();
                const currentRoute = state.routes[state.index];
                if (currentRoute.name === 'ChatScreen') {
                  clear();
                }
                close();
              },
            }}
            secondButtonProps={{
              title: t('actions.delete'),
              mode: ButtonModes.Reject,
              isLoading: isChatDeleting,
              onPress: async () => {
                await deleteHandler();
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
  }, [
    clear,
    bottomWindowMode,
    t,
    close,
    isLoading.deleteUserProfile,
    multiSelectionsChatIdsCount,
    isChatDeleting,
    deleteUserProfileHandler,
    navigation,
    deleteHandler,
  ]);

  const disableClose = useMemo(
    () => isLoading.deleteUserProfile || isChatDeleting,
    [isLoading.deleteUserProfile, isChatDeleting],
  );

  return {
    templateComponent,
    disableClose,
    open,
    close,
  };
};

export default useBottomWindow;
