"use server";

import { createPostSchema, likePostSchema } from "@/lib/schemas";
import { signedInClient } from "@/actions/action-client";
import models from "../models";
import { createSupaClient } from "../supabase/server";

export const createPost = signedInClient
  .schema(createPostSchema)
  .action(async ({ ctx, parsedInput }) => {
    console.log("SERVER", parsedInput.image);
    const postId = await models.post.createPost(ctx.db, parsedInput, ctx.user);
    const client = await createSupaClient();
    const { data, error } = await client.storage
      .from("files")
      .upload(`posts/${postId}.png`, parsedInput.image);
    if (error) {
      console.log(error);
    }
    await models.post.updateImagePath(ctx.db, postId, data!.path);
    return {
      postId,
    };
  });

export const likePost = signedInClient
  .schema(likePostSchema)
  .action(async ({ ctx, parsedInput }) => {
    await models.post.likePost(parsedInput.postId, ctx.user.id);
    return {};
  });

export const unlikePost = signedInClient
  .schema(likePostSchema)
  .action(async ({ ctx, parsedInput }) => {
    await models.post.unlikePost(parsedInput.postId, ctx.user.id);
    return {};
  });
