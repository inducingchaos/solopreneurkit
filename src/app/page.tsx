/**
 * @file The home page for SolopreneurKit.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #component
 * - #page
 * - #marketing
 * - #home
 * - #landing
 * - #tsx
 *
 * @todo
 * - [P0] Add types.
 */

import { Post } from "~/app/_components/post"
import { api, HydrateClient } from "~/lib/infra/rpc/server"

/**
 * The home page for new users of SolopreneurKit.
 */
export default async function Home(): Promise<JSX.Element> {
    //  Test API call.

    const hello = await api.posts.hello({ text: "world!" })

    //  Prefetch the post data.

    void api.posts.getLatest.prefetch()

    return (
        <>
            {/* Hydrates the client with the prefetched data. */}

            <HydrateClient>
                {/* Main tag. */}

                <main className="flex w-full flex-col items-center justify-center">
                    {/* Container. */}

                    <div className="container flex flex-col items-center justify-center">
                        {/* Section one. */}

                        <section className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
                            {/* Placeholder content. */}

                            <p>{hello ? hello.content : "Loading tRPC query..."}</p>
                            <Post />
                        </section>
                    </div>
                </main>
            </HydrateClient>
        </>
    )
}
