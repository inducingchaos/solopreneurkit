/**
 * @file Where the tRPC API is initialized.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #api
 * - #init
 * - #rpc
 * - #trpc
 * - #context
 *
 * @remarks
 * - You probably don't need to edit this file unless you want to modify request context (see `createTrpcContext`) or create a new middleware or type of procedure (see `createTrpcRouter`)
 * - TL;DR: This is where all the tRPC server stuff is initialized. The pieces you will need to use are documented accordingly near the end.
 */

import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"
import { db } from "~/server/db"

/* CONTEXT */

/**
 * Generates the internal "context" that is available when building the tRPC server.
 *
 * These allow you to access things when processing a request, like the database, session, etc.
 *
 * Defines and generates the "internals" for the context that is available to all tRPC procedures, allowing you to access common properties when processing a request, like a database or the session.
 *
 * The API handler and RSC clients wrap this to provide the required context.
 *
 * @see [tRPC Context](https://trpc.io/docs/server/context)
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createTrpcContext = async (opts: { headers: Headers }) => {
    return {
        db,
        ...opts
    }
}

/**
 * A tRPC context object.
 */
export type TRPCContext = ReturnType<typeof createTrpcContext>

/* INITIALIZATION */

/**
 * Creates a tRPC instance & connects the context and a transformer. We also parse ZodErrors to provide type-safety on the frontend if your procedure fails due to validation errors on the backend.
 */
const t = initTRPC.context<typeof createTrpcContext>().create({
    /**
     * Used to serialize and deserialize data transferred over the network.
     */
    transformer: superjson,

    /**
     * Dictates the shape of the errors created by tRPC.
     */
    errorFormatter({ shape, error }) {
        return {
            //  Dumps the original error into the new error.

            ...shape,

            //  Overwrites the data property.

            data: {
                //  Dumps the original error data.

                ...shape.data,

                //  Assigns the flattened Zod error if it exists.

                zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
            }
        }
    }
})

/**
 * Creates a server-side caller.
 *
 * @see [Server-Side Calls](https://trpc.io/docs/server/server-side-calls)
 */
export const createCallerFactory = t.createCallerFactory

/* ROUTERS */

/**
 * Use this to create each "branch" of your tRPC API. It's good practice to have one router per file, with your 'apex' router in '~/server/api/routers/index.ts'. Procedures will go inside of this. References to nested routers are installed in the same way as procedures.
 *
 * @see [tRPC Router](https://trpc.io/docs/router)
 */
export const createTRPCRouter = t.router

/* PROCEDURES */

/**
 * This is the standard, unauthenticated procedure. Use this to build new queries and mutations inside each of your API routers.
 *
 * It does not guarantee that a user querying is authorized, but you can still access user session data if they are logged in (if you have the auth session object installed in `createTrpcContext`).
 */
export const publicProcedure = t.procedure
