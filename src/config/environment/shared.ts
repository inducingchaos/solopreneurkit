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
        vercel: process.env.VERCEL!
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
        vercel: process.env.VERCEL_URL!
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
            api: process.env.API_SECRET!,

            /* DATABASE */

            /**
             * The Postgres database URL.
             *
             * @type { string }
             */
            postgresUrl: process.env.POSTGRES_URL!,

            /**
             * The Postgres Prisma database URL.
             *
             * @type { string }
             */
            postgresPrismaUrl: process.env.POSTGRES_PRISMA_URL!,

            /**
             * The Postgres database URL without SSL.
             *
             * @type { string }
             */
            postgresUrlNoSsl: process.env.POSTGRES_URL_NO_SSL!,

            /**
             * The Postgres database URL without pooling.
             *
             * @type { string }
             */
            postgresUrlNonPooling: process.env.POSTGRES_URL_NON_POOLING!,

            /**
             * The Postgres database user.
             *
             * @type { string }
             */
            postgresUser: process.env.POSTGRES_USER!,

            /**
             * The Postgres database host.
             *
             * @type { string }
             */
            postgresHost: process.env.POSTGRES_HOST!,

            /**
             * The Postgres database password.
             *
             * @type { string }
             */
            postgresPassword: process.env.POSTGRES_PASSWORD!,

            /**
             * The Postgres database name.
             *
             * @type { string }
             */
            postgresDatabase: process.env.POSTGRES_DATABASE!
        }
    }
} as const
