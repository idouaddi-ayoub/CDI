import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  dashboard: ["create", "read", "update", "delete"],
  forum: ["create", "read", "update", "delete"],
  files: ["create", "read", "update", "delete"],
  task: ["create", "read", "update", "delete"],
} as const;

export const accessControl = createAccessControl(statement);

export const roles = {
  admin: accessControl.newRole({
    ...adminAc.statements,
  }),

  member: accessControl.newRole({
    dashboard: ["read"],
    forum: ["read"],
    files: ["read"],
    task: ["read", "update"],
  }),

  mod: accessControl.newRole({
    user: ["list"],
    dashboard: ["read"],
    forum: ["read"],
    files: ["read"],
    task: ["read", "update"],
  }),

  agent: accessControl.newRole({
    dashboard: ["read"],
    forum: ["read"],
    files: ["read"],
    task: ["read", "update"],
  }),
};
