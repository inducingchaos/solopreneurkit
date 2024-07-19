/**
 * @file For testing during development.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #component
 * - #page
 * - #tsx
 */

/**
 * Created to test UIs and component functionality.
 */
export default function Test(): JSX.Element {
    return (
        <>
            {/* Main tag. */}

            <main className="container flex min-h-screen w-full flex-col items-center justify-center">
                {/* Section one. */}

                <section className="flex h-screen w-full flex-col items-center justify-center">
                    {/* Placeholder content. */}

                    <p>Test.</p>
                </section>
            </main>
        </>
    )
}
