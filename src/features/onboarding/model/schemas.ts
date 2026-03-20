import i18n from 'i18next';
import { z } from 'zod';

export const nameSchema = z.object({
  name: z
    .string()
    .nonempty(i18n.t('validation.empty'))
    .regex(/^[A-Za-zА-Яа-яЁё\s]+$/, i18n.t('validation.name')),
});
