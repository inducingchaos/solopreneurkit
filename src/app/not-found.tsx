/**
 * @file The 404 / not found page.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #component
 * - #page
 * - #tsx
 * - #404
 * - #not-found
 * - #error
 */

/**
 * The 404 page. This will be shown if the page or requested resource cannot be found.
 */
export default function NotFound(): JSX.Element {
    return (
        <>
            {/* Main tag. */}

            <main className="container flex min-h-screen w-full flex-col items-center justify-center">
                {/* Section one. */}

                <section className="flex h-screen w-full flex-col items-center justify-center">
                    {/* Placeholder content. */}

                    <p>Not found.</p>
                </section>
            </main>
        </>
    )
}
