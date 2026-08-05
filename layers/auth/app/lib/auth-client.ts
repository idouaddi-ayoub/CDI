import { inferAdditionalFields, adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import * as schema from "~~/db/schema";
import type { auth } from "../../server/lib/auth";

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  resetPassword,
  deleteUser,
} = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({
      accessControl: schema.accessControl,
      roles: schema.roles,
    }),
  ],
});
