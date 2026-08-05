import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleTypeEnum = pgEnum("user_role_type", [
  "admin",
  "member",
  "mod",
]);
