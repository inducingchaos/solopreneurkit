/**
 * @file Environment-related types.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #types
 * - #environment
 * - #environment-mode
 *
 * @todo
 * - [P4] Consider co-locating types that aren't widely reused.
 */

/**
 * The possible environment modes for the application.
 */
export const environmentModes = ["development", "preview", "production"] as const

/**
 * An environment the application is currently running in.
 */
export type EnvironmentMode = (typeof environmentModes)[number]
