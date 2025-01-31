import { z } from "zod";

export const signupActionSchema = z
  .object({
    email: z.string().min(5).email(),
    password: z.string().min(3),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["password"],
  });

export const signinActionSchema = z.object({
  email: z.string(),
  password: z.string(),
});
