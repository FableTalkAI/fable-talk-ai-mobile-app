import i18n from 'i18next';

import ToastCustom from '@/components/atoms/ToastCustom';
import { ToastCustomProps } from '@/components/atoms/ToastCustom/types.ts';

export const toastConfig = {
  success: ({ text2 }: ToastCustomProps) => (
    <ToastCustom text1={i18n.t('common.success')} text2={text2} color="#00B53C" />
  ),
  error: ({ text2 }: ToastCustomProps) => <ToastCustom text1={i18n.t('common.error')} text2={text2} color="#D5283A" />,
  info: ({ text2 }: ToastCustomProps) => <ToastCustom text1={i18n.t('common.info')} text2={text2} color="#4169E1" />,
  warning: ({ text2 }: ToastCustomProps) => (
    <ToastCustom text1={i18n.t('common.warning')} text2={text2} color="#FFB111" />
  ),
};
