/**
 * @file Creates a connection to the database.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #database
 */

import * as schema from "./schemas"
import { createPool } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { environment } from "~/config"

//  Configure the Drizzle instance with the schema.
export const db = drizzle(createPool({ connectionString: environment.keys.secret.databaseUrl }), { schema })

//  Export the type definition of the database.

export type Drizzle = typeof db

//  Re-export the schema.

export { schema }
