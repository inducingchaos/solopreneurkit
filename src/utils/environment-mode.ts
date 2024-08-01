/**
 * @file Retrieve and validate the environment mode the application is running in.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #types
 * - #environment
 * - #environment-mode
 * - #utils
 * - #validation
 *
 * @remarks
 * - This component may change when the `environmentMode` API is overhauled.
 */

import { environmentModes, type EnvironmentMode } from "~/types"

/**
 * A helper for the `environmentMode` function.
 *
 * If running in the browser, it will request the environment mode from the server. There, it will use the available environment variables to determine the current environment.
 */
export async function environmentModeHelper(): Promise<string> {
    //  If client-side, request the environment mode from the client.

    if (typeof window !== "undefined") return (await fetch("/api/infra?id=environment-mode")).text()

    //  Use the custom environment mode if provided.

    if (process.env.NEXT_PUBLIC_MODE) return process.env.NEXT_PUBLIC_MODE

    //  If running on Vercel, use the Vercel environment.

    if (process.env.VERCEL) return process.env.VERCEL_ENV!

    //  Otherwise, use the Node.js environment.

    if (process.env.NODE_ENV) return process.env.NODE_ENV === "test" ? "preview" : process.env.NODE_ENV

    //  Throw an error if no environment is detected.

    throw new Error("No environment mode detected. Set one manually by passing it as `MODE` in the `.env`.")
}

/**
 * Used to validate the environment mode.
 */
export const validateEnvironmentMode = async (environmentMode: string): Promise<EnvironmentMode> => {
    //  Validate the environment mode.

    if (environmentModes.includes(environmentMode as EnvironmentMode)) return environmentMode as EnvironmentMode

    //  Throw an error if the environment mode is invalid.

    throw new Error(`Invalid environment mode: \`${environmentMode}\`.`)
}

/**
 * Gets the environment mode the application is running in. If needed, it will fetch the mode from the server and validate it upon return.
 */
export const environmentMode = async (): Promise<EnvironmentMode> => validateEnvironmentMode(await environmentModeHelper())
