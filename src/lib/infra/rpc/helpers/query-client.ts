/**
 * @file Pre-configures a Query Client for tRPC. Used to interact with the cache in the context of data fetching.
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

import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query"
import SuperJSON from "superjson"

/**
 * Initializes a pre-configured query client.
 */
export const createQueryClient = (): QueryClient =>
    new QueryClient({
        /**
         * Configures the default options for the query client.
         */
        defaultOptions: {
            /**
             * Adjusts the settings related to the cache.
             */
            queries: {
                //  With SSR, we usually want to set a default `staleTime` greater than 0ms to avoid refetching immediately on the client.

                /**
                 * The time in milliseconds after which the data is considered stale.
                 */
                staleTime: 30 * 1000
            },

            /**
             * Configures how your application's state is transformed into a format that can be transferred over the network.
             */
            dehydrate: {
                /**
                 * The transformer that packages the data to be transferred.
                 */
                serializeData: SuperJSON.serialize,

                /**
                 * A function that determines whether a particular query should be dehydrated.
                 */
                shouldDehydrateQuery: (query): boolean => {
                    //  Uses the default & also dehydrating queries that are pending.

                    return defaultShouldDehydrateQuery(query) || query.state.status === "pending"
                }
            },

            /**
             * Describes how to re-establish request data on the client side.
             */
            hydrate: {
                /**
                 * The transformer that restores transferred data into a usable form.
                 */
                deserializeData: SuperJSON.deserialize
            }
        }
    })
