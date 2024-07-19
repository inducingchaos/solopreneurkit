/**
 * @file Config for Next.js.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #configuration
 * - #nextjs
 * - #build
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { env } = await import("./src/env.js")

/**
 * Configuration options for Next.js.
 *
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful for Docker builds.
 *
 * @type { import ( "next" ) .NextConfig }
 */
const config = {}

export default config
