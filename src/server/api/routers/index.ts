/**
 * @file Contains the root router for the application.
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
 * - #root
 */

import { postsRouter } from "./posts"
import { createCallerFactory, createTRPCRouter } from "~/server/api/init/rpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in '~/server/api/routers' should be manually added here.
 */
export const appRouter = createTRPCRouter({
    /**
     * Used for accessing user post data.
     */
    posts: postsRouter
})

/**
 * An API router for the application.
 */
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 *
 * @example
 * const trpc = createCaller(createContext)
 * const res = await trpc.post.all()
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
