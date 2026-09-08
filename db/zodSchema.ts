import { z } from "zod";
import * as schema from "./schema";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const userSchema = createSelectSchema(schema.user);
export type User = z.infer<typeof userSchema>;

export const createUserSchema = createInsertSchema(schema.user);
export type UserInsert = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUpdateSchema(schema.user).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type UserUpdate = z.infer<typeof updateUserSchema>;
