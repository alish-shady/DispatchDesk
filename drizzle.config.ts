import "dotenv/config";
import { defineConfig } from "drizzle-kit";
console.log("Connecting to:", process.env.DATABASE_URL);
export default defineConfig({
  out: "./drizzle",
  schema: ["./db/schema.ts", "./auth-schema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
