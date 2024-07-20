/**
 * @file Transforms the production environment config.
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
 * Transforms the production environment config.
 */
export function transformProductionEnvironmentConfig(environmentConfig: EnvironmentConfig.Production): EnvironmentConfig.Production {
    //  Return the transformed environment config.

    return environmentConfig
}
