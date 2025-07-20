import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'Некорректный email' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
