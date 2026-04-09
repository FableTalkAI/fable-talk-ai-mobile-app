import { ToastShowParams } from 'react-native-toast-message';

import { toastConfig } from '@/features/overlay/lib/toastConfig.tsx';

type CustomToastType = keyof typeof toastConfig;

export type ShowToastParams = {
  type?: CustomToastType;
} & Omit<ToastShowParams, 'type' | 'text1'>;
