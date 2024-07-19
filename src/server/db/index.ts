/**
 * @file Creates a connection to the database.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #database
 */

import * as schema from "./schemas"
import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"

//  Configure the Drizzle instance with the schema.

export const db = drizzle(sql, { schema })

//  Export the type definition of the database.

export type Drizzle = typeof db

//  Re-export the schema.

export { schema }
