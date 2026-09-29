const publicPaths = ["/login", "/auth/error"];

export default defineNuxtRouteMiddleware(async (to) => {
  const guarded = to.path === "/members" || to.path.startsWith("/members/");
  if (!guarded && !publicPaths.includes(to.path)) return;

  const session = await useRequestFetch()<{ user?: unknown } | null>(
    "/api/auth/get-session",
  ).catch(() => null);
  const isLoggedIn = !!session?.user;

  if (guarded && !isLoggedIn) {
    return navigateTo({ path: "/login", query: { redirect: to.fullPath } });
  }

  if (isLoggedIn && to.path === "/login") {
    return navigateTo("/members");
  }
});
