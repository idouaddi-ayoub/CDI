import { useSession } from "../lib/auth-client";
const publicPaths = ["/login", "/auth/error"];

export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await useSession(useFetch);

  if (to.path.startsWith("/members"))
    if (!session.value)
      return navigateTo({
        path: "/login",
        query: { redirect: to.fullPath },
      });

  if (session.value && publicPaths.includes(to.path)) {
    return navigateTo("/members");
  }
});
