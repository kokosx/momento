import { _db } from "@/db";
import { post, user_likes_post } from "@/db/schema";
import { CreatePostSchema } from "@/lib/schemas";
import { User } from "better-auth";
import { and, count, eq, exists } from "drizzle-orm";

const createPost = async (db = _db, data: CreatePostSchema, user: User) => {
  const row = await db
    .insert(post)
    .values({
      title: data.title,
      content: data.content,
      image: "TBD",
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  return row.at(0)!.id;
};

const updateImagePath = (db = _db, id: number, path: string) => {
  return db.update(post).set({ image: path }).where(eq(post.id, id));
};

const getNewestPosts = async (limit = 10, userId: string, db = _db) => {
  return await db
    .select({
      count: count(user_likes_post),
      id: post.id,
      title: post.title,
      content: post.content,
      image: post.image,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      userId: post.userId,
      didUserInitiallyLike: exists(
        db
          .select({ id: user_likes_post.userId })
          .from(user_likes_post)
          .where(
            and(
              eq(user_likes_post.postId, post.id),
              eq(user_likes_post.userId, userId)
            )
          )
      ),
    })
    .from(post)
    .innerJoin(user_likes_post, eq(post.id, user_likes_post.postId))
    .limit(limit)
    .orderBy(post.createdAt);
};

const likePost = async (postId: number, userId: string, db = _db) => {
  await db.insert(user_likes_post).values({
    postId,
    userId,
    createdAt: new Date(),
  });
};

const unlikePost = async (postId: number, userId: string, db = _db) => {
  await db
    .delete(user_likes_post)
    .where(
      and(
        eq(user_likes_post.postId, postId),
        eq(user_likes_post.userId, userId)
      )
    );
};

const model = {
  createPost,
  updateImagePath,
  getNewestPosts,
  likePost,
  unlikePost,
};

export default model;
