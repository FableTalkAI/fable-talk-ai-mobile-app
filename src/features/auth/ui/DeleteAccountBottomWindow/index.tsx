import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useBottomWindowStore from '@/features/overlay/hooks/useBottomWindowStore.ts';
import Alert from '@/features/overlay/ui/bottomWindowTemplates/Alert';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { ButtonModes } from '@/shared/ui/Button/types.ts';

import { DeleteAccountBottomWindowProps } from './types.ts';

const DeleteAccountBottomWindow = ({ close, navigation }: DeleteAccountBottomWindowProps) => {
  const { t } = useTranslation();

  const { deleteUserProfileHandler, isLoading } = useProfileStore();
  const { setIsLockedHandler } = useBottomWindowStore();

  useEffect(() => {
    setIsLockedHandler(isLoading.deleteUserProfile);
  }, [isLoading.deleteUserProfile, setIsLockedHandler]);

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
          await deleteUserProfileHandler(navigation);
          close();
        },
      }}
    />
  );
};

export default DeleteAccountBottomWindow;
