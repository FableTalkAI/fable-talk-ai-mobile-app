import { z } from 'zod';

import { getAuthSchema } from './schema.ts';

export type AuthSchema = z.infer<ReturnType<typeof getAuthSchema>>;
