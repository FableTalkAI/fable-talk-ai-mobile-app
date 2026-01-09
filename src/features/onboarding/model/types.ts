import { z } from 'zod';

import { nameSchema } from './schemas.ts';

export type NameSchema = z.infer<typeof nameSchema>;
