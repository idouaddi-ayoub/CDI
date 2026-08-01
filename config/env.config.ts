export function checkEnv(env: NodeJS.ProcessEnv) {
  const required = [
    "NUXT_PUBLIC_BASE_URL",
    "NUXT_BETTER_AUTH_URL",
    "NUXT_PUBLIC_SUPABASE_DB_URL",
    "NUXT_PUBLIC_S3_BUCKET",
    "NUXT_PUBLIC_S3_REGION",
    "NUXT_PUBLIC_GOOGLE_CLIENT_ID",
    "NUXT_DATABASE_URL",
    "NUXT_BETTER_AUTH_SECRET",
    "NUXT_GOOGLE_CLIENT_SECRET",
    "NUXT_S3_ENDPOINT",
    "NUXT_S3_ACCESS_KEY_ID",
    "NUXT_S3_SECRET_ACCESS_KEY",
    "NUXT_MAIN_ORG",
    "NUXT_MAIN_ORG_SLUG",
    "NUXT_ALLOWED_EMAILS",
  ];

  const missing = required.filter((key) => !env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
}
