/**
 * @file Transforms the shared environment config.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #configuration
 * - #environment
 * - #transformer
 * - #zod
 */

import type { EnvironmentConfig } from "~/config"

/**
 * Transforms the shared environment config.
 */
export function transformSharedEnvironmentConfig(environmentConfig: EnvironmentConfig.Shared): EnvironmentConfig.Shared {
    //  Use the original value if it exists.

    baseUrl: if (!environmentConfig.urls.base) {
        if (environmentConfig.flags.vercel) {
            //  Set the base URL for to the `VERCEL_URL` environment variable.

            environmentConfig.urls.base = `https://${environmentConfig.urls.vercel}`

            //  Break out of the `baseUrl` block.

            break baseUrl
        }

        //  Throw an error if the application is starting without a `BASE_URL`.

        throw new Error("You forgot to configure the `BASE_URL` environment variable.")
    }

    //  Return the transformed environment config.

    return environmentConfig
}
