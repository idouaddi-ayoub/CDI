const publicPaths = ["/login", "/auth/error"];

export default defineNuxtRouteMiddleware(async (to) => {
  const guarded = to.path === "/members" || to.path.startsWith("/members/");
  if (!guarded && !publicPaths.includes(to.path)) return;

  const { useSession } = await import("../lib/auth-client");
  const { data: session } = await useSession(useFetch);
  const isLoggedIn = !!session.value?.user;

  if (guarded && !isLoggedIn) {
    return navigateTo({ path: "/login", query: { redirect: to.fullPath } });
  }

  if (isLoggedIn && to.path === "/login") {
    return navigateTo("/members");
  }
});
