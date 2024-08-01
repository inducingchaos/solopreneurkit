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
import { environment } from "~/config"
import { type Config } from "drizzle-kit"

export default {
    /**
     * Path to the schema export.
     */
    schema: "./src/server/db/schemas/index.ts",

    /**
     * The dialect of the database.
     */
    dialect: "postgresql",

    /**
     * The credentials for the database.
     */
    dbCredentials: {
        url: environment.keys.secret.databaseUrl!
    },

    /**
     * A glob pattern that selects the tables to introspect and push changes to.
     */
    tablesFilter: createTableName("") + "*"
} satisfies Config
