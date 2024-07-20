/**
 * @file The development environment configuration.
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
 * - #development
 */

import type { EnvironmentConfigSchema } from "~/validators"

/**
 * The development environment configuration.
 */
export const developmentEnvironmentConfig: EnvironmentConfigSchema.Development = {
    /**
     * The port the application runs on in development.
     *
     * @type { number | undefined }
     * @default 3000
     */
    port: undefined,
    /**
     * URL configurations for the app.
     */
    urls: {
        /**
         * The base URL for the development environment.
         *
         * @type { string | undefined }
         * @default `localhost:${environment.port}`
         */
        base: "https://27ntzpcq-3000.usw2.devtunnels.ms/"
    }
}
