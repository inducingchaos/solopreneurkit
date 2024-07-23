"use client"

import { useState } from "react"

import { api } from "~/lib/infra/rpc/react"

export function LatestPost(): JSX.Element {
    const [latestPost] = api.posts.getLatest.useSuspenseQuery()

    const utils = api.useUtils()
    const [content, setContent] = useState("")
    const createPost = api.posts.create.useMutation({
        onSuccess: async () => {
            await utils.posts.invalidate()
            setContent("")
        }
    })

    return (
        <div className="w-full max-w-xs">
            {latestPost ? <p className="truncate">Your most recent post: {latestPost.content}</p> : <p>You have no posts yet.</p>}
            <form
                onSubmit={e => {
                    e.preventDefault()
                    createPost.mutate({ content })
                }}
                className="flex flex-col gap-2"
            >
                <input type="text" placeholder="Title" value={content} onChange={e => setContent(e.target.value)} className="w-full rounded-full px-4 py-2 text-black" />
                <button type="submit" className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20" disabled={createPost.isPending}>
                    {createPost.isPending ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    )
}
