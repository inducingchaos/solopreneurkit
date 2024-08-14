/**
 * @file Creates a connection to the database.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #database
 */

import { Client } from "@planetscale/database"
import { drizzle } from "drizzle-orm/planetscale-serverless"
import { environment } from "~/config"
import * as schema from "./schemas"

//  Configure the Drizzle instance with the schema.

export const db = drizzle(new Client({ url: environment.keys.secret.databaseUrl }), { schema })

//  Export the type definition of the database.

export type Drizzle = typeof db

//  Re-export the schema.

export { schema }
