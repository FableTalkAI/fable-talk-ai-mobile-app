import { z } from 'zod';

export const createAgentSchema = z.object({
  username: z.string().min(3, 'Минимум 3 символа').max(20, 'Максимум 20 символов'),
  email: z.string().email('Введите корректный email'),
  age: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 18, {
    message: 'Вам должно быть больше 18 лет',
  }),
});
