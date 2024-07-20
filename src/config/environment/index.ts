/**
 * @file The environment configuration for the application.
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
 *
 * @remarks
 * - To override the environment mode, adjust the `MODE` environment variable in the `.env` file.
 * - To access the values for a specific environment, use `environment.<environment>`.
 *
 * @todo
 * - [P2] Resolve state management / TLA / `environmentMode` issue.
 * - [P3] Create a custom error class for Zod environment validation errors & for the `environmentMode` API.
 * - [P4] Abstract away complexities into an easy-to-use API.
 */

import { sharedEnvironmentConfig, developmentEnvironmentConfig, previewEnvironmentConfig, productionEnvironmentConfig } from "~/config"
import { transformDevelopmentEnvironmentConfig, transformPreviewEnvironmentConfig, transformProductionEnvironmentConfig, transformSharedEnvironmentConfig } from "~/transformers"
// import { environmentMode } from "~/utils"
import { developmentEnvironmentConfigSchema, previewEnvironmentConfigSchema, productionEnvironmentConfigSchema, sharedEnvironmentConfigSchema } from "~/validators"
import lodash from "lodash"
import { type z } from "zod"
import type { EnvironmentMode } from "~/types"

/**
 * An environment configuration.
 *
 * Uses the inferred output type from the environment configuration schemas.
 */
export namespace EnvironmentConfig {
    /**
     * A shared environment configuration.
     */
    export type Shared = z.output<typeof sharedEnvironmentConfigSchema>

    /**
     * A development environment configuration.
     */
    export type Development = z.output<typeof developmentEnvironmentConfigSchema>

    /**
     * A preview environment configuration.
     */
    export type Preview = z.output<typeof previewEnvironmentConfigSchema>

    /**
     * A production environment configuration.
     */
    export type Production = z.output<typeof productionEnvironmentConfigSchema>
}

//  Parse the environment configuration data using the Zod schemas.

/**
 * The parsed environment configuration.
 *
 * Uses the environment configuration schemas to parse the environment configuration data.
 */
export const parsedEnvironmentConfig = {
    /**
     * The parsed shared environment configuration.
     */
    shared: sharedEnvironmentConfigSchema.parse(sharedEnvironmentConfig),

    /**
     * The parsed development environment configuration.
     */
    development: developmentEnvironmentConfigSchema.parse(developmentEnvironmentConfig),

    /**
     * The parsed preview environment configuration.
     */
    preview: previewEnvironmentConfigSchema.parse(previewEnvironmentConfig),

    /**
     * The parsed production environment configuration.
     */
    production: productionEnvironmentConfigSchema.parse(productionEnvironmentConfig)
}

//  Transform the environment configuration data using the transformers.

/**
 * The transformed environment configuration.
 *
 * Uses the transformers to transform the environment configuration data.
 */
export const transformedEnvironmentConfig = {
    /**
     * The transformed shared environment configuration.
     */
    shared: transformSharedEnvironmentConfig(parsedEnvironmentConfig.shared),

    /**
     * The transformed development environment configuration.
     */
    development: transformDevelopmentEnvironmentConfig(parsedEnvironmentConfig.development),

    /**
     * The transformed preview environment configuration.
     */
    preview: transformPreviewEnvironmentConfig(parsedEnvironmentConfig.preview),

    /**
     * The transformed production environment configuration.
     */
    production: transformProductionEnvironmentConfig(parsedEnvironmentConfig.production)
}

//  Uses the `lodash` library to merge the shared configuration data with each of the environment-scoped configurations.

/**
 * The merged environment configuration.
 *
 * Contains each of the environment-scoped configurations that have been merged with the shared configuration.
 */
export const mergedEnvironmentConfig = {
    /**
     * The merged shared environment configuration.
     */
    shared: transformedEnvironmentConfig.shared,

    /**
     * The merged development environment configuration.
     */
    development: lodash.merge({}, transformedEnvironmentConfig.shared, transformedEnvironmentConfig.development),

    /**
     * The merged preview environment configuration.
     */
    preview: lodash.merge({}, transformedEnvironmentConfig.shared, transformedEnvironmentConfig.preview),

    /**
     * The merged production environment configuration.
     */
    production: lodash.merge({}, transformedEnvironmentConfig.shared, transformedEnvironmentConfig.production)
}

/*

/* FIX: https://chatgpt.com/c/8456d4d1-34d8-4d23-89c1-054d9c23e23f */

//  Get the environment mode.

// /**
//  * The environment mode the application is running in.
//  */
// const mode: EnvironmentMode = await environmentMode()

/**
 * HARDCODED ENVIRONMENT MODE. Change to `production` before each commit (or push, which will re-deploy to Vercel).
 */
const mode: EnvironmentMode = "production"

//  Dynamically select the default environment configuration based on the environment mode, then append the environment-specific configurations and the environment mode.

/**
 * The environment configuration.
 */
export const environment = {
    ...mergedEnvironmentConfig[mode],
    ...mergedEnvironmentConfig,
    mode: mode as EnvironmentMode
}

//  Export the environment provider type.

/**
 * A read-only environment configuration.
 */
export type Environment = typeof environment

//  Re-export the mode-specific configurations.

export * from "./shared"
export * from "./development"
export * from "./preview"
export * from "./production"
