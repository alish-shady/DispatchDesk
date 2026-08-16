import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle({ client: pool });

  try {
    console.log("Starting migration...");

    await migrate(db, {
      migrationsFolder: "./drizzle",
    });

    console.log("Migrations ran successfully");
  } catch (error) {
    console.error("========== MIGRATION FAILED ==========");
    console.error(error);

    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
      console.error("Cause:", error.cause);
    }

    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
