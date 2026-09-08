import { checkEnv } from "../../config/env.config";
checkEnv(process.env);

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
    },
    betterAuthUrl: process.env.NUXT_BETTER_AUTH_URL,
    googleClientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
    allowedEmails: process.env.NUXT_ALLOWED_EMAILS,
    betterAuthSecret: process.env.NUXT_BETTER_AUTH_SECRET,
  },
});
