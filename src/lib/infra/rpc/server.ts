/**
 * @file Configures and exports helpers for server-side data fetching and client-side state management.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #react
 * - #trpc
 * - #react-query
 * - #rpc
 * - #query
 * - #client
 * - #server
 */

import "server-only"

import { createQueryClient } from "./helpers/query-client"
import { createHydrationHelpers } from "@trpc/react-query/rsc"
import { createTRPCContext } from "~/server/api/init/rpc"
import { createCaller, type AppRouter } from "~/server/api/routers"
import { headers as getHeaders } from "next/headers"
import { cache } from "react"

/**
 * Provides the required context for the tRPC API when creating a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
    //  Creates a new set of headers from the existing headers.

    const headers: Headers = new Headers(getHeaders())

    //  Set the source header.

    headers.set("x-trpc-source", "rsc")

    //  Create the context with the new headers.

    return createTRPCContext({ headers })
})

/**
 * Retrieves and caches the query client.
 */
const getQueryClient = cache(createQueryClient)

/**
 * Wraps the server-side caller consuming the current context.
 */
const caller = createCaller(createContext)

//  Exports the tRPC API caller, and a function to hydrate the client-side cache with data fetched on the server.

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(caller, getQueryClient)
