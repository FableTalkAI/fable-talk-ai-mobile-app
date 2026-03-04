import { useTranslation } from 'react-i18next';

import { logoutUser } from '@/features/auth/services/logoutUser.ts';
import Alert from '@/features/overlay/ui/bottomWindowTemplates/Alert';
import { ButtonModes } from '@/shared/ui/Button/types.ts';

import { LogoutBottomWindowProps } from './types.ts';

const LogoutBottomWindow = ({ close, navigation }: LogoutBottomWindowProps) => {
  const { t } = useTranslation();

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
};

export default LogoutBottomWindow;
