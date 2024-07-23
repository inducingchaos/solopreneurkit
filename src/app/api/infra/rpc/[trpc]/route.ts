/**
 * @file Sets up the tRPC API routes for the app.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #api
 * - #route
 * - #misc
 * - #request
 * - #response
 * - #server
 * - #trpc
 * - #rpc
 * - #query
 */

import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { type NextRequest } from "next/server"
import { environment } from "~/config"
import { createTrpcContext as createTrpcContext, type TRPCContext } from "~/server/api/init/rpc"
import { appRouter } from "~/server/api/routers"

/**
 * Uses the request headers to create the context for tRPC.
 */
const createContext = async (req: NextRequest): TRPCContext =>
    createTrpcContext({
        headers: req.headers
    })

/**
 * Handles incoming requests to the tRPC API.
 */
const handler = (req: NextRequest): Promise<Response> =>
    fetchRequestHandler({
        endpoint: environment.paths.routes.trpc,
        req,
        router: appRouter,
        createContext: () => createContext(req),
        onError:
            environment.mode === "development"
                ? ({ path, error }): void => {
                      console.error(`tRPC failed on '${path ?? "<no-path>"}': ${error.message}.`)
                  }
                : undefined
    })

export { handler as GET, handler as POST }
