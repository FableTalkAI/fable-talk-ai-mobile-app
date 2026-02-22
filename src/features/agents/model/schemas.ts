import { z } from 'zod';

export const createAgentSchema = z.object({
  avatar: z.string().nonempty('createAgent.avatar.error'),
  name: z.string().trim().min(1, 'createAgent.name.minError').max(30, 'createAgent.name.maxError'),
  subtitle: z.string().trim().min(50, 'createAgent.subtitle.minError'),
  description: z.string().trim().min(250, 'createAgent.description.minError'),
  tags: z.array(z.string()).min(2, 'createAgent.tags.minError'),
});
