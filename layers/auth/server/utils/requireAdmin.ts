import { auth } from "~~/layers/auth/server/lib/auth";
import type { H3Event } from "h3";

export async function requireAdmin(event: H3Event) {
  const session = await auth.api.getSession({ headers: event.headers });

  if (!session?.user) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  if (session.user.role !== "admin") {
    throw createError({ statusCode: 403, message: "Forbidden: Admins only" });
  }

  return session;
}
