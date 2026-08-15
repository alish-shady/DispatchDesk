import { relations } from "drizzle-orm/relations";
import { organizations, users } from "./schema";

export const usersRelations = relations(users, ({one}) => ({
	organization: one(organizations, {
		fields: [users.orgId],
		references: [organizations.id]
	}),
}));

export const organizationsRelations = relations(organizations, ({many}) => ({
	users: many(users),
}));