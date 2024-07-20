/**
 * @file Configures a tRPC provider component with React Query.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #react
 * - #trpc
 * - #react-query
 * - #rpc
 * - #query
 * - #client
 */

"use client"

import { createQueryClient } from "./helpers/query-client"
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query"
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"
import { environment } from "~/config"
import { type AppRouter } from "~/server/api/routers"
import { useState } from "react"
import SuperJSON from "superjson"

/**
 * Initializes a global query client instance.
 */
let queryClient: QueryClient | undefined

/**
 * Grabs the query client, or creates a new instance if it doesn't exist.
 */
const getQueryClient = (): QueryClient => {
    //  Always make a new query client server-side.

    if (typeof window === "undefined") return createQueryClient()

    //  In the browser, use a singleton pattern to reuse the same query client instance.

    return (queryClient ??= createQueryClient())
}

/**
 * Initializes the tRPC client.
 */
export const api = createTRPCReact<AppRouter>()

/**
 * Inference helper for inputs.
 *
 * @example
 * type HelloInput = RouterInputs["example"]["hello"]
 */
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helper for outputs.
 *
 * @example
 * type HelloOutput = RouterOutputs["example"]["hello"]
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>

/**
 * Wraps the `createTRPCReact` hook with React Query.
 */
export function TRPCReactProvider(props: { children: React.ReactNode }): JSX.Element {
    /**
     * Retrieves the query client.
     */
    const queryClient: QueryClient = getQueryClient()

    /**
     * Creates the tRPC client.
     */
    const [trpcClient] = useState(() =>
        api.createClient({
            /**
             * A chain of middleware that handles the processing of requests and responses.
             */
            links: [
                /**
                 * Logs errors and requests to the console in dev mode.
                 */
                loggerLink({
                    /**
                     * Enables logging if in a dev environment, or if there's an error and the operation is in the "down" direction.
                     */
                    enabled: op => environment.mode === "development" || (op.direction === "down" && op.result instanceof Error)
                }),

                /**
                 * Makes batched HTTP requests to the server.
                 */
                unstable_httpBatchStreamLink({
                    /**
                     * Used to serialize/deserialize data between the client and server.
                     */
                    transformer: SuperJSON,

                    /**
                     * The URL that tRPC will be sending requests to.
                     */
                    url: environment.urls.base + environment.paths.routes.trpc,

                    /**
                     * The headers that will be sent with the request.
                     */
                    headers: () => {
                        //  Retrieve the headers from the environment.

                        const headers: Headers = new Headers()

                        //  Set the source header.

                        headers.set("x-trpc-source", "nextjs-react")

                        //  Return the headers for the tRPC provider.

                        return headers
                    }
                })
            ]
        })
    )

    //  Structures the provider component to include the query client and the tRPC client.

    return (
        <>
            {/* React Query client */}

            <QueryClientProvider client={queryClient}>
                {/* tRPC client */}

                <api.Provider client={trpcClient} queryClient={queryClient}>
                    {/* The application */}

                    {props.children}
                </api.Provider>
            </QueryClientProvider>
        </>
    )
}
