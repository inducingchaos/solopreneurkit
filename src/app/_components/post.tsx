/**
 * @file Returns the latest post in the database.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * - #component
 * - #page
 * - #post
 * - #client
 * - #tsx
 *
 * @todo
 * - [P0] Add types.
 */

"use client"

import { useState } from "react"
import { api } from "~/lib/infra/rpc/react"

export function Post(): JSX.Element {
    //  Fetches the latest post as a Suspense query.

    const [post] = api.posts.getLatest.useSuspenseQuery()

    //  Exposes the tRPC utilities.

    const utils = api.useUtils()

    //  Create the state for the input field.

    const [content, setContent] = useState("")

    /**
     * Adds an `onSuccess` handler to the `createPost` tRPC mutation.
     */
    const createPost = api.posts.create.useMutation({
        onSuccess: async () => {
            //  Re-fetches the data fetched from the `posts` endpoint.

            await utils.posts.invalidate()

            //  Clears the input.

            setContent("")
        }
    })

    return (
        <>
            {/* Content wrapper. */}

            <div className="w-full max-w-xs">
                {/* Displays the post content. */}

                {post ? <p className="truncate py-2">Recent: {post.content}</p> : <p>No posts.</p>}

                {/* The form for creating a post. */}

                <form
                    onSubmit={e => {
                        //  Prevents a page reload on submission.

                        e.preventDefault()

                        //  Creates a post from the input content.

                        createPost.mutate({ content })
                    }}
                    className="flex flex-col gap-2"
                >
                    {/* The input for the post content. */}

                    <input type="text" placeholder="Write something here..." value={content} onChange={e => setContent(e.target.value)} className="w-full rounded-md bg-black/10 px-4 py-2" />

                    {/* The button for submitting post content. */}

                    <button type="submit" className="rounded-md bg-black px-4 py-2 text-white transition hover:opacity-50" disabled={createPost.isPending}>
                        {!createPost.isPending ? "Submit" : "Submitting..."}
                    </button>
                </form>
            </div>
        </>
    )
}
