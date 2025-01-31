import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { headers } from "next/headers";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
  },
  // user: {
  //   additionalFields: {
  //     handle: {
  //       type: "string",
  //       required: true,
  //     },
  //   },
  // },

  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
});

export const getSession = async () => {
  return await auth.api.getSession({ headers: await headers() });
};
