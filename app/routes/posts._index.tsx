import { useLoaderData } from "@remix-run/react"
import db from '~/utils/db.server'
export async function loader() {
    const users = await db.user.findMany()
    const posts = await db.post.findMany()
    return { users, posts }
}

export default function IndexPage( ) {
    const { users, posts } = useLoaderData()
    return (
        <>
           
            <div>
                {users.length} users.
            </div>
            <div>
                {posts.length} posts.
            </div>
        </>
    )
}