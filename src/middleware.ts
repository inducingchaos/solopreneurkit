/**
 * @file Middleware that all Next.js routes are pre-processed with.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #middleware
 * - #nextjs
 * - #auth
 * - #verification
 * - #validation
 */

import { type NextResponse, type NextRequest } from "next/server"

/**
 * Allows us to pre-process information on certain routes before serving the response.
 */
export function middleware(_request: NextRequest): NextResponse | undefined {
    //  We don't have middleware yet.

    return undefined
}
