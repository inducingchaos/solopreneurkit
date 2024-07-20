/**
 * @file The development environment configuration schema.
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

import { sharedEnvironmentConfigSchema } from "~/validators"
import { z } from "zod"

/**
 * The development-specific environment schema.
 *
 * Refer to the configuration files for documentation.
 */
export const developmentEnvironmentConfigSchema = sharedEnvironmentConfigSchema
    .pick({
        port: true
    })
    .merge(
        z.object({
            urls: z.object({
                base: z.string().url().optional()
            })
        })
    )
