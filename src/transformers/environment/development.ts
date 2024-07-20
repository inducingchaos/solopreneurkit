/**
 * @file Transforms the development environment config.
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
 * Transforms the development environment config.
 */
export function transformDevelopmentEnvironmentConfig(environmentConfig: EnvironmentConfig.Development): EnvironmentConfig.Development {
    //  If the development base URL isn't configured, set it to localhost.

    if (environmentConfig.urls.base === undefined) environmentConfig.urls.base = `http://localhost:${environmentConfig.port}`

    //  Return the transformed environment config.

    return environmentConfig
}