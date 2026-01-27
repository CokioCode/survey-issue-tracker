import { z } from "zod";

export const roleEnum = z.enum(["ADMIN", "USER"]);

export const userSchema = z.object({
  id: z.cuid(),
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(20, "Username maksimal 20 karakter")
    .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh huruf, angka, dan _")
    .trim(),

  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(50, "Nama maksimal 50 karakter")
    .trim(),

  role: roleEnum,

  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const createUserSchema = userSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    password: z.string().min(3, "Password minimal 3 karakter").max(100),
  });

export const updateUserSchema = createUserSchema.partial().extend({
  password: z.string().min(3, "Password minimal 3 karakter").optional(),
});

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
