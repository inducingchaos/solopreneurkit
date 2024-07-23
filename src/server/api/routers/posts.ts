/**
 * @file Contains a router for interacting with user posts.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #api
 * - #misc
 * - #request
 * - #response
 * - #server
 * - #trpc
 * - #rpc
 * - #query
 * - #router
 * - #procedure
 * - #posts
 */

import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/init/rpc"
import { posts } from "~/server/db/schemas"

/**
 * The router used to access user post data.
 */
export const postsRouter = createTRPCRouter({
    /**
     * A test query with an input.
     */
    hello: publicProcedure
        .input(
            //  The input schema.

            z.object({
                text: z.string()
            })
        )
        .query(({ input }) => {
            //  The response object.

            return {
                greeting: `Hello ${input.text}`
            }
        }),

    /**
     * Creates a new 'post' entry.
     */
    create: publicProcedure
        .input(
            z.object({
                /**
                 * The content of the post.
                 */
                content: z.string().min(1)
            })
        )
        .mutation(async ({ ctx, input }) => {
            // Simulates a slow db call.

            // await new Promise(resolve => setTimeout(resolve, 1000))

            //  Inserts the post into the database.

            await ctx.db.insert(posts).values({
                content: input.content
            })
        }),

    /**
     * Retrieves the latest post.
     */
    getLatest: publicProcedure.query(({ ctx }) => {
        //  Queries the database and returns the first result.

        return ctx.db.query.posts.findFirst({
            //  Sorts the query by the creation date in descending order.

            orderBy: (posts, { desc }) => [desc(posts.createdAt)]
        })
    })
})
