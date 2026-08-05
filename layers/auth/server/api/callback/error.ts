import { defineEventHandler, getQuery, sendRedirect } from "h3";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const error =
    typeof query.error === "string"
      ? query.error
      : "This account is not allowed to sign in.";

  return sendRedirect(
    event,
    `/auth/error?error=${encodeURIComponent(error)}`,
    302,
  );
});
