/**
 * @file Allows for the use of multiple projects in the same database.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #database
 * - #utility
 *
 * @todo
 * - [P4] Add support for other database types.
 * - [P1] Implement environment control to access test tables.
 * - [P2] Add support for a dynamic project name.
 */

import { mysqlTableCreator } from "drizzle-orm/mysql-core"

/**
 * Creates a table name based on the application's settings and environment.
 */
export const createTableName = (name: string): string => `sk_${name}`

/**
 * Uses Drizzle's multi-project schema feature, which allows you to use the same database instance for multiple projects.
 *
 * @remarks
 * - Drizzle will throw an error during schema push if we don't prefix the table name passed to `mysqlTableCreator`. To disable prefixing, the 'multi-project-schema' feature should be disabled entirely.
 *
 * @see [Multi-Project Schema Docs](https://orm.drizzle.team/docs/goodies#multi-project-schema)
 */
export const createMysqlTable = mysqlTableCreator(createTableName)
