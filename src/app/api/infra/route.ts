/**
 * @file Handles miscellaneous infrastructure requests.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #api
 * - #route
 * - #infra
 * - #misc
 * - #request
 * - #response
 * - #server
 */

import { environmentModeHelper } from "~/utils"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Iterates over known identifiers and returns an informational response.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    //  Get the identifier from the request.

    const identifier: string = request.nextUrl.searchParams.get("id")!

    //  Switch on the identifier.

    switch (identifier) {
        case "environment-mode":
            //  Determine the environment mode and return it as a response.

            return new NextResponse(await environmentModeHelper())
            break

        default:
            //  Throw an error if the identifier is invalid.

            throw new Error(`Invalid infra request identifier: \`${identifier}\`.`)
    }
}
