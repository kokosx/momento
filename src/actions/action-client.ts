import { createMiddleware, createSafeActionClient } from "next-safe-action";
import { _db } from "../db";
import { getSession } from "../auth";

export const actionClient = createSafeActionClient();

export const signedInMiddleware = createMiddleware().define(
  async ({ next }) => {
    const user = await getSession();
    if (!user?.user) {
      throw new Error("User not authenticated");
    }
    return next({
      ctx: {
        db: _db,
        user: user.user,
      },
    });
  }
);

export const signedInClient = actionClient.use(signedInMiddleware);
