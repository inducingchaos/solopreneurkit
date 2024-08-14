/**
 * @file A schema for posts.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #db-schema
 * - #posts
 * - #schema
 * - #database-table
 * - #drizzle
 * - #mysql
 * - #sql
 */

import { createMysqlTable } from "@sdkit/utils/db"
import { index, timestamp, varchar } from "drizzle-orm/mysql-core"
import { v4 as uuid } from "uuid"

/**
 * The schema for a post.
 */
export const posts = createMysqlTable(
    "posts",
    {
        /**
         * An ID for the post.
         */
        id: varchar("id", { length: 255 }).primaryKey().$defaultFn(uuid),
        /**
         * The content of the post.
         */
        content: varchar("content", { length: 255 }),

        /**
         * The date the post was created.
         */
        createdAt: timestamp("created_at").notNull().defaultNow(),

        /**
         * The date the post was last updated.
         */
        updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow()
    },

    post => ({
        /**
         * An index on the post content.
         */
        contentIndex: index("content_idx").on(post.content)
    })
)
