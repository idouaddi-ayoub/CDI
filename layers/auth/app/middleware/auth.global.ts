const publicPaths = ["/login", "/auth/error"];

export default defineNuxtRouteMiddleware(async (to) => {
  const guarded = to.path.startsWith("/members");
  if (!guarded && !publicPaths.includes(to.path)) return;

  const { useSession } = await import("../lib/auth-client");
  const { data: session } = await useSession(useFetch);

  if (guarded && !session.value)
    return navigateTo({
      path: "/login",
      query: { redirect: to.fullPath },
    });

  if (session.value && publicPaths.includes(to.path)) {
    return navigateTo("/members");
  }
});
