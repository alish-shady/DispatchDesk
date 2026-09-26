import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
const connectionString = process.env.DATABASE_URL!;
import * as authSchema from "@/auth-schema";
import * as appSchema from "@/db/schema";
const client = postgres(connectionString, { prepare: false });
export const db = drizzle({ client, schema: { ...authSchema, ...appSchema } });
