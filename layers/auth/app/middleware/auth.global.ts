const publicPaths = ["/login", "/auth/error"];

export default defineNuxtRouteMiddleware(async (to) => {
  // Global middleware runs on every route, so a static `useSession` import put
  // better-auth (~66KB) in the entry chunk and fired a session request on the
  // prerendered marketing page — which has nothing to guard. Only the member
  // area and the two auth pages need to know, so decide from the path first
  // and import the client behind that check.
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
