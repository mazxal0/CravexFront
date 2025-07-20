import z from 'zod';

export const userSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 3 characters' })
    .max(50, { message: 'Username must have max 50 characters' }),
  email: z.string().email({ message: "It's Not valid email" }),
  telegram: z.string().min(2).max(150),
});

export type UserSchema = z.infer<typeof userSchema>;
