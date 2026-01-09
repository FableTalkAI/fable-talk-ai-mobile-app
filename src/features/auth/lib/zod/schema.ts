import i18n from 'i18next';
import { z } from 'zod';

import { AuthScreenMode } from '@/features/auth/ui/screens/SignInUpScreen/types.ts';

export const getAuthSchema = (mode: AuthScreenMode) => {
  return z.object({
    name:
      mode === AuthScreenMode.SignIn
        ? z.string().optional()
        : z
            .string()
            .nonempty(i18n.t('validation.empty'))
            .regex(/^[A-Za-zА-Яа-яЁё\s]+$/, i18n.t('validation.name')),
    email: z.string().nonempty(i18n.t('validation.empty')).email(i18n.t('validation.email')),
  });
};
