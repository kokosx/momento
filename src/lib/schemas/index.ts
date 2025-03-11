import { z } from "zod";
import { zfd } from "zod-form-data";

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

export const createPostSchema = zfd.formData({
  title: zfd.text(z.string().min(1)),
  content: zfd.text().optional(),
  image: zfd.file(
    z
      .any()
      .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
      .refine(
        (file) => ["image/jpeg"].includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      )
  ),
});
export type CreatePostSchema = typeof createPostSchema._output;

export const likePostSchema = z.object({
  postId: z.string(),
});
