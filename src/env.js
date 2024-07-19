/**
 * @file Validates environment variables against a Zod schema.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #environment
 * - #validation
 * - #zod
 *
 * @todo
 * - [P3] Create a custom error class for ENV errors.
 * - [P4] Consider building a custom implementation with Zod.
 * - [P2] Revert `POSTGRES_URL` to `DATABASE_URL`.
 *
 * @see [T3 Environment Variables](https://create.t3.gg/en/usage/env-files)
 */

import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    /**
     * These environment variables are available server-side only.
     */
    server: {
        NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
        POSTGRES_URL: z.string().url()
    },

    /**
     * These environment variables are exposed to the client only. Make sure to prefix each with `NEXT_PUBLIC_`.
     */
    client: {},

    /**
     * You can't access `process.env` as a regular object in the Next.js edge runtimes (e.g., middlewares) or client-side so we need to expose them manually.
     */
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        POSTGRES_URL: process.env.POSTGRES_URL
    },

    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip ENV validation. This is especially useful for Docker builds.
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,

    /**
     * Makes it so that empty strings are treated as undefined, throwing an error when validated with `z.string`.
     */
    emptyStringAsUndefined: true
})
