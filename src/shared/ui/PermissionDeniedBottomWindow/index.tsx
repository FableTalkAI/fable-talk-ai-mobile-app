import { useTranslation } from 'react-i18next';
import { openSettings } from 'react-native-permissions';

import Alert from '@/features/overlay/ui/bottomWindowTemplates/Alert';
import { ButtonModes } from '@/shared/ui/Button/types.ts';

import { PermissionDeniedBottomWindowProps } from './types.ts';

const PermissionDeniedBottomWindow = ({ close }: PermissionDeniedBottomWindowProps) => {
  const { t } = useTranslation();

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
};

export default PermissionDeniedBottomWindow;
