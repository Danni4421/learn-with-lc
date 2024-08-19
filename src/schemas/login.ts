import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ message: "Email tidak terdiri dari karakter." })
    .email({ message: "Email tidak valid." }),
  password: z
    .string({
      message: "Password tidak terdiri dari karakter.",
    })
    .min(8, {
      message: "Password minimal 8 karakter.",
    }),
});
