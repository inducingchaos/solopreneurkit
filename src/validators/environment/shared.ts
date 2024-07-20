/**
 * @file A shared environment configuration schema that can be inherited by mode-specific schemas.
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
 * - #shared
 *
 * @todo
 * - [P2] Revert `POSTGRES_URL` to `DATABASE_URL`.
 * - [P3] Create a custom error class for Zod environment validation errors.
 */

import { z } from "zod"

/**
 * The shared environment configuration schema. Mode-specific schemas can inherit and extend (if you want each environment to require a different set of keys) or pick & merge from this (allows for simple overwrites).
 *
 * Refer to the configuration files for schema property documentation.
 */
export const sharedEnvironmentConfigSchema = z.object({
    /* GENERAL */

    port: z.number().default(3000),

    flags: z.object({
        vercel: z.string().optional()
    }),

    /* LOCATORS */

    urls: z.object({
        base: z.string().url().optional(),
        vercel: z.string().optional()
    }),

    paths: z.object({
        pages: z.object({}),
        routes: z.object({
            infra: z.string(),
            trpc: z.string()
        })
    }),

    /* CREDENTIALS */

    keys: z.object({
        public: z.object({}),

        secret: z.object({
            /* INTERNAL */

            api: z.string().optional(),

            /* DATABASE */

            postgresUrl: z.string().optional(),
            postgresPrismaUrl: z.string().optional(),
            postgresUrlNoSsl: z.string().optional(),
            postgresUrlNonPooling: z.string().optional(),
            postgresUser: z.string().optional(),
            postgresHost: z.string().optional(),
            postgresPassword: z.string().optional(),
            postgresDatabase: z.string().optional()
        })
    })
})
