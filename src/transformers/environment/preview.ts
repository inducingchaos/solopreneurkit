/**
 * @file Transforms the preview environment config.
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
 * Transforms the preview environment config.
 */
export function transformPreviewEnvironmentConfig(environmentConfig: EnvironmentConfig.Preview): EnvironmentConfig.Preview {
    //  Return the transformed environment config.

    return environmentConfig
}
