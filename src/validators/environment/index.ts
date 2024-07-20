/**
 * @file Exports the environment configuration schemas and their types.
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
 */

import { type sharedEnvironmentConfigSchema, type developmentEnvironmentConfigSchema, type previewEnvironmentConfigSchema, type productionEnvironmentConfigSchema } from "~/validators"
import type { z } from "zod"

/**
 * An environment configuration schema.
 *
 * Uses the inferred input type from the environment configuration schemas.
 */
export namespace EnvironmentConfigSchema {
    /**
     * A shared environment configuration schema.
     */
    export type Shared = z.input<typeof sharedEnvironmentConfigSchema>

    /**
     * A development environment configuration schema.
     */
    export type Development = z.input<typeof developmentEnvironmentConfigSchema>

    /**
     * A preview environment configuration schema.
     */
    export type Preview = z.input<typeof previewEnvironmentConfigSchema>

    /**
     * A production environment configuration schema.
     */
    export type Production = z.input<typeof productionEnvironmentConfigSchema>
}

//  Re-export the mode-specific schemas.

export * from "./shared"
export * from "./development"
export * from "./preview"
export * from "./production"
