import { _db } from "@/db";
import { post } from "@/db/schema";
import { CreatePostSchema } from "@/lib/schemas";
import { User } from "better-auth";
import { eq } from "drizzle-orm";

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

const getNewestPosts = async (limit = 10, db = _db) => {
  return await db.select().from(post).limit(limit).orderBy(post.createdAt);
};

const model = {
  createPost,
  updateImagePath,
  getNewestPosts,
};

export default model;
