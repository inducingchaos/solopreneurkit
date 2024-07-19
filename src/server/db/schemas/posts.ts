/**
 * @file A schema for posts.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #db-schema
 * - #posts
 */

import { createPgTable } from "@sdkit/utils/db"
import { sql } from "drizzle-orm"
import { index, serial, timestamp, varchar } from "drizzle-orm/pg-core"

/**
 * A schema for a post.
 */
export const posts = createPgTable(
    "posts",
    {
        /**
         * An ID for the post.
         */
        id: serial("id").primaryKey(),

        /**
         * The name of the post.
         */
        name: varchar("name", { length: 256 }),

        /**
         * The date the post was created.
         */
        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),

        /**
         * The date the post was last updated.
         */
        updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date())
    },

    post => ({
        /**
         * An index on the name.
         */
        nameIndex: index("name_idx").on(post.name)
    })
)
