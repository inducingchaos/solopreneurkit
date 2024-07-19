/**
 * @file Additional customization of Tailwind.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #tailwind
 * - #theme
 * - #css
 * - #config
 * - #customization
 */

import { type Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
    //  Uses the `.dark` HTML class to determine the theme.

    darkMode: ["class"],

    //  All of the pages to parse for Tailwind classes.

    content: ["./src/**/*.tsx"],

    theme: {
        extend: {
            //  Assign the fonts defined in `~/app/layout.tsx`, then appends the original typefaces as fallbacks.

            fontFamily: {
                sans: ["var(--font-inter)", ...fontFamily.sans],
                mono: ["var(--font-ibm-plex-mono)", ...fontFamily.mono]
            },

            //  Custom timing functions for animations.

            transitionTimingFunction: {
                "out-expo": "cubic-bezier(0.125, 1.0, 0.25, 1.0)",
                "in-out-expo": "cubic-bezier(0.875, 0.0, 0.125, 1.0)"
            }
        }
    },

    plugins: []
} satisfies Config
