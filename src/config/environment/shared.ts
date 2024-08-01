/**
 * @file The shared environment configuration.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #configuration
 * - #environment
 * - #environment-variables
 * - #config
 * - #secrets
 * - #env
 * - #zod
 * - #url
 * - #string
 * - #validation
 * - #keys
 * - #shared
 */

import type { EnvironmentConfigSchema } from "~/validators"

/**
 * The shared environment configuration.
 */
export const sharedEnvironmentConfig: EnvironmentConfigSchema.Shared = {
    /**
     * The port on which the app is running.
     *
     * @type { number | undefined }
     * @default 3000
     */
    port: undefined,

    /**
     * Flags for the app.
     */
    flags: {
        /**
         * Returns `1` if running on Vercel.
         *
         * @type { number | undefined }
         */
        vercel: process.env.VERCEL
    },

    /**
     * URL configurations for the app.
     */
    urls: {
        /**
         * The base URL for the app.
         *
         * @type { string | undefined }
         */
        base: "https://s--k.it",

        /**
         * The URL for the app when running on Vercel.
         *
         * @type { string | undefined }
         */
        vercel: process.env.VERCEL_URL
    },

    /**
     * Named application paths.
     */
    paths: {
        /**
         * Named page paths.
         */
        pages: {},

        /**
         * Named API route paths.
         */
        routes: {
            /**
             * The path for internal infrastructure-related requests.
             *
             * @type { string }
             */
            infra: "/api/infra",

            /**
             * The path for the tRPC API.
             *
             * @type { string }
             */
            trpc: "/api/infra/rpc"
        }
    },

    /**
     * Credentials for connecting to external services.
     */
    keys: {
        /**
         * Non-sensitive identifiers, such as usernames and public keys.
         *
         * Safe for use on the client.
         */
        public: {},

        /**
         * Sensitive identifiers, such as passwords and private keys.
         *
         * DO NOT EXPOSE CLIENT-SIDE!
         */
        secret: {
            /* INTERNAL */

            /**
             * The key used for accessing internal API routes.
             *
             * @type { string }
             */
            api: process.env.API_SECRET,

            /* DATABASE */

            /**
             * The database connection URL.
             *
             * @type { string }
             */
            databaseUrl: process.env.DATABASE_URL
        }
    }
} as const
