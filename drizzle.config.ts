/**
 * @file Configures the Drizzle ORM.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #configuration
 * - #drizzle
 * - #database
 * - #db-schema
 */

import { createTableName } from "@sdkit/utils/db"
import { type Config } from "drizzle-kit"
// import { environment } from "~/config"

export default {
    /**
     * Path to the database schema.
     */
    schema: "./src/server/db/schemas/index.ts",

    /**
     * The database type.
     */
    dialect: "mysql",

    /**
     * The credentials for connecting to the database.
     */
    dbCredentials: { url: process.env.DATABASE_URL! },

    /**
     * A glob pattern that selects the tables to introspect and push changes to.
     */
    tablesFilter: createTableName("") + "*"
} satisfies Config
