import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'Username обязателен' })
      .max(30, { message: 'Максимум 30 символов' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Только буквы, цифры и подчёркивания',
      }),
    email: z
      .string({ message: 'Email обязателен' })
      .email({ message: 'Неверный формат email' }),
    password: z
      .string({ message: 'Пароль обязателен' })
      .min(8, { message: 'Минимум 8 символов' })
      .max(100, { message: 'Максимум 100 символов' }),
    confirmPassword: z.string({
      message: 'Подтверждение пароля обязательно',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });

// Тип для формы
export type RegisterForm = z.infer<typeof registerSchema>;
