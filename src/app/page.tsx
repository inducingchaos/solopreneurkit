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
 * - [P0] Restore online functionality for prefetching, hydrating, and loading data.
 */

// import { Post } from "~/app/_components/post"
// import { api, HydrateClient } from "~/lib/infra/rpc/server"

/**
 * The home page for new users of Kyzn.
 */
export default async function Home(): Promise<JSX.Element> {
    //  Test API call.

    // const hello = await api.posts.hello({ text: "world!" })

    //  Prefetch the post data.

    // void api.posts.getLatest.prefetch()

    return (
        <>
            {/* Hydrates the client with the prefetched data. */}

            {/* <HydrateClient> */}

            {/* Main tag. */}

            <main className="flex w-full flex-col items-center justify-center">
                {/* Container. */}

                <div className="container flex flex-col items-center justify-center">
                    {/* Section one. */}

                    <section className="flex min-h-screen w-full flex-col items-center justify-center">
                        {/* Placeholder content. */}

                        {/* <p>{hello ? hello.content : "Loading tRPC query..."}</p> */}
                        <p>Hello, world!</p>
                    </section>

                    {/* <Post /> */}
                </div>
            </main>
            {/* </HydrateClient> */}
        </>
    )
}
