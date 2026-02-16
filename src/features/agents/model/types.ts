import { z } from 'zod';

import { createAgentSchema } from './schemas.ts';

export type CreateAgentValues = z.infer<typeof createAgentSchema>;
