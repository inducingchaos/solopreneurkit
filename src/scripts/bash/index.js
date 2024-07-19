/**
 * @file Runs a bash script.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #bash
 * - #script
 * - #utility
 * - #automation
 * - #cli
 * - #terminal
 * - #command
 * - #process
 * - #filesystem
 *
 * @todo
 * - [P4] Add support for passing a custom script path (ChatGPT reference: "Functional Component Folder").
 */

import { exec } from "child_process"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

/**
 * The path to the bash script.
 */
const scriptPath = resolve(dirname(fileURLToPath(import.meta.url)), "./stabilize.sh")

/**
 * Runs the bash script.
 */
exec(`bash "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
        //  If the Javascript returns an error, print it to the console.

        console.error(error.message)
        return
    }
    if (stderr) {
        //  If the bash script returns an error, print it to the console.

        console.error(stderr)
        return
    }

    //  If the script runs successfully, print the output to the console.

    console.log(stdout)
})
