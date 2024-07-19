/**
 * @file Allows for the use of multiple projects in the same database.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #database
 * - #utility
 *
 * @todo
 * - [P4] Add support for MySQL/SQLite.
 * - [P1] Implement environment control to access test tables.
 * - [P2] Add support for a dynamic project name.
 */

import { pgTableCreator } from "drizzle-orm/pg-core"

/**
 * Creates a table name based on the application's settings and environment.
 */
const createTableName = (name: string) => `sk_${name}`

/**
 * Uses Drizzle's multi-project schema feature, which allows you to use the same database instance for multiple projects.
 *
 * @remarks
 * - Drizzle will throw an error during schema push if we don't prefix the table name passed to `pgTableCreator`. To disable prefixing, the 'multi-project-schema' feature should be disabled entirely.
 *
 * @see [Multi-Project Schema Docs](https://orm.drizzle.team/docs/goodies#multi-project-schema)
 */
export const createPgTable = pgTableCreator(createTableName)
