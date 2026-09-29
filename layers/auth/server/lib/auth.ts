import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "~~/db/schema";
import { APIError } from "better-auth/api";
import { admin } from "better-auth/plugins";
import { useDrizzle } from "../utils/drizzle";

export const auth = betterAuth({
  secret: process.env.NUXT_BETTER_AUTH_SECRET,
  database: drizzleAdapter(useDrizzle(), {
    provider: "pg",
    schema: { ...schema },
    usePlural: false,
  }),
  baseURL: process.env.NUXT_BETTER_AUTH_URL,
  basePath: "/api/auth",
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    admin({
      ac: schema.accessControl,
      roles: schema.roles,
    }),
  ],
  onAPIError: {
    errorURL: "/auth/error",
    onError: (error) => {
      console.error("Auth error:", error);
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const rawEmails = process.env.NUXT_ALLOWED_EMAILS ?? "";
          const allowedEmails = new Set(
            rawEmails.split(",").map((e: string) => e.trim().toLowerCase()),
          );
          const email = user.email?.trim().toLowerCase();
          console.log("Checking email:", email, "against:", [...allowedEmails]);
          if (!email || !allowedEmails.has(email)) {
            throw new APIError("FORBIDDEN", {
              message: "This Google account is not allowed to sign in.",
            });
          }
          return { data: { ...user, role: "member" } };
        },
      },
    },
  },
  trustedOrigins: ["https://www.cdiencga.com"],
});
